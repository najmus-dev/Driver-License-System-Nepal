// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/UserRoutes');
// const licenseRoutes = require('./routes/licenseRoutes');


// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/licenses', licenseRoutes);

// // Connect to MongoDB
// // 6G2Fsu4WL6k0RxHl
// mongoose.connect('mongodb://najmuspak:6G2Fsu4WL6k0RxHl@cluster0-shard-00-00.n8jwh.mongodb.net:27017,cluster0-shard-00-01.n8jwh.mongodb.net:27017,cluster0-shard-00-02.n8jwh.mongodb.net:27017/?ssl=true&replicaSet=atlas-8z92kc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));


// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
const licenseRoutes = require('./routes/licenseRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and other credentials
}));
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/licenses', licenseRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://najmuspak:6G2Fsu4WL6k0RxHl@cluster0-shard-00-00.n8jwh.mongodb.net:27017,cluster0-shard-00-01.n8jwh.mongodb.net:27017,cluster0-shard-00-02.n8jwh.mongodb.net:27017/?ssl=true&replicaSet=atlas-8z92kc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


