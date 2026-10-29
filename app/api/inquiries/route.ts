import { NextRequest, NextResponse } from 'next/server';
import { isRecord, isValidEmailAddress } from '@/types/portfolio';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isRecord(body)) {
      return NextResponse.json(
        { success: false, error: 'Request body must be a valid JSON object.' },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (typeof email !== 'string' || !isValidEmailAddress(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message content is required.' },
        { status: 400 }
      );
    }

    const sanitizedInquiry = {
      id: `inq-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject: typeof subject === 'string' && subject.trim() ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      receivedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and logged.',
      inquiry: sanitizedInquiry,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry payload.' },
      { status: 500 }
    );
  }
}
