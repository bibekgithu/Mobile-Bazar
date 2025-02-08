// src/components/FeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ orderId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('/api/feedback', { orderId, rating, comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    }
  };

  return (
    <div>
      <h4>Leave Feedback</h4>
      <label>
        Rating:
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
      </label>
      <br />
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FeedbackForm;