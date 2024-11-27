import { useState } from 'react';
import './User.scss';
const User = (props) => {
  const { data } = props;
  const [show, setShow] = useState(true);

  return (
    <>
      <div className=' detail-user'>
        <div className='id'>ID: {data?.id}</div>
        <div className='name'>Username: {data?.username}</div>
        <div>
          {data.image && show && (
            <img
              src={`data:image/png;base64, ${data.image}`}
              alt='User image'
            />
          )}
        </div>
        <div className=''>
          <button onClick={() => setShow(!show)}>Hide/Show Images</button>
        </div>
      </div>
    </>
  );
};

export default User;
