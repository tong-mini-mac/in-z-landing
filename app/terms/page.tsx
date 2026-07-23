import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Term and Support — IN Z",
  description:
    "IN Z support center, FAQ, and terms of service. We're here to help you achieve balance.",
};

const CONTACT =
  "https://personal-secretary-production-3d5f.up.railway.app/contact/";

const helpTopics = [
  {
    title: "Getting Started",
    items: [
      "How to create an account",
      "Setting up your first project",
      "Understanding the dashboard",
      "Mobile app setup",
    ],
  },
  {
    title: "Account Management",
    items: [
      "Update profile information",
      "Change password",
      "Update payment method",
      "Delete account",
    ],
  },
  {
    title: "Features & Tools",
    items: [
      "How AI recommendations work",
      "Understanding analytics",
      "Integrations guide",
      "Advanced settings",
    ],
  },
  {
    title: "Billing & Subscription",
    items: [
      "Pricing plans comparison",
      "Upgrade or downgrade",
      "View invoices",
      "Cancel subscription",
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      "Common issues and fixes",
      "Connection problems",
      "Mobile app issues",
      "Browser compatibility",
    ],
  },
];

const faqs = [
  {
    q: "Is IN Z free?",
    a: "It depends on the package. You can view pricing details in our products section.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel anytime with no penalties. Access continues until the billing period ends.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use bank-level encryption and never sell your data.",
  },
  {
    q: "What platforms do you support?",
    a: "Web, iOS, Android, Mac, Windows, and Chrome Extension.",
  },
  {
    q: "Do you offer refunds?",
    a: "As a digital product, we do not offer refunds.",
  },
  {
    q: "Which browsers are supported?",
    a: "Chrome, Firefox, Safari, and Edge (latest two versions).",
  },
  {
    q: "Can I use IN Z offline?",
    a: "Limited offline functionality is available on mobile apps.",
  },
  {
    q: "How do I export my data?",
    a: "Go to Settings → Data → Export. Available in JSON and CSV formats.",
  },
];

export default function TermsSupportPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about">
        <header className="about-hero">
          <p className="about-eyebrow">Support Center</p>
          <h1>Term and Support</h1>
          <p className="about-lead">
            We&apos;re here to help you achieve balance. Find guides, answers, and our
            terms of service below.
          </p>
          <p className="about-motto">
            <a href="#support">Support</a>
            <span aria-hidden="true"> · </span>
            <a href="#faq">FAQ</a>
            <span aria-hidden="true"> · </span>
            <a href="#terms">Terms of Service</a>
          </p>
        </header>

        <section className="about-block" id="support">
          <h2>Getting started</h2>
          <h3>New to IN Z?</h3>
          <ol className="about-steps">
            <li>
              <strong>Create your account</strong> — Sign up in 30 seconds
            </li>
            <li>
              <strong>Complete onboarding</strong> — Tell us about your goals
            </li>
            <li>
              <strong>Connect your tools</strong> — Integrate your workflow
            </li>
            <li>
              <strong>Start balancing</strong> — Let AI do the heavy lifting
            </li>
          </ol>
        </section>

        <section className="about-block">
          <h2>Contact support</h2>
          <p>We&apos;re available 24/7. Have questions? Need help? We&apos;re here for you.</p>
          <p>
            <a className="about-mail" href={CONTACT} target="_blank" rel="noreferrer">
              Contact Support
            </a>
          </p>
        </section>

        <section className="about-block">
          <h2>Help center</h2>
          <p>Popular topics to get you unstuck quickly.</p>
          <ul className="about-pillars">
            {helpTopics.map((topic) => (
              <li key={topic.title}>
                <strong>{topic.title}</strong>
                <ul>
                  {topic.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-block">
          <h2>Resources</h2>
          <ul className="about-pillars about-pillars-inline">
            <li>
              <strong>Video tutorials</strong>
              <span>IN Z in 5 Minutes · Advanced Features · Integration Setup · Tips &amp; Tricks</span>
            </li>
            <li>
              <strong>Webinars</strong>
              <span>Weekly Live Q&amp;A · Feature Deep Dives · Best Practices Workshop</span>
            </li>
            <li>
              <strong>Blog</strong>
              <span>Product Updates · Productivity Tips · Success Stories · Industry Insights</span>
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>Technical support</h2>
          <ul>
            <li>
              <strong>System status</strong> — All systems operational
            </li>
            <li>
              <strong>API documentation</strong> — For developers and advanced users
            </li>
            <li>
              <strong>Report a bug</strong> —{" "}
              <a href={CONTACT} target="_blank" rel="noreferrer">
                Submit bug report
              </a>
            </li>
            <li>
              <strong>Feature request</strong> —{" "}
              <a href={CONTACT} target="_blank" rel="noreferrer">
                Submit request
              </a>
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>Enterprise support</h2>
          <p>Dedicated support for teams:</p>
          <ul>
            <li>Dedicated Account Manager</li>
            <li>Custom Training Sessions</li>
            <li>Technical Implementation Help</li>
            <li>Custom Reporting</li>
            <li>Priority Support</li>
          </ul>
          <p>
            <a className="about-mail" href={CONTACT} target="_blank" rel="noreferrer">
              Contact Enterprise Team
            </a>
          </p>
        </section>

        <section className="about-block">
          <h2>Community</h2>
          <p>Join the IN Z community to share experiences and stay updated.</p>
          <ul>
            <li>Discord — Chat with other users</li>
            <li>Twitter — Latest updates and tips</li>
            <li>Facebook Group — Share experiences</li>
            <li>LinkedIn — Professional networking</li>
          </ul>
        </section>

        <section className="about-block" id="faq">
          <h2>FAQ</h2>
          <dl className="about-faq">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="about-block about-close">
          <h2>Still need help?</h2>
          <p>
            Can&apos;t find what you&apos;re looking for? Our support team is ready to help.
          </p>
          <p className="about-signoff">Helping you find balance, one drop at a time.</p>
          <p>
            <a className="about-mail" href={CONTACT} target="_blank" rel="noreferrer">
              Contact Support
            </a>
          </p>
        </section>

        <hr className="about-divider" />

        <section className="about-block" id="terms">
          <header className="about-hero about-hero-compact">
            <p className="about-eyebrow">Legal</p>
            <h2 className="about-title-lg">Terms of Service</h2>
            <p className="about-lead">Last updated: July 23, 2026</p>
          </header>

          <p>
            Welcome to IN Z. By accessing or using our platform, you agree to be bound by
            these Terms of Service.
          </p>
        </section>

        <section className="about-block">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using IN Z services, you acknowledge that you have
            read, understood, and agree to be bound by these Terms of Service and our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </section>

        <section className="about-block">
          <h2>2. Description of Service</h2>
          <p>
            IN Z provides AI-powered tools designed to help users achieve work-life
            balance through:
          </p>
          <ul>
            <li>Intelligent task management</li>
            <li>AI-driven insights and recommendations</li>
            <li>Productivity optimization tools</li>
            <li>Personal workflow automation</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>3. User Accounts</h2>
          <h3>3.1 Account Creation</h3>
          <ul>
            <li>You must provide accurate and complete information</li>
            <li>You must be at least 18 years old to create an account</li>
            <li>You are responsible for maintaining account security</li>
          </ul>
          <h3>3.2 Account Responsibilities</h3>
          <ul>
            <li>Keep your password confidential</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>You are responsible for all activities under your account</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>4. Acceptable Use</h2>
          <p>You agree NOT to:</p>
          <ul>
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Upload malicious code or viruses</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use the service for any illegal or harmful purposes</li>
            <li>Resell or redistribute our services without permission</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>5. Subscription and Payment</h2>
          <h3>5.1 Pricing</h3>
          <ul>
            <li>Subscription fees are charged in advance</li>
            <li>Prices are subject to change with 30 days notice</li>
            <li>All fees are non-refundable except as required by law</li>
          </ul>
          <h3>5.2 Free Trial</h3>
          <ul>
            <li>Free trials may be available for new users</li>
            <li>Credit card may be required; cancel anytime before trial ends</li>
            <li>Automatic conversion to paid subscription unless cancelled</li>
          </ul>
          <h3>5.3 Cancellation</h3>
          <ul>
            <li>You may cancel your subscription at any time</li>
            <li>Access continues until the end of the billing period</li>
            <li>No refunds for partial months</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>6. Intellectual Property</h2>
          <h3>6.1 Our Rights</h3>
          <ul>
            <li>All content, features, and functionality are owned by IN Z</li>
            <li>Our trademarks, logos, and brand features are protected</li>
          </ul>
          <h3>6.2 Your Content</h3>
          <ul>
            <li>You retain ownership of content you upload</li>
            <li>You grant us license to use your content to provide services</li>
            <li>We will not share your content without permission</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>7. AI and Data Usage</h2>
          <h3>7.1 AI Processing</h3>
          <ul>
            <li>Our AI learns from aggregated, anonymized data</li>
            <li>Your personal data is never sold to third parties</li>
            <li>AI recommendations are suggestions, not guarantees</li>
          </ul>
          <h3>7.2 Data Security</h3>
          <ul>
            <li>We use industry-standard encryption</li>
            <li>Regular security audits and updates</li>
            <li>
              See our{" "}
              <a href="/privacy">Privacy Policy</a> for details
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>8. Limitation of Liability</h2>
          <p>
            IN Z is provided &quot;as is&quot; without warranties of any kind. We are not
            liable for:
          </p>
          <ul>
            <li>Service interruptions or errors</li>
            <li>Loss of data or content</li>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Decisions made based on AI recommendations</li>
          </ul>
          <p>
            Maximum liability is limited to the amount paid in the last 12 months.
          </p>
        </section>

        <section className="about-block">
          <h2>9. Termination</h2>
          <h3>9.1 By You</h3>
          <ul>
            <li>Cancel anytime through account settings</li>
            <li>Data export available for 30 days after cancellation</li>
          </ul>
          <h3>9.2 By Us</h3>
          <ul>
            <li>We may suspend or terminate accounts for Terms violations</li>
            <li>We may discontinue service with 90 days notice</li>
            <li>Refunds provided on a pro-rata basis for service discontinuation</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>10. Changes to Terms</h2>
          <ul>
            <li>We may update these Terms at any time</li>
            <li>Significant changes will be notified via email</li>
            <li>Continued use constitutes acceptance of new Terms</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by applicable law, without regard to conflict of
            law provisions.
          </p>
        </section>

        <section className="about-block about-close">
          <h2>12. Contact</h2>
          <p>Questions about these Terms? Contact us.</p>
          <p>
            By using IN Z, you agree to these Terms of Service.
          </p>
          <p>
            <a className="about-mail" href={CONTACT} target="_blank" rel="noreferrer">
              Contact Us
            </a>
          </p>
        </section>
      </article>

      <div className="about-footer-wrap">
        <SiteFooter />
      </div>
    </main>
  );
}
