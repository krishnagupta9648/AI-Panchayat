import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { messages } = await request.json();
    // Mock AI summary logic
    const summary = {
      title: "Maintenance and Gym discussions are peak.",
      highlights: [
        "20 residents want the lift repaired.",
        "5 residents want gym open till 11 PM.",
        "3 complaints about water leakage."
      ],
      importantNumbers: {
        maintenance: 12,
        pendingApprovals: 5
      }
    };
    return NextResponse.json({ success: true, data: summary });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'AI processing failed' }, { status: 500 });
  }
}
