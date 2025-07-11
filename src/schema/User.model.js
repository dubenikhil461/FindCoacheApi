import bcrypt from "bcrypt";
import mongoose from "mongoose";
const { SchemaTypes: ST } = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: { type: ST.String, required: true },
    email: { type: ST.String, required: true, unique: true },
    password: { type: ST.String, required: true },
    role: { type: ST.String, enum: ["coach", "student"], required: true },
    isverified: { type: ST.Boolean, default: false },
    otp: { type: ST.String, required: false,default:null },
    otpExpiry: { type: ST.Date }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;