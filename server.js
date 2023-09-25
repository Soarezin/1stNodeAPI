const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/productModel');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes

app.get('/', (req, res)=>{
    res.send('Hello Node API')
})

app.get('/blog', (req, res)=>{
    res.send('Hello blog')
})

app.get('/product', async(req, res) =>{
    try {
        const product = await Product.find({});
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// update
app.put('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find the product`})
        }
        const updatedproduct = await Product.findById(id);
        res.status(200).json(updatedproduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete

app.delete('/product/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find the product`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
mongoose.connect('mongodb+srv://admin:root@projeto1.t3a0ttm.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, () => {
        console.log(`node API is running on port 3000`)
    })
    console.log('connected')
}).catch((error)=>{
    console.log(error)
})