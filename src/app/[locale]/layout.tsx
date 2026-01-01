import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Outfit, Cairo } from "next/font/google"; // Premium fonts
import "../globals.css"; // Correct path to globals.css
import Tracker from "@/components/Tracker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "Portail Des Horizons",
  description: "Study in Turkey Scholarship Portal",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontClass = locale === "ar" ? cairo.className : outfit.className;

  return (
    <html lang={locale} dir={dir}>
      <body className={`${fontClass} antialiased bg-stone-50 text-stone-900`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Tracker />
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
