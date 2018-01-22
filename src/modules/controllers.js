import firebase, { todoRef, userTodoRef, ref } from './firebase'
import express from 'express'

const router = express.Router()
var TodoItem = require('./todoItem');

router.post('/todoItem/:userId/:todoName/:todoDeadline', (req, res) => {
  var data = {
    userId: req.params.userId,
    todoName: req.params.todoName,
    todoDeadline: req.params.todoDeadline,
    createdTime: Date.now()
  };
  var todoId = TodoItem.add(data);
  res.status(200).send({todoId: todoId})
});

router.get('/todoItem/:todoId', (req, res) => {
  TodoItem.getById(req.params.todoId, function (todoItem, err) {
        if (err || typeof err !== 'undefined') 
          return res.status(500).send("There was a problem finding the todo item.");
        if (!todoItem) 
          return res.status(404).send("No todoItem found.");
        res.status(200).send(todoItem);
    });
});

router.put('/todoItem/:todoId/:todoDeadline', (req, res) => {
  var todoId = req.params.todoId;
  var todoDeadline = req.params.todoDeadline;
  TodoItem.update(todoId, 'todoDeadline', todoDeadline, function(todoItem, err) {
        if (err || typeof err !== 'undefined') 
          return res.status(500).send(err);
        if (!todoItem) 
          return res.status(404).send("No todoItem found.");
        res.status(200).send(todoItem);
    });
});

router.delete('/todoItem/:todoId', (req, res) => {
  var todoId = req.params.todoId;
  todoRef.child(todoId).remove().then(() => {
    res.status(200).send({result:'success'});
  }).catch((error) => {
    res.status(500).send({result:'failed'});
  })
});

router.get('/todoItems/:userId', (req, res) => {
  var userId = req.params.userId;
  TodoItem.deleteById(userId, function(todoItems){
    res.status(200).send(todoItems);
  }
});

export default router