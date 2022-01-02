import React, { useState } from 'react'
import { checkForURL } from '../js/urlChecker.js';
import  searchImg  from '../images/Icons_Search.png'

const Home = () => {
    const [returnedData, setReturnedData] = useState({});
    const [getting, setGetting] = useState(false);
    const [url, setUrl] = useState("");


    const onChange = (e) => {
        setUrl(e.target.value);
        setGetting(false);
        setReturnedData(null)
    }
    const validUrl = checkForURL(url);

    const onSubmit = (e)=>{
        e.preventDefault();

        if (validUrl){

            setGetting(true);
            fetch("http://localhost:5001/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status.code === "212") {
                    return alert(data.status.msg)
                }
                setReturnedData(data);
                setGetting(false);

                console.log(returnedData);
            });
        }else {
            alert('Please Write a Valid Url')
        }
    }

    return (
        <div className="home">
            <form onSubmit={onSubmit}>
                <div className="" ><h2>Welcome to NLP</h2></div>
                <label htmlFor='url'></label>
                <input 
                    type="text" 
                    placeholder="Enter a valid url" 
                    className="" 
                    id="url"
                    onChange= {onChange}
                    />
                <button><img src={searchImg} alt = ""/></button>
            </form>
            <div className="results">
                <h4>Results</h4>
                {returnedData? 
                    <div>
                    {Object.entries(returnedData)
                        .filter(([key, value]) => key !== "status" && value.code !== "0")
                        .map(([key, value]) => {
                            return (
                                <div key={key} className="dataCard">
                                    <div className = "dataRaw">
                                        <p>{key}</p>
                                    </div>
                                    <p>{value}</p>
                                </div>
                            );
                        })}
                </div>
                :
                ''
                }
                {getting?
                    <div>
                        <h4>Loading...</h4>
                    </div>
                :
                ''    
                }
                
            </div>
        </div>
    )
}

export default Home
