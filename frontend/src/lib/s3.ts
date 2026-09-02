import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const endpoint = process.env.S3_ENDPOINT || "https://s3.nevaobjects.id";
const bucket = process.env.S3_BUCKET || "ollaaa-bali-hire";
const accessKey = process.env.S3_ACCESS_KEY || "example";
const secretKey = process.env.S3_SECRET_KEY || "example";

// S3 Client configured for S3-compatible Object Storage (NevaObjects)
export const s3Client = new S3Client({
  endpoint,
  region: "auto",
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  forcePathStyle: true, // required for most S3-compatible endpoints
});

/**
 * Upload buffer ke S3 bucket
 * @param buffer Buffer file
 * @param key Path target di bucket, contoh: "blog/1725300000-gambar.webp" atau "portofolio/1725300000-screenshot.webp"
 * @param contentType MIME type, default: "image/webp"
 */
export async function uploadBufferToS3(
  buffer: Buffer,
  key: string,
  contentType = "image/webp"
): Promise<{ success: boolean; imagePath: string }> {
  // Bersihkan leading slash dari key untuk S3 object key
  const cleanKey = key.startsWith("/") ? key.slice(1) : key;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: cleanKey,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read", // S3 public read access jika didukung
  });

  await s3Client.send(command);

  // Return imagePath standar yang disimpan di database (tanpa endpoint S3)
  const dbImagePath = `/${cleanKey}`;
  return {
    success: true,
    imagePath: dbImagePath,
  };
}

/**
 * Helper untuk mendapatkan URL publik lengkap gambar
 * Menangani URL gambar absolut (http/https) dan path relatif S3 (/blog/..., /portofolio/...)
 */
export function getPublicImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return "/hero-images.webp";

  // Jika sudah merupakan URL absolut (misal dummy picsum atau link luar)
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const s3BaseEndpoint =
    process.env.NEXT_PUBLIC_S3_ENDPOINT || process.env.S3_ENDPOINT || "https://s3.nevaobjects.id";
  const s3BucketName =
    process.env.NEXT_PUBLIC_S3_BUCKET || process.env.S3_BUCKET || "ollaaa-bali-hire";

  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const baseUrl = s3BaseEndpoint.replace(/\/+$/, "");

  return `${baseUrl}/${s3BucketName}/${cleanPath}`;
}
