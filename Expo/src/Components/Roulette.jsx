import { useState, useEffect,useRef} from 'react';
import { Wheel } from 'react-custom-roulette';
import '../style/Roulette.css';

const data = [
  { option: 'Premio 1', style: { backgroundColor: '#f39c12', textColor: '#fff' } },
  { option: 'Premio 2', style: { backgroundColor: '#3498db', textColor: '#fff' } },
  { option: 'Premio 3', style: { backgroundColor: '#2ecc71', textColor: '#fff' } },
  { option: 'Premio 4', style: { backgroundColor: '#e74c3c', textColor: '#fff' } },
  { option: 'Premio 5', style: { backgroundColor: '#9b59b6', textColor: '#fff' } },
];

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const wheelRef = useRef(null);

  // Para gestionar el giro de la ruleta
  const startAngle = useRef(0); // Ángulo de inicio del giro
  const currentAngle = useRef(0); // Ángulo actual de la ruleta
  const handleSpin = () => {
    setMustSpin(true);
    setPrizeNumber(Math.floor(Math.random() * data.length));
    setShowModal(false);
  };

  useEffect(() => {
    if (!mustSpin && prizeNumber !== null) {
      setTimeout(() => {
        setShowModal(true);
      }, 1000); // Espera 1 segundo después de que la ruleta se detiene para mostrar el modal
    }
  }, [mustSpin, prizeNumber]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTouchStart = (e) => {
    if (wheelRef.current) {
      const touch = e.touches[0];
      startAngle.current = Math.atan2(touch.clientY - wheelRef.current.getBoundingClientRect().top, touch.clientX - wheelRef.current.getBoundingClientRect().left);
    }
  };

  const handleTouchMove = (e) => {
    if (wheelRef.current) {
      const touch = e.touches[0];
      const currentTouchAngle = Math.atan2(touch.clientY - wheelRef.current.getBoundingClientRect().top, touch.clientX - wheelRef.current.getBoundingClientRect().left);
      const deltaAngle = currentTouchAngle - startAngle.current;

      // Ajusta el giro de la ruleta basándote en el ángulo de diferencia
      if (!mustSpin) {
        currentAngle.current += deltaAngle * 180 / Math.PI; // Convertir de radianes a grados
        wheelRef.current.style.transform = `rotate(${currentAngle.current}deg)`;
        startAngle.current = currentTouchAngle; // Actualiza el ángulo inicial
      }
    }
  };

  const handleTouchEnd = () => {
    // Lógica cuando el usuario levanta el dedo de la pantalla
    setMustSpin(true);
  };

  return (
    <div className="root-roulette">
    <div className="roulette-container">
      <h2>Juego de la Ruleta</h2>
      <div
        className="roulette"
        ref={wheelRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            setShowModal(true); // Muestra el modal cuando termina el giro
          }}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
        />
      </div>
      <button onClick={handleSpin} disabled={mustSpin}>
        {mustSpin ? 'Girando...' : 'Girar'}
      </button>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>¡Felicidades!</h3>
            <p>Has ganado:</p>
            <h2>{data[prizeNumber].option}</h2>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}