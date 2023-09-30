
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function uploadImageToS3(
  file: Buffer,
  fileName: string,
  type: string
): Promise<string> {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: fileName,
    Body: file,
    ContentType: type,
  };

  const command = new PutObjectCommand(params);
  const res = await s3Client.send(command);

  const getCommand = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });

  return url;
}

export async function POST(req: NextRequest, response: NextResponse) {
  try {
    // Extract form data
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const fileName = formData.get("fileName") as string;

    // Handle degenerate cases
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImageToS3(
      buffer,
      fileName,
      file.type,
    );

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Error at api/upload route:", error);
    return NextResponse.json({ message: "Error uploading image" });
  }
}
