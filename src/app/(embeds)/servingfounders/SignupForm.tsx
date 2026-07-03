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
      const res = await fetch("/api/serving-founders-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error();

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "serving_founders_signup",
          form_name: "serving_founders_newsletter",
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p style={{ fontSize: "16px", color: "#4940C6", fontWeight: 600, marginTop: "4px" }}>
        You&rsquo;re in&mdash;check your inbox.
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
