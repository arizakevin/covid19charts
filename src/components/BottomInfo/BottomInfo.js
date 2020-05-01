import React from 'react';
import './BottomInfo.css';

export default class BottomInfo extends React.Component {
	constructor() {
    	super();
    	this.state = {
    	  show: false,
    	  scrollPos: 0
    	};
  	}
  	componentDidMount() {
      setTimeout(() => {
        window.addEventListener("scroll", this.handleScroll); 
      }
      , 2000);
  	}
  	componentWillUnmount() {
  	  window.removeEventListener("scroll", this.handleScroll);
  	}
  	handleScroll = () => {
  	  //console.log(document.body.getBoundingClientRect());
  	  this.setState({
  	    scrollPos: document.body.getBoundingClientRect().top,
  	    show: document.body.getBoundingClientRect().top < this.state.scrollPos
  	  });
  	};

	render() {
		return (
			<nav className={this.state.show ? "active navbar" : "hidden navbar"}>
  				<p className="navtext1">Developed by 
					<a className="navtext2"
            href='https://www.linkedin.com/in/kevinwarizas/' 
             target="_blank" 
             rel="noopener noreferrer"
          > 
            Kevin Ariza
            <i className="fa fa-linkedin-square fa-lg" aria-hidden="true"></i>
          </a>
				</p>
			</nav>
		);
	}
}