import { useState } from 'react';
import './App.css';
import NavBar from './components/Header/NavBar';
import Content from './components/Main/Content';
import Footer from './components/Footer/Footer';
import Lesson3 from './lessons/Lesson3/Lesson3';
import Lesson4 from './lessons/Lesson4/Lesson4';
import Lesson5 from './lessons/Lesson5/Lesson5';
import Lesson6 from './lessons/Lesson6/Lesson6';
import Lesson7 from './lessons/Lesson7/Lesson7';
import Lesson8 from './lessons/Lesson8/Lesson8';
import Lesson9 from './lessons/Lesson9/Lesson9';
import Lesson10 from './lessons/Lesson10/Lesson10';
import Lesson17 from '../docs/project/chapter3/Lesson17';
import Lesson18 from '../docs/project/chapter3/Lesson18';
import Lesson19 from '../docs/project/chapter3/Lesson19';
import Lesson20 from '../docs/project/chapter3/Lesson20';
import Lesson21 from '../docs/project/chapter3/Lesson21';
import Lesson22 from '../docs/project/chapter3/Lesson22';
import Lesson23 from '../docs/project/chapter3/Lesson23';
import Lesson24 from '../docs/project/chapter3/Lesson24';
import Lesson25 from '../docs/project/chapter3/Lesson25';
import Lesson26 from '../docs/project/chapter4/lesson26/Lesson26';
import Lesson27 from '../docs/project/chapter4/lesson27/Lesson27';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <NavBar />

      <Lesson27 />
      <Footer />
    </div>
  );
};

export default App;
