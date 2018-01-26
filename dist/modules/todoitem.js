'use strict';

var _firebase = require('./firebase');

var ToDoItem = function ToDoItem() {};

ToDoItem.add = function (todoItem) {
  var todoId = _firebase.todoRef.push(todoItem).key;
  return todoId;
};

ToDoItem.getById = function (id, callback) {
  _firebase.todoRef.child(id).once('value').then(function (snapshot) {
    var todoItem = snapshot.val();
    callback(todoItem);
  }).catch(function (error) {
    callback(null, error);
  });
};

ToDoItem.update = function (id, attr, val, callback) {
  _firebase.todoRef.child(id).once('value').then(function (snapshot) {
    var todoItem = snapshot.val();
    todoItem[attr] = val;
    var update = {};
    update['/todos/' + todoId] = todoItem;
    _firebase.ref.update(update);
    callback(todoItem);
  }).catch(function (error) {
    callback(null, error);
  });
};

ToDoItem.deleteById = function (id, callback) {
  _firebase.todoRef.child(todoId).remove().then(function () {
    callback(null);
  }).catch(function (error) {
    callback(error);
  });
};
ToDoItem.getByUserId = function (userId, callback) {
  _firebase.todoRef.orderByChild('userId').equalTo(userId).once('value', function (snapshot) {
    var todoItems = [];
    snapshot.forEach(function (childSnapshot) {
      todoItems.push(childSnapshot.val());
    });
    callback(todoItems);
  });
};
module.exports = ToDoItem;