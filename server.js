const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const connectDB = require('./config/connectDB');

const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json({ extended: true }));
app.use(cors());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(express);

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
