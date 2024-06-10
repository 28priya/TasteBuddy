const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
  host: 'localhost',
  user: 'Priyanshi2829',
  password: 'Priyanshi@28',
  database: 'tastebuddy_db'
};

// Helper function to connect to the database
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connected');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await connectToDatabase();
    const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    connection.end();

    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Successful login
    res.status(200).json({
      username: user.username,
      name: user.name,
      email: user.email,
      userid: user.id
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const connection = await connectToDatabase();

    // Check if the email is already in use
    const [existingUsers] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      connection.end();
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [result] = await connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    connection.end();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'An error occurred during signup' });
  }
});

// Endpoint to check database connection
app.get('/test-connection', async (req, res) => {
  try {
    const connection = await connectToDatabase();
    connection.end();
    res.status(200).json({ message: 'Database connected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
