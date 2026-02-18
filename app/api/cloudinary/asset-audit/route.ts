import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth, isAuthError } from "@/lib/api-auth";

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
        { error: "Cloudinary credentials not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { assets } = body;

    if (!assets || !Array.isArray(assets)) {
      return NextResponse.json(
        { error: "Assets array is required" },
        { status: 400 }
      );
    }

    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
    const cloudinaryResources: any[] = [];
    let nextCursor: string | undefined;

    do {
      const url = new URL(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`
      );
      url.searchParams.set("max_results", "500");
      if (nextCursor) {
        url.searchParams.set("next_cursor", nextCursor);
      }

      const response = await fetch(url.toString(), {
        headers: { Authorization: `Basic ${authString}` },
      });

      if (!response.ok) {
        throw new Error(`Cloudinary API error: ${response.status}`);
      }

      const data = (await response.json()) as {
        resources?: any[];
        next_cursor?: string;
      };
      cloudinaryResources.push(...(data.resources || []));
      nextCursor = data.next_cursor;
    } while (nextCursor);

    const cloudinaryMap = new Map<string, any>();
    cloudinaryResources.forEach((resource) => {
      cloudinaryMap.set(resource.public_id, resource);
      const baseName = resource.public_id.split("/").pop() || "";
      cloudinaryMap.set(baseName, resource);
    });

    const results = assets.map(
      (asset: { path: string; usedIn: string[] }) => {
        const { path, usedIn } = asset;

        if (path.startsWith("http://") || path.startsWith("https://")) {
          const isCloudinary =
            path.includes("cloudinary.com") ||
            path.includes("res.cloudinary.com");
          return {
            path,
            usedIn,
            status: isCloudinary ? "uploaded" : "external",
            cloudinaryUrl: isCloudinary ? path : undefined,
          };
        }

        const fileName = path.split("/").pop() || "";
        const fileNameWithoutExt = fileName.replace(/\.[^.]+$/, "");

        const matchingResource =
          cloudinaryMap.get(fileNameWithoutExt) ||
          cloudinaryMap.get(fileName) ||
          cloudinaryMap.get(`summit-sheds/${fileNameWithoutExt}`) ||
          cloudinaryMap.get(`assets/${fileNameWithoutExt}`);

        if (matchingResource) {
          return {
            path,
            usedIn,
            status: "uploaded",
            cloudinaryUrl: matchingResource.secure_url,
            cloudinaryPublicId: matchingResource.public_id,
          };
        }

        return { path, usedIn, status: "not_uploaded" };
      }
    );

    const statusOrder: Record<string, number> = {
      not_uploaded: 0,
      external: 1,
      uploaded: 2,
    };
    results.sort(
      (a: any, b: any) => statusOrder[a.status] - statusOrder[b.status]
    );

    return NextResponse.json({
      results,
      cloudinaryCount: cloudinaryResources.length,
      summary: {
        uploaded: results.filter((r: any) => r.status === "uploaded").length,
        not_uploaded: results.filter((r: any) => r.status === "not_uploaded")
          .length,
        external: results.filter((r: any) => r.status === "external").length,
      },
    });
  } catch (error: unknown) {
    console.error("Asset audit error:", error);
    return NextResponse.json({ error: "Asset audit failed. Please try again." }, { status: 500 });
  }
}
