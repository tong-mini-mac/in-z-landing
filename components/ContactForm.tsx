"use client";

import { FormEvent, useState } from "react";
import {
  CONTACT_CHANNELS,
  type ContactChannel,
} from "@/lib/contact";
import { SITE_COPY } from "@/lib/site-i18n";
import { useSiteLang } from "@/lib/use-site-lang";

type ContactFormProps = {
  channel: ContactChannel;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ channel }: ContactFormProps) {
  const lang = useSiteLang();
  const t = SITE_COPY[lang].contact;
  const config = CONTACT_CHANNELS[channel];
  const channelLabel = t.channels[channel];
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
      setError(t.errEmail);
      return;
    }

    if (!message) {
      setStatus("error");
      setError(t.errMessage);
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
        setError(parsed.message || t.errGeneric);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(t.errGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <p>{t.success}</p>
        <button
          type="button"
          className="contact-secondary"
          onClick={() => setStatus("idle")}
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <p className="contact-destination">
        {t.sendingTo} <strong>{channelLabel}</strong> ({config.to})
      </p>

      <label className="contact-field">
        <span>{t.email}</span>
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
        <span>{t.name}</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder={t.namePlaceholder}
          disabled={status === "sending"}
        />
      </label>

      <label className="contact-field">
        <span>{t.message}</span>
        <textarea
          name="message"
          required
          rows={7}
          maxLength={5000}
          placeholder={t.messagePlaceholder}
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
        {status === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}
