import "./globals.css";
import { circular } from "./utils/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`light text-black ${circular.variable} antialiased my-20 bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
