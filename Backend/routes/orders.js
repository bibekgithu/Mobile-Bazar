// routes/orders.js
router.post('/', async (req, res) => {
    const { productId } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      const order = new Order({ product: productId, buyer: req.user.id });
      await order.save();
  
      // Notify the seller (e.g., via email or push notification)
      notifySeller(product.seller);
  
      res.json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });