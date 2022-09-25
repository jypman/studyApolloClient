import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import eslint from "vite-plugin-checker";

// https://vitejs.dev/config/
export default () => {

  return defineConfig({
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 8080,
      open: true,
    },
    build: {
      outDir: "publish",
    },

    // esbuild 옵션 확장
    esbuild: {
      jsxInject: `import React from "react"`, // jsxInject : JSX에 대한 헬퍼를 사용
    },

    plugins: [
      react(),

      // 이 플러그인을 사용하면 자동으로 레거시 버전에 대한 청크를 생성한다.
      // 이를 통해 레거시 브라우저 또한 Vite으로 빌드된 앱을 이용할 수 있게 됩니다.
      // 참고로, 생성된 레거시 청크는 브라우저가 ESM을 지원하지 않는 경우에만 불러오게 됩니다.
      // legacy()를 사용하려면 terser를 설치해줘야 한다.
      // 그렇지 않으면 build 시 에러가 발생한다.(ver3부터 terser는 선택적 옵션으로 되었다.)
      legacy(),

      // 이 플러그인은 vender에 대한 청크를 생성해준다.
      // build.rollupOptions.output.manualChunks를 사용해 청크를 분할할 수 있지만 Vite 2.9부터 manualChunks는 더 이상 기본적으로 수정하지 않는다.
      // 만약 계속 manualChunks를 수정하기 원한다면 splitVendorChunkPlugin을 사용하도록 권장하고 있다.
      splitVendorChunkPlugin(),

      eslint({
        typescript: {
          tsconfigPath: "./tsconfig.json",
        },
        eslint: {
          lintCommand: "eslint --cache=true",
          dev: {
            logLevel: ["error"],
          },
        },
        overlay: { position: "br" },
      }),
    ],
  });
};
