import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Menu from "@/components/Menu";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CostCrew App",
  description: "CostCrew: Free and Effortless Expense Sharing for Your Crew",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Menu />
            {children}
            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-lg">
              &copy; CostCrew
            </footer>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
