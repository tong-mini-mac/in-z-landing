export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "https://personal-secretary-production-3d5f.up.railway.app/contact/" },
];

export function SiteNav() {
  return (
    <nav className="nav" aria-label="Primary">
        {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          {...(item.href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm5.1-8.2a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 3.5c-2.3 0-2.59.01-3.5.05-.9.04-1.52.19-2.06.4a4.16 4.16 0 0 0-1.5 1c-.42.42-.74.92-.98 1.5-.22.54-.36 1.16-.4 2.06C3.51 9.41 3.5 9.7 3.5 12s.01 2.59.05 3.5c.04.9.19 1.52.4 2.06.24.58.56 1.08.98 1.5.42.42.92.74 1.5.98.54.22 1.16.36 2.06.4.91.04 1.2.05 3.5.05s2.59-.01 3.5-.05c.9-.04 1.52-.19 2.06-.4a4.16 4.16 0 0 0 1.5-.98c.42-.42.74-.92.98-1.5.22-.54.36-1.16.4-2.06.04-.91.05-1.2.05-3.5s-.01-2.59-.05-3.5c-.04-.9-.19-1.52-.4-2.06a4.16 4.16 0 0 0-.98-1.5 4.16 4.16 0 0 0-1.5-.98c-.54-.22-1.16-.36-2.06-.4-.91-.04-1.2-.05-3.5-.05Zm0 1.53c2.26 0 2.53.01 3.42.05.83.04 1.28.17 1.58.29.4.15.68.34.98.64.3.3.49.58.64.98.12.3.25.75.29 1.58.04.89.05 1.16.05 3.42s-.01 2.53-.05 3.42c-.04.83-.17 1.28-.29 1.58-.15.4-.34.68-.64.98-.3.3-.58.49-.98.64-.3.12-.75.25-1.58.29-.89.04-1.16.05-3.42.05s-2.53-.01-3.42-.05c-.83-.04-1.28-.17-1.58-.29a2.63 2.63 0 0 1-.98-.64 2.63 2.63 0 0 1-.64-.98c-.12-.3-.25-.75-.29-1.58-.04-.89-.05-1.16-.05-3.42s.01-2.53.05-3.42c.04-.83.17-1.28.29-1.58.15-.4.34-.68.64-.98.3-.3.58-.49.98-.64.3-.12.75-.25 1.58-.29.89-.04 1.16-.05 3.42-.05Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 8.5V6.8c0-.7.1-1.1 1.1-1.1H17V3h-2.3C12 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 7.3c.7-.4 1.2-1.1 1.4-1.9-.6.4-1.4.7-2.1.8A3.4 3.4 0 0 0 12.5 9c0 .3 0 .5.1.8-2.8-.1-5.3-1.5-7-3.6-.3.5-.4 1.1-.4 1.7 0 1.2.6 2.2 1.5 2.8-.6 0-1.1-.2-1.6-.4v.1c0 1.6 1.2 3 2.7 3.3-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.7 2.3 3.2 2.3A6.9 6.9 0 0 1 5 17.3 9.7 9.7 0 0 0 10.3 19c6.2 0 9.6-5.1 9.6-9.6v-.4c.7-.5 1.2-1.1 1.6-1.8-.6.3-1.3.5-2 0.6Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5c-4.7 0-8.5 3.3-8.5 7.4 0 2.4 1.3 4.5 3.4 5.9l-.7 3.3 3.5-1.9c.7.2 1.5.3 2.3.3 4.7 0 8.5-3.3 8.5-7.4S16.7 3.5 12 3.5Zm-3 6.2h6v1.5H9V9.7Zm0 3h4.2v1.5H9V12.7Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="social" aria-label="Social links">
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
          <InstagramIcon />
        </a>
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
          <FacebookIcon />
        </a>
        <a href="https://x.com" aria-label="Twitter" target="_blank" rel="noreferrer">
          <TwitterIcon />
        </a>
        <a
          href="https://personal-secretary-production-3d5f.up.railway.app/contact/"
          aria-label="Contact"
          target="_blank"
          rel="noreferrer"
        >
          <ChatIcon />
        </a>
      </div>

      <div className="legal">
        <a href="/terms">Term and Support</a>
        <a href="/privacy">Privacy and Policy</a>
      </div>
    </footer>
  );
}
