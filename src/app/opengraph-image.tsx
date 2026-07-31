import { ImageResponse } from "next/og";

export const alt =
  "LOG — Lord of Gyms & Fitness. Premium gym in Hetauda, Nepal. Train hard. Wear it louder.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAR_ROAD = "#17181D";
const GREY = "#8B9096";

/** Fetch the Anton TTF from Google Fonts at build time. */
async function loadAnton(): Promise<ArrayBuffer> {
  const css = await fetch("https://fonts.googleapis.com/css2?family=Anton").then(
    (res) => res.text()
  );
  const url = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error("Could not resolve Anton font URL");
  return fetch(url).then((res) => res.arrayBuffer());
}

export default async function OpenGraphImage() {
  const anton = await loadAnton();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: TAR_ROAD,
          gap: 44,
        }}
      >
        {/* The mark — channel + G terminal drawn as background-coloured overlays */}
        <svg width="440" height="151" viewBox="0 0 292 100">
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

        <div
          style={{
            display: "flex",
            fontFamily: "Anton",
            fontSize: 64,
            color: "#F4F5F6",
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          Train hard. Wear it louder.
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Anton",
            fontSize: 26,
            color: GREY,
            textTransform: "uppercase",
            letterSpacing: 8,
          }}
        >
          Strength · Cardio · Zumba · Dance · Supplements
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Anton",
            fontSize: 22,
            color: GREY,
            textTransform: "uppercase",
            letterSpacing: 8,
            opacity: 0.8,
          }}
        >
          Kapur Complex · Hetauda · Nepal
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Anton", data: anton, style: "normal", weight: 400 }],
    }
  );
}
