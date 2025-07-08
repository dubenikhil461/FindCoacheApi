import transporter from "./transporter.js";

/**
 * Sends an OTP email to the specified address.
 * @param {string} email - Recipient's email address.
 * @param {string|number} otp - The OTP code to send.
 * @returns {Promise<Object>} - The result of the email sending operation.
 */
async function SendMailtoOtp(email, otp) {
    try {
        const mailOptions = {
            from: `"FindCoache" <${process.env.EMAIL}>`,
            to: email,
            subject: "Your OTP Code",
            html: `
                <div style="font-family: Arial, sans-serif; color: #222;">
                    <h2>Verification Code</h2>
                    <p>Your OTP code is: <b style="font-size: 1.5em; color: #007bff;">${otp}</b></p>
                    <p>This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
                    <br>
                    <small>FindCoache Team</small>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, message: "OTP sent successfully", info };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return { success: false, message: "Failed to send OTP", error };
    }
}

export default SendMailtoOtp;