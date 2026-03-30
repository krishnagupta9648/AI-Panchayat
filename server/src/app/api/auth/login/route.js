import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Society from '@/models/Society';

export async function POST(request) {
  try {
    const { phone, societyCode } = await request.json();

    // MOCK FALLBACK for UI testing without a Database
    if (!process.env.MONGODB_URI) {
      const isMockAdmin = phone === '9648327654';
      return NextResponse.json({
        success: true,
        user: { 
          phone, 
          societyCode, 
          name: isMockAdmin ? 'Society Admin' : 'Testing Resident', 
          role: isMockAdmin ? 'admin' : 'resident', 
          flatNumber: 'A-101' 
        }
      }, { status: 200 });
    }

    await dbConnect();

    // 1. Verify user exists
    let user = await User.findOne({ phone, societyCode });

    if (!user) {
      // Allow dynamic "Signup as Resident" for demo purposes 
      // In production, an Admin would have to explicitly invite them
      
      const society = await Society.findOne({ societyCode });
      if (!society) {
        return NextResponse.json({ success: false, error: 'Invalid Society Code!' }, { status: 400 });
      }

      user = await User.create({
        phone,
        societyCode,
        name: 'Society Resident', // Default name
        role: 'resident',
        flatNumber: 'TBD'
      });
    }

    // 2. Return payload
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
