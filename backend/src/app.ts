import express, { Application } from 'express';
import cors from 'cors';
import categoryRoutes from './category'
import deviceRoutes from './device';

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());

app.use('/category', categoryRoutes);
app.use('/device', deviceRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Express & Typecsript Server')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

