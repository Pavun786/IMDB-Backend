const actorModel = require("../Models/actorModel.js")
// const Date = require("some-library")


const createActor = async(req,res)=>{

   try{
    const {Name,Gender,DOB,Bio} = req.body;

    if(!Name || !Gender || !DOB || !Bio){
        res.status(500).send({message : "All fields required..!"})
    }

    const verifyActor = await actorModel.findOne({Name : Name})
    
    if(verifyActor){
        res.send({message : "Actor already exist..!"})
    }
    else{
        const newActor = new actorModel({
          Name,
          Gender,
          DOB: new Date(DOB),
          Bio  
        })

        await newActor.save()

        res.status(200).send({message : "Actor created successfully"})
    }
   }catch(err){
     res.send({message : err})
   }

}

const getallActors = async(req,res)=>{
     
       try{
        const getAllActors = await actorModel.find()

        if(getAllActors){
            res.status(200).send(getAllActors)
        }else{
            res.send(404).send({message : "Actors not found"})
        }
    }catch(err){
       res.send({message : err})
    }
    

}

const getSingleActor = async(req,res)=>{
    try{
       const {id} = req.params;

       const getActor = await actorModel.findOne({_id : id}).populate({
          path : "Movies",
          select : "_id Name"
       })
       if(getActor){
         res.status(200).send(getActor)
       }else{
          res.status(404).send({message : "Actor not found"})
       }
    }
    catch(err){
        res.send({message : err})
    }
}

const editActor = async(req,res)=>{
      try{
         const {id}= req.params;
         const data = req.body;

         const editActor = await actorModel.updateOne({_id : id},{$set : data})
         res.status(200).send({message : "Actor edited successfully"})
      }catch(err){
         res.send({message : err})
      }
}

const deleteActor = async(req,res)=>{
      try{
        const {id}= req.params;
        const deleteActor = await actorModel.deleteOne({_id : id})
        res.status(200).send({message : "Actor is deleted"})  
    }catch(err){
        res.send({message : err})
      }
}


module.exports = {createActor,getallActors,getSingleActor,editActor,deleteActor};