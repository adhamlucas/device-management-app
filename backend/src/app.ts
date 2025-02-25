import express, { Application } from 'express';

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Welcome to Express & Typecsript Server')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

