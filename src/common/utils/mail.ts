import nodemailer from "nodemailer";
import { MailInput } from "../interface/email.interface.js";
export const deliverMail = async ({
    toValue: recipient,
    subjectValue: subjectLine,
    textValue: plainBody = "",
    htmlValue: htmlBody = ""
}:MailInput) => {
    const mailer = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    try {
        const sentInfo = await mailer.sendMail({
            from: process.env.SMTP_USER,
            to: recipient,
            subject: subjectLine,
            text: plainBody,
            html: htmlBody,
        });

        console.log("✅ Message sent: %s", sentInfo.messageId);

        console.log("✅ Preview URL: %s", nodemailer.getTestMessageUrl(sentInfo));
    } catch (failure) {
        console.error("❌ Error while sending mail:", failure);
    }
}
