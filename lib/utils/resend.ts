'use server';

import nodemailer from 'nodemailer';

// ✅ Lazy transporter initialization to prevent build-time failures
let transporter: any = null;

function getTransporter() {
  const {
    MAIL_HOST,
    MAIL_USER,
    MAIL_PASS,
    MAIL_PORT,
  } = process.env;

  if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
     // If we're in a build environment, we might not have these, but we shouldn't throw at module load
     console.warn('⚠️ SMTP environment variables are missing. Email functionality will be disabled.');
     return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: Number(MAIL_PORT) || 587,
      secure: Number(MAIL_PORT) === 465,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }
  return transporter;
}

// ✅ Optional: verify only once (not on every request)
let isTransporterVerified = false;

async function verifyTransporter() {
  if (isTransporterVerified) return;
  const t = getTransporter();
  if (!t) throw new Error('❌ Missing SMTP environment variables');

  try {
    await t.verify();
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
    const t = getTransporter();
    if (!t) throw new Error('❌ Missing SMTP environment variables');

    // verify once
    await verifyTransporter();

    const info = await t.sendMail({
      from: email || process.env.MAIL_USER, // fallback
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