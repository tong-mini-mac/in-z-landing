import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Privacy Policy — IN Z",
  description:
    "How IN Z collects, uses, discloses, and safeguards your information. We do not sell your personal data.",
};

const CONTACT =
  "https://personal-secretary-production-3d5f.up.railway.app/contact/";

export default function PrivacyPage() {
  return (
    <main className="page page-scroll">
      <div className="bg bg-soft" aria-hidden="true" />
      <SiteNav />

      <article className="about">
        <header className="about-hero">
          <p className="about-eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="about-lead">
            At IN Z, we take your privacy seriously. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use our
            platform.
          </p>
          <p className="about-motto">Last updated: July 23, 2026</p>
        </header>

        <section className="about-block">
          <h2>1. Information We Collect</h2>
          <h3>1.1 Information You Provide to Us</h3>
          <p>
            <strong>Account information</strong> — name and email address, encrypted
            password, profile information, and payment information processed securely
            through third-party providers.
          </p>
          <p>
            <strong>Content you create</strong> — tasks, notes, and projects; files and
            documents you upload; preferences and settings; feedback and communications.
          </p>
          <h3>1.2 Information Automatically Collected</h3>
          <p>
            <strong>Usage data</strong> — pages visited and features used, time spent on
            the platform, click patterns and interactions, and device information
            (browser type, OS, device ID).
          </p>
          <p>
            <strong>Technical data</strong> — IP address, cookies and similar
            technologies, log data and error reports, and performance metrics.
          </p>
        </section>

        <section className="about-block">
          <h2>2. How We Use Your Information</h2>
          <ul className="about-pillars about-pillars-inline">
            <li>
              <strong>Provide and improve services</strong>
              <span>
                Operate and maintain the platform, personalize your experience, improve
                AI recommendations, and develop new features.
              </span>
            </li>
            <li>
              <strong>Communication</strong>
              <span>
                Send service updates and notifications, respond to inquiries, send
                marketing communications with your consent, and provide customer support.
              </span>
            </li>
            <li>
              <strong>Security and compliance</strong>
              <span>
                Detect and prevent fraud, ensure platform security, comply with legal
                obligations, and enforce our Terms of Service.
              </span>
            </li>
            <li>
              <strong>Analytics and research</strong>
              <span>
                Analyze usage patterns, conduct research and development, and generate
                aggregated anonymized statistics.
              </span>
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>3. How We Share Your Information</h2>
          <p>
            We <strong>do not sell</strong> your personal information. We may share your
            information only in these circumstances:
          </p>
          <h3>3.1 With Your Consent</h3>
          <p>When you explicitly authorize us to share information.</p>
          <h3>3.2 Service Providers</h3>
          <ul>
            <li>Third-party vendors who help us operate the platform</li>
            <li>Payment processors (such as Stripe or PayPal)</li>
            <li>Cloud hosting providers (such as AWS or Google Cloud)</li>
            <li>Analytics services (such as Google Analytics)</li>
          </ul>
          <p>All service providers are bound by confidentiality agreements.</p>
          <h3>3.3 Business Transfers</h3>
          <p>
            In case of merger, acquisition, or sale of assets, you will be notified of
            any change in ownership.
          </p>
          <h3>3.4 Legal Requirements</h3>
          <ul>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>To prevent fraud or illegal activities</li>
            <li>In response to lawful requests by public authorities</li>
          </ul>
          <h3>3.5 Aggregated Data</h3>
          <p>
            We may share anonymized, aggregated data that cannot identify you, used for
            research, marketing, and industry analysis.
          </p>
        </section>

        <section className="about-block">
          <h2>4. AI and Machine Learning</h2>
          <h3>4.1 How Our AI Works</h3>
          <ul>
            <li>
              Our AI analyzes your usage patterns to provide personalized recommendations
            </li>
            <li>AI learns from aggregated, anonymized data across all users</li>
            <li>Your specific content is never shared with other users</li>
          </ul>
          <h3>4.2 Data Used for AI Training</h3>
          <ul>
            <li>Usage patterns and interactions (anonymized)</li>
            <li>Feature preferences (anonymized)</li>
            <li>Performance metrics (aggregated)</li>
          </ul>
          <h3>4.3 Your Control</h3>
          <ul>
            <li>You can opt out of AI personalization in Settings</li>
            <li>You can request deletion of your data at any time</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>5. Data Security</h2>
          <p>We implement industry-standard security measures:</p>
          <ul className="about-pillars about-pillars-inline">
            <li>
              <strong>Encryption</strong>
              <span>
                Data encrypted in transit (SSL/TLS), encrypted at rest (AES-256), and
                passwords hashed and salted.
              </span>
            </li>
            <li>
              <strong>Access controls</strong>
              <span>
                Multi-factor authentication available, role-based access controls, and
                regular security audits.
              </span>
            </li>
            <li>
              <strong>Monitoring</strong>
              <span>
                24/7 security monitoring, intrusion detection systems, and regular
                vulnerability assessments.
              </span>
            </li>
          </ul>
          <p>
            However, no method of transmission over the Internet is 100% secure. We
            cannot guarantee absolute security.
          </p>
        </section>

        <section className="about-block">
          <h2>6. Data Retention</h2>
          <h3>Active Accounts</h3>
          <ul>
            <li>We retain your data as long as your account is active</li>
            <li>Data is used to provide and improve services</li>
          </ul>
          <h3>Deleted Accounts</h3>
          <ul>
            <li>Data is deleted within 30 days of account deletion</li>
            <li>
              Some data may be retained for legal compliance (e.g., transaction records)
            </li>
            <li>Aggregated, anonymized data may be retained indefinitely</li>
          </ul>
          <h3>Backups</h3>
          <ul>
            <li>Backup copies may persist for up to 90 days</li>
            <li>Backups are securely encrypted and access-controlled</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>7. Your Rights and Choices</h2>
          <ul className="about-pillars about-pillars-inline">
            <li>
              <strong>Access and portability</strong>
              <span>
                Request a copy of your data and export it in JSON or CSV via Settings →
                Data → Export.
              </span>
            </li>
            <li>
              <strong>Correction</strong>
              <span>
                Update your profile information and correct inaccurate data via Settings
                → Profile.
              </span>
            </li>
            <li>
              <strong>Deletion</strong>
              <span>
                Delete your account and data, or request deletion of specific information
                via Settings → Account → Delete Account.
              </span>
            </li>
            <li>
              <strong>Opt-out</strong>
              <span>
                Unsubscribe from marketing emails, disable AI personalization, and manage
                cookie preferences via Settings → Privacy.
              </span>
            </li>
            <li>
              <strong>Object to processing</strong>
              <span>
                Object to certain data processing activities by contacting us.
              </span>
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>8. Cookies and Tracking Technologies</h2>
          <h3>8.1 What We Use</h3>
          <ul>
            <li>
              <strong>Essential cookies</strong> — required for platform functionality;
              cannot be disabled
            </li>
            <li>
              <strong>Analytics cookies</strong> — help us understand how you use the
              platform; can be disabled in Settings
            </li>
            <li>
              <strong>Marketing cookies</strong> — used for targeted advertising; can be
              disabled in Settings
            </li>
          </ul>
          <h3>8.2 Third-Party Cookies</h3>
          <ul>
            <li>Google Analytics</li>
            <li>Social media plugins</li>
            <li>Advertising networks</li>
          </ul>
          <h3>8.3 Your Control</h3>
          <ul>
            <li>Manage cookie preferences in Settings</li>
            <li>Use browser settings to block cookies</li>
            <li>Note: disabling cookies may affect functionality</li>
          </ul>
        </section>

        <section className="about-block">
          <h2>9. International Data Transfers</h2>
          <p>
            Your data may be stored and processed in multiple countries. We use secure
            data centers worldwide, comply with applicable data protection laws, and use
            standard contractual clauses with adequate safeguards for international
            transfers.
          </p>
        </section>

        <section className="about-block">
          <h2>10. Children&apos;s Privacy</h2>
          <ul>
            <li>IN Z is not intended for users under 18 years old</li>
            <li>We do not knowingly collect data from children</li>
            <li>
              If we discover data from a child, we will delete it immediately
            </li>
            <li>
              Parents can contact us to request deletion of their child&apos;s data
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>11. Third-Party Links</h2>
          <p>
            Our platform may contain links to third-party websites. We are not
            responsible for their privacy practices—please review their privacy policies.
          </p>
          <p>
            When you connect third-party services, their privacy policies apply. We only
            access data necessary for integration functionality.
          </p>
        </section>

        <section className="about-block">
          <h2>12. Changes to This Privacy Policy</h2>
          <ul>
            <li>We may update this Privacy Policy from time to time</li>
            <li>Material changes will be notified via email</li>
            <li>Continued use constitutes acceptance of changes</li>
            <li>
              We encourage you to review this policy periodically; the last updated date
              is shown at the top
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>13. Your Privacy Rights by Region</h2>
          <h3>13.1 European Union (GDPR)</h3>
          <ul>
            <li>Right to access, rectification, erasure</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
            <li>Right to lodge a complaint with a supervisory authority</li>
          </ul>
          <h3>13.2 California (CCPA)</h3>
          <ul>
            <li>Right to know what data is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt out of sale (we don&apos;t sell data)</li>
            <li>Right to non-discrimination</li>
          </ul>
          <h3>13.3 Other Regions</h3>
          <p>
            We comply with applicable local privacy laws. Contact us for specific
            regional rights.
          </p>
        </section>

        <section className="about-block">
          <h2>14. Data Protection Officer</h2>
          <p>For privacy-related inquiries, contact our Data Protection Officer.</p>
          <p>
            <a className="about-mail" href={CONTACT} target="_blank" rel="noreferrer">
              Contact DPO
            </a>
          </p>
        </section>

        <section className="about-block">
          <h2>15. Contact Us</h2>
          <p>Questions about this Privacy Policy? Reach out anytime.</p>
          <ul>
            <li>
              <a href={CONTACT} target="_blank" rel="noreferrer">
                Contact Support
              </a>{" "}
              — general inquiries
            </li>
            <li>
              <a href={CONTACT} target="_blank" rel="noreferrer">
                Contact Privacy Team
              </a>{" "}
              — privacy concerns
            </li>
            <li>
              <a href={CONTACT} target="_blank" rel="noreferrer">
                Submit Request
              </a>{" "}
              — access, correction, deletion, or data portability
            </li>
          </ul>
        </section>

        <section className="about-block">
          <h2>16. Summary</h2>
          <ul className="about-pillars about-pillars-inline">
            <li>
              <strong>What we collect</strong>
              <span>Account information, usage data, technical data</span>
            </li>
            <li>
              <strong>How we use it</strong>
              <span>Provide services, improve AI, communicate with you</span>
            </li>
            <li>
              <strong>How we protect it</strong>
              <span>Encryption, access controls, security monitoring</span>
            </li>
            <li>
              <strong>Your rights</strong>
              <span>Access, correct, delete, and export your data</span>
            </li>
            <li>
              <strong>We don&apos;t</strong>
              <span>
                Sell your data, share without consent, or use data beyond stated purposes
              </span>
            </li>
          </ul>
        </section>

        <section className="about-block about-close">
          <h2>Our commitment to your privacy</h2>
          <blockquote>
            Your trust is our foundation. We&apos;re committed to protecting your privacy
            while helping you achieve balance.
          </blockquote>
          <p className="about-signoff">IN Z Privacy Team — One Drop, Infinite Impact</p>
          <p>
            By using IN Z, you acknowledge that you have read and understood this Privacy
            Policy.
          </p>
          <p>
            <a className="about-mail" href={CONTACT} target="_blank" rel="noreferrer">
              Contact Privacy Team
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
