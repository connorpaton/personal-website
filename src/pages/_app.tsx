import "../styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ToggleButton from "@/components/ToggleButton";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ToggleButton />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
