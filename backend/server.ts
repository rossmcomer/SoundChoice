const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db.ts');

const usersRouter = require('./controllers/users');
const availabilityRouter = require('./controllers/availability');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const bookingsRouter = require('./controllers/bookings');
const questionsRouter = require('./controllers/questionnaires');
const adminRouter = require('./controllers/admin');

app.use(cookieParser());
app.use(cors({
  credentials: true,
}));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/admin', adminRouter);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
