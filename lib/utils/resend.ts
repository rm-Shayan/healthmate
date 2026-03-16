import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string, subject: string, otp: string) => {
  try {

    console.log(" before email send")
    await resend.emails.send({
      from: 'Rao Muhammad Shayan <raomuhammadshayan897@gmail.com>', // Baad mein apna domain add kar lena
      to: email,
      subject: subject,
      html: `<h1>HealthMate OTP</h1><p>Aapka code hai: <strong>${otp}</strong>. Yeh 1 ghante tak valid hai.</p>`,
    });
    
    console.log(`after send mail`)
  } catch (error) {
    console.error("Email sending failed:", error);

  }
};