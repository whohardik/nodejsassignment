
const express=require("express");
const router=express.Router();
const tradeController=require("../controller/tradeController")

router.post("/trades",tradeController.createTrade)
router.get("/trades",tradeController.getTrade)
router.get("/trades/:tradeId",tradeController.getTradebyParams)
router.put("/trades/:tradeId",tradeController.updateTradebyParams)
router.delete("/trades/:tradeId",tradeController.deleteTradebyParams)












module.exports=router