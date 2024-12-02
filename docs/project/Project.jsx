import Lesson36 from './chapter4/lesson36/Lesson36';
import Lesson37 from './chapter4/lesson37/Lesson37';
import Lesson39 from './chapter4/lesson39/Lesson39';
import Login from './Login';
import './Project.scss';
import 'nprogress/nprogress.css';
// import Lesson26 from './chapter4/lesson26/Lesson26';

const Project = (props) => {
  return (
    <div className='project'>
      <Login />
      <Lesson39 />
    </div>
  );
};

export default Project;
