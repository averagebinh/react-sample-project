import { useEffect, useState } from 'react';
import { getUserWithPaginate } from '../../utils/apiService';
import Homework26 from '../lesson26/Homework26';
import AddNewUser from './AddNewUser';
const Lesson27 = (props) => {
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    fetchListUSer();
  }, []);

  const fetchListUSer = async () => {
    let res = await getUserWithPaginate(1, 3);
    console.log(res);
    setListUsers(res.DT.users);
  };

  const addNew = (user) => {
    setListUsers([user, ...listUsers]);
    console.log('check listUSer update>>>', listUsers);
  };
  return (
    <div>
      <div>Lesson 27: Sharing State Between Components (Lift-up State)</div>
      <AddNewUser addNew={addNew} />
      <Homework26 listUsers={listUsers} />
    </div>
  );
};

export default Lesson27;
