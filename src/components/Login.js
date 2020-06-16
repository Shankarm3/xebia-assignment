import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    const [userInfo, setUserinfo] = useState({
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        setUserinfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSumbit = () => {
        axios.get('https://swapi.dev/api/people/1/')
        .then(function (response) {
            if(response && response.data) {
                const {name, birth_year} = response.data
                if(name === userInfo.username && birth_year === userInfo.password){
                    sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
                    history.push('/search')
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    return (
        <div className="login-wrapper">
        <div className="login-inner">
        <form>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>User name</label>
                <input type="text" autoComplete="off" 
                    className="form-control" 
                    name="username" 
                    placeholder="Enter user name" 
                    value={userInfo.username} 
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" 
                    className="form-control" 
                    name="password" 
                    placeholder="Enter password" 
                    value={userInfo.password} onChange={handleChange}
                />
            </div>

            <button type="button" className="btn btn-primary btn-block" onClick={handleSumbit}>Submit</button>
        </form>
        </div>
      </div>
    )
}

export default Login