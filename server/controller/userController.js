const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const noteModel = require("../models/notemode");

module.exports = {
  registerController: async (req, res) => {
    const data = req.body;
    try {
      const password = data.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      data.password = hashedPassword;
      const user = new userModel(data);
      await user.save();
      res
        .status(201)
        .send({ message: "Registered succesfully", success: true });
    } catch (err) {
      res
        .status(500)
        .send({ mesage: "registration unsuccesful", success: false });
    }
  },
  checkUser: async (req, res) => {
    const { email } = req.body;
    try {
      const existUser = await userModel.findOne({ email });
      console.log(existUser);
      if (existUser) {
        res
          .status(200)
          .send({ mesage: "The user is already registered", success: false });
      } else {
        res.status(200).send({ success: true });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "error occurred while check", success: false });
    }
  },
  loginController: async (req, res) => {
    const data = req.body;
    try {
      const user = await userModel.findOne({ email: data.email });
      if (user) {
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
          return res
            .status(200)
            .send({ message: "invalid password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).send({
          message: `Login Succesful`,
          success: true,
          token,
          response: user,
        });
      } else {
        res
          .status(200)
          .send({ message: "The user does not exist", success: false });
      }
    } catch (err) {
      res.status(500).send({ message: "login error occurred", success: false });
    }
  },
  fetchUser: async (req, res) => {
    const { userId } = req.body;
    try {
      const user = await userModel.findById(userId);
      res
        .status(200)
        .send({ message: "fetch successful", success: true, user });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "error while fetching user", success: false });
    }
  },
  addNote: async (req, res) => {
    const data = req.body;
    const { userId } = data;
    try {
      if (data.note !== "") {
        if(data.noteId){
          const note = await noteModel.findById(data.noteId)
          note.note=data.note
          await note.save()
        }else{
          const newNote = new noteModel(data);
          await newNote.save();
        }
        const notes = await noteModel.find({ userId });
        if (notes) {
         return res.status(201).send({ message: "note added", success: true, notes });
        }
          res.status(201).send({ message: "note added", success: true });
      } else {
        res.status(201).send({ message: "note not added", success: false });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "error while adding the note", success: false });
    }
  },
  getNotes: async (req, res) => {
    const { userId } = req.body;
    try {
      const notes = await noteModel.find({ userId });
      if (notes) {
        res
          .status(200)
          .send({ message: "fetch succesful", success: true, notes });
      } else {
        res
          .status(200)
          .send({ message: "No notes for the user", success: false });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "error while fetching notes", success: false });
    }
  },
  deleteNote: async (req, res) => {
    const noteId = req.params.id;
    try {
      const notes = await noteModel.deleteOne({ _id: noteId });
      res.status(200).send({ mesage: "deletion succesful", success: true });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ mesage: "Note deletion succesful", success: false });
    }
  },
};
