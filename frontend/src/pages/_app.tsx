import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "monospace", // 設定全局字體為 monospace
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 重置瀏覽器樣式 */}
      <Component {...pageProps} /> {/* 渲染每個頁面 */}
    </ThemeProvider>
  );
}
