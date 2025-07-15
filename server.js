const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const transaksiRoutes = require('./routes/transaksi');
const userRoutes= require('./routes/user');
const adminRoutes= require('./routes/admin')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

// Database connection
mongoose.connect('mongodb://localhost:27017/uas_pbw', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
// app.use('/login', adminRoutes);
app.use('/api', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', transaksiRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});