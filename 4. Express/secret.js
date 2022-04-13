const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000

mongoose.connect(`mongodb+srv://nomeSignificativo:asd123@cluster0.mml7f.mongodb.net/Cluster0?retryWrites=true&w=majority`);
// mongoose.connect(`PLACE HERE YOUR CONNECTION STRING`);

const Secret = mongoose.model('Secret', { color: String, number: String })

const app = express()
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended: true}) )


// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('ciao ragazzi'+"\n"+JSON.stringify(req.query))
})

// POST method route
app.post('/', async (req, res) => {

  const users = await Secret.find({}); //[]
  console.log(users, "users")

  // connection to database
  if (users.length > 0){
    res.send("login is sucessfull", JSON.stringify(users));
  }else{
    res.send("login is wrong");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})