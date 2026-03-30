import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Mock voice processing
    const transcript = "Tap leaking in the kitchen area of Block B, House 402. Please send a plumber urgently.";
    return NextResponse.json({ success: true, data: { transcript } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Voice processing failed' }, { status: 500 });
  }
}
