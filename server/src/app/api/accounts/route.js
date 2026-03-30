import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accountsData = {
      totalCollection: "₹4.8L",
      thisMonthSpend: "₹2.4L",
      status: "98% Paid",
      growth: "+12.5%",
      expenses: [
        { category: "Security & Staff", amount: "₹85,000", share: "35%", color: "bg-blue-500" },
        { category: "Electricity & Water", amount: "₹65,000", share: "27%", color: "bg-indigo-500" },
        { category: "Waste Management", amount: "₹30,000", share: "12%", color: "bg-emerald-500" },
        { category: "Repairs & Maint.", amount: "₹60,000", share: "26%", color: "bg-rose-500" },
      ]
    };
    return NextResponse.json({ success: true, data: accountsData });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch accounts' }, { status: 500 });
  }
}
