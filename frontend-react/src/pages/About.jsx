
import React from "react";

export default function About() {
  return (
    <div className="page page-about">
      <h1>About this project</h1>
      <p>This project demonstrates HTML/CSS/JS, React, REST API and a Flask ML microservice.</p>
      <p>
          The system predicts AC power output of a solar plant based on key parameters like 
          irradiance, temperature, previous hour/day power, and rolling averages. The prediction 
          is performed by a Machine Learning model (Random Forest Regressor) deployed using Flask.
        </p>
    </div>
  );
}