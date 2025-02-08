// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import SellerPage from './components/SellerPage';
import BuyerPage from './components/BuyerPage';

function App() {
    return (
        <Router>
            <div style={styles.background}>
                <Routes>
                    {/* Landing Page */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Authentication Pages */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Main Pages */}
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/buyer" element={<BuyerPage />} />
                    <Route path="/seller" element={<SellerPage />} />

                    {/* Add more routes for Dashboard, Profile, etc. */}
                </Routes>
            </div>
        </Router>
    );
}

// Landing Page Component
const LandingPage = () => {
    return (
        <div style={styles.landingContainer}>
            <div style={styles.textBackground}>
                <h1 style={styles.welcomeText}>Welcome to MobileBazar</h1>
                <p style={styles.subText}>Buy and Sell Used Smartphones with Ease</p>
                <div style={styles.buttonContainer}>
                    <a href="/login" style={styles.button}>Login</a>
                    <a href="/register" style={styles.button}>Register</a>
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    background: {
        backgroundImage: "url('/image.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    landingContainer: {
        textAlign: 'center',
        width: '100%',
        maxWidth: '600px',
    },
    textBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
        padding: '40px 20px',
        borderRadius: '10px',
    },
    welcomeText: {
        fontSize: '3rem',
        marginBottom: '10px',
        color: '#fff', // White text for contrast
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    subText: {
        fontSize: '1.5rem',
        marginBottom: '30px',
        color: '#fff', // White text for contrast
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default App;