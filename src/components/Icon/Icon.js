import React from 'react';
import Tilt from 'react-tilt';
import doctor from './doctor.png';
import {Animated} from "react-animated-css";
import './Icon.css';

const Icon = () => {
  return (
  	<Animated animationIn="bounceInDown" 
                animationOut="fadeOut" 
                isVisible={true} 
                animationOutDelay={2000}
                animationInDuration={2000}
    >
    	<div className='ma4 mt0 center'>
    	  <Tilt className="Tilt br2 shadow-2 center " options={{ max : 55 }}>
    	    <div className="Tilt-inner pb2">
    	      <img className="img" alt='logo' src={doctor}/>
    	    </div>
    	  </Tilt>
    	</div>
    </Animated>
  );
}

export default Icon;