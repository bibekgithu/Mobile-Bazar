// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import './HomePage.css'; // Ensure you have a corresponding CSS file for styling

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Navigate to the Buyer page
  const handleBuyerClick = () => {
    navigate("/buyer"); // Navigate to the Buyer route
  };

  // Navigate to the Seller page
  const handleSellerClick = () => {
    navigate("/seller"); // Navigate to the Seller route
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>MobileBazar</h1>
        <p>Buy and Sell Used Mobile Phones</p>
      </header>
      <div className="role-selection-container">
        <h2>Welcome to MobileBazar</h2>
        <p>Select your role to get started:</p>
        <div className="role-buttons">
          <button onClick={handleBuyerClick} className="role-button buyer-btn">
            Buyer
          </button>
          <button onClick={handleSellerClick} className="role-button seller-btn">
            Seller
          </button>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 MobileBazar. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;