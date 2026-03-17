import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/utils/resend';
import { ApiResponse } from '@/lib/api/ApiResponse';
import { ApiError } from '@/lib/api/ApiError';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, sendTo, subject, text, html } = body;

    // ✅ Basic validation
    if (!email || !sendTo || !subject) {
      return NextResponse.json(new ApiError(400,'Missing required fields: email, sendTo, subject')
      );
    }

    // ✅ Send mail
    const result = await sendMail({
      email,
      sendTo,
      subject,
      text,
      html,
    });

    return NextResponse.json(new ApiResponse(200, result,'Email sent successfully'));

  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      new ApiError(500, 'Something went wrong'),
    );
  }
}