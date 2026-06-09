const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const { hashPassword } = require("../src/utils/auth.utils");
const Admin = require("../src/models/Admin.model");

const seedAdmin = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  const username = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ username });

  if (existing) {
    existing.passwordHash = await hashPassword(password);
    existing.isActive = true;
    await existing.save();
    console.log(`Updated admin user: ${username}`);
  } else {
    await Admin.create({
      username,
      passwordHash: await hashPassword(password)
    });
    console.log(`Created admin user: ${username}`);
  }

  await mongoose.disconnect();
};

seedAdmin().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
