import { useState } from 'react';
import CoolButton from './CoolButton';

const Lesson3 = (props) => {
  const [name, setName] = useState('');
  return (
    <div>
      <label>Name:</label>
      <input
        type={'text'}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <div>{name}</div>
      <CoolButton btnClass='primary' title='primary' />
      <CoolButton btnClass='warning' title='warning' />
    </div>
  );
};

export default Lesson3;
