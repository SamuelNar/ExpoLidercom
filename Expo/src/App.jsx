import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './App.css';
// Asumimos que tienes estas imágenes en tu directorio src/assets
import imagen1 from './assets/logo-certisur.png';
import imagen2 from './assets/logo-geotrust.png';
import imagen3 from './assets/logo-header.png';

const imageData = [
  { id: 'img1', src: imagen1, info: 'Información sobre imagen 1' },
  { id: 'img2', src: imagen2, info: 'Información sobre imagen 2' },
  { id: 'img3', src: imagen3, info: 'Información sobre imagen 3' },
];

const getRandomPosition = (maxWidth, maxHeight) => ({
  x: Math.random() * (maxWidth - 100), // Ajusta el tamaño de la imagen según sea necesario
  y: Math.random() * (maxHeight - 100), // Ajusta el tamaño de la imagen según sea necesario
});

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [images, setImages] = useState([]);
  const [showInfo, setShowInfo] = useState({}); // Para manejar el estado de la información de las imágenes

  useEffect(() => {
    if (selectedOption) {
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;
      const positionedImages = imageData.map((image) => ({
        ...image,
        position: getRandomPosition(maxWidth, maxHeight),
      }));
      setImages(positionedImages);
    }
  }, [selectedOption]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleDoubleClick = (id) => {
    setShowInfo((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="app">
      {!selectedOption ? (
        <div className="start-screen">
          <h1 className="start-screen-title">Pantalla de Inicio</h1>
          <div className="buttons-container">
            <button onClick={() => handleOptionClick('opcion1')} className="option-button">Opción 1</button>
            <button onClick={() => handleOptionClick('opcion2')} className="option-button">Opción 2</button>
            <button onClick={() => handleOptionClick('opcion3')} className="option-button">Opción 3</button>
          </div>
        </div>
      ) : (
        <div className="images-container">
          {images.map((image) => (
            <Draggable key={image.id} defaultPosition={image.position}>
              <div
                className="image-box"
                onDoubleClick={() => handleDoubleClick(image.id)}
              >
                <img src={image.src} alt={image.info} className="image" />
                <div className={`image-info ${showInfo[image.id] ? 'visible' : 'hidden'}`}>
                  {image.info}
                </div>
              </div>
            </Draggable>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
