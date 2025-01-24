"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function handleRegister(prevState: any, formData: FormData) {
  const userName = formData.get("username") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const response = await fetch("http://localhost:8081/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        userName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      return { message: "Registration failed in line 21" };
    }
    const userData = await response.json();
    console.log(userData, "new registration response from register-action");

    await signIn("credentials", {
      email: userData.user.email,
      password: password,
    });
    redirect("/");
    return { message: "Registration Success" };
  } catch (error) {
    return { message: "Registration is taking it's time!" };
  }
}
