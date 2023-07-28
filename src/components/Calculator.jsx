import React, { useState } from 'react';
import '../styles/Calculator.css';

const Calculator = () => {
  const [result, setResult] = useState("");

  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  }

  const clear = () => {
    setResult("");
  }

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    }
    catch(err) {
      setResult("Error");
    }
  }

  return (
    <div className="calculator-card">
        <h3>Calculator</h3>
      <div className='result-clear'>
        <input type="text" value={result} onChange={handleClick}/>
        <button id="clear" onClick={clear}>X</button>
      </div>
      <div className="keypad">
        <button name="1" onClick={handleClick}>1</button>
        <button name="2" onClick={handleClick}>2</button>
        <button name="3" onClick={handleClick}>3</button>
        <button name="+" onClick={handleClick}>+</button>
        <button name="4" onClick={handleClick}>4</button>
        <button name="5" onClick={handleClick}>5</button>
        <button name="6" onClick={handleClick}>6</button>
        <button name="-" onClick={handleClick}>-</button>
        <button name="7" onClick={handleClick}>7</button>
        <button name="8" onClick={handleClick}>8</button>
        <button name="9" onClick={handleClick}>9</button>
        <button name="*" onClick={handleClick}>*</button>
        <button name="0" onClick={handleClick}>0</button>
        <button name="." onClick={handleClick}>.</button>
        <button name="/" onClick={handleClick}>/</button>
        <button id="result" onClick={calculate}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
