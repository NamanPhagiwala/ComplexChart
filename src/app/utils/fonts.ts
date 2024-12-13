import localFont from "next/font/local";

const circular = localFont({
  src: [
    {
      path: "circular-std-medium-500.ttf",
      weight: "400",
      style: "normal",
    },
    // {
    //     path: "../../public/assets/fonts/BwGradual-Medium.woff2",
    //     weight: "500",
    //     style: "normal",
    // },
    // {
    //     path: "../../public/assets/fonts/BwGradual-Bold.woff2",
    //     weight: "700",
    //     style: "normal",
    // },
  ],
  variable: "--font-circular-std",
});

export { circular };
