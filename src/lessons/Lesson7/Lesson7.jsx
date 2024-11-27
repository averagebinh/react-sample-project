const Lesson7 = (props) => {
  function MyFunction() {
    console.log('>>>>> function truyen thong');
  }
  let a = function () {
    console.log('>>>>> Anomyous function truyen thong');
  };

  setTimeout(function () {
    console.log('>>>>> Anomyous function truyen thong');
  }, 1000);
  //   a();
  MyFunction();
  let b = () => {
    console.log('Anynomous function^^^');
  };
  b();
  return (
    <div style={{ padding: '50px' }}>
      <h3>Lesson 7 Anonymous Function:</h3>
    </div>
  );
};

export default Lesson7;
