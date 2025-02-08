// src/components/ProductListingPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Available Smartphones</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} style={styles.listItem}>
            <strong>{product.name}</strong> - ${product.price}
            <button onClick={() => handleBuyNow(product)}>Buy Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListingPage;