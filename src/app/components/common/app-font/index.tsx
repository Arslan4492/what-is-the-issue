import localFont from "next/font/local";

// Font files can be collocated inside of `app`
const myFont = localFont({
  src: "../../../../../public/fonts/beckan-personal-use.otf",
  display: "swap",
});

export default myFont;
