import Link from "next/link";

export const metadata = {
  title: "Terms of Service — EliteBooking",
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "60px", paddingBottom: "60px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>
            Legal
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Terms of Service
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
              title: "1. Acceptance of Terms",
              content: `By accessing or using EliteBooking ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. EliteBooking reserves the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of any changes.`,
            },
            {
              title: "2. Use of the Platform",
              content: `EliteBooking provides a platform for users to discover and request bookings with celebrities and public figures. You agree to use the platform only for lawful purposes. You must be at least 18 years of age to use this platform. You are responsible for maintaining the confidentiality of your account credentials.`,
            },
            {
              title: "3. Booking Requests",
              content: `Submitting a booking request does not guarantee a confirmed booking. All booking requests are subject to review and approval by our team. EliteBooking acts as an intermediary between users and celebrities. We reserve the right to reject any booking request at our discretion. Once a booking is approved, cancellation policies will apply.`,
            },
            {
              title: "4. Fees and Payments",
              content: `Booking fees are set by EliteBooking in consultation with celebrity representatives. Fees are displayed on each celebrity's profile page. Payment terms and methods will be communicated upon booking approval. All fees are subject to change without prior notice. EliteBooking is not responsible for any additional costs incurred outside of the agreed booking fee.`,
            },
            {
              title: "5. User Accounts",
              content: `You are responsible for all activities that occur under your account. You must provide accurate and complete information when creating an account. EliteBooking reserves the right to suspend or terminate accounts that violate these terms. You may not create multiple accounts or share your account with others.`,
            },
            {
              title: "6. Intellectual Property",
              content: `All content on the EliteBooking platform, including logos, text, images, and design, is the property of EliteBooking and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
            },
            {
              title: "7. Limitation of Liability",
              content: `EliteBooking shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability to you for any claim shall not exceed the amount paid by you for the booking in question. EliteBooking does not guarantee the availability of any celebrity at any given time.`,
            },
            {
              title: "8. Privacy",
              content: `Your use of EliteBooking is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. Please review our Privacy Policy to understand our practices.`,
            },
            {
              title: "9. Governing Law",
              content: `These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the appropriate courts.`,
            },
            {
              title: "10. Contact Us",
              content: `If you have any questions about these Terms of Service, please contact us at elitebookingsuport@gmail.com or visit our Contact page.`,
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
          <Link href="/privacy" style={{ fontSize: "13px", color: "#000", fontWeight: 600, textDecoration: "none" }}>
            Privacy Policy →
          </Link>
        </div>

      </div>
    </div>
  );
}