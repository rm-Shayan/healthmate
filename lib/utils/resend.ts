'use server';

import nodemailer from 'nodemailer';

// ✅ Validate env variables once
const {
  MAIL_HOST,
  MAIL_USER,
  MAIL_PASS,
  MAIL_PORT,
} = process.env;

if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
  throw new Error('❌ Missing SMTP environment variables');
}

// ✅ Create transporter once (reuse for performance)
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT) || 587,
  secure: Number(MAIL_PORT) === 465, // true only for 465
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

// ✅ Optional: verify only once (not on every request)
let isTransporterVerified = false;

async function verifyTransporter() {
  if (isTransporterVerified) return;

  try {
    await transporter.verify();
    isTransporterVerified = true;
    console.log('✅ SMTP Server Ready');
  } catch (error) {
    console.error('❌ SMTP Verification Failed:', error);
    throw error;
  }
}

// ✅ Main function
export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  try {
    // verify once
    await verifyTransporter();

    const info = await transporter.sendMail({
      from: email || MAIL_USER, // fallback
      to: sendTo,
      subject,
      text: text || '',
      html: html || '',
    });

    console.log('📧 Message Sent:', info.messageId);
    console.log('📨 Mail sent to:', sendTo);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('❌ Email sending failed:', error);

    return {
      success: false,
      error: 'Failed to send email',
    };
  }
}