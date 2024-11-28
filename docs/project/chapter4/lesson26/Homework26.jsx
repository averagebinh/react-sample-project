import { useEffect, useState } from 'react';
import { getUserWithPaginate } from '../../utils/apiService';
import User from './User';
import './Homework26.scss';
//   Ở đây, truyền vào mặc định là getUserWithPaginate (1, 3) để có dữ liệu

const Homework26 = (props) => {
  // const [listUsers, setListUsers] = useState([]);
  // useEffect(() => {
  //   fetchListUSer();
  // }, []);

  // const fetchListUSer = async () => {
  //   let res = await getUserWithPaginate(1, 3);
  //   console.log(res);
  //   setListUsers(res.DT.users);
  // };

  let { listUsers } = props;
  console.log('>>>listUsers ', listUsers);
  return (
    <div className='list-user-container'>
      {listUsers &&
        listUsers.map((item) => {
          return <User data={item} />;
        })}
    </div>
  );
};

export default Homework26;
