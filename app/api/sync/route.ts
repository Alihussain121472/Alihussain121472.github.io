import { NextRequest, NextResponse } from 'next/server';
import { parseAndValidateBackup } from '@/types/portfolio';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    version: '2.0',
    timestamp: new Date().toISOString(),
    message: 'Syed Ali Hussain Portfolio State Vault Sync Endpoint',
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawPayload = await req.json();
    const validationResult = parseAndValidateBackup(rawPayload);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: validationResult.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Portfolio state vault verified and synchronized.',
      vaultMetadata: {
        version: validationResult.value.version,
        exportedAt: validationResult.value.exportedAt,
        theme: validationResult.value.theme,
        bookmarksCount: validationResult.value.bookmarkedProjectIds.length,
        inquiriesCount: validationResult.value.inquiries.length,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Malformed JSON payload.',
      },
      { status: 400 }
    );
  }
}
