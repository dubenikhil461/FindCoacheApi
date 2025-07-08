import User from "../models/User.model.js";
import { z } from "zod";
import { jwt } from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
    const uservalidation = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        role: z.enum(["coach", "student"]),
    }).parse(req.body);

    const existinguser = await User.findOne({ email: uservalidation.email })
    if (existinguser) res.status(409).json({ message: "user already exist" })
    
});

export default router;  