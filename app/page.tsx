import { auth, signOut } from "@/auth";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log("from home", session?.user);

  return (
    <>
      <BackgroundBeamsWithCollision className="lg:max-w-7xl mx-auto">
        <h2 className="text-2xl z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Just Listen
          {/* <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]"> */}
          {/* <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">Exploding beams.</span>
            </div> */}
          {/* <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="w-full"
            >
              <button className="w-full p-0">Sign Out</button>
            </form>
            <Link href="/middleware-example">Middleware</Link> */}
          {/* </div> */}
        </h2>
      </BackgroundBeamsWithCollision>
      <div className="max-h-screen">
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
        <h1>Hello my name is Promise</h1>
      </div>
    </>
  );
}
