import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function getS3Client(): { client: S3Client; bucket: string } {
  const endpoint = process.env.S3_ENDPOINT || "";
  const bucket = process.env.S3_BUCKET || "";
  const accessKey = process.env.S3_ACCESS_KEY || "";
  const secretKey = process.env.S3_SECRET_KEY || "";

  if (!bucket || !accessKey || !secretKey) {
    throw new Error(
      `Konfigurasi S3 belum lengkap: bucket=${Boolean(bucket)}, accessKey=${Boolean(accessKey)}, secretKey=${Boolean(secretKey)}, endpoint=${endpoint}`
    );
  }

  const client = new S3Client({
    endpoint: endpoint || undefined,
    region: "us-east-1",
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
    forcePathStyle: true,
  });

  return { client, bucket };
}

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
  const { client, bucket } = getS3Client();

  // Bersihkan leading slash dari key untuk S3 object key
  const cleanKey = key.startsWith("/") ? key.slice(1) : key;

  try {
    const commandWithAcl = new PutObjectCommand({
      Bucket: bucket,
      Key: cleanKey,
      Body: buffer,
      ContentType: contentType,
      ACL: "public-read",
    });
    await client.send(commandWithAcl);
  } catch (aclError: unknown) {
    console.warn("PutObject with ACL failed, retrying without ACL:", aclError);
    const commandWithoutAcl = new PutObjectCommand({
      Bucket: bucket,
      Key: cleanKey,
      Body: buffer,
      ContentType: contentType,
    });
    await client.send(commandWithoutAcl);
  }

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

  const imageBase = (
    process.env.IMAGE_BASE_URL ||
    (process.env.S3_ENDPOINT && process.env.S3_BUCKET
      ? `${process.env.S3_ENDPOINT.replace(/\/+$/, "")}/${process.env.S3_BUCKET}`
      : "")
  ).replace(/\/+$/, "");

  if (!imageBase) {
    return imagePath;
  }

  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return `${imageBase}/${cleanPath}`;
}
