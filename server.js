const express= require('express');
const { ObjectId } = require('mongodb');

const { connectToDb, getDb }= require('./db')
//const bodyParser = require("body-parser");
//const router = express.Router();
//express app

const root= __dirname + '/build';
const app=express();
// add router in express app
//app.use("/",router);
app.use(express.json()) ;
app.use(express.static(root));
app.use(express.urlencoded({extended: true}));

//listen for request

let db
connectToDb((err) => {
    if(!err) {
        app.listen(3001, () => {
            console.log(' line no:22,listening on 3001 ')
            
        });
        
        db= getDb()

    }
})

//console.log('koyel')
app.get('/blogs',(req, res) => {
    let blogs=[]
    db.collection('blogs_details')
        .find().forEach(blog => blogs.push(blog))
        .then(() => {
            res.status(200).json(blogs)
        })
        .catch(() => {
            res.status(500).json({err: 'could not fetch'})
        })
            
        });

app.get('/blogs/:id', (req, res) => {
    console.log(req.params.id)
    if(ObjectId.isValid(req.params.id)){
        db.collection('blogs_details')
        .findOne({_id: ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log('200')
            res.status(500).json({error: 'Could not fetch the document'});
        }) 
    }else{
        res.status(500).json({error: 'Not a valid document id'});
    }
    
});

app.get('/:name', (req, res) => {
    console.log(req.params.name)
    let blogs=[];
        db.collection('blogs_details')
        .find({$or: [{authorId: req.params.name}]}).forEach(blog => blogs.push(blog))
        .then(() => {
            res.status(200).json(blogs);
        })
        .catch(err => {
            console.log('200')
            res.status(500).json({error: 'Could not fetch the document'});
        }) 
    
});

app.delete('/blogs/:id', (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        db.collection('blogs_details')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log('200')
            res.status(500).json({error: 'Could not delete the document'});
        }) 
    }else{
        res.status(500).json({error: 'Not a valid document id'});
    }
});

app.post('/create', (req, res) => {
    const blog=req.body;
    db.collection('blogs_details')
        .insertOne(blog)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not create a new document'});
        })
})


app.post('/signin', (req, res) => {
    const user=req.body;
    db.collection('users')
        .insertOne(user)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not add the user'});
        })
})

app.post('/login', (req, res) => {
    console.log(req.body.username);
    db.collection('users')
        .findOne({ $and: [ 
            {username: req.body.username }, 
            { pass: req.body.pass } 
          ] })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not add the user'});
        })
})


//         console.log(blogs)
//         res.status(200).json(blogs);
//     res.sendFile('index.html', {root: root});

// })

