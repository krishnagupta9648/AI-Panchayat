import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function GET(request) {
  await dbConnect();
  try {
    const societyCode = request.headers.get('x-society-code');
    if (!societyCode) {
      return NextResponse.json({ success: false, error: 'Missing Society Code' }, { status: 400 });
    }
    const complaints = await Complaint.find({ societyCode }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: complaints });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const societyCode = request.headers.get('x-society-code');
    if (!societyCode) {
      return NextResponse.json({ success: false, error: 'Missing Society Code' }, { status: 400 });
    }
    const body = await request.json();
    const complaint = await Complaint.create({ ...body, societyCode });
    return NextResponse.json({ success: true, data: complaint }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
