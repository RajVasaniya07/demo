import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link,useNavigate } from "react-router-dom";

const Main = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    destinations: [""], // Initialize with one empty city input
    budget: "",
    weather: "",
    season: "",
    preferences: {
      adventure: false,
      relaxation: false,
      culture: false,
      nature: false,
    },
    additionalNotes: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate();

  // Get current date
  const currentDate = new Date().toISOString().split("T")[0];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "destination" && value.length > 2) {
      fetchDestinationSuggestions(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      preferences: { ...formData.preferences, [name]: checked },
    });
  };

  const fetchDestinationSuggestions = async (query) => {
    setLoadingSuggestions(true);
    try {
      // Replace with a real API endpoint
      const response = await fetch(
        `https://api.example.com/destinations?query=${query}`
      );
      const data = await response.json();
      setSuggestions(data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
    setLoadingSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation Check: Ensure all fields are filled
    const isValid = validateForm();
    if (!isValid) {
      alert("Please fill out all the fields.");
      return;
    }
    navigate("/gendata", { state: { formData } });

    const days = calculateDays(formData.startDate, formData.endDate);
    console.log("Form Data Submitted:", formData);
    console.log(`Number of days between trip: ${days}`);
  };

  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...formData.destinations];
    updatedDestinations[index] = value;
    setFormData({ ...formData, destinations: updatedDestinations });
  };

  const addDestination = () => {
    setFormData({ ...formData, destinations: [...formData.destinations, ""] });
  };

  const removeDestination = (index) => {
    const updatedDestinations = formData.destinations.filter((_, i) => i !== index);
    setFormData({ ...formData, destinations: updatedDestinations });
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMilliseconds = end - start;
    const days = differenceInMilliseconds / (1000 * 3600 * 24);
    return Math.floor(days); // Round down to get full days
  };

  // Validation function
  const validateForm = () => {
    const { startDate, endDate, destinations, budget, weather, season, additionalNotes } = formData;

    // Check if any essential field is empty
    if (!startDate || !endDate || !budget || !weather || !season || destinations.some(dest => !dest) || !additionalNotes) {
      return false;
    }

    // Check if start date and end date are valid
    if (new Date(startDate) < new Date(currentDate)) {
      alert("Start date cannot be in the past.");
      return false;
    }
    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be earlier than start date.");
      return false;
    }

    return true;
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>FinancePlanner</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.form_container}>
        <h2>Plan Your Trip</h2>
        <form className={styles.trip_form} onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="startDate">Trip Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              min={currentDate} // Start date cannot be before today
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="endDate">Trip End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              min={formData.startDate} // End date cannot be before the start date
            />
          </div>

          <div className={styles.form_group}>
            <label>Destinations</label>
            {formData.destinations.map((destination, index) => (
              <div key={index} className={styles.destination_input_group}>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => handleDestinationChange(index, e.target.value)}
                  placeholder={`Enter destination ${index + 1}`}
                  required
                />
                {formData.destinations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDestination(index)}
                    className={styles.remove_btn}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addDestination} className={styles.add_btn}>
              Add Another Destination
            </button>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="budget">Budget (in USD)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter your budget"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="weather">Preferred Weather</label>
            <select
              id="weather"
              name="weather"
              value={formData.weather}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Weather</option>
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
              <option value="cold">Cold</option>
              <option value="moderate">Moderate</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="season">Preferred Season</label>
            <select
              id="season"
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Season</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label>Preferences</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="adventure"
                  checked={formData.preferences.adventure}
                  onChange={handleCheckboxChange}
                />
                Adventure
              </label>
              <label>
                <input
                  type="checkbox"
                  name="relaxation"
                  checked={formData.preferences.relaxation}
                  onChange={handleCheckboxChange}
                />
                Relaxation
              </label>
              <label>
                <input
                  type="checkbox"
                  name="culture"
                  checked={formData.preferences.culture}
                  onChange={handleCheckboxChange}
                />
                Culture
              </label>
              <label>
                <input
                  type="checkbox"
                  name="nature"
                  checked={formData.preferences.nature}
                  onChange={handleCheckboxChange}
                />
                Nature
              </label>
            </div>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Add any additional details here"
              required
            />
          </div>
          
            <button className={styles.submit_btn} type="submit">
              Plan My Trip
            </button>
        </form>
      </div>
    </div>
  );
};

export default Main;
