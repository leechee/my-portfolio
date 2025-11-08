"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";
const ContactSection = () => {
  return (
    <section id="contact" className="min-h-[80vh] w-full pb-20">
      <h2
        className={cn(
          "text-4xl text-center md:text-7xl pt-16 mb-8 md:mb-12",
          "text-black dark:text-white"
        )}
      >
        <Link href={"#contact"}>
          LET&apos;S WORK <br />
          TOGETHER
        </Link>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:pl-24 lg:pl-40 xl:pl-48">
        <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-light">Let&apos;s Connect!</CardTitle>
            <CardDescription>
              Please email me directly at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-gray-200 cursor-can-hover rounded-lg"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              or drop your info here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default ContactSection;
