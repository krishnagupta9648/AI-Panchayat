import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { question } = await request.json();
    // Mock AI bylaw logic
    let answer = "According to society rules, please refer to the RWA handbook.";
    if (question.toLowerCase().includes('sunday') || question.toLowerCase().includes('renovate')) {
      answer = "According to society rules, renovations are allowed Monday to Saturday between 9 AM - 6 PM.";
    }
    return NextResponse.json({ success: true, data: { answer } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'AI bot failed' }, { status: 500 });
  }
}
