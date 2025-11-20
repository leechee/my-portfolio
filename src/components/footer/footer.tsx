import React from "react";
import Link from "next/link";
import { footer } from "./config";
import { Button } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex w-full shrink-0 flex-col sm:flex-row items-center justify-between gap-4 border-t border-border px-4 py-6 md:px-6 relative z-50 bg-white dark:bg-black">
      <p className="text-xs text-gray-500 dark:text-gray-400 order-2 sm:order-1">
        made with lots of caffeine © {year} jason lee
      </p>
      <div className="order-1 sm:order-2 mx-auto sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
        <SocialMediaButtons />
      </div>
      <div className="hidden sm:block order-3"></div>
    </footer>
  );
}

export default Footer;
