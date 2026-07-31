import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const TAR_ROAD = "#17181D";

/** Apple touch icon — the monogram on Tar Road (iOS applies its own corner radius). */
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
          backgroundColor: TAR_ROAD,
        }}
      >
        <svg width="140" height="48" viewBox="0 0 292 100">
          <path d="M0 0 H28 V72 H62 V100 H0 Z" fill="#fff" />
          <circle
            cx="127"
            cy="50"
            r="36"
            fill="none"
            stroke="#fff"
            strokeWidth="28"
          />
          <circle
            cx="242"
            cy="50"
            r="36"
            fill="none"
            stroke="#fff"
            strokeWidth="28"
          />
          <rect x="229" y="38" width="61" height="25" fill="#fff" />
          <rect x="253" y="-6" width="45" height="44" fill={TAR_ROAD} />
          <rect x="-4" y="44.5" width="300" height="11" fill={TAR_ROAD} />
        </svg>
      </div>
    ),
    size
  );
}
