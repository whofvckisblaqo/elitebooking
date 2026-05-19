const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb+srv://elitebooking:kim77952468@cluster0.axvmyvt.mongodb.net/elitebooking?retryWrites=true&w=majority&appName=Cluster0").then(async () => {
  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    country: String,
    role: String,
  });

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const existing = await User.findOne({ email: "elitebookingsuport@outlook.com" });
  if (existing) {
    console.log("Admin already exists!");
    process.exit();
  }

  const hashed = await bcrypt.hash("Admin@123456", 10);
  await User.create({
    name: "EliteBooking Admin",
    email: "elitebookingsuport@outlook.com",
    password: hashed,
    phone: "0000000000",
    country: "United States",
    role: "ADMIN",
  });

  console.log("Admin created successfully!");
  console.log("Email: elitebookingsuport@outlook.com");
  console.log("Password: Admin@123456");
  process.exit();
}).catch(console.error);