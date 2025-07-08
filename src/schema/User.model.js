import { genSalt } from "bcrypt";
import mongoose from "mongoose";
const { SchemaTypes: ST } = mongoose;
const userSchema = new mongoose.Schema({
  name :{ $type: ST.String,required:true},
  email : { $type: ST.String,required:true},
  password : { $type: ST.String,required:true},    
  role : { $type: ST.String,enum:["coach","student","admin"],required:true},
  isverified : { $type: ST.Boolean,default:false},
  },
  {
    type: $type,
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  try {
    if (!this.password) return next();
     this.password = await bcyrpt.hash(this.password,await genSalt(10))
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;