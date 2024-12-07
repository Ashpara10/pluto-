import NextAuthSessionProvider from "@/lib/session-provider";
import "./globals.css";
import "./editor.css";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

const inter = localFont({
  src: "./font/InterVariable.ttf",
  display: "swap",
});
export const metadata = {
  title: "Pluto",
  description:
    "A seamless platform to create, organize, and share documents. Harness the power of an intuitive WYSIWYG editor to craft content, organize it into collections, and generate public links for effortless sharing. With AI-powered chat, interact with your data in real-time, enhancing productivity and collaboration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="h-screen w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <ThemeProvider attribute="class" defaultTheme="system">
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
