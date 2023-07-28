import React, { useState } from 'react';
import '../styles/Todo.css';

function Todo() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([...items, newItem]);
    setNewItem('');
  }

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">+</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div>{item}</div>
            <button onClick={() => handleDelete(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
