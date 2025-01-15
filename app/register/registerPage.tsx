"use client";
import { handleRegister } from "@/actions/register-action";
import React from "react";

export default function SignUpPage() {
  const [state, formAction] = React.useActionState(handleRegister, null);

  return (
    <div className="container">
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        {/* <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
          />
        </div> */}
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Register</button>
        {state?.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}
