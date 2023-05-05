import nodemailer from 'nodemailer';
import QRCode from 'qrcode';

export default async function mailSender(token, userEmail, res) {
    const qrCode = await QRCode.toDataURL(token)
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'votre code de connexion',
        html: `<p>voici votre code de connexion : </p><img src="${qrCode}"/>`
    }

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: "Le code a été envoyé avec succès", emailSent: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "une erreur est survenu lors de l'envoi du code"})
    }
}