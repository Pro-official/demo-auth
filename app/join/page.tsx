import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Apple, Facebook, Twitter } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen  text-zinc-100 flex flex-col md:flex-row-reverse">
      {/* Image Section */}
      <div className="w-full md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Headphones on colorful background"
          //   layout="fill"
          //   objectFit="cover"
          className="h-full w-full object-cover  grayscale"
        />
        <div className="absolute inset-0 bg-zinc-900/30" />
      </div>

      {/* Sign-in Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-zinc-900">
        <h1 className="text-4xl font-bold mb-8 text-zinc-100">Welcome Back</h1>
        <div className="space-y-4 w-full max-w-sm">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700"
            // onClick={() => console.log("Sign in with Google")}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700"
            // onClick={() => console.log("Sign in with Twitter")}
          >
            <Twitter className="w-5 h-5 mr-2" />
            Sign in with Twitter
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700"
            // onClick={() => console.log("Sign in with Facebook")}
          >
            <Facebook className="w-5 h-5 mr-2" />
            Sign in with Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-700"
            // onClick={() => console.log("Sign in with Apple")}
          >
            <Apple className="w-5 h-5 mr-2" />
            Sign in with Apple
          </Button>
        </div>
      </div>
    </div>
  );
}
