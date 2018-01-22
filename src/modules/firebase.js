import { EventEmitter } from 'events'
import firebase from 'firebase'
import path from 'path'


const CONFIG = require('../config/firebase/config')

firebase.initializeApp(CONFIG)

export const ref = firebase.database().ref()
export const todoRef = firebase.database().ref('todos')
export const userTodoRef = firebase.database().ref('user-todos')

const firebaseModule = new EventEmitter()

export default firebaseModule

ref.child('init').once('value', () => firebaseModule.emit('init'))
