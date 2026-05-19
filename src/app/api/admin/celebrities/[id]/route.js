import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Celebrity from "@/models/Celebrity";

export async function GET(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { id } = await context.params;
    const celebrity = await Celebrity.findById(id);
    if (!celebrity) {
      return NextResponse.json({ error: "Celebrity not found" }, { status: 404 });
    }
    return NextResponse.json({ celebrity });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();

    const celebrity = await Celebrity.findByIdAndUpdate(
      id,
      {
        name: body.name,
        category: body.category,
        bio: body.bio,
        fee: Number(body.fee),
        location: body.location,
        nationality: body.nationality || "",
        available: body.available,
        verified: body.verified,
        featured: body.featured,
        image: body.image,
        packages: body.packages || [],
        packageFees: body.packageFees || {},
        languages: body.languages || [],
        socialMedia: body.socialMedia || {},
      },
      { new: true }
    );

    return NextResponse.json({ message: "Celebrity updated", celebrity });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { id } = await context.params;
    await Celebrity.findByIdAndDelete(id);
    return NextResponse.json({ message: "Celebrity deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}