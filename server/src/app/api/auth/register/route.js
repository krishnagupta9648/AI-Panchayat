import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Society from '@/models/Society';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { societyName, societyCode, adminName, adminPhone } = await request.json();

    // MOCK FALLBACK for UI testing without a Database
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: true,
        data: {
          society: { societyCode, name: societyName, adminPhone },
          user: { phone: adminPhone, societyCode, name: adminName, role: 'admin', flatNumber: 'RWA Office' }
        }
      }, { status: 201 });
    }

    await dbConnect();

    // 1. Check if societyCode is taken
    const existingSociety = await Society.findOne({ societyCode });
    if (existingSociety) {
      return NextResponse.json({ success: false, error: 'Society code already exists!' }, { status: 400 });
    }

    // 2. Check if phone is already registered on platform
    const existingUser = await User.findOne({ phone: adminPhone });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Phone number already registered!' }, { status: 400 });
    }

    // 3. Create Society
    const society = await Society.create({
      societyCode,
      name: societyName,
      adminPhone
    });

    // 4. Create Admin User
    const admin = await User.create({
      phone: adminPhone,
      societyCode: society.societyCode,
      name: adminName,
      role: 'admin',
      flatNumber: 'RWA Office'
    });

    return NextResponse.json({ success: true, data: { society, user: admin } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
