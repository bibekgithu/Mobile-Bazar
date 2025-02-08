// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // State for seller's profile

  // Fetch seller's profile when the page loads
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/seller/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to load profile');
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Profile</h2>
      <div style={styles.section}>
        <p><strong>Name:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone Number:</strong> {profile.phoneNumber || 'Not provided'}</p>
        <p><strong>Ratings:</strong> {profile.rating ? `${profile.rating}/5` : 'No ratings yet'}</p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9', // Light gray background
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  section: {
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#fff', // White background for sections
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default ProfilePage;