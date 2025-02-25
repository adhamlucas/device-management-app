import express, { Application } from 'express';

import categoryRoutes from './category/routes';

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/category', categoryRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Express & Typecsript Server')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

