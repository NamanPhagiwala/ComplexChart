import "./globals.css";
import { circular } from "./utils/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${circular.variable} antialiased my-20`}>
        {children}
      </body>
    </html>
  );
}
