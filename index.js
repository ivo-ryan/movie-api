const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    app.use(cors());
    next();
});

const port = process.env.PORT || 3000;

const User = mongoose.model('User', {
    user: String
});

const Filmes = mongoose.model('Filmes', {
    name: String,
    banner_small: String,
    banner_large: String,
    description: String,
    nota: String,
    url: String,
    lancamento: String,
    duracao: String
})

app.put("/filmes/:id", async ( req, res ) => {
    const filme = await Filmes.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        banner_small: req.body.banner_small,
        banner_large: req.body.banner_large,
        description: req.body.description,
        nota: req.body.nota,
        url: req.body.url,
        lancamento: req.body.lancamento,
        duracao: req.body.duracao
    })

    return res.send(filme)
})
app.get('/filmes', async (req, res) => {
    const filme = await Filmes.find();
    return res.send(filme);
});

app.post("/filmes", async (req, res) => {
    const filme = new Filmes({
        name: req.body.name,
        banner_small: req.body.banner_small,
        banner_large: req.body.banner_large,
        description: req.body.description,
        nota: req.body.nota,
        url: req.body.url,
        lancamento: req.body.lancamento,
        duracao: req.body.duracao
    });

    await filme.save();
    return res.send(filme);
});

app.post("/user", async (req , res) => {
        const user = new User({
            user: req.body.user
        })

       await user.save()
       return res.send(user)
});

app.get("/user" , async (req , res) => {
    const user = await User.find()
   return  res.send(user)
});


app.listen(port, async () => {
    await mongoose.connect('mongodb+srv://movies15:Movies06.ryan@movies02.m6blp.mongodb.net/?retryWrites=true&w=majority&appName=movies02');

   
    console.log("App running");
});