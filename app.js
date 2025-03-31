import express from 'express';
const hostname = '127.0.0.1'; // or localhost
const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 0,
    name: 'Nimi',
    birthdate: '2012-12-20',
    weight: 2,
    owner: 'Marko',
    img: 'https://loremflickr.com/320/240/cat',
  };
  res.json(cat);
  console.log('cat sent');
});
