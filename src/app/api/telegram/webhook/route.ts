import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Add your webhook handling logic here
export async function POST() {
  try {  
    // Your webhook handling logic

    // Example response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[TELEGRAM_WEBHOOK]", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
