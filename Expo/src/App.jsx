import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import './App.css';

const imageData = [
  { id: 'img1', src: '/ExpoLidercom/assets/Imagen/Intersec.jpeg', info: 'Información sobre imagen 1', category: 'Imagen' },
  { id: 'img2', src: '/ExpoLidercom/assets/Imagen/Programador.jpg', info: 'Información sobre imagen 2', category: 'Imagen' },
  { id: 'img3', src: '/ExpoLidercom/assets/Seguridad/Alarma.jpg', info: 'Información sobre imagen 3', category: 'Seguridad' },
  { id: 'img4', src: '/ExpoLidercom/assets/Seguridad/Unicon.jpg', info: 'Información sobre imagen 4', category: 'Seguridad' },
  { id: 'img5', src: '/ExpoLidercom/assets/Seguridad/X28.jpg', info: 'Información sobre imagen 5', category: 'Seguridad' },
  { id: 'img6', src: '/ExpoLidercom/assets/Telecomunicaciones/Camara.jpg', info: 'Información sobre imagen 6', category: 'Telecomunicaciones' },
  { id: 'img7', src: '/ExpoLidercom/assets/Telecomunicaciones/Camara2.jpg', info: 'Información sobre imagen 7', category: 'Telecomunicaciones' },
  { id: 'img8', src: '/ExpoLidercom/assets/Telecomunicaciones/Compu.jpg', info: 'Información sobre imagen 8', category: 'Telecomunicaciones' },
  { id: 'img9', src: '/ExpoLidercom/assets/Telecomunicaciones/Startlink.jpg', info: 'Información sobre imagen 9', category: 'Telecomunicaciones' },
  { id: 'img10', src: '/ExpoLidercom/assets/Telecomunicaciones/Trabajo.jpg', info: 'Información sobre imagen 10', category: 'Telecomunicaciones' },
];

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [images, setImages] = useState([]);
  const [visibleInfo, setVisibleInfo] = useState(null);
  const touchStartTime = useRef(0);
  const touchMoved = useRef(false);

  useEffect(() => {
    if (selectedOption) {
      const filteredImages = imageData
        .filter((image) => image.category === selectedOption)
        .map((image, index) => ({
          ...image,
          position:getRandomPosition(index),
        }));
      setImages(filteredImages);
    }
  }, [selectedOption]);

  const getRandomPosition = (index) => {
    // Ajusta estos valores para controlar la dispersión
    const maxX = window.innerWidth - 250; // Ancho de la ventana menos el ancho de la imagen
    const maxY = window.innerHeight - 250; // Altura de la ventana menos algo de espacio
  
    const randomX = Math.floor(Math.random() * maxX); // Posición aleatoria en X
    const randomY = Math.floor(Math.random() * maxY); // Posición aleatoria en Y
  
    return { x: randomX, y: randomY }; // Devuelve la posición dispersa
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleDoubleClick = (id) => {
    setVisibleInfo(visibleInfo === id ? null : id);
  };

  const handleTouchStart = () => {
    touchStartTime.current = Date.now();
    touchMoved.current = false;
  };

  const handleTouchMove = () => {
    touchMoved.current = true;
  };

  const handleTouchEnd = (id) => {
    const touchDuration = Date.now() - touchStartTime.current;
    if (!touchMoved.current && touchDuration < 500) {
      // Consideramos esto como un toque simple
      setVisibleInfo((prevVisibleInfo) =>
        prevVisibleInfo === id ? null : id
      );
    }
  };

  const handleBackClick = () => {
    setSelectedOption(null);
    setVisibleInfo(null);
  };

  return (
    <div className="app">
      <div className="logo-container">
        <img src="/ExpoLidercom/assets/LogoTextoAzul.png" alt="Logo" className="logo" />
      </div>
      {!selectedOption ? (
        <div className="start-screen">
          <h1 className="start-screen-title">Pantalla de Inicio</h1>
          <div className="buttons-container">
            <button onClick={() => handleOptionClick('Telecomunicaciones')} className="option-button">Telecomunicaciones</button>
            <button onClick={() => handleOptionClick('Imagen')} className="option-button">Imagen</button>
            <button onClick={() => handleOptionClick('Seguridad')} className="option-button">Seguridad</button>
          </div>
        </div>
      ) : (
        <div className="images-container">
          <button onClick={handleBackClick} className="back-button">Volver</button>
          {images.map((image, index) => (
            <Draggable
              key={image.id}
              defaultPosition={image.position}
              bounds="parent"
            >
              <div className="image-wrapper">
                <div 
                  className={`image-box floating floating-${index % 3}`}
                  onDoubleClick={() => handleDoubleClick(image.id)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => handleTouchEnd(image.id)}
                >
                  <img src={image.src} alt={image.info} className="image" />
                </div>
                {visibleInfo === image.id && (
                  <div className="info-box">
                    <p>{image.info}</p>
                  </div>
                )}
              </div>
            </Draggable>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;