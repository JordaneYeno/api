const express = require('express')
var mysql = require("mysql")
const app = express()

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.listen(process.env.PORT || 3000)

app.use(express.json())

// const con = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'inkr2022',
//     password: 'C6eVaeGGhAHD_v#',
//     database: 'eshop2'
// })


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eshop'
})


con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('connexion établie');
    }
})


app.get('/api/chaussures/all', (req, res)=>{
    
    con.query('SELECT * FROM chaussures',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})


app.get('/api/chaussures/:id', (req, res)=>{
    
    con.query('SELECT * FROM chaussures WHERE idxChaussure=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
            
        res.status(200).json(result)
    })
})


app.put('/api/chaussures/update/:id', (req, res)=>{
    const idxMarque = req.body.idxMarque;
    const taille = req.body.taille;
    const couleur = req.body.couleur;
    const prix = req.body.prix;
    const nomChaussure = req.body.nomChaussure; 
    const images = req.body.images; 
    const idxChaussure = req.params.id;
    
    con.query('UPDATE chaussures SET idxMarque=?, taille=?, couleur=?, prix=?, nomChaussure=?, images=? WHERE idxChaussure=?',[idxMarque,taille,couleur,prix,nomChaussure,images,idxChaussure],(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})


app.delete('/api/chaussures/delete/:id', (req, res)=>{
    
    con.query('DELETE FROM chaussures WHERE idxChaussure=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).send(err)
            
        res.status(200).json(result)
    })
})


app.post('/api/chaussures/add', (req, res)=>{
    const idxMarque = req.body.idxMarque;
    const taille = req.body.taille;
    const couleur = req.body.couleur;
    const prix = req.body.prix;
    const nomChaussure = req.body.nomChaussure;

    
    con.query('INSERT INTO chaussures VALUES(NULL,?,?,?,?,?)',[idxMarque,taille,couleur,prix,nomChaussure],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})