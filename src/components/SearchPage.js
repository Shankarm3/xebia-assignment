import React, { useState } from "react";
import axios from 'axios';
import find from 'lodash/find'
import uuid from 'react-uuid';

const SearchPage = (props) => {
    const [data, setData] = useState([]);
    const [attempt, setAttempt] = useState(1)
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    const [error, setError] = useState(false)
    let fontValue = 0.5
    const handleChange = (e) => {
        if(userInfo.username !== 'Luke Skywalker' && attempt > 15) {
            setError(true)
            return false
        }
        const searchText = e.target.value
        if(searchText && /^(\d+)$/.test(searchText)){
            axios.get(`https://swapi.dev/api/planets/${searchText}`)
            .then(function (response) {
                let tmpData = JSON.parse(JSON.stringify(data))
                if(!find(data, response["data"])) {
                    tmpData = [
                        ...data,
                        response["data"]
                    ]
                    setAttempt(attempt+1)
                }
                tmpData.sort( (a, b) => {
                    return parseFloat(a.population) - parseFloat(b.population)
                })
                setData(tmpData)
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
    return (
        <div className="search-container">
            <h1>Search Page</h1>
            <div className="col-sm-12">
                <input type="search" autoComplete="off" 
                    className="form-control" 
                    name="searchText" 
                    placeholder="Search" 
                    onChange={handleChange}
                />
                {error && 
                    <p className="error-message">Only 15 searches are allowed for user other than {userInfo.username}</p>
                }
            </div>
            <hr className="mt-5 mb-5"></hr>
            <div className="row">
                    {data && data.length > 0 &&
                        data.map(planet => {
                            fontValue += 0.08
                            return (
                                <div className="col-sm-3" key={uuid()}>
                                    <div className="card-header">
                                        <h3>{planet.name}</h3>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item" style={{fontSize: fontValue+'rem'}}>Rotation Period : {planet.rotation_period}</li>
                                        <li className="list-group-item" style={{fontSize: fontValue+'rem'}}>Orbital Period : {planet.orbital_period}</li>
                                        <li className="list-group-item" style={{fontSize: fontValue+'rem'}}>Climate : {planet.climate}</li>
                                        <li className="list-group-item" style={{fontSize: fontValue+'rem'}}>Gravity : {planet.gravity}</li>
                                        <li className="list-group-item" style={{fontSize: fontValue+'rem'}}>Terrain : {planet.terrain}</li>
                                        <li className="list-group-item" style={{fontSize: fontValue+'rem'}}>Population : {planet.population}</li>
                                    </ul>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default SearchPage
