import { NextRequest, NextResponse } from "next/server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

/**
 * Get signed url for S3 object
 * @param req
 * @param params
 * @constructor
 */
export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  const slug = params.slug

  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: slug,
    }

    const getCommand = new GetObjectCommand(params)
    const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 })

    return NextResponse.json({ success: true, url })
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch image." })
  }
}
