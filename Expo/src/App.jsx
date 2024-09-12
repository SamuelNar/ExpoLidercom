import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './App.css';

// Asegúrate de que las rutas de las imágenes sean correctas
import imagen1 from './assets/logo-certisur.png';
import imagen2 from './assets/logo-geotrust.png';
import imagen3 from './assets/logo-header.png';

const imageData = [
  { id: 'img1', src: imagen1, info: 'Información sobre imagen 1' },
  { id: 'img2', src: imagen2, info: 'Información sobre imagen 2' },
  { id: 'img3', src: imagen3, info: 'Información sobre imagen 3' },
];

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (selectedOption) {
      const positionedImages = imageData.map((image, index) => ({
        ...image,
        position: { x: 100 + index * 120, y: 100 },
      }));
      setImages(positionedImages);
    }
  }, [selectedOption]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
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
          {images.map((image, index) => (
            <Draggable
              key={image.id}
              defaultPosition={image.position}
              bounds="parent"
            >
              <div className="image-wrapper">
                <div className={`image-box floating floating-${index % 3}`}>
                  <img src={image.src} alt={image.info} className="image" />
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