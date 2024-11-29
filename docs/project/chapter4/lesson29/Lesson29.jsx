import { useState } from 'react';
import Timer from './Timer';

const Lesson29 = (props) => {
  const [number, setNumber] = useState(0);
  const handleClick2 = () => {
    setNumber(number + 5);
    setTimeout(() => {
      alert(number);
    }, 3000);
  };
  return (
    <div>
      <div>Lesson 29:</div>
      <Timer />
      {/* <>
        <div>Current number = {number}</div>
        <button
          onClick={() => {
            setNumber(number + 5);
            alert(number);
          }}
        >
          +5 units
        </button>
      </> */}

      <>
        <div>Current number = {number}</div>
        <button onClick={() => handleClick2()}>+5 units</button>
      </>
    </div>
  );
};

export default Lesson29;
