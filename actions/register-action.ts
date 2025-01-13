"use server";
import { signIn } from "@/auth";

export async function handleRegister(prevState: any, formData: FormData) {
  const userName = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      return { message: "Registration failed in line 21" };
    }
    const userData = await response.json();
    await signIn("credentials", {
      redirect: false,
      email: userData.user.email,
      password: userData.user.password,
    });
    return { message: "Registration Success" };
  } catch (error) {
    return { message: "Registration is taking it's time!" };
  }
}
