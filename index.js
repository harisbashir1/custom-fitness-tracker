import bodyParser from 'body-parser';
import express from 'express';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
const PORT = 8050;
const app = express(); 

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine","ejs");


app.get('/',(req,res) =>{
    res.render('login');
})

app.get('/register',(req,res) =>{
    res.render('register');
})

app.get('/dashboard',(req,res)=>{
  res.render('dashboard', { name: user.name} ) ;
})

app.get('/user_progress',(req,res)=>{
  res.render('user_progress');
})

app.get('/active_workout',(req,res)=>{
  res.render('active_workout');
})



app.post('/login', async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).send('Invalid Credentials');
      }
    const passwordVerified = await bcrypt.compare(password, user.password);
    if (passwordVerified) {
        res.render('dashboard', { name: user.name});
      } else {
        res.status(401).send('Invalid Credentials');
      }
})

let users = [];

app.post('/register', async(req,res)=>{
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const userid = uuidv4();

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {name: name, username: username, password: hashedPassword, id: userid};

    users.push(newUser);
    console.log(users);
    res.render('dashboard',{name: name});
})






app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));