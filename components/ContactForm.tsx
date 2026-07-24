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

    // Honeypot
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
      // Submit from the browser so FormSubmit accepts the request.
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(config.to)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name || "Website visitor",
            email,
            _replyto: email,
            _subject: config.subject,
            _template: "table",
            _captcha: "false",
            channel: config.label,
            message,
          }),
        },
      );

      const raw = await response.text();
      let parsed: { success?: string | boolean; message?: string } = {};
      try {
        parsed = JSON.parse(raw) as typeof parsed;
      } catch {
        parsed = {};
      }

      const failed =
        !response.ok ||
        parsed.success === false ||
        parsed.success === "false";

      if (failed) {
        const detail = (parsed.message || raw || "").toLowerCase();
        if (detail.includes("activation")) {
          setStatus("error");
          setError(
            `Please activate ${config.to} once: open Gmail for that inbox, find the FormSubmit email, click “Activate Form”, then send again.`,
          );
          return;
        }

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
