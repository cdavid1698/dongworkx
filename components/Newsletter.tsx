"use client";

import { useState, type FormEvent } from "react";
import { isValidPhMobile, isValidEmail } from "@/lib/format";

/** Promo sign-up. Demo only: nothing is sent or stored. */
export function Newsletter() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(value) && !isValidPhMobile(value)) {
      setError("Enter an email, or a mobile number like 0917 123 4567.");
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="text-lg">
        You&rsquo;re on the list. We&rsquo;ll send promos and new parts to <strong>{value}</strong>. (Demo: nothing was sent.)
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-md">
      <label htmlFor="promo-contact" className="font-semibold">
        Email or mobile number
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="promo-contact"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "promo-error" : undefined}
          autoComplete="email"
          className="h-12 min-w-0 flex-1 rounded border border-line bg-paper px-3 text-ink aria-invalid:border-workx-deep"
        />
        <button type="submit" className="h-12 rounded bg-ink px-5 font-semibold text-paper hover:bg-ink-2">
          Get promos
        </button>
      </div>
      {error && (
        <p id="promo-error" className="mt-2 text-workx-deep">
          {error}
        </p>
      )}
    </form>
  );
}
