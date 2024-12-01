import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/homePhotos/img5.webp";
import "../styles/Home.css";
import WhyChooseUs from "../components/WhyChooseUs"; // Importimi i komponentit

function Home() {
  return (
    <div>
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer">
          <h1> AutoSallon Luxury </h1>
          <p> YOUR JOURNEY STARTS HERE </p>
          <Link to="/menu">
            <button> DISCOVER NOW </button>
          </Link>
        </div>
      </div>
      <WhyChooseUs /> {/* Përdorimi i komponentit të ri */}
    </div>
  );
}

export default Home;

