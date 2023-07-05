const express = require('express');
const { registerController, checkUser, loginController, fetchUser, addNote, getNotes, deleteNote } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/existUser',checkUser)
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/getUser',authMiddleware,fetchUser),
router.post('/addNote',authMiddleware,addNote)
router.get('/getNotes',authMiddleware,getNotes)
router.get('/deleteNote/:id',authMiddleware,deleteNote)
module.exports =router; 