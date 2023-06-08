import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './styles.css';
import './tablero.css';

import img from '../assets/img/pisos.jpg';

const Ascensor = () => {
  const floorHeight = 180;
  const [currentFloor, setCurrentFloor] = useState(1);
  const [targetFloor, setTargetFloor] = useState(1); 

  useEffect(() => {
    const elevatorInterval = setInterval(() => {
      if (currentFloor < targetFloor) {
        setCurrentFloor(currentFloor + 1);
      } else if (currentFloor > targetFloor) {
        setCurrentFloor(currentFloor - 1);
      }
      
    }, 1000);
    return () => clearInterval(elevatorInterval);
  }, [currentFloor, targetFloor]);

  const handleFloorButtonClick = (floor) => {
    setTargetFloor(floor);
  };

  const springProps = useSpring({
    transform: `translateY(-${(currentFloor - 1) * floorHeight}px)`
  });

  return (
    <>
    <section>
      <div className='containerImg'>
         <img src={img}/>
      </div>
      <div className="elevator-container">
        <animated.div className="elevator" style={springProps} />
        <animated.div className="ContadorPiso" style={springProps}> <p>Piso actual: {currentFloor}</p></animated.div>
      </div>  
      <div className='container_tittle'>
        <p>Ingrese el Piso:</p>
      </div>
      <div className="board">  
        {[1, 2, 3, 4].map((number) => (
          <button
            key={number}
            className="number"
            onClick={() => {
              handleFloorButtonClick(number);  
            }}
          >
            {number}
          </button>
        ))}  
        </div>
    </section>
    </>
  );
};

export default Ascensor;
