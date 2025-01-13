import { auth } from "@/auth";
import SignUpPage from "./registerPage";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await auth();
  if (session?.user) redirect("/");

  return <SignUpPage />;
}
