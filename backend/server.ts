const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./util/config')
const { connectToDatabase } = require ('./util/db.ts');

const usersRouter = require('./controllers/users')
const availabilityRouter = require('./controllers/availability')

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter)
app.use('/api/availability', availabilityRouter)

const start = async () => {
    await connectToDatabase();
  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
  
start();