import _ from 'lodash';
const Lesson25 = (props) => {
  const person = {
    name: 'abc',
    address: {
      city: 'hn',
      country: 'vn',
    },
    job: {
      title: 'dev',
      detail: {
        position: 'boss',
        salary: '5k',
      },
    },
  };
  let copiedPerson = _.cloneDeep(person); //deep copy
  console.log(copiedPerson);
  copiedPerson.name = 'alo';
  copiedPerson.job.title = 'blo';

  return <div>Lesson 25;</div>;
};

export default Lesson25;
