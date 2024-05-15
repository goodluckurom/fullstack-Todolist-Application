const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://goodluckurom:TurboAt2019@cluster0.wvzdwzr.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to mongoDB", error);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

const User = require("./models/user");
const Todo = require("./models/todo");
const moment = require("moment");

//register a new user
app.post("/register", async (req, res) => {
  try {
    console.log("register route reached");
    const { name, email, password } = req.body;

    //to check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered, Login to your account");
    }
    //if no existing user, creates a new user
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.status(202).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "registration failed, try agian later!" });
  }
});

const generateSecreteKey = () => {
  const secreteKey = crypto.randomBytes(32).toString("hex");
  return secreteKey;
};

const secreteKey = generateSecreteKey();

app.post("/login", async (req, res) => {
  try {
    console.log("login route reached");
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    if (user.password !== password) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secreteKey);
    res.status(200).json({ messsage: "Login sucessful", token });
  } catch (error) {
    console.log("Login failed", error);
    res.status(500).json({ message: "Login failed" });
  }
});
app.post("/todos/:userId", async (req, res) => {
  try {
    console.log("Todo creation route reached");
    const userId = req.params.userId;
    const { title, category } = req.body;

    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("YYYY-MM-DD"),
    });
    await newTodo.save();

    //to add the todo to the todo array of a particular user

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
    }
    user?.todos.push(newTodo._id);
    await user.save();

    res.status(200).json({
      message: "Todo added sucessfully",
      todo: newTodo,
    });
  } catch (error) {
    console.log("Error adding todo", error);
    res.status(200).json({ message: "Todo no added" });
  }
});

app.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("todos");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const todos = user.todos; // todos field will now contain the populated todo objects

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
      error: error.message, // Pass the error message for better debugging
    });
  }
});

app.patch("/todos/:todoId/complete", async (req, res) => {
  console.log("complete route reached");
  try {
    const todoId = req.params.todoId;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      { new: true }
    );
    if (!updatedTodo) {
      res.status(404).json({
        error: "Todo not found in the database",
      });
    }

    res
      .status(200)
      .json({ message: "Todo marked as completed", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

//To find completed todos by date
app.get("/todos/completed/:date", async (req, res) => {
  console.log("fetching todo by date routee reached");
  try {
    const date = req.params.date;

    const completedTodos = await Todo.find({
      status: "completed",
      creartedAt: {
        $gte: new Date(`${date}T00:00:00.000Z`), // Start of the selected date
        $lt: new Date(`${date}T23:59:59.999Z`), // End of the selected date
      },
    }).exec();
    res.status(200).json({
      completedTodos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong while fectching todos from the database",
    });
  }
});

app.get("/todos/count", async (req, res) => {
  try {
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed",
    }).exec();

    const totalPendingTodos = await Todo.countDocuments({
      status: "pending",
    }).exec();

    res.status(200).json({ totalCompletedTodos, totalPendingTodos });
  } catch (error) {
    res.status(500).json({ error: "Network error" });
  }
});
