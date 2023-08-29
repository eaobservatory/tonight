"use client";

import { useEffect } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import DatePicker from "@/components/navigation/DatePicker";
import Image from "next/image";
import eao from "@/assets/eao.svg";
import { cva } from "class-variance-authority";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const customTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center px-4 py-2 bg-transparent hover:bg-transparent rounded-none text-white text-sm font-medium transition-colors hover:text-zinc-300 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent "
);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
      console.log(`refreshed @ ${new Date().toLocaleString()}`);
    }, 5 * 60 * 1000); // refresh current page every 5 minutes

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    // <>
    // max-lg:hidden
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
          <NavigationMenuContent className="!w-screen flex justify-start ml-[4.5rem]">
            <ul className="grid grid-cols-2 gap-y-1 gap-x-16 p-6 bg-popover shadow border">
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
          <NavigationMenuContent className="!w-screen flex justify-start ml-[9.75rem]">
            <ul className="flex-col space-y-1 p-6 bg-popover shadow border">
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
            <NavigationMenuLink className={customTriggerStyle() + "text-base"}>
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
    //   <div className="hidden max-lg:block">
    //     <HamburgerMenuIcon />
    //   </div>
    // </>
  );
}
