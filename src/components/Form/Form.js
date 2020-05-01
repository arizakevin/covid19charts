import React from 'react';
import './Form.css';

const Form = ({ getSearch, search, updateSearch }) => {
	return (
		<form onSubmit={getSearch} className="search-form">
	    	<input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Type any Country..."/>
	       	<button className="search-button" type="submit">Search</button>
	    </form>
	);
}

export default Form;