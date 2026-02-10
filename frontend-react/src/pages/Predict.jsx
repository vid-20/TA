import React from "react";
import PredictionForm from "../components/PredictionForm";
import "../styles/page.css";

export default function Predict({ setPrediction, prediction }) {

  return (
    <div className="page page-predict">
      <div className="predict-container">
        <div className="left">
          <div className="card">
            <h2>Enter Solar Plant Data</h2>
            <PredictionForm setPrediction={setPrediction} />
          </div>
        </div>

        <div className="right">
          <div className="card prediction-result">
            <h3>Estimated AC Power Output</h3>
            <div className="result-box">
              {prediction ? `${prediction} kW` : "No prediction yet"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
