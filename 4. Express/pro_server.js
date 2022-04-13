const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const port = 3000

mongoose.connect(`mongodb+srv://nomeSignificativo:asd123@cluster0.mml7f.mongodb.net/Cluster0?retryWrites=true&w=majority`);
// mongoose.connect(`PLACE HERE YOUR CONNECTION STRING`);

const User = mongoose.model('User', { username: String, password: String })

const app = express()
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended: true}) )


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  // res.send('ciao ragazzi'+"\n"+JSON.stringify(req.query))
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/login', (req, res) => {
  // res.send('ciao ragazzi'+"\n"+JSON.stringify(req.query))
  res.sendFile(path.join(__dirname, '/login.html'));
})

// POST method route
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const users = await User.find({ username, password });
  console.log(users, "users")

  // connection to database
  if (users.length > 0){
    res.sendFile(path.join(__dirname, '/merce.html'));
  }else{
    res.sendFile(path.join(__dirname, '/errore.html'));
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})