"use client";

import { FormEvent, useState } from "react";
import {
  CONTACT_CHANNELS,
  type ContactChannel,
} from "@/lib/contact";

type ContactFormProps = {
  channel: ContactChannel;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ channel }: ContactFormProps) {
  const config = CONTACT_CHANNELS[channel];
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    const company = String(data.get("company") || "").trim();

    if (company) {
      setStatus("success");
      form.reset();
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    if (!message) {
      setStatus("error");
      setError("Please enter a message.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          email,
          name,
          message,
          company,
        }),
      });

      const raw = await response.text();
      let parsed: { ok?: boolean; error?: string; message?: string } = {};
      try {
        parsed = JSON.parse(raw) as typeof parsed;
      } catch {
        parsed = {};
      }

      if (!response.ok || !parsed.ok) {
        setStatus("error");
        setError(
          parsed.message ||
            "Could not send email. Please try again later.",
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not send email. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <p>Message sent. We&apos;ll reply to your email soon.</p>
        <button
          type="button"
          className="contact-secondary"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <p className="contact-destination">
        Sending to <strong>{config.label}</strong> ({config.to})
      </p>

      <label className="contact-field">
        <span>Your email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={status === "sending"}
        />
      </label>

      <label className="contact-field">
        <span>Your name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Optional"
          disabled={status === "sending"}
        />
      </label>

      <label className="contact-field">
        <span>Message</span>
        <textarea
          name="message"
          required
          rows={7}
          maxLength={5000}
          placeholder="How can we help?"
          disabled={status === "sending"}
        />
      </label>

      <label className="contact-honeypot" aria-hidden="true">
        <span>Company</span>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      {error ? (
        <p className="contact-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="contact-submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send email"}
      </button>
    </form>
  );
}
