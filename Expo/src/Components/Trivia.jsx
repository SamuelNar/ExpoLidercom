import { useState, useEffect } from "react";
import maniImagen from "/assets/personaje2.png";
import imgCorner from "/assets/Formaazul.png";
import "../Style/Trivia.css";

const Trivia = () => {
  const questions = [
    {
      question: "¿Cuál es el principal país productor de maní en el mundo?",
      choices: ["China", "Argentina", "Estados Unidos"],
      correctAnswer: 0,
    },
    {
      question: "¿Qué nutriente es especialmente abundante en el maní?",
      choices: ["Proteína", "Carbohidratos", "Calcio"],
      correctAnswer: 0,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  useEffect(() => {
    if (feedback && feedback.message.includes("Felicitaciones")) {
      const autoRestartTimer = setTimeout(() => {
        handleRestartQuiz();
      }, 2000); // Duración del mensaje de felicitaciones
      return () => clearTimeout(autoRestartTimer);
    }
  }, [feedback]);

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback(null);
    setIsAnswerSubmitted(false);
  };

  const handleAnswerSelect = (index) => {
    if (!isLoading && !isAnswerSubmitted) {
      setSelectedAnswer(index);
      setIsAnswerSubmitted(true);

      const isAnswerCorrect = index === questions[currentQuestion].correctAnswer;
      setIsCorrect(isAnswerCorrect);

      const isLastQuestion = currentQuestion === questions.length - 1;
      const feedbackMessage = isAnswerCorrect
        ? isLastQuestion
          ? "¡Felicitaciones!"
          : "¡Correcto! Seguimos en carrera."
        : "Upps, creo que va a tener que conocer más sobre nosotros";

      setFeedback({ message: feedbackMessage });

      const feedbackDuration = 3000; // Duración del feedback

      setTimeout(() => {
        if (isAnswerCorrect && !isLastQuestion) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setFeedback(null);
        } else if (isAnswerCorrect && isLastQuestion) {
          // El mensaje de felicitaciones se mostrará en el blue-corner
        } else {
          handleRestartQuiz(); // Reiniciar si la respuesta es incorrecta
        }
        setIsAnswerSubmitted(false);
      }, feedbackDuration);
    }
  };

  return (
    <div className="trivia-container">
      <div className="quiz-wrapper">
        <div className="quiz-container">
          <div className="border-top"></div>
          <div className="border-right"></div>
          <div className="border-bottom"></div>
          <div className="border-left"></div>
          <img
            src={imgCorner}
            className={`blue-corner ${feedback ? "feedback-visible" : ""}`}
            alt=""
          />
          {feedback && (
            <span className={`feedback-text ${isCorrect ? "correct" : "incorrect"}`}>
              {feedback.message}
            </span>
          )}
          <div className="fill"></div>
          <div className="quiz-content">
            <div className="question-info">
              <span>{currentQuestion + 1}.</span>
            </div>
            <div className="question-section">
              <p>{questions[currentQuestion].question}</p>
            </div>
            <div className="answers-section">
              {questions[currentQuestion].choices.map((choice, index) => (
                <div
                  key={index}
                  className={`answer-option ${
                    isAnswerSubmitted && selectedAnswer === index
                      ? isCorrect
                        ? "correct"
                        : "incorrect"
                      : ""
                  } ${isLoading || isAnswerSubmitted ? "disabled" : ""}`}
                >
                  <input
                    type="checkbox"
                    id={`answer-${index}`}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelect(index)}
                    disabled={isAnswerSubmitted || isLoading}
                  />
                  <label htmlFor={`answer-${index}`}>
                    {choice}                   
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <img src={maniImagen} alt="Maní" className="mani-image" />
      </div>
    </div>
  );
};

export default Trivia;
