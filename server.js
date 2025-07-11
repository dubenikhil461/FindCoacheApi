import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
app.get('/',(req,res)=>{
    res.send("api is running");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});