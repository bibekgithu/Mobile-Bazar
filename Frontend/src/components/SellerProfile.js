// src/components/SellerProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerProfile = ({ sellerId }) => {
  const [seller, setSeller] = useState(null); // State to store seller data
  const [feedbacks, setFeedbacks] = useState([]); // State to store feedbacks

  // Fetch seller profile and feedback data
  useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      // Fetch seller profile
      const sellerRes = await axios.get(`/api/sellers/${sellerId}/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSeller(sellerRes.data);

      // Fetch feedbacks for the seller
      const feedbackRes = await axios.get(`/api/sellers/${sellerId}/feedbacks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFeedbacks(feedbackRes.data);
    } catch (error) {
      console.error('Error fetching seller data:', error);
    }
  };

  if (!seller) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Seller Profile</h2>

      {/* Seller Details */}
      <div style={styles.section}>
        <h3>Seller Information</h3>
        <p><strong>Name:</strong> {seller.username}</p>
        <p><strong>Email:</strong> {seller.email}</p>
        <p><strong>Phone Number:</strong> {seller.phoneNumber || 'Not provided'}</p>
        <p><strong>Ratings:</strong> {seller.rating ? `${seller.rating}/5` : 'No ratings yet'}</p>
      </div>

      {/* Feedback Section */}
      <div style={styles.section}>
        <h3>Feedback from Buyers</h3>
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <ul>
            {feedbacks.map((feedback) => (
              <li key={feedback._id} style={styles.feedbackItem}>
                <p><strong>Rating:</strong> {feedback.rating}/5</p>
                <p><strong>Comment:</strong> {feedback.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  section: {
    margin: '20px 0',
  },
  feedbackItem: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
  },
};

export default SellerProfile;