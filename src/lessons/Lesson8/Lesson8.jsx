import './Lesson8.scss';

const Lesson8 = (props) => {
  //   function handleOnClick1() {
  //     alert('click me');
  //   }

  const handleOnClick2 = () => {
    alert('click me');
  };

  return (
    <div className='lesson8'>
      <h3>Lesson 8 :</h3>
      <div>
        <button
        //   onClick={handleOnClick2}
        //   onClick={handleOnClick2}
        >
          Tham Chiếu
        </button>
      </div>
      <div>
        <button
        // onClick={alert('click me')}
        >
          Inline
        </button>
      </div>
      <div>
        <button
          //   onClick={() => {
          //     alert('click me');
          //   }}
          onClick={() => {
            handleOnClick2();
          }}
        >
          Arrow function
        </button>
      </div>
    </div>
  );
};

export default Lesson8;
