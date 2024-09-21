import { useState, useRef, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import wheelSound from '/assets/Prueba2.mp3';
import '../style/Roulette.css';

const data = [
  { option: 'Premio 1', style: { backgroundColor: '#f39c12', textColor: '#fff' } },
  { option: 'Premio 2', style: { backgroundColor: '#3498db', textColor: '#fff' } },
  { option: 'Premio 3', style: { backgroundColor: '#2ecc71', textColor: '#fff' } },
  { option: 'Premio 4', style: { backgroundColor: '#e74c3c', textColor: '#fff' } },
  { option: 'Premio 5', style: { backgroundColor: '#9b59b6', textColor: '#fff' } },
  { option: 'Premio 6', style: { backgroundColor: 'purple', textColor: '#fff' } },
  { option: 'Premio 7', style: { backgroundColor: 'black', textColor: '#fff' } },
  { option: 'Premio 8', style: { backgroundColor: 'orange', textColor: '#fff' } },
];

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const wheelRef = useRef(null);
  const startAngle = useRef(0);
  const isTouching = useRef(false);
  const spinTriggered = useRef(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(wheelSound);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleSpinClick = () => {
    if (!mustSpin) {
      triggerSpin();
    }
  };

  const triggerSpin = () => {
    if (!spinTriggered.current) {
      spinTriggered.current = true;
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  const handleTouchStart = (e) => {
    if (!mustSpin) {
      isTouching.current = true;
      const touch = e.touches[0];
      const rect = wheelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      startAngle.current = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
    }
  };

  const handleTouchMove = (e) => {
    if (isTouching.current && !mustSpin) {
      const touch = e.touches[0];
      const rect = wheelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const currentAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
      const rotation = ((currentAngle - startAngle.current) * 180 / Math.PI + 360) % 360;

      // Aplicar la rotación solo al contenido interno de la rueda
      const wheelContent = wheelRef.current.querySelector('.roulette-pro');
      if (wheelContent) {
        wheelContent.style.transform = `rotate(${rotation}deg)`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (isTouching.current && !mustSpin) {
      isTouching.current = false;
      triggerSpin();
    }
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
              setShowModal(true);
              spinTriggered.current = false;              
            }}
            backgroundColors={['#3e3e3e', '#df3428']}
            textColors={['#ffffff']}
            outerBorderWidth={5}
            outerBorderColor="#000"
            innerBorderWidth={5}
            innerRadius={30}
            radiusLineWidth={1}
            radiusLineColor="#ffffff"
          />
        </div>
        <button className='girar' onClick={handleSpinClick} disabled={mustSpin}>
          {mustSpin ? 'Girando...' : 'Girar'}
        </button>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>¡Felicidades!</h3>
              <p>Has ganado:</p>
              <h2>{data[prizeNumber].option}</h2>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}