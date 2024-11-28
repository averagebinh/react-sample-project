import './AddNewUser.scss';

import React, { useState } from 'react';

const AddNewUser = (props) => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [file, setFile] = useState(null);

  const handleAddNewUser = () => {
    props.addNew({
      id: userId,
      username: username,
      image: file,
    });
  };
  return (
    <div>
      <fieldset>
        <legend>Add new user: </legend>
        <div>
          <label>ID: </label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            type='text'
          />
        </div>
        <div>
          <label>Username: </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
          />
        </div>
        <div>
          <label>Image: </label>
          <input onChange={(e) => setFile(e.target.files[0])} type='file' />
        </div>
      </fieldset>
      <button type='submit' onClick={handleAddNewUser}>
        Save
      </button>
    </div>
  );
};

export default AddNewUser;
