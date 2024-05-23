const express =require("express")
const {addLocation,findLocation} =require('../controller/locationApi')
const router =express.Router()

router.post("/addLocation",addLocation)
router.post("/findData",findLocation)

module.exports=router
