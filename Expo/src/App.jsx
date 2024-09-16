import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import "animate.css";
import "./App.css";

const imageData = [
  {
    id: "img1",
    src: "/ExpoLidercom/assets/Imagen/Intersec.jpeg",
    info: "Información sobre imagen 1",
    category: "Imagen",
  },
  {
    id: "img2",
    src: "/ExpoLidercom/assets/Imagen/Programador.jpg",
    info: "Información sobre imagen 2",
    category: "Imagen",
  },
  {
    id: "img3",
    src: "/ExpoLidercom/assets/Seguridad/Alarma.jpg",
    info: "Información sobre imagen 3",
    category: "Seguridad",
  },
  {
    id: "img4",
    src: "/ExpoLidercom/assets/Seguridad/Unicon.jpg",
    info: "Información sobre imagen 4",
    category: "Seguridad",
  },
  {
    id: "img5",
    src: "/ExpoLidercom/assets/Seguridad/X28.jpg",
    info: "Información sobre imagen 5",
    category: "Seguridad",
  },
  {
    id: "img6",
    src: "/ExpoLidercom/assets/Telecomunicaciones/Camara.jpg",
    info: "Información sobre imagen 6",
    category: "Telecomunicaciones",
  },
  {
    id: "img7",
    src: "/ExpoLidercom/assets/Telecomunicaciones/Camara2.jpg",
    info: "Información sobre imagen 7",
    category: "Telecomunicaciones",
  },
  {
    id: "img8",
    src: "/ExpoLidercom/assets/Telecomunicaciones/Compu.jpg",
    info: "Información sobre imagen 8",
    category: "Telecomunicaciones",
  },
  {
    id: "img9",
    src: "/ExpoLidercom/assets/Telecomunicaciones/Startlink.jpg",
    info: "Información sobre imagen 9",
    category: "Telecomunicaciones",
  },
  {
    id: "img10",
    src: "/ExpoLidercom/assets/Telecomunicaciones/Trabajo.jpg",
    info: "Información sobre imagen 10",
    category: "Telecomunicaciones",
  },
  {
    id: "img11",
    src: "/ExpoLidercom/assets/Imagen/Cat.gif",
    info: "Información sobre imagen 11",
    category: "Imagen",
  },
];

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [images, setImages] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const touchTimeout = useRef(null);
  const lastTap = useRef(0);
  const touchStartTime = useRef(0);
  const touchMoved = useRef(false);

  useEffect(() => {
    if (selectedOption) {
      const filteredImages = imageData
        .filter((image) => image.category === selectedOption)
        .map((image) => ({
          ...image,
          position: getRandomPosition(),
        }));
      setImages(filteredImages);
    }
    console.log("Estado flippedCards actualizado:", flippedCards);
  }, [selectedOption, flippedCards]);

  const getRandomPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    return { x: randomX, y: randomY };
  };

  const handleFlip = (id) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Alterna el estado de la imagen actual
    }));
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleDoubleClick = (id) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Alterna el estado de la imagen actual
    }));
  };

  const handleTouchStart = (id, e) => {
    e.preventDefault(); // Previene el comportamiento por defecto
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Doble toque detectado
      handleFlip(id);
      clearTimeout(touchTimeout.current);
    } else {
      touchTimeout.current = setTimeout(() => {
        // Toque simple (para arrastrar)
      }, DOUBLE_TAP_DELAY);
    }
    
    lastTap.current = now;
  };

  const handleTouchMove = () => {
    touchMoved.current = true;
  };

  const handleTouchEnd = (id) => {
    const touchDuration = Date.now() - touchStartTime.current;
    if (!touchMoved.current && touchDuration < 500) {
      console.log(`Touched image with id: ${id}`);
      handleFlip(id);
    }
  };

  const handleBackClick = () => {
    setSelectedOption(null);
    setFlippedCards({});
  };

  return (
    <div className="app">
      <div className="logo-container">
        <img
          src="/ExpoLidercom/assets/LogoTextoAzul.png"
          alt="Logo"
          className="logo"
        />
      </div>
      {!selectedOption ? (
        <div className="start-screen">
          <h1 className="start-screen-title">Pantalla de Inicio</h1>
          <div className="buttons-container">
            <button
              onClick={() => handleOptionClick("Telecomunicaciones")}
              className="option-button"
            >
              Telecomunicaciones
            </button>
            <button
              onClick={() => handleOptionClick("Imagen")}
              className="option-button"
            >
              Imagen
            </button>
            <button
              onClick={() => handleOptionClick("Seguridad")}
              className="option-button"
            >
              Seguridad
            </button>
          </div>
        </div>
      ) : (
        <div className="images-container">
          <button onClick={handleBackClick} className="back-button">
            Volver
          </button>
          {images.map((image) => (
            <Draggable
              key={image.id}
              defaultPosition={image.position}
              bounds="parent"
            >
              <div 
                className={`image-wrapper`}
                onDoubleClick={() => handleDoubleClick(image.id)}
                onTouchStart={(e) => handleTouchStart(image.id, e)}          
              >
                <div
                  className={`image-box ${flippedCards[image.id] ? "flipped" : ""}`}
                >
                  <div className="image-content">
                    <img src={image.src} alt={image.info} className="image animate__animated animate__backInUp" />
                    <div className="info-box">
                      <p>{image.info}</p>
                    </div>
                  </div>
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
