// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRouter = require('./routes/tasks'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 5000;

const mongoURI = 'mongodb+srv://pcgenie:PcGenie_2023@cluster0.4jvozhn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error(err));

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.use('/tasks', taskRouter); // Use the tasks route

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
