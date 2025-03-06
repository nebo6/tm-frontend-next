import type { NextConfig } from "next";
import svg from "@neodx/svg/webpack";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        svg({
          root: "src/shared/assets/sprites",
          output: "public/sprites",
          resetColors: {
            replaceUnknown: "currentColor",
          },
          fileName: "{name}.{hash:8}.svg",
          metadata: {
            path: "src/sprite.gen.ts",
            // generate metadata
            runtime: {
              size: true,
              viewBox: true,
            },
          },
        })
      );
    }
    return config;
  },
};

export default nextConfig;
