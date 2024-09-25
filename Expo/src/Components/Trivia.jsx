import { useState, useEffect,useRef} from "react";
import autronauta from "/assets/personaje234.png";
import imgCorner from "/assets/Formaazul.png";
import Wrong from "/assets/Wrong.mp3";
import Finish from "/assets/Finish.mp3";
import Correct from "/assets/Correct.mp3";
import "../Style/Trivia.css";

const Trivia = () => {
  const questions = [
    {
      question: "¿Qué es un router?",
      choices: ["Un dispositivo que amplifica el sonido", "Un dispositivo que distribuye la señal de internet", "Un tipo de impresora"],
      correctAnswer: 1,
    },
    {
      question: "¿Qué función cumple un cable de fibra óptica?",
      choices: ["Transmitir electricidad", "Transmitir datos a alta velocidad", "Reforzar la señal de televisión"],
      correctAnswer: 1,
    },
    {
      question: "¿Qué es el phishing?",
      choices: ["Un tipo de ataque cibernetico", "Un software que optimiza la seguridad informatica", "Un protocolo de transferencia segura"],
      correctAnswer: 0,
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const correctSound = new Audio(Correct);
  const wrongSound = new Audio(Wrong);
  const finishSound = new Audio(Finish);
  const completionSoundPlayed = useRef(false);

  useEffect(() => {
    if (feedback && feedback.message.includes("Felicitaciones")) {
      if (!completionSoundPlayed.current) {
        finishSound.play(); // Reproducir sonido al mostrar el mensaje de felicitaciones
        completionSoundPlayed.current = true; // Marcar que el sonido ya se reprodujo
      }
      const feedbackDuration = 3000; // Duración del mensaje de felicitaciones
      const autoRestartTimer = setTimeout(() => {
        handleRestartQuiz();
      }, feedbackDuration); // Reiniciar después de que el mensaje haya durado

      return () => clearTimeout(autoRestartTimer);
    }
  }, [feedback]);

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFeedback(null);
    setIsAnswerSubmitted(false);
    completionSoundPlayed.current = false;
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
        : "Incorrecto";

      setFeedback({ message: feedbackMessage });

      if (isAnswerCorrect) {
        correctSound.play();
      } else{
        wrongSound.play();
      }

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
        <img src={autronauta} alt="Maní" className="mani-image" />
      </div>
    </div>
  );
};

export default Trivia;
