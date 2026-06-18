"use client";

// TODO: replace with real Kit form ID
const KIT_FORM_ID = "TODO_REPLACE_WITH_KIT_FORM_ID";
// TODO: replace with real Kit public API key (from Chris/Sapir)
const KIT_API_KEY = "TODO_REPLACE_WITH_KIT_API_KEY";

import { useState, type FormEvent } from "react";

export default function SignupForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();

    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: KIT_API_KEY, first_name: name, email }),
        }
      );
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p style={{ fontSize: "16px", color: "#15131c", fontWeight: 600, marginTop: "4px" }}>
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
        <p style={{ fontSize: "14px", color: "#c0392b", marginTop: "10px" }}>{errorMsg}</p>
      )}
    </>
  );
}
