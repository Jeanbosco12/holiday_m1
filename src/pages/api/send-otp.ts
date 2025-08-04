// pages/api/send-otp.ts
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { email, otp } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Sécurité OTP" <${process.env.SMTP_EMAIL}>`,
            to: email,
            subject: "Votre code de vérification",
            text: `
Bonjour, ${email} :

Nous avons bien reçu votre demande de code à usage unique pour accéder à votre compte.

Votre code de vérification est : ${otp}

Veuillez saisir ce code uniquement sur un site web ou une application officielle.
Ne le partagez avec personne. Nous ne vous le demanderons jamais en dehors d’une plateforme officielle.

Merci,
L’équipe de sécurité
  `,
            html: `
    <p>Bonjour, <strong>${email}</strong> :</p>
    <p>Nous avons bien reçu votre demande de code à usage unique pour accéder à votre compte.</p>
    <p><strong style="font-size: 18px;">Votre code de vérification est : ${otp}</strong></p>
    <p>
      Veuillez saisir ce code uniquement sur un site web ou une application officielle.<br/>
      <strong>Ne le partagez avec personne.</strong> Nous ne vous le demanderons jamais en dehors d’une plateforme officielle.
    </p>
    <p>Merci,<br/>L’équipe de sécurité</p>
  `
        });


        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Échec de l'envoi de l'email." });
    }
}
// Assurez-vous d'avoir les variables d'environnement SMTP_EMAIL et SMTP_PASSWORD configurées
// dans votre fichier .env.local ou dans les paramètres de votre hébergeur.