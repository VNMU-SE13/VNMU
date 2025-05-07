import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { LanguageContext } from "../../context/LanguageContext";
import translateText from "../../utils/translate";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FullPageLoading from "../common/FullPageLoading";

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

const QuizStartWithAI = () => {
  const [ searchParams ] = useSearchParams()
  const textParam = searchParams.get('quiz')
  const { language } = useContext(LanguageContext);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timerRef, setTimerRef] = useState(null);
  const [translatedQuestion, setTranslatedQuestion] = useState("");
  const [translatedOptions, setTranslatedOptions] = useState([]);
  const [quiz, setQuiz] = useState()
  const [loading, setLoading] = useState(true)

  function isPlainObject(obj) {
    return (
      obj !== null &&
      typeof obj === 'object' &&
      !Array.isArray(obj)
    );
  }  

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/GPT/ChatGPTGeneQuiz`, {
          searchText: textParam
        })
        if(res.data) {
          if(isPlainObject(res.data.questions[0].answers)) {
            const newQuiz = res.data.questions.map(q => {return {...q, answers: Object.values(q.answers), correct_answer: q.correct.charCodeAt(0)-65}})
            setQuiz(newQuiz)
          }
          else {
            const newQuiz = res.data.questions.map(q => {return {...q, correct_answer: q.correct_answer.charCodeAt(0)-65}})
            setQuiz(newQuiz)
          }
        }
        
      }
      catch(err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [textParam])
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

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 3) {
          setShowAnswer(true);
          if (selected && quiz[current].correct_answer === selected) {
            setScore((prev) => prev + 1);
          } 

          // setTimeout(() => {
          //   if (quiz && current + 1 < quiz.length) {
          //     setCurrent((prev) => prev + 1);
          //   } else {
          //     setIsFinished(true);
          //   }
          // }, 3000);

          
        }

        if (prev === 0) {
          if (quiz && current + 1 < quiz.length) {
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

    setTimerRef(timer);
    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    if (isFinished) {
      const now = new Date();
      const entry = {
        datetime: now.toLocaleString("vi-VN"),
        total: quiz.length,
        correct: score,
        score: score * 10,
        rank: score === 10 ? "Top 1" : "Top 10",
        title: score === 10 ? "Trạng Nguyên" : "Bảng Nhãn"
      };

    }
  }, [isFinished]);

  const handleSelect = (option) => {
    if (!showAnswer) setSelected(option);
  };

  const handleNext = () => {
    if (!showAnswer) {
      clearInterval(timerRef);
      setTimeLeft(0);
      setShowAnswer(true);
      console.log(selected)
      if (selected && quiz[current].correct_answer == selected) {
        setScore((prev) => prev + 1);
      }

      setTimeout(() => {
        if (current + 1 < quiz.length) {
          setCurrent((prev) => prev + 1);
        } else {
          setIsFinished(true);
        }
      }, 1000);
    }
  };

  if(!quiz || loading) return <FullPageLoading isLoading={true}/>
  else
  return (
    <QuizWrapper>
      {isFinished ? (
        <>
          <h1 style={{ fontSize: '32px', color: '#a40000', marginBottom: '20px' }}>
            🎉 {language === 'vi' ? "Bạn đã hoàn thành bài thi Trạng Nguyên!" : "You've completed the quiz!"}
          </h1>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '40px' }}>
            {language === 'vi' ? "Điểm số của bạn" : "Your score"}: {score} / {quiz.length}
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
                window.location.href = '/quiz';
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
              <QuestionText>{quiz[current].question}</QuestionText>
              <OptionList>
                {quiz[current].answers.map((option, index) => {
                  const isCorrect = showAnswer && quiz[current].correct_answer === index;
                  const isWrong = showAnswer && selected === index && quiz[current].correct_answer === index;

                  return (
                    <Option
                      key={index}
                      selected={selected === index}
                      correct={isWrong ? false : undefined}
                      isAnswer={isCorrect}
                      disabled={showAnswer}
                      onClick={() => handleSelect(index)}
                    >
                      {option}
                    </Option>
                  );

                })}                                
              </OptionList>
            </QuestionBlock>

            <QuestionImage src={""} alt="question" />
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

export default QuizStartWithAI;