const express = require('express');
const cors = require('cors');
const app = express();

const connectDB = require('./config/connectDB');

const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is working');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
