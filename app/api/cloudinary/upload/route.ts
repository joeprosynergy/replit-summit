import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  verifyAdminAuth,
  isAuthError,
  isValidPublicId,
  isValidCloudinaryFolder,
} from "@/lib/api-auth";

export async function POST(req: NextRequest) {
  // Verify admin auth
  const authResult = await verifyAdminAuth(req);
  if (isAuthError(authResult)) {
    return authResult;
  }

  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { success: false, error: "Cloudinary credentials not configured" },
        { status: 500 }
      );
    }

    // Enforce request body size limit (10MB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Request body too large (max 10MB)" },
        { status: 413 }
      );
    }

    const body = await req.json();
    const { imageBase64, imageUrl, publicId, folder } = body;
    const fileData = imageBase64 || imageUrl;

    // Validate base64 data size (approximate: base64 is ~33% larger than binary)
    if (imageBase64 && typeof imageBase64 === "string" && imageBase64.length > 14 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Image data too large (max 10MB)" },
        { status: 413 }
      );
    }

    if (!fileData) {
      return NextResponse.json(
        {
          success: false,
          error: "No image data provided. Send imageBase64 or imageUrl.",
        },
        { status: 400 }
      );
    }
    if (!publicId) {
      return NextResponse.json(
        { success: false, error: "publicId is required" },
        { status: 400 }
      );
    }
    if (!isValidPublicId(publicId)) {
      return NextResponse.json(
        { success: false, error: "Invalid publicId format" },
        { status: 400 }
      );
    }
    if (folder && !isValidCloudinaryFolder(folder)) {
      return NextResponse.json(
        { success: false, error: "Invalid folder format" },
        { status: 400 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = folder
      ? `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
      : `public_id=${publicId}&timestamp=${timestamp}`;

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", apiKey);
    formData.append("signature", signature);
    if (folder) {
      formData.append("folder", folder);
    }

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    const result = (await uploadResponse.json()) as {
      error?: { message?: string };
      secure_url?: string;
      public_id?: string;
      format?: string;
      width?: number;
      height?: number;
    };

    if (!uploadResponse.ok) {
      throw new Error(result.error?.message || "Upload failed");
    }

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Cloudinary upload error:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
