import React from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return <p>No trip data available. Please go back and plan your trip.</p>;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Trip Details</h1>
      </header>
      <main className="home-main">
        <p><strong>Start Date:</strong> {formData.startDate}</p>
        <p><strong>End Date:</strong> {formData.endDate}</p>
        <p><strong>Destinations:</strong> {formData.destinations.join(", ")}</p>
        <p><strong>Budget:</strong> ${formData.budget}</p>
        <p><strong>Preferred Weather:</strong> {formData.weather}</p>
        <p><strong>Preferred Season:</strong> {formData.season}</p>
        <p><strong>Preferences:</strong></p>
        <ul>
          {Object.entries(formData.preferences).map(([key, value]) => (
            <li key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? "Yes" : "No"}
            </li>
          ))}
        </ul>
        <p><strong>Additional Notes:</strong> {formData.additionalNotes}</p>
      </main>
    </div>
  );
};

export default Home;
