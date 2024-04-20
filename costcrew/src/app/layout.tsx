import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { fonts } from "./fonts";
import NavBar from "./components/NavBar";
import { Container, Box } from "@chakra-ui/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CostCrew",
  description: "CostCrew: Effortless Expense Sharing for Your Crew",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <Container maxW="container.lg">{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
