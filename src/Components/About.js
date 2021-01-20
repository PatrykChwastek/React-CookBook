import React from 'react';
import "./About.css";
import {Link} from "react-router-dom";

const About = () => { 

    return (
        <div className="AboutContainer p-5">
       <div className="card">
         <div className="card-body">
           <h5 className="card-title">About App...</h5>
           <p className="card-text text-justify">
                This simple demo is used to search and view recipes served from an external API. 
                The API I used is the free version of
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://developer.edamam.com/"
                    className="card-link pl-1 pr-1"> 
                    Edamam.com
                </a> 
                Recipe Search API. The free version has some limitations, 
                one of which is the request limit of 5 per minute. 
                Therefore, sometimes the application can cause problems, then just wait a while.
           </p>          
           <h5 className="card-title">Technologies used:</h5> 
           <div className="row">
                <ul>
                    <li>
                        React
                    </li>
                    <li>
                        Bootstrap
                    </li>
                </ul>
           </div>
           <hr className="bg-white mt-2"></hr>            
                Project available on
                <a
                        href="https://github.com/PatrykChwastek/React-CookBook"
                        className="card-link pl-1"
                        target="_blank"
                        rel="noopener noreferrer">
                        GitHub
                </ a>
                <Link to={`/list`}>
                    <button className="btn btn-primary" type="button">Go to app</button>
                </Link>     
         </div>
       </div>
        </div>
    );
}
export default About