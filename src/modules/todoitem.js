import { todoRef, userTodoRef, ref } from './firebase'

var ToDoItem = function () {}


ToDoItem.add = function(todoItem) {
	var todoId = todoRef.push(todoItem).key;
	return todoId;
}

ToDoItem.getById = function(id, callback) {
  todoRef.child(id).once('value').then((snapshot) => {
    var todoItem = snapshot.val();
    callback(todoItem);
  }).catch((error) => {
	callback(null, error);
  });
}

ToDoItem.update = function(id, attr, val, callback) {
  todoRef.child(id).once('value').then((snapshot) => {
    var todoItem = snapshot.val();
    todoItem[attr] = val;
    var update = {};
    update['/todos/' + todoId] = todoItem;
    ref.update(update);
	callback(todoItem);
  }).catch((error) => {
  	callback(null, error);
  });
}

ToDoItem.deleteById = function(id, callback) {
  todoRef.child(todoId).remove().then(() => {
    callback(null);
  }).catch((error) => {
    callback(error);
  })
}
ToDoItem.getByUserId = function(userId, callback) {
  todoRef.orderByChild('userId')
  .equalTo(userId).once('value', (snapshot) => {
    var todoItems = [];
    snapshot.forEach((childSnapshot) => {
      todoItems.push(childSnapshot.val());
    });
    callback(todoItems);
  });
}
module.exports = ToDoItem;