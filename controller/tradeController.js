const { default: mongoose } = require("mongoose");
const tradeModel1 = require("../model/tradeModel");

const createTrade = async function (req, res) {
    try {
        let tradeData = req.body;
        let { Type, User_id, Symbol, Shares, Price } = tradeData
        if (!Type) { return res.status(400).send({ status: false, msg: "Please enter type" }) }        //load the data in database,
        if (!User_id || typeof (User_id) !== "number") { return res.status(400).send({ status: false, msg: "Please enter User_id" }) }        //load the data in database,
        if (!Symbol || !typeof (Symbol) == "string") { return res.status(400).send({ status: false, msg: "Please enter Symbol" }) }        //load the data in database,
        if (!(["buy", "sell"]).includes(Type)) { return res.status(400).send({ status: false, msg: " Type should be buy or sell" }) }
        if (!Shares || typeof (Shares) !== "number") { return res.status(400).send({ status: false, msg: " Shares should be number formet" }) }
        if (Shares < 0 || Shares > 100) { return res.status(400).send({ status: false, msg: "Please enter shares between 1 to 100 only" }) }    //load the data in database,
        if (!Price || typeof (User_id) !== "number") { return res.status(400).send({ status: false, msg: "Please enter Price" }) }        //load the data in database,
        let data = await tradeModel1.create(tradeData)
        return res.status(201).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const getTrade = async function (req, res) {
    try {
        let tradeData = req.body;
        //load the data in database
        let data = await tradeModel1.find(tradeData)
        return res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const getTradebyParams = async function (req, res) {
    try {
        let tradeId = req.params.tradeId;
        if (!mongoose.isValidObjectId(tradeId)) { return res.status(400).send({ status: false, msg: " tradeId is invaild" }) }
        let tradeIdExit = await tradeModel1.findById(tradeId)
        if (!tradeIdExit) { return res.status(404).send({ status: false, msg: " tadeId is not found" }) }
        //load the data in database
        let data = await tradeModel1.findById(tradeId)
        return res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const updateTradebyParams = async function (req, res) {
    try {
        let tradeId = req.params.tradeId;
        let { Type, User_id, Shares, Price } = req.body
        if (!mongoose.isValidObjectId(tradeId)) { return res.status(400).send({ status: false, msg: " tradeId is invaild" }) }
        let tradeIdExit = await tradeModel1.findById(tradeId)
        if (!tradeIdExit) { return res.status(404).send({ status: false, msg: " tadeId is not found" }) }
        //load the data in database
        let data = await tradeModel1.findByIdAndUpdate(tradeId, req.body, { new: true })
        return res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const deleteTradebyParams = async function (req, res) {
    try {
        let tradeId = req.params.tradeId;
        if (!mongoose.isValidObjectId(tradeId)) { return res.status(400).send({ status: false, msg: " tradeId is invaild" }) }
        let tradeIdExit = await tradeModel1.findById(tradeId)
        if (!tradeIdExit ) { return res.status(404).send({ status: false, msg: " tadeId is not found" }) }
        //load the data in database
        let data = await tradeModel1.findByIdAndDelete(tradeId)
        return res.status(200).send({ status: true, msg: "sucessfully deleted" })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports = { createTrade, getTrade, getTradebyParams, deleteTradebyParams, updateTradebyParams }
