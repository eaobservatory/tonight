"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import DatePicker from "@/components/navigation/DatePicker";
import Image from "next/image";
import eao from "@/assets/eao.svg";
import { cva } from "class-variance-authority";

const customTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center px-4 py-2 bg-transparent hover:bg-transparent rounded-none text-white text-sm font-medium transition-colors hover:text-zinc-300 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent "
);

export default function Navbar() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="z-20 bg-eao max-w-full justify-between">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="https://www.eao.hawaii.edu" legacyBehavior passHref>
            <NavigationMenuLink
              className={customTriggerStyle()}
              target="_blank"
              rel="noopener noreferrer"
            >
              EAO
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={customTriggerStyle()}>
            OMP
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-1 p-6 w-auto whitespace-nowrap">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="https://omp.eao.hawaii.edu/cgi-bin/nightrep.pl?tel=JCMT"
                    target="_blank"
                  >
                    Observing Report
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="https://omp.eao.hawaii.edu/cgi-bin/queryfault.pl?cat=JCMT"
                    target="_blank"
                  >
                    Faults
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="https://omp.eao.hawaii.edu/cgi-bin/queryfault.pl?cat=JCMT_EVENTS"
                    target="_blank"
                  >
                    Events
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="https://omp.eao.hawaii.edu/cgi-bin/sched.pl?tel=JCMT"
                    target="_blank"
                  >
                    Schedule
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="https://omp.eao.hawaii.edu/cgi-bin/qstatus.pl"
                    target="_blank"
                  >
                    Queue Status
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={customTriggerStyle()}>
            Daycrew
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-1 p-6 w-auto whitespace-nowrap">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="https://www.eao.hawaii.edu/daycrew/HILO"
                    target="_blank"
                  >
                    Hilo
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="https://www.eao.hawaii.edu/daycrew/JCMT"
                    target="_blank"
                  >
                    JCMT
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="https://vlbi-control1.eao.hawaii.edu/login.html"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink
              className={customTriggerStyle()}
              target="_blank"
              rel="noopener noreferrer"
            >
              VLBI
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="py-2">
        <NavigationMenuItem className="flex items-center">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={customTriggerStyle()}>
              <Image
                src={eao}
                alt="EAO"
                width={40}
                height={40}
                className="pr-1"
              />
              JCMT Tonight
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={pathname} legacyBehavior passHref>
            <NavigationMenuLink className={customTriggerStyle()}>
              Today
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="pr-2">
          <DatePicker />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
