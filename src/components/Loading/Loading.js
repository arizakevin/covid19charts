import React from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import {Animated} from "react-animated-css";

const Loading = () => {
	return (
		<Animated animationIn="fadeIn" 
                animationOut="fadeOut" 
                isVisible={true} 
                animationOutDelay={2000}
                animationInDuration={2000}
    	>
			<LoopCircleLoading/>
		</Animated>
	);
}

export default Loading;