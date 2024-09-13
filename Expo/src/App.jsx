import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './App.css';

const imageData = [
  { id: 'img1', src: '/assets/Imagen/Intersec.jpeg', info: 'Información sobre imagen 1', category: 'Imagen' },
  { id: 'img2', src: '/assets/Imagen/Programador.jpg', info: 'Información sobre imagen 2', category: 'Imagen' },
  { id: 'img3', src: '/assets/Seguridad/Alarma.jpg', info: 'Información sobre imagen 3', category: 'Seguridad' },
  { id: 'img4', src: '/assets/Seguridad/Unicon.jpg', info: 'Información sobre imagen 4', category: 'Seguridad' },
  { id: 'img5', src: '/assets/Seguridad/X28.jpg', info: 'Información sobre imagen 5', category: 'Seguridad' },
  { id: 'img6', src: '/assets/Telecomunicaciones/Camara.jpg', info: 'Información sobre imagen 6', category: 'Telecomunicaciones' },
  { id: 'img7', src: '/assets/Telecomunicaciones/Camara2.jpg', info: 'Información sobre imagen 7', category: 'Telecomunicaciones' },
  { id: 'img8', src: '/assets/Telecomunicaciones/Compu.jpg', info: 'Información sobre imagen 8', category: 'Telecomunicaciones' },
  { id: 'img9', src: '/assets/Telecomunicaciones/Startlink.jpg', info: 'Información sobre imagen 9', category: 'Telecomunicaciones' },
  { id: 'img10', src: '/assets/Telecomunicaciones/Trabajo.jpg', info: 'Información sobre imagen 10', category: 'Telecomunicaciones' },
];

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [images, setImages] = useState([]);
  const [visibleInfo, setVisibleInfo] = useState(null);

  useEffect(() => {
    if (selectedOption) {
      const filteredImages = imageData
        .filter((image) => image.category === selectedOption)
        .map((image, index) => ({
          ...image,
          position: { x: 100 + index * 120, y: 100 },
        }));
      setImages(filteredImages);
    }
  }, [selectedOption]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleDoubleClick = (id) => {
    setVisibleInfo(visibleInfo === id ? null : id);
  };

  const handleBackClick = () => {
    setSelectedOption(null);
    setVisibleInfo(null); // Restablecer la información visible
  };

  return (
    <div className="app">
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
