import React from "react";
import "./CSS/Title.css";  
import CodecademyLogo from "../Images/codecademy-logo1.png";
import RedditLogo from "../Images/Reddit-logo.webp";

const Title = () => {
  return (
    <div className="icons">
      <a href="https://www.codecademy.com" target="_blank" rel="noopener noreferrer">
        <img className="Codecademy-logo" src={CodecademyLogo} alt="Codecademy logo"/>
      </a>
      <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer">
        <img className="Reddit-logo" src={RedditLogo} alt="Reddit logo"/>
      </a>
    </div>
  );
};

export default Title;
