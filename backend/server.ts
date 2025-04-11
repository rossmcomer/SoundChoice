const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./util/config')
const { connectToDatabase } = require ('./util/db.ts');

const usersRouter = require('./controllers/users')
const availabilityRouter = require('./controllers/availability')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const bookingsRouter = require('./controllers/bookings')

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter)
app.use('/api/availability', availabilityRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/booking', bookingsRouter)

const start = async () => {
    await connectToDatabase();
  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
  
start();