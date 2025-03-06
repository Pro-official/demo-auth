"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrollEffect } from "@/hooks/useScrollEffect";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
// import { auth } from "@/auth";
// import { useSession } from "next-auth/react";

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isScrolled = useScrollEffect();
  // const { data: session } = useSession();

  // console.log(session?.user, "In navigation");
  // if (!session?.user) return null;

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out p-2
      ${
        isScrolled
          ? "bg-white/5 shadow-lg backdrop-blur-md my-2 mx-48 rounded-full"
          : "bg-transparent"
      }
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <AudioLines className="h-8 w-8 mx-3 text-zinc-400" />
                <h1 className="text-xl font-bold">TrueNaad</h1>
              </div>
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-8 w-8 mx-3 text-zinc-400" />
                </div>
                <SearchInput
                  type="search"
                  placeholder="Search..."
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
                  {/* <Link href="/join">
                    <InteractiveHoverButton className="bg-[#f1c40f] text-[#0f0016]">
                      JOIN
                    </InteractiveHoverButton>
                  </Link> */}
                  <Link href="/client-example">
                    <InteractiveHoverButton className="bg-[#30E3CA]">
                      Join
                    </InteractiveHoverButton>
                  </Link>
                  {/* <Link href="/dashboard">
                    <InteractiveHoverButton className="bg-[#1abc9c]">
                      Dash
                    </InteractiveHoverButton>
                  </Link> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
