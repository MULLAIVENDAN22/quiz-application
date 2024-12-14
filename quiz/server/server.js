const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/UserDetails");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://MULLAIVENDAN:ZnAk8jyx874jjkHv@cluster0.4rrex.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("error at mongo", err));

app.post("/userDetails", async (req, res) => {
  const { username, password, marks, action } = req.body;
  try {
    const newUser = new User({ username, password, marks, action });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/userDetails", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

app.put("/userDetails", async (req, res) => {
  const { username, password, marks, action } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = password || user.password;
    user.marks = marks || user.marks;
    user.action = action || user.action;
    await user.save();
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user details" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
