import React, { useState, useEffect } from 'react';
import Particles from 'react-particles-js';
import BarChart from './components/Charts/BarChart';
import LineChart from './components/Charts/LineChart';
import PieChart from './components/Charts/PieChart';
import Form from './components/Form/Form';
import Icon from './components/Icon/Icon';
import BottomInfo from './components/BottomInfo/BottomInfo';
import Loading from './components/Loading/Loading';
import {Animated} from "react-animated-css";
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

export default function App () {
	const [global, setGlobal] = useState([]);
	const [countries, setCountries] = useState([]);
	const [date, setDate] = useState([]);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');	
	const [filteredCountryData, setFilteredCountryData] = useState([]);	
	const [cleanedCountryData, setCleanedCountryData] = useState([]);
    const [countryDataDayOne, setCountryDataDayOne] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
		getData();
	}, []); 

	useEffect( () => {
        setError(false);
		//console.log('Query: ', query);
        getCountryDataDayOne();
        formatData();
	}, [query]);

	const getData = () => {
		fetch('https://api.covid19api.com/summary')
  	     	.then(response =>  response.json())
  	     	.then(data => {
  	     		//console.log('COUNTRIES: ', data.Countries);
  	     		setGlobal(Object.entries(data.Global)
  	  				.map((elt) => {
  	  					return (
  	  						{
  	  							label: elt[0],
  	  							value: elt[1]
  	  						}
  	  					)
  	  				})
  	  			)
  	     		setCountries(Object.entries(data.Countries)
  	  				.map((elt) => {
  	  					return (
  	  						Object.entries(elt[1])
  	  						.map((elt2) => {
  	  							return (
  	  								{
  	  									label: elt2[0],
  	  									value: elt2[1]
  	  								}
  	  							)
  	  						})
  	  					);
  	  				})
  	  			);
  	  			setDate(data.Date.split('T')[0]);
                setLoading(false);
  	     	})
  	     	.catch(error => {
                console.log('Unable to fetch data: ', error);
                setError(true);
            })
	}

    const getCountryDataDayOne = () => {
        if (query !== '') {
            setLoading(true);
            fetch(`https://api.covid19api.com/dayone/country/${query}`)
            .then(response =>  response.json())
            .then(data => {
                return (
                    data.map((elt) => {
                        return (
                            Object.entries(elt).map((elt2) => {
                                return (
                                    {
                                        label: elt2[0],
                                        value: elt2[1] 
                                    }
                                ) 
                            })   
                        )
                    })
                ) 
            })
            .then(result => { 
                setCountryDataDayOne(
                    result.map(elt => {
                        return (
                            elt.filter(elt2 => {
                                return elt2.label === "Date" || elt2.label === "Confirmed"
                            })
                        ) 
                    })
                ) 
                setLoading(false);
            })
            .catch(error => {
                console.log('Unable to fetch country data: ', error);
                setError(true);
            })   
        }   
    }

    const formatData = () => {
        const filteredCountryData = countries.filter(elt => {
            return elt[0].value.toLowerCase().includes(query.toLowerCase());
        })
        setFilteredCountryData(filteredCountryData);
        const cleanedCountryData = filteredCountryData.map((elt) => {
            //console.log('Country: ',elt)
            return (
              elt.filter((elt2) => {
                return !isNaN(elt2.value);
              })
            );  
        });
        setCleanedCountryData(cleanedCountryData[0]);
    }   

    const updateSearch = event => {
        setSearch(event.target.value);
    }

    const getSearch = event => {
        event.preventDefault();
        if (search !== ''){
            setQuery(search);
            setSearch("");
        }
    }

	return (
		<div className='App'>
            <Animated animationIn="fadeIn" 
                animationOut="fadeOut" 
                isVisible={true} 
                animationOutDelay={2000}
                animationInDuration={2000}
            >
            <Particles className='particles'
              params={particlesOptions}
            />
            <Icon />
			<h1 className='f1'>Covid-19 Charts</h1>
            <h5>Last Update: {date}</h5>
  	  		<Form getSearch={getSearch} search={search} updateSearch={updateSearch} />
            <h3 className='tc'>Search any country to get confirmed cases since day one</h3>
            </Animated>
  	  		{   
                global.length === 0
  	  			    ?   
                        error
                            ?  
                                <div>
                                    <h3>
                                        ...Couldn't get the data :( Try refreshing the page in a while...
                                    </h3>
                                </div>
                            : (
                                <div className='Loading'>
                                    <Loading/>
                                </div>
                            )
  	  			    : (
  	  				    filteredCountryData.length === 0 && query === ''
  	  				        ?   
                                <Animated animationIn="bounceInUp" 
                                            animationOut="fadeOut" 
                                            isVisible={true} 
                                            animationOutDelay={2000}
                                            animationInDuration={2000}
                                >
                                    <div>
  	  						            <div className="main chart-wrapper">
  	   						        	    <BarChart
  	   						        	   	   data={global}
  	   						        	   	   title="Global"
  	   						        	       color="rgba(34,206,206,0.2)"
  	   						        	    />
  	   						            </div>	  
  	   						            <div className="main chart-wrapper">
  	   						                <PieChart
  	   						          	 	   data={global}
  	   						                />
  	   						            </div>
  	  				               </div>
                                </Animated>
  	  				        : ( 
                                (countryDataDayOne.length === 0 || filteredCountryData.length === 0) && query !== ''
                                    ? 
                                    error
                                        ?  
                                            <div>
                                                <h1 className='tc'>Bad Request</h1>
                                            </div>
                                        : (
                                            <div className='Loading'>
                                                <Loading/>
                                            </div>
                                        )
                                    : (
                                        loading
                                        ?
                                            <div className='Loading'>
                                                <Loading/>
                                            </div>
                                        :(
                                            <Animated animationIn="bounceInUp" 
                                                        animationOut="fadeOut" 
                                                        isVisible={true} 
                                                        animationOutDelay={2000}
                                                        animationInDuration={2000}
                                            >
                                                <div>
                                                    <div className="main chart-wrapper">
                                                      <LineChart
                                                        data={countryDataDayOne}
                                                        title={filteredCountryData[0][0].value + " Since Day One"}
                                                      />
                                                    </div>
                                                    <div className="main chart-wrapper">
                                                        <BarChart
                                                            data={cleanedCountryData}
                                                            title={filteredCountryData[0][0].value}
                                                        />
                                                    </div>    
                                                    <div className="main chart-wrapper">
                                                        <PieChart
                                                        data={cleanedCountryData}
                                                    />
                                                    </div>
                                                </div>
                                            </Animated>
                                        )
                                    )   
  	  				        )
                    )
  	  		}
            <BottomInfo/>	
  	    </div>
	);
}
  	 
/*   
let testArray = [
	{label: "Country", value: "Colombia"},
	{label: "CountryCode", value: "CO"},
	{label: "Slug", value: "colombia"},
	{label: "NewConfirmed", value: 205},
	{label: "TotalConfirmed", value: 4561},
	{label: "NewDeaths", value: 9},
	{label: "TotalDeaths", value: 215},
	{label: "NewRecovered", value: 57},
	{label: "TotalRecovered", value: 927},
	{label: "Date", value: "2020-04-24T23:11:35Z"}
]
*/