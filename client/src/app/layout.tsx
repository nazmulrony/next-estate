// import Navbar from '@/components/Navbar';
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next Estate",
    description: "Next estate title description",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#f1f5f1]`}>
                <Navbar />
                <div>{children}</div>
            </body>
        </html>
    );
}
