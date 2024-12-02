import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiFillPlusSquare } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import {
  getQuizWithQA,
  getAllQuizForAdmin,
  postUpsertQA,
} from '../../../utils/apiService';
import { toast } from 'react-toastify';
import 'react-awesome-lightbox/build/style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { normalize, schema } from 'normalizr';
import { useImmer } from 'use-immer';
const QuizQA = (props) => {
  const cauhoiId = uuidv4();
  const dapAnId = uuidv4();

  const [cauHoiObj, setCauHoiObj] = useImmer({
    [cauhoiId]: {
      id: cauhoiId,
      description: '',
      imageFile: '',
      imageName: '',
      answers: [dapAnId],
    },
  });

  const [dapAnObj, setDapAnObj] = useImmer({
    [dapAnId]: {
      id: dapAnId,
      description: '',
      isCorrect: false,
    },
  });

  const initQuestions = [
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
        },
      ],
    },
  ];

  const [questions, setQuestions] = useState(initQuestions);

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: '',
    url: '',
  });

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  //return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  const fetchQuizWithQA = async () => {
    let rs = await getQuizWithQA(selectedQuiz.value);
    if (rs && rs.EC === 0) {
      //convert base64 to File object
      let newQA = [];
      for (let i = 0; i < rs.DT.qa.length; i++) {
        let q = rs.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            'image/png',
          );
        }
        newQA.push(q);
      }
      // setQuestions(newQA);

      //normalize data

      const answer = new schema.Entity('answer');
      const question = new schema.Entity('question', {
        answers: [answer],
      });
      const qaSchema = [question];
      const d = normalize(newQA, qaSchema);

      console.log('>>> check data normalizedData : ', d);
      setCauHoiObj(d.entities.question);
      setDapAnObj(d.entities.answer);
    }
  };
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      let cauhoiId = uuidv4();
      let dapAnId = uuidv4();

      const newQuestion = {
        id: cauhoiId,
        description: '',
        imageFile: '',
        imageName: '',
        answers: [dapAnId],
      };

      let newAnswer = {
        id: dapAnId,
        description: '',
        isCorrect: false,
      };
      setCauHoiObj((draft) => {
        draft[cauhoiId] = newQuestion;
      });
      setDapAnObj((draft) => {
        draft[dapAnId] = newAnswer;
      });
      //  setDapAnObj()
      // setQuestions([...questions, newQuestion]);
    }
    if (type === 'REMOVE') {
      if (cauHoiObj[cauhoiId]) {
        if (
          cauHoiObj[cauHoiObj].answers &&
          cauHoiObj[cauHoiObj].answers.length > 0
        ) {
          setDapAnObj((draft) => {
            cauHoiObj[cauHoiObj].answers.forEach((item) => {
              delete dapAnObj[item];
            });
          });
        }
      }
      setCauHoiObj((draft) => {
        delete draft[id];
      });
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    if (type === 'ADD') {
      const newAid = uuidv4();
      const newAnswer = {
        id: newAid,
        description: '',
        isCorrect: false,
      };
      setDapAnObj((draft) => {
        draft[newAid] = newAnswer;
      });
      setCauHoiObj((draft) => {
        draft[questionId].answers.push(newAid);
      });
    }
    if (type === 'REMOVE') {
      if (cauHoiObj[questionId]) {
        setCauHoiObj((draft) => {
          let newAs = cauHoiObj[questionId].answers.filter(
            (item) => item !== answerId,
          );
          draft[questionId].answers = newAs;
        });
      }
      if (dapAnObj[answerId]) {
        setDapAnObj((draft) => {
          delete draft[answerId];
        });
      }
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === 'QUESTION') {
      if (cauHoiObj[questionId]) {
        setCauHoiObj((draft) => {
          draft[questionId].description = value;
        });
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    if (
      cauHoiObj[questionId] &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      setCauHoiObj((draft) => {
        draft[questionId].imageFile = event.target.files[0];
        draft[questionId].imageName = event.target.files[0].name;
      });
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    if (dapAnObj[answerId]) {
      setDapAnObj((draft) => {
        if (type === 'CHECKBOX') {
          draft[answerId].isCorrect = value;
        }
        if (type === 'INPUT') {
          draft[answerId].description = value;
        }
      });
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    console.log('Check state question ', cauHoiObj);
    console.log('Check state question ', dapAnObj);

    return;
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreviewImage = (questionId) => {
    if (cauHoiObj[questionId]) {
      setDataImagePreview({
        url: URL.createObjectURL(cauHoiObj[questionId].imageFile),
        title: cauHoiObj[questionId].imageName,
      });
      setIsPreviewImage(true);
    }
  };
  console.log('>>> check cau hoi', cauHoiObj);
  return (
    <div className='questions-container'>
      <div className='add-new-question'>
        <div className='col-6 form-group'>
          <label className='mb-2'>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className='mt-3 mb-2 '>Add questions:</div>

        {Object.keys(cauHoiObj).map((keyQ, index) => {
          return (
            <div key={keyQ} className='q-main mb-4'>
              <div className='questions-content'>
                <div className='form-floating description'>
                  <input
                    type='type'
                    className='form-control'
                    placeholder='name@example.com'
                    value={cauHoiObj[keyQ].description}
                    onChange={(event) =>
                      handleOnChange(
                        'QUESTION',
                        cauHoiObj[keyQ].id,
                        event.target.value,
                      )
                    }
                  />
                  <label>Question {index + 1} 's description</label>
                </div>
                <div className='group-upload'>
                  <label htmlFor={`${cauHoiObj[keyQ].id}`}>
                    <RiImageAddFill className='label-up' />
                  </label>
                  <input
                    id={`${cauHoiObj[keyQ].id}`}
                    onChange={(event) =>
                      handleOnChangeFileQuestion(cauHoiObj[keyQ].id, event)
                    }
                    type={'file'}
                    hidden
                  />
                  <span>
                    {cauHoiObj[keyQ].imageName ? (
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePreviewImage(cauHoiObj[keyQ].id)}
                      >
                        {cauHoiObj[keyQ].imageName}
                      </span>
                    ) : (
                      '0 file is uploaded'
                    )}
                  </span>
                </div>
                <div className='btn-add'>
                  <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                    <BsFillPatchPlusFill className='icon-add' />
                  </span>
                  {Object.keys(cauHoiObj).length > 1 && (
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion('REMOVE', cauHoiObj[keyQ].id)
                      }
                    >
                      <BsPatchMinusFill className='icon-remove' />
                    </span>
                  )}
                </div>
              </div>

              {cauHoiObj[keyQ].answers &&
                cauHoiObj[keyQ].answers.length > 0 &&
                cauHoiObj[keyQ].answers.map((keyA, index) => {
                  return (
                    <div key={keyA} className='answers-content'>
                      <input
                        className='form-check-input iscorrect'
                        type='checkbox'
                        checked={dapAnObj[keyA].isCorrect}
                        onChange={(event) =>
                          handleAnswerQuestion(
                            'CHECKBOX',
                            dapAnObj[keyA].id,
                            cauHoiObj[keyQ].id,
                            event.target.checked,
                          )
                        }
                      />
                      <div className='form-floating anwser-name'>
                        <input
                          value={dapAnObj[keyA].description}
                          type='type'
                          className='form-control'
                          placeholder='name@example.com'
                          onChange={(event) =>
                            handleAnswerQuestion(
                              'INPUT',
                              dapAnObj[keyA].id,
                              cauHoiObj[keyQ].id,
                              event.target.value,
                            )
                          }
                        />
                        <label>Answers {index + 1} </label>
                      </div>
                      <div className='btn-group'>
                        <span
                          onClick={() =>
                            handleAddRemoveAnswer('ADD', cauHoiObj[keyQ].id)
                          }
                        >
                          <AiFillPlusSquare className='icon-add' />
                        </span>
                        {cauHoiObj[keyQ].answers.length > 1 && (
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                'REMOVE',
                                cauHoiObj[keyQ].id,
                                dapAnObj[keyA].id,
                              )
                            }
                          >
                            <AiOutlineMinusCircle className='icon-remove' />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}

        {cauHoiObj && Object.keys(cauHoiObj).length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className='btn btn-warning'
            >
              Save Questions
            </button>
          </div>
        )}

        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
