// src/components/BuyerPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BuyerPage = () => {
  const [products, setProducts] = useState([]); // State for buyer's products

  // Fetch products when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/buyers/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to load products');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} style={styles.productItem}>
            <strong>{product.name}</strong> - ${product.price}
            <p>{product.description}</p>
            <p><small>Seller: {product.seller.username}</small></p>
            <button onClick={() => handleBuyProduct(product._id)} style={styles.buyButton}>
              Buy Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Handle buying a product
const handleBuyProduct = async (productId) => {
  try {
    await axios.post('/api/buyers/orders', { productId }); // Create an order
    alert('Product purchased successfully!');
  } catch (error) {
    console.error('Error purchasing product:', error);
    alert('Failed to purchase product');
  }
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
  productItem: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#fff',
  },
  buyButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default BuyerPage;