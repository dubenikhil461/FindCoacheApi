import express from "express";
import User from "../models/User.model.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import SendMailtoOtp from "../utils/sendmail.js";
const router = express.Router();

router.post("/send-otp", async (req, res, next) => {
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
        if (!mailResult.success) { return res.status(500).json({ message: "Failed to send OTP", error: mailResult.error }); }

        const user = await User.create({
            ...uservalidation,
            otp: newotp,
            otpExpiry: Date.now() + 10 * 60 * 1000 // Fixed typo: should be otpExpiry
        });
        return res.status(200).json({ message: 'OTP sent successfully', data: user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
});

router.post('/verify-otp', async (req, res, next) => {
    try {
        const ValidateOtp = z.object({
            email: z.string().email(),
            otp: z.number().min(6).max(6)
        });
        const uservalidation = ValidateOtp.parse(req.body);

        const user = await User.findOne({ email: uservalidation.email });
        if (!user) { return res.status(404).json({ message: 'User not found' }); }

        if (user.otp !== uservalidation.otp) { return res.status(400).json({ message: 'Please enter a valid OTP' }); }

        if (user.otpExpiry && user.otpExpiry < Date.now()) { return res.status(400).json({ message: 'OTP expired' }); }
        user.isverified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
});





export default router;