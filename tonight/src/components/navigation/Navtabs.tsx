"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cva } from "class-variance-authority";

const customTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center px-4 py-2 bg-transparent hover:bg-transparent underline-offset-8 hover:underline rounded-none text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent"
);

export default function Navtabs() {
  const pathname = usePathname();
  let activeTab;
  if (pathname == "/") {
    activeTab = 0;
  } else if (pathname.startsWith("/jcmt")) {
    activeTab = 1;
  } else if (pathname.startsWith("/observing")) {
    activeTab = 2;
  } else if (pathname.startsWith("/qa")) {
    activeTab = 3;
  } else if (pathname.startsWith("/plots")) {
    activeTab = 4;
  } else {
    activeTab = 0;
  }

  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date") || "live";

  return (
    <NavigationMenu className="max-w-full sticky top-0 bg-white">
      <NavigationMenuList className="space-x-8">
        <NavigationMenuItem>
          <Link
            href={"/" + (dateParam == "live" ? "" : `?date=${dateParam}`)}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={`${customTriggerStyle()} ${
                activeTab === 0 ? "!font-bold underline decoration-2" : ""
              }`}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${customTriggerStyle()} ${
              activeTab === 1 ? "font-bold underline decoration-2" : ""
            }`}
          >
            JCMT
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={
                      "/jcmt/conditions" +
                      (dateParam == "live" ? "" : `?date=${dateParam}`)
                    }
                  >
                    Conditions
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">Instrument Status</Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/jcmt/cameras">Cameras</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${customTriggerStyle()} ${
              activeTab === 2 ? "font-bold underline decoration-2" : ""
            }`}
          >
            Observing
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={
                      "/observing/scuba2" +
                      (dateParam == "live" ? "" : `?date=${dateParam}`)
                    }
                  >
                    SCUBA-2
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={
                      "/observing/acsis" +
                      (dateParam == "live" ? "" : `?date=${dateParam}`)
                    }
                  >
                    ACSIS
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={
                      "/observing/all" +
                      (dateParam == "live" ? "" : `?date=${dateParam}`)
                    }
                  >
                    All
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${customTriggerStyle()} ${
              activeTab === 3 ? "font-bold underline decoration-2" : ""
            }`}
          >
            QA
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/qa/scuba2">SCUBA-2</Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/qa/acsis">ACSIS</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={"/plots" + (dateParam == "live" ? "" : `?date=${dateParam}`)}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={`${customTriggerStyle()} ${
                activeTab === 4 ? "!font-bold underline decoration-2" : ""
              }`}
            >
              Plots
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
