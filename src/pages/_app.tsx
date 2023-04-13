import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="text-slate-800">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
