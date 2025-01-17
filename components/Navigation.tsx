"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrollEffect } from "@/hooks/useScrollEffect";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import Logo from "@/public/logo.png";

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isScrolled = useScrollEffect();

  return (
    <nav
      className={`fixed top-2 left-0 right-0 z-50 transition-all duration-300 ease-in-out
      ${
        isScrolled
          ? "bg-zinc-900 shadow-lg backdrop-blur-sm my-2 mx-4 rounded-full"
          : "bg-transparent"
      }
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex-shrink-0">
              <Image src={Logo} alt="Logo" width={32} height={32} />
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-8 w-8 mx-3 text-zinc-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search Your Favorite Audiobook..."
                  className="w-full h-14 pl-16 bg-white/5 text-zinc-100 placeholder-zinc-400 border-zinc-700 focus:border-zinc-500"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" onClick={() => setIsLoggedIn(false)}>
                  Logout
                </Button>
                <Avatar className="ml-4">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <div className="gap-4 flex items-center">
                  <InteractiveHoverButton>JOIN</InteractiveHoverButton>
                  {/* <ShimmerButton>
                    <span className="whitespace-pre-wrap text-center font-bold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                      SIGNUP
                    </span>
                  </ShimmerButton> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
