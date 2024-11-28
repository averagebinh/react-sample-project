import User from '../lesson26/User';
import './AddNewUser.scss';

import React, { useState } from 'react';

const AddNewUser = (props) => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);

  // Convert file to base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleOnChangeFile = async (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const base64String = await toBase64(event.target.files[0]);
      const strippedBase64 = base64String.replace(
        /^data:image\/[a-z]+;base64,/,
        '',
      );
      setImage(strippedBase64);
      console.log('>> Base64 Image String:', strippedBase64); // Logs the converted base64 image
    }
  };

  const handleAddNewUser = () => {
    console.log('check>>>>>>>', { userId, username, image });
    props.addNew({
      id: +userId,
      username: username,
      image: image,
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
          <input onChange={(e) => handleOnChangeFile(e)} type={'file'} />
        </div>
      </fieldset>
      <button type='submit' onClick={handleAddNewUser}>
        Save
      </button>
    </div>
  );
};
export default AddNewUser;
