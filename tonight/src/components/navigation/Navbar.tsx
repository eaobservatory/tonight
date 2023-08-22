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
import eao from "@/assets/eao.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="z-20">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Image src={eao} alt="eao" width={36} height={36} />
              JCMT Tonight
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="https://www.eao.hawaii.edu" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              target="_blank"
              rel="noopener noreferrer"
            >
              EAO
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>OMP</NavigationMenuTrigger>
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
          <NavigationMenuTrigger>Daycrew</NavigationMenuTrigger>
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
              className={navigationMenuTriggerStyle()}
              target="_blank"
              rel="noopener noreferrer"
            >
              VLBI
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={pathname} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Today
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DatePicker />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
