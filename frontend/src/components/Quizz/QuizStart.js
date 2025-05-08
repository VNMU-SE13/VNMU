import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import axios from "axios";
import FullPageLoading from '../common/FullPageLoading'

const QuizWrapper = styled.div`
  background-image: url('/image/bg-paper.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
`;

const QuestionRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  gap: 40px;
  margin-bottom: 30px;
`;

const QuestionImage = styled.img`
  width: 500px;
  height: 350px;
  border-radius: 20px;
  object-fit: cover;
  flex-shrink: 0;
`;

const QuestionBlock = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  text-align: left;
`;

const QuestionText = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  color: #000;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  background: ${({ selected, correct, isAnswer }) => {
    if (isAnswer) return '#ccffcc';
    if (correct === false && selected) return '#ffcccc';
    return selected ? '#ffeeba' : 'white';
  }};
  border: 2px solid #a40000;
  border-radius: 20px;
  padding: 12px 20px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-weight: bold;
  color: #333;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
  transition: all 0.3s ease;
`;

const ProgressBarWrapper = styled.div`
  width: 500px;
  height: 12px;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  display: flex;
  align-items: center;
  position: relative;
`;

const fillAnimation = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

const ProgressFill = styled.div`
  background: repeating-linear-gradient(
    45deg,
    #ff9999,
    #ff9999 10px,
    #ccffcc 10px,
    #ccffcc 20px,
    #ffff99 20px,
    #ffff99 30px
  );
  height: 100%;
  animation: ${fillAnimation} 10s linear forwards;
`;

const NextButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  z-index: 1000;

  &:hover {
    background-color: #45a049;
  }
`;

const QuizStart = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useContext(LanguageContext);
  const [current, setCurrent] = useState();
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [translatedQuestion, setTranslatedQuestion] = useState("");
  const [translatedOptions, setTranslatedOptions] = useState([]);
  const [quiz, setQuiz] = useState()
  const [questions, setQuestions] = useState()
  const [loading, setLoading] = useState(true)
  const timerRef = useRef(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/Quiz/${id}`)
        setQuiz(res.data)
        const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/Question`)
        const ques = res2.data.filter(q => q.quizId == res.data.id)
        setQuestions(ques)
        setCurrent(0)
      }
      catch(err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // useEffect(() => {
  //   const translate = async () => {
  //     const q = await translateText(questions[current].text, language);
  //     console.log(q)
  //     const opts = await Promise.all(
  //       questions[current].answer.map((o) => translateText(o, language))
  //     );
  //     setTranslatedQuestion(q);
  //     setTranslatedOptions(opts);
  //   };

  //   if(questions) translate();
  // }, [current, language]);
  useEffect(() => {
    if (isFinished) return;

    setShowAnswer(false);
    setSelected(null);
    setTimeLeft(10);

    if (timerRef.current) {
      clearInterval(timerRef.current); // clear trước nếu đang tồn tại
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 3) {
          setShowAnswer(true);
          if (selected && questions[current].answers[(selected-1)%4].isCorrect) {
            setScore((prev) => prev + 1);
          }
        }

        if(prev === 0) {
          if (questions && (current + 1 < questions.length)) {
            setCurrent((prev) => prev + 1);
          } else {
            setIsFinished(true);
          }
          clearInterval(timer);
          return 0;
        }

        return loading ? prev : prev - 1;
      });

    }, 1000);

    timerRef.current = timer;

    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    if (isFinished) {
      const now = new Date();
      const fetchSubmit = async () => {
        try {
          setLoading(true)
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/Quiz/${quiz.id}/submit?userId=${localStorage.getItem('userId')}&totalPoints=${score}`)
        }
        catch (err) {
          console.log(err)
        }
        finally {
          setLoading(false)
        }
      }

      fetchSubmit()
    }
  }, [isFinished]);

  const handleSelect = (option) => {
    if (!showAnswer) setSelected(option);
  };

  const handleNext = () => {
    if (!showAnswer) {
      clearInterval(timerRef);
      // setTimeLeft(0);
      setShowAnswer(true);
      if (selected && questions[current].answers[(selected-1)%4].isCorrect) {
        setScore((prev) => prev + 1);
      }

      setTimeout(() => {
        if (current + 1 < questions.length) {
          setCurrent((prev) => prev + 1);
        } else {
          setIsFinished(true);
        }
      }, 1000);
    }
  };

  if(!questions || loading) return <FullPageLoading isLoading={true}/>
  else
  return (
    <QuizWrapper>
      {isFinished ? (
        <>
          <h1 style={{ fontSize: '32px', color: '#a40000', marginBottom: '20px' }}>
            🎉 {language === 'vi' ? "Bạn đã hoàn thành bài thi Trạng Nguyên!" : "You've completed the quiz!"}
          </h1>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '40px' }}>
            {language === 'vi' ? "Điểm số của bạn" : "Your score"}: {score} / {questions.length}
          </h2>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '10px',
                backgroundColor: '#008CBA',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setSelected(null)
                setIsFinished(false);
              }}
            >
              🔁 {language === 'vi' ? "Thử tài lần nữa" : "Try again"}
            </button>

            <button
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate('/quiz')
              }}
            >
              ⬅️ {language === 'vi' ? "Quay lại" : "Back"}
            </button>
          </div>
        </>
      ) : (
        <>
          <QuestionRow>
            <QuestionBlock>
              <QuestionText>{questions[current].text}</QuestionText>
              <OptionList>
                {questions[current].answers.map((option, index) => {
                  const original = option.id
                  const isCorrect = showAnswer && option.isCorrect
                  const isWrong = showAnswer && selected === original && option.isCorrect;

                  return (
                    <Option
                      key={original}
                      selected={selected === original}
                      correct={isWrong ? false : undefined}
                      isAnswer={isCorrect}
                      disabled={showAnswer}
                      onClick={() => handleSelect(option.id)}
                    >
                      {option.text}
                    </Option>
                  );
                })}
              </OptionList>
            </QuestionBlock>

            <QuestionImage src={questions[current].image} alt="question" />
          </QuestionRow>

          <ProgressBarWrapper>
            <ProgressFill key={current} />
          </ProgressBarWrapper>

          <NextButton onClick={handleNext}>
            {language === 'vi' ? "Câu tiếp theo →" : "Next Question →"}
          </NextButton>
        </>
      )}
    </QuizWrapper>
  );
};

export default QuizStart;