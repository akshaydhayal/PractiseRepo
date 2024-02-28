import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return <div>
    <RecoilRoot>
      <Navbar/>
      <Component {...pageProps} />;
    </RecoilRoot>
  </div>
}
