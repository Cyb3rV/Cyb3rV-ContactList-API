import { ContactListProvider } from "@/components/ContactListContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ContactListProvider>
      <Component {...pageProps} />;
    </ContactListProvider>
)
}
