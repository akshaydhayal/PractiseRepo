import express from "express";
import {Todo} from "../db/models.js";
import {userAuth} from "../middlewares/auth.js";
import bodyParser from "body-parser";

export const router=express.Router();
router.use(bodyParser.json());

router.post("/",userAuth,async(req,res)=>{
    const todo=new Todo({...req.body,userId:req.headers.userId});
    const resp=await todo.save();
    console.log(resp);
    res.status(201).json({msg:"Todo created!!",todo:resp});
});

router.get("/", userAuth, async (req, res) => {
  const todos = await Todo.find({userId:req.headers.userId});
  res.status(201).json(todos);
});

router.get("/:todoId", userAuth, async (req, res) => {
  const todo = await Todo.find({_id:req.params.todoId,userId:req.headers.userId});
  if (todo) {
    res.status(201).json(todo);
  } else {
    res.status(403).json({ msg: "Todo doesn't exists!!" });
  }
});

router.put("/:todoId",userAuth,async(req,res)=>{
    const updated=await Todo.findOneAndUpdate({_id:req.params.todoId,userId:req.headers.userId},req.body,{
        returnDocument:"after"
    });
    console.log(updated);
    if(updated){
        res.status(201).json({msg:'todo updated!!',updatedTodo:updated});
    }else{
        res.status(403).json({msg:'Todo not updated!!'});
    }
})

router.delete("/:todoId",userAuth,async(req,res)=>{
    const deleteStatus=await Todo.findOneAndDelete({_id:req.params.todoId,userId:req.headers.userId});
    // await Todo.findByIdAndDelete(req.params.todoId);
    if(deleteStatus){
        res.status(201).json({msg:"Todo deleted!!"});
    }else{
        res.status(403).json({msg:"Todo not deleted!!"});
    }
})