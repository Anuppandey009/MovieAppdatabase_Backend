const express = require("express");
const mongoose = require("mongoose");   


const app = express();  
app.use(express.json());    

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/movie");
}  
const product = new mongoose.Schema({
   
    movie_name: { type: String, required: true },
    production_year: { type: Number, required: true },
    budget:{type:Number, required:false}
})


const Product = mongoose.model("product", product);


app.post("/products",async (req, res) => {
    const product = await Product.create(req.body)  
    return res.status(201).send({product});
});


app.get("/products", async (req, res) => {
    const product = await Product.find().lean().exec();    
    return res.status(200).send({ product });
});


app.patch("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(200).send({ product });
})



app.delete("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    return res.status(200).send({ product });
})
app.listen(2345, async function () {
    await connect();
    console.log("Listening on port 2345");
});