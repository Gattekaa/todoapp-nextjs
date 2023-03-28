import "@/styles/globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export default function App({ Component, pageProps }) {
const [sender, setSender] = useState("");

  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} sender={sender} />
    </AuthProvider>
  )
}
