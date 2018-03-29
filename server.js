const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const bp = require('body-parser');
app.use(bp.json());
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/meanbelt')
app.use(express.static(path.join(__dirname + '/meanbelt-app/dist')));

const ProductsSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, minlength: 3},
    qty: {type: Number, required: true, min: 0},
    price: {type: Number, required: true, min: 0}},
    {timeStamps: true});
   
    mongoose.model('Products', ProductsSchema);
    var Products = mongoose.model('Products')

    app.get('/products', (req, res)=>{
        Products.find({}, (err, products)=>{
            if(err){
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Success", data: products})
            }
        })
    
    });
    
    app.get('/products/:id', (req,res)=>{
        console.log("Getting one product from Server")
        Products.findOne({_id: req.params.id},(err, product)=>{
            if(err){
                console.log(err)
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Error", data: product})
            }
        })
    });
    
    app.post('/products', (req,res)=>{
        console.log("Confirmation form posted to server")
        var newProduct = new Products(req.body)
        newProduct.save((err)=>{
            if(err){
                res.json(err);
            }
            else{
                res.json({success: 'added'})
            }
        })
    });
    
    app.put('/products/:id', (req,res)=>{
        var product = Products.update({_id: req.params.id}, {name: req.body.name, 
                                                    qty: req.body.qty, 
                                                    price: req.body.price},
                                                    {runValidators: true}, (err)=>{
            if(err){
                console.log(err)
                res.json(err)
            }
            else{
                res.json({success: "Successful Update"})
            }
        })
    });
    
    app.delete('/products/:id', (req,res)=>{
        Products.remove({_id: req.params.id}, (err)=>{
            if(err){
                console.log(err);
                res.json({message: "Error", error: err})
            }
            else{
                res.json({message: "Successful Removal"})
            }
        })
    });

app.all('*', (req,res,next)=>{
    res.sendFile(path.resolve("./meanbelt-app/dist/index.html"))
});

app.listen(port, ()=>{
    console.log(`We on port ${port}`);
});