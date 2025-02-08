// src/components/SellerPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const SellerPage = () => {
  const [products, setProducts] = useState([]); // State for seller's products
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' }); // State for adding new product
  const [sellerProfile, setSellerProfile] = useState(null); // State for seller's profile
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [showNotifications, setShowNotifications] = useState(false); // State for toggling notifications dropdown
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch seller's data when the page loads
  useEffect(() => {
    fetchSellerData();
    fetchNotifications();
  }, []);

  // Fetch seller's products and profile
  const fetchSellerData = async () => {
    try {
      // Log the token being used
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Redirecting to login...');
        return navigate('/login'); // Redirect to login if no token
      }
      console.log('Using token:', token);
      // Fetch seller's profile
      const profileRes = await axios.get('/api/seller/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched seller profile:', profileRes.data);
      setSellerProfile(profileRes.data);
      // Fetch products
      const productsRes = await axios.get('/api/seller/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched seller products:', productsRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching seller data:', error.response?.data || error.message);
      alert('Failed to load seller data. Please try again.');
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get('/api/seller/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error.response?.data || error.message);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    try {
      // Validate input fields
      if (!newProduct.name || !newProduct.price || !newProduct.description) {
        return alert('All fields are required');
      }
      // Send the request to the backend
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Redirecting to login...');
        return navigate('/login');
      }
      const response = await axios.post(
        '/api/seller/products',
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Product added successfully:', response.data);
      alert('Product added successfully');
      // Clear the form and refresh the product list
      setNewProduct({ name: '', price: '', description: '' });
      fetchSellerData();
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      alert('Failed to add product. Please try again.');
    }
  };

  // Handle updating a product
  const handleUpdateProduct = async (productId, updatedProduct) => {
    try {
      // Validate input fields
      if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.description) {
        return alert('All fields are required');
      }
      // Send the request to the backend
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Redirecting to login...');
        return navigate('/login');
      }
      await axios.put(`/api/seller/products/${productId}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Product updated successfully');
      alert('Product updated successfully');
      // Refresh the product list
      fetchSellerData();
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
      alert('Failed to update product. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
    alert('Logged out successfully.');
  };

  return (
    <div style={styles.container}>
      {/* Header with Profile Button, Notification Icon, and Logout Button */}
      <div style={styles.header}>
        <h1 style={styles.heading}>Seller Dashboard</h1>
        <div style={styles.actions}>
          <button onClick={() => navigate('/profile')} style={styles.profileButton}>
            View Profile
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
          <div
            onClick={() => setShowNotifications(!showNotifications)}
            style={styles.notificationIcon}
          >
            🔔
            {notifications.length > 0 && (
              <span style={styles.notificationBadge}>{notifications.length}</span>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div style={styles.notificationDropdown}>
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} style={styles.notificationItem}>
                {notification.message}
              </div>
            ))
          ) : (
            <p>No notifications available.</p>
          )}
        </div>
      )}

      {/* Seller Profile Section */}
      {sellerProfile && (
        <div style={styles.section}>
          <h2>Seller Profile</h2>
          <p>Name: {sellerProfile.username}</p>
          <p>Email: {sellerProfile.email}</p>
          <p>Phone Number: {sellerProfile.phoneNumber || 'Not provided'}</p>
          <p>Ratings: {sellerProfile.rating ? `${sellerProfile.rating}/5` : 'No ratings yet'}</p>
        </div>
      )}

      {/* Sell a Smartphone Section */}
      <div style={styles.section}>
        <h2>Sell a Smartphone</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          style={styles.textarea}
        />
        <button onClick={handleAddProduct} style={styles.button}>
          Add Product
        </button>
      </div>

      {/* Update Product Section */}
      <div style={styles.section}>
        <h2>Update Product</h2>
        {products.map((product) => (
          <div key={product._id} style={styles.listItem}>
            {product.name} - ${product.price}
            <button
              onClick={() =>
                handleUpdateProduct(product._id, {
                  name: prompt('Enter new name:', product.name),
                  price: prompt('Enter new price:', product.price),
                  description: prompt('Enter new description:', product.description),
                })
              }
              style={styles.updateButton}
            >
              Update
            </button>
          </div>
        ))}
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profileButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '10px',
    backgroundColor: '#dc3545', // Red background for logout button
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  notificationIcon: {
    position: 'relative',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: '#333',
  },
  notificationBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '0.8rem',
  },
  notificationDropdown: {
    position: 'absolute',
    top: '80px',
    right: '20px',
    width: '300px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  section: {
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#fff', // White background for sections
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    width: '100%',
    height: '80px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  listItem: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  updateButton: {
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  notificationItem: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#f8f9fa',
  },
};

export default SellerPage;