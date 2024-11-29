import { useState } from 'react';

const Lesson28 = () => {
  const [number, setNumber] = useState(0);

  const handleIncrease = () => {
    setNumber(number + 3);
  };

  return (
    <div>
      <div>Lesson 28: Broken button:</div>
      <button onClick={handleIncrease}>+3 units</button>
      <div>Number = {number}</div>
    </div>
  );
};

export default Lesson28;
