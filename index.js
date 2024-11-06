const ex = require('express');
const mongo = require('mongoose')

const Art = require('./Modules/Articles')
const Use = require('./Modules/Users')

const url = "mongodb+srv://king:oussama2044@dbprojects.n75ua.mongodb.net/?retryWrites=true&w=majority&appName=dbprojects"
const db = mongo.connect(url)
.then(()=>{
    console.log('Your are Connecting with DB')
}).catch(()=>{
    console.log('Your connecting with DB is not successfully')
})

const app = ex();
app.use(ex.json());



app.get('/hello' , (req , res)=>{
    res.send('hello world')
});
app.get('/' , (req , res)=>{
    res.send('welcome to home page')
})
app.get('/num' , (req , res)=>{
    let num = [""] ;
    for(let i = 0 ; i <= 20 ; i++){
        num += i
    }
    res.send(`welcome to ja ${num} `)
});
app.get('/lol/:1/:2' , (req , res)=>{
    let a = req.params[1]
    let b = req.params[2]
    res.send(`welcome to lol ${a} ${b} `)
})
app.get('/name' , (req , res)=>{
    let a = req.body.name
    let b = req.query.age
    res.send(`welcome ${a} your age is ${b} `)
})
app.post('/end' , (req , res)=>{
    res.send('welcome to ja')
})
app.get('/end/:s1/:s2' , (req , res)=>{
    let s1 = req.params.s1
    console.log(s1)
    res.send('welcome to ja')
})
app.get("/no" , (req , res)=> {
    res.sendFile(__dirname + "/views/main.html")
})
app.get("/noo" , (req , res)=> {
    let a = req.body.name
    res.render("main.ejs" , {
        name : a
    })
})

app.post('/article' , async (req , res) =>{
    let newArticle = new Art()
    newArticle.title = req.body.nameoftitle
    newArticle.content = req.body.content
    newArticle.date = req.body.time
    await newArticle.save()
    console.log('yes')

    res.send('Your Article has been Saved')
} )
app.post('/users', async (req, res) => {
    try {
      const newUser = new Use({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password // Hashed before saving
      });
  
      await newUser.save();
      res.status(201).send('User created successfully!'); // More informative response
    } catch (error) {
      console.error('Error creating user:', error);
  
      if (error.code === 11000) { // Handle duplicate email error
        res.status(400).send('Email already exists');
      } else {
        res.status(500).send('Internal server error'); // Generic error for other issues
      }
    }
  });
app.get('/users', async (req, res) => {
    try {
        
      const users = await Use.find();
      res.json(users); // Send users data as JSON
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal server error'); // Generic error
    }
  });
  app.get('/users/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const user = await Use.findOne({name});
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Internal server error');
    }
  });


app.get('/article' , async (req , res) => {
    try {
    const allArticles = await Art.find();
    res.json(allArticles)
    }catch (error) {
        console.log("You have something wrong",error)
    }
})
app.get('/articles/:id' , async (req , res) => {
    const id = Art.findById(req.params.id)
    try {
        const allArticles = await id;
        res.json(allArticles)
        }catch (error) {
            console.log("You have something wrong",error)
        }
})

app.post('/hola/:id' , async (req , res) => {
    const id = Art.findById(req.params.id)
    try {
        const allArticles = await id
        res.json(allArticles)
    }catch (error){
        console.log("You have something wrong",error)
    }
})

app.listen(3000 , ()=>{
    console.log('Port 3000 is working')
});
