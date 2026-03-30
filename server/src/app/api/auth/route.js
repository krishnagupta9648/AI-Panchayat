import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { phoneNumber } = await request.json();
    // Mock authentication
    if (phoneNumber) {
      return NextResponse.json({ success: true, user: { id: 1, phone: phoneNumber, name: 'Society Resident' } });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
