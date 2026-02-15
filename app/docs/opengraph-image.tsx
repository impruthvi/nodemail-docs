import { ImageResponse } from "next/og";

export const alt = "@impruthvi/nodemail Documentation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        tw="flex flex-col justify-center items-center w-full h-full bg-[#0a0a0a] p-16"
      >
        <div tw="flex flex-col items-center justify-center text-center">
          <span tw="text-3xl text-zinc-400 mb-6">
            @impruthvi/nodemail
          </span>
          <span tw="text-6xl font-bold text-white mb-4">
            Documentation
          </span>
          <span tw="text-2xl text-zinc-400">
            Guides for providers, templates, queues, and more
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
