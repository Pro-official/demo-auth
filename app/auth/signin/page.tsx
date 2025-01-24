import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
export default async function page() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        <input
          className="border-2 border-teal-500"
          type="email"
          name="email"
          id="1"
        />
        <br />
        <input
          className="mt-10 border-2 border-teal-500"
          type="password"
          name="password"
        />
        <br />
        <button className="mt-10 border-2 border-teal-500" type="submit">
          Join
        </button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button className="border-2 border-white">Sign in With Google</button>
      </form>
    </div>
  );
}
