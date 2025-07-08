import { createTransport } from "nodemailer";

export default Transporter = createTransport({
    service : 'gmail',
    auth : {
        email :process.env.EMAIL,
        Pass :  process.env.PASS
    }
})