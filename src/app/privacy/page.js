import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — EliteBooking",
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "60px", paddingBottom: "60px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>
            Legal
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

          {[
            {
              title: "1. Information We Collect",
              content: `We collect information you provide directly to us when you create an account, submit a booking request, or contact us. This includes your name, email address, phone number, country, and any other information you choose to provide. We also collect information automatically when you use our platform, such as your IP address, browser type, and pages visited.`,
            },
            {
              title: "2. How We Use Your Information",
              content: `We use the information we collect to provide and improve our services, process booking requests, send transactional emails and notifications, respond to your inquiries, and comply with legal obligations. We may also use your information to send you updates about new celebrities and features, which you can opt out of at any time.`,
            },
            {
              title: "3. Information Sharing",
              content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with celebrity representatives when processing a booking request, service providers who assist us in operating our platform, and law enforcement when required by law. All third parties are bound by confidentiality obligations.`,
            },
            {
              title: "4. Data Security",
              content: `We implement industry-standard security measures to protect your personal information. Your password is encrypted and never stored in plain text. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.`,
            },
            {
              title: "5. Cookies",
              content: `We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us remember your preferences and understand how you interact with our platform. You can control cookie settings through your browser, but disabling cookies may affect certain features of our platform.`,
            },
            {
              title: "6. Your Rights",
              content: `You have the right to access, correct, or delete your personal information at any time. You may also request a copy of the data we hold about you. To exercise these rights, please contact us at elitebookingsuport@gmail.com. We will respond to your request within 30 days.`,
            },
            {
              title: "7. Children's Privacy",
              content: `EliteBooking is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information immediately.`,
            },
            {
              title: "8. Third-Party Links",
              content: `Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these websites and encourage you to review their privacy policies. This Privacy Policy applies only to information collected by EliteBooking.`,
            },
            {
              title: "9. Changes to This Policy",
              content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the platform after any changes constitutes your acceptance of the new policy.`,
            },
            {
              title: "10. Contact Us",
              content: `If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at elitebookingsuport@gmail.com or visit our Contact page.`,
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#000", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                {section.title}
              </h2>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.8 }}>
                {section.content}
              </p>
            </div>
          ))}

        </div>

        {/* Footer links */}
        <div style={{ marginTop: "60px", paddingTop: "32px", borderTop: "1px solid #eee", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "13px", color: "#999" }}>
            Have questions? <Link href="/contact" style={{ color: "#000", fontWeight: 600, textDecoration: "none" }}>Contact us</Link>
          </p>
          <Link href="/terms" style={{ fontSize: "13px", color: "#000", fontWeight: 600, textDecoration: "none" }}>
            Terms of Service →
          </Link>
        </div>

      </div>
    </div>
  );
}