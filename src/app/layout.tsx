import "./globals.css";
import { circular } from "./utils/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`text-black ${circular.variable} mt-10 bg-white`}>
        {children}
      </body>
    </html>
  );
}
