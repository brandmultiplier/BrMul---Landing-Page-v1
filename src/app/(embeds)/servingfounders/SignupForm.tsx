"use client";

import { useState, type FormEvent } from "react";

export default function SignupForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();

    try {
      const res = await fetch("https://api.kit.com/v4/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": process.env.NEXT_PUBLIC_KIT_API_KEY ?? "",
        },
        body: JSON.stringify({ email_address: email, first_name: name }),
      });
      if (res.status !== 200 && res.status !== 201) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p style={{ fontSize: "16px", color: "#4940C6", fontWeight: 600, marginTop: "4px" }}>
        You&rsquo;re in — check your inbox.
      </p>
    );
  }

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="First name" aria-label="First name" required />
        <input type="email" name="email" placeholder="Work email" aria-label="Work email" required />
        <button className="btn" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p style={{ fontSize: "14px", color: "#c0392b", marginTop: "10px" }}>
          Something went wrong — please try again.
        </p>
      )}
    </>
  );
}
