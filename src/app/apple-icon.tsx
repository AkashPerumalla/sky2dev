import { ImageResponse } from "next/og";

/**
 * Home-screen icon for iOS. Generated at build time rather than committed as a
 * binary, so the mark lives in one place: change the colour or the path here
 * and the icon follows. Next only accepts png/jpg for apple-icon, which is why
 * this is code rather than the SVG used for the browser favicon.
 */
// Required by `output: "export"`, same as the sitemap and RSS routes.
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2448d8",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180">
          <path
            d="M28 90h28l14-36 26 73 14-37h42"
            fill="none"
            stroke="#ffffff"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
