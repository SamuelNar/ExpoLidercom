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

const startScreen = [
  {
    id: "start1",
    src: "/ExpoLidercom/assets/Alarma.png",
    isTitle: false
  },
  {
    id: "start2",
    src: "/ExpoLidercom/assets/Antena.png",
    isTitle: false
  },
  {
    id: "start3",
    src: "/ExpoLidercom/assets/Domo.png",
    isTitle: false
  },
  {
    id: "start4",
    src: "/ExpoLidercom/assets/WiFi.png",
    isTitle: false
  },
  {
    id: "title",
    src: "/ExpoLidercom/assets/SomosLiderCom.png",
    isTitle: true
  }
]
const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [images, setImages] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [startImages, setStartImages] = useState([]);
  const [tick, setTick] = useState(0);
  const animationFrameRef = useRef();
  const touchTimeout = useRef(null);
  const lastTap = useRef(0);

  useEffect(() => {
    if (selectedOption) {
      const filteredImages = imageData
        .filter((image) => image.category === selectedOption)
        .map((image) => ({
          ...image,
          position: getRandomPosition(),
        }));
      setImages(filteredImages);
    } else {
      const positionedStartImages = startScreen.map(img => ({
        ...img,
        position: getRandomPosition(),
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
      }));
      setStartImages(positionedStartImages);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [selectedOption, flippedCards]);

  const getRandomPosition = () => {
    const maxX = window.innerWidth - 150; // Ajusta el tamaño según tus imágenes
    const maxY = window.innerHeight - 150; // Ajusta el tamaño según tus imágenes

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
  useEffect(() => {
    const animateImages = () => {
      setStartImages(prevImages =>
        prevImages.map(img => {
          let newX = img.position.x + img.velocity.x;
          let newY = img.position.y + img.velocity.y;
  
          // Rebote en los bordes
          if (newX <= 0 || newX >= window.innerWidth - 150) {
            img.velocity.x *= -1;
          }
          if (newY <= 0 || newY >= window.innerHeight - 150) {
            img.velocity.y *= -1;
          }
  
          return {
            ...img,
            position: {
              x: newX,
              y: newY
            }
          };
        })
      );
  
      setTick(prevTick => prevTick + 1); // Forzar el re-renderizado
  
      animationFrameRef.current = requestAnimationFrame(animateImages);
    };
  
    animateImages();
  
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  

  useEffect(() => {
    const handleTouchStart = () => {
      // Esto puede ayudar a asegurar que la animación siga corriendo en pantallas táctiles.
    };
  
    window.addEventListener('touchstart', handleTouchStart);
  
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  
  
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
          {startImages.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={`Start Image ${image.id}`}
              className={`start-image animate__animated animate__backInUp ${image.isTitle ? "title-image" : ""}`}
              style={{
                left: `${image.position.x}px`,
                top: `${image.position.y}px`,
              }}
            />
          ))}
          <div className="buttons-container">
            <button onClick={() => handleOptionClick("Telecomunicaciones")} className="option-button">
              Telecomunicaciones
            </button>
            <button onClick={() => handleOptionClick("Imagen")} className="option-button">
              Imagen
            </button>
            <button onClick={() => handleOptionClick("Seguridad")} className="option-button">
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