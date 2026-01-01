import "../globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
    title: "Admin Portal",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${outfit.className} antialiased bg-stone-50 text-stone-900`}>
                {children}
            </body>
        </html>
    );
}
