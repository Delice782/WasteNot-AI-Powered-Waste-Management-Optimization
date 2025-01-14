    import React, { useState } from "react";
import axios from "axios";

function App() {
  const [binFillLevel, setBinFillLevel] = useState("");
  const [trafficConditions, setTrafficConditions] = useState("");
  const [recommendedRoute, setRecommendedRoute] = useState("");
  const [recyclingTips, setRecyclingTips] = useState([]);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/predict_route", {
      bin_fill_level: binFillLevel,
      traffic_conditions: trafficConditions,
    });
    setRecommendedRoute(response.data.recommended_route);
  };

  const getRecyclingTips = async () => {
    const response = await axios.get("http://localhost:5000/recycling_tips");
    setRecyclingTips(response.data.tips);
  };

  return (
    <div>
      <h1>WasteNot: Smart Waste Management</h1>
      <input type="number" onChange={(e) => setBinFillLevel(e.target.value)} placeholder="Bin Fill Level" />
      <input type="number" onChange={(e) => setTrafficConditions(e.target.value)} placeholder="Traffic Conditions" />
      
      <button onClick={handleSubmit}>Predict Collection Route</button>
      <p>Recommended Route: {recommendedRoute}</p>

      <button onClick={getRecyclingTips}>Get Recycling Tips</button>
      <ul>
        {recyclingTips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
