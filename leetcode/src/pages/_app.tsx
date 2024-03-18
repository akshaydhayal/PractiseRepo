import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";

export default function App({ Component, pageProps }: AppProps) {
  const firebaseConfig = {
    apiKey: "AIzaSyD06oU0fXpnzlsk_z8XcR4JXqX2mPMHdBA",
    authDomain: "leetcode-clone-e41a9.firebaseapp.com",
    projectId: "leetcode-clone-e41a9",
    storageBucket: "leetcode-clone-e41a9.appspot.com",
    messagingSenderId: "777879934323",
    appId: "1:777879934323:web:2dc63aaccbc0ebe426e106",
    measurementId: "G-XZ78GEWBK8",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  return <Component {...pageProps} />;
}
