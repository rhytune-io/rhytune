// index.ts
import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || '', { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
