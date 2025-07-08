import User from "../models/User.model.js";
import { z } from "zod";
import { jwt } from "jsonwebtoken";
import crypto from "crypto";
import SendMailtoOtp from "../utils/sendmail.js";
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        // Validate input
        const userSchema = z.object({
            name: z.string().min(3),
            email: z.string().email(),
            password: z.string().min(8),
            role: z.enum(["coach", "student"]),
        });
        const uservalidation = userSchema.parse(req.body);

        // Check if user already exists
        const existinguser = await User.findOne({ email: uservalidation.email });
        if (existinguser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newotp = crypto.randomInt(100000, 1000000);

        const mailResult = await SendMailtoOtp(uservalidation.email, newotp);
        if (!mailResult.success) {
            return res.status(500).json({ message: "Failed to send OTP", error: mailResult.error });
        }

        // Create user (do not include password in response)
        const user = await User.create({
            ...uservalidation,
            otp: newotp,
            otpexpiry: 10 * 60 * 1000
        }).select(-password)
        return res.status(400).json({ message: error.message || error })
    }
    catch (error) {
        return res.json({ message: error })
    }
});



export default router;  