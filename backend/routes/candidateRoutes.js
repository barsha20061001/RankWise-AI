const express=require("express");

const router=express.Router();

const{

getCandidates,

getCandidate

}=require("../controllers/candidateController");

router.get("/",getCandidates);

router.get("/:id",getCandidate);

module.exports=router;