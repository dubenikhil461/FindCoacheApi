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

const User = mongoose.model("User", userSchema);

export default User;