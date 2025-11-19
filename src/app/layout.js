import { Teko, Racing_Sans_One, Nunito_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./components/Header";

export const teko = Teko({
  subset: ["latin"],
});

export const racingSansOne = Racing_Sans_One({
  weight: "400",
  subsets: ["latin"],
});

export const nunitoSans = Nunito_Sans({
  weight: "500",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flex Mills",
  description:
    "A smart way to browse Les Mills workouts tailored to your body's needs.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${nunitoSans.className} antialiased mb-5`}>
          <Header />
          <div className="flex justify-center min-h-screen mt-5">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
