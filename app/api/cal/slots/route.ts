// app/api/cal/slots/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/cal";

// Your Cal.com numeric event type id.
// Find it in Cal.com dashboard > Event type > URL (or via GET /v2/event-types with your API key).
const EVENT_TYPE_ID = process.env.CAL_EVENT_TYPE_ID;

export async function GET(req: NextRequest) {
  try {
    if (!EVENT_TYPE_ID) {
      return NextResponse.json(
        { error: "CAL_EVENT_TYPE_ID is not set on the server." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const timeZone = searchParams.get("timeZone") || "UTC";

    if (!start || !end) {
      return NextResponse.json(
        { error: "start and end query params are required (YYYY-MM-DD)." },
        { status: 400 }
      );
    }

    const data = await getAvailableSlots({
      eventTypeId: EVENT_TYPE_ID,
      start,
      end,
      timeZone,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}