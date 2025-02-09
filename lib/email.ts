import { Resend } from "resend";

const API_KEY = process.env.EMAIL_API_KEY;
export const resend = new Resend(API_KEY);

export async function sendConfirmation(email: string, validationCode: string) {
  return await resend.emails.send({
    from: "RapidXFer <onboarding@resend.dev>",
    to: email,
    subject: "Confirmation code for file transfer",
    html: `<p>Please use code <strong>${validationCode}</strong> to confirm the file transfer</p>`,
  });
}


export async function sendDownloadLink(receiverEmail: string, senderEmail: string, downloadURL: string) {
  return await resend.emails.send({
    from: "RapidXFer <onboarding@resend.dev>",
    to: receiverEmail,
    subject: "Another uses has sent a file to you",
    html: `<p>A user (${senderEmail}) has sent a file to you. Download the file here: ${downloadURL}</p>`
  })
}