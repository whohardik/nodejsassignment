
const mongoose=require("mongoose");
const  tradeSchema=new mongoose.Schema(
    { 
        Type:{
            type:String,
            enum:["buy","sell"],
            require:true,
            trim:true

        },

        User_id:{
        type:Number,
        require:true,

        },
        
        Symbol:{
            type:String,
            require:true,
            trim:true
        },
        Shares:{
              type:Number,
              require:true
        },
        Price:{
            type:Number,
            require:true
        }
        
},{timestamps:true}) 

module.exports = mongoose.model("Trade", tradeSchema);