// routes/feedback.js
router.post('/', async (req, res) => {
    const { orderId, rating, comment } = req.body;
  
    try {
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      const feedback = new Feedback({ order: orderId, rating, comment });
      await feedback.save();
  
      // Update seller's average rating
      const seller = await User.findById(order.seller);
      seller.rating = calculateAverageRating(seller.feedbacks);
      await seller.save();
  
      res.json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });