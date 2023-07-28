import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "../styles/UserDetails.css";
import UserCard from "./UserCard";
import UserForm from "./UserForm";

const UserDetails = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: currentUser,
    phoneNumber: "",
  });

  const usersCollectionRef = collection(db, "users");


  const getUsers = useCallback(async () => {
    const userQuery = query(
      usersCollectionRef,
      where("email", "==", currentUser)
    );
    const data = await getDocs(userQuery);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    if(data.docs.length === 0){
      setFormValues((prevState) => ({
        ...prevState,
        email: currentUser,
      }));
    }

    setLoading(false);
  }, [currentUser, usersCollectionRef]);

  useEffect(() => {
    getUsers();
  }, []);


  const handleEdit = (user) => {
    setEditUser(user);
    setFormValues((prevValues) => ({
      ...user,
      address: user.address
        ? {
            ...prevValues.address,
            ...user.address,
          }
        : { ...prevValues.address },
    }));
  };


  const handleChange = (e) => {
      setFormValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editUser) {
      await setDoc(doc(usersCollectionRef, editUser.id), formValues);

      setEditUser(null);
    } else {
      await addDoc(usersCollectionRef, formValues);
    }

    getUsers();
  };


  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id}>
                {editUser && editUser.id === user.id ? (
                  <UserForm
                    formValues={formValues}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                ) : (
                  <UserCard user={user} onEdit={handleEdit} />
                )}
              </div>
            ))
          ) : (
            <UserForm
              formValues={formValues}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
