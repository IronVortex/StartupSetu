import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/lib/store";
import { Chatbot } from "@/components/chatbot/Chatbot";

export const metadata: Metadata = {
  title: "StartupSetu — Where Government Problems Meet Startup Solutions",
  description:
    "AI-powered bridge between government departments and verified startups. AI recommends, humans decide.",
};

const themeBootstrap = `try{var t=localStorage.getItem("startupsetu_theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Runs before first paint so a saved dark preference never flashes light. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
      </head>
      <body>
        <div className="setu-backdrop" aria-hidden />
        <AppProviders>
          {children}
          <Chatbot />
        </AppProviders>
      </body>
    </html>
  );
}
