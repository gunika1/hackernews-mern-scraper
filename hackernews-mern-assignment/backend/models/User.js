import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
