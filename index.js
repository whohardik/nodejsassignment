const express=require("express");
const bodyParser=require("body-parser")
const app=express();
const route=require("./route/routes")
const mongoose=require("mongoose")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set('strictQuery', true);

mongoose.connect( "mongodb+srv://whohardik:LntVg5QKb7WCzwTi@cluster0.wgnjb.mongodb.net/tradeassigment", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use("/",route)
app.listen(process.env.Port || 3000, function(){
    console.log("port running on" + (process.env.Port || 3000))
})

