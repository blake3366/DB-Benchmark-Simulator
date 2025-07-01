import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "../store"; // 假設你有一個 Redux store 在這個

const theme = createTheme({
  typography: {
    fontFamily: "monospace", // 設定全局字體為 monospace
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 重置瀏覽器樣式 */}
      <Component {...pageProps} /> {/* 渲染每個頁面 */}
    </ThemeProvider>
    </Provider>
  );
}
