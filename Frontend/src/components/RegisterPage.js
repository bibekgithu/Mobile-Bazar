import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '', // Phone number field (required)
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.username || !formData.email || !formData.password || !formData.phoneNumber) {
            alert('All fields, including phone number, are required.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate phone number (must be exactly 10 digits)
        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        console.log('Registration payload:', formData); // Log the payload

        try {
            // Send the registration request to the backend
            const response = await axios.post('http://localhost:8000/api/auth/register', formData);
            console.log('Registration successful:', response.data);

            // Save the token in localStorage
            localStorage.setItem('token', response.data.token);

            // Notify the user and redirect to the homepage
            alert('Registration successful! Redirecting to homepage.');
            navigate('/homepage'); // Redirect to the homepage
        } catch (error) {
            console.error('Error during registration:', error.response?.data || error.message);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Username Field */}
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                    style={styles.input}
                />
                {/* Email Field */}
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    style={styles.input}
                />
                {/* Password Field */}
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    style={styles.input}
                />
                {/* Phone Number Field */}
                <input
                    type="text"
                    placeholder="Phone Number (Required)"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    style={styles.input}
                />
                {/* Submit Button */}
                <button type="submit" style={styles.button}>
                    Register
                </button>
            </form>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '400px',
        margin: '0 auto',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default RegisterPage;