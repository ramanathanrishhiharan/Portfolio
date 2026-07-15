// app/api/cal/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/cal";

const EVENT_TYPE_ID = process.env.CAL_EVENT_TYPE_ID;

export async function POST(req: NextRequest) {
  try {
    if (!EVENT_TYPE_ID) {
      return NextResponse.json(
        { error: "CAL_EVENT_TYPE_ID is not set on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { start, name, email, timeZone, notes } = body ?? {};

    if (!start || !name || !email || !timeZone) {
      return NextResponse.json(
        { error: "start, name, email and timeZone are required." },
        { status: 400 }
      );
    }

    const booking = await createBooking({
      eventTypeId: EVENT_TYPE_ID,
      start,
      name,
      email,
      timeZone,
      notes,
    });

    return NextResponse.json(booking);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}