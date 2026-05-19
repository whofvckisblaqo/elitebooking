import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Celebrity from "@/models/Celebrity";
import slugify from "slugify";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const celebrities = await Celebrity.find().sort({ createdAt: -1 });
    return NextResponse.json({ celebrities });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const {
      name, category, bio, fee, location, nationality,
      available, verified, featured, image,
      packages, packageFees, languages, socialMedia,
    } = body;

    if (!name || !category || !bio || !fee || !location || !image) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    const slug = slugify(name, { lower: true, strict: true });
    const existing = await Celebrity.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: "A celebrity with this name already exists" }, { status: 400 });
    }

    const celebrity = await Celebrity.create({
      name, slug, category, bio,
      fee: Number(fee),
      location,
      nationality: nationality || "",
      available: available ?? true,
      verified: verified ?? false,
      featured: featured ?? false,
      image,
      packages: packages || [],
      packageFees: packageFees || {},
      languages: languages || [],
      socialMedia: socialMedia || {
        instagram: "", twitter: "", youtube: "", tiktok: "",
      },
    });

    return NextResponse.json({ message: "Celebrity added", celebrity }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}