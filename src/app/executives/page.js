"use client";
import Link from "next/link";
import Image from "next/image";

const executives = [
  {
    name: "James A. Crawford",
    title: "Chief Executive Officer",
    initials: "JC",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "James brings over 15 years of experience in the entertainment and events industry. Previously VP of Talent Acquisition at Global Events Group, he founded EliteBooking with a vision to democratize access to world-class celebrity talent for events of all sizes.",
    expertise: ["Business Strategy", "Celebrity Relations", "Global Partnerships"],
  },
  {
    name: "Sarah M. Elliott",
    title: "Chief Legal Officer",
    initials: "SE",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Sarah is a seasoned entertainment lawyer with expertise in talent contracts, intellectual property, and international commerce law. She ensures EliteBooking operates with full legal compliance across all 50+ countries we serve.",
    expertise: ["Entertainment Law", "Contract Negotiation", "Compliance"],
  },
  {
    name: "Marcus T. Williams",
    title: "Chief Technology Officer",
    initials: "MW",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Marcus is a full-stack engineer and product leader with a background in building scalable platforms for the entertainment industry. He leads EliteBooking's technology vision, ensuring a seamless and secure experience for all users.",
    expertise: ["Platform Architecture", "Security", "Product Development"],
  },
  {
    name: "Priya R. Sharma",
    title: "Chief Operations Officer",
    initials: "PS",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Priya oversees the day-to-day operations of EliteBooking, managing relationships with celebrity representatives and ensuring every booking is executed flawlessly. She has a background in luxury event management across Asia and Europe.",
    expertise: ["Operations Management", "Event Logistics", "Client Relations"],
  },
  {
    name: "David O. Chen",
    title: "Head of Celebrity Relations",
    initials: "DC",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "David manages EliteBooking's growing roster of celebrities, working directly with agents, managers, and publicists worldwide. His deep network in the entertainment industry ensures we always have access to the most sought-after talent.",
    expertise: ["Talent Management", "Agent Relations", "Contract Negotiation"],
  },
  {
    name: "Amara N. Osei",
    title: "Head of Client Success",
    initials: "AO",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    bio: "Amara leads our client success team, ensuring every client from first inquiry to post-event follow-up has an exceptional experience. She has worked with Fortune 500 companies and high-profile private clients across 30+ countries.",
    expertise: ["Client Experience", "Event Planning", "VIP Services"],
  },
];

export default function ExecutivesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "60px", paddingBottom: "60px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>
            Leadership
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Meet Our Executive Team
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "550px", margin: "0 auto", lineHeight: 1.7 }}>
            The experienced leaders behind EliteBooking's mission to connect the world with world-class celebrity talent.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Executive Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginBottom: "60px" }}>
          {executives.map((exec) => (
            <div
              key={exec.name}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "20px",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: "260px", background: "#f5f5f5", overflow: "hidden" }}>
                <Image
                  src={exec.photo}
                  alt={exec.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                  <p style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "2px" }}>
                    {exec.name}
                  </p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                    {exec.title}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div style={{ padding: "24px 28px" }}>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.8, marginBottom: "20px" }}>
                  {exec.bio}
                </p>

                {/* Expertise */}
                <div>
                  <p style={{ fontSize: "11px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
                    Areas of Expertise
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {exec.expertise.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#000",
                          background: "#f5f5f5",
                          border: "1px solid #eee",
                          padding: "5px 12px",
                          borderRadius: "999px",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company values */}
        <div style={{ background: "#000", borderRadius: "24px", padding: "48px", marginBottom: "40px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>
              Our Foundation
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              What We Stand For
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              { icon: "🎯", title: "Excellence", desc: "We hold ourselves to the highest standards in everything we do, from talent selection to client service." },
              { icon: "🤝", title: "Integrity", desc: "Transparency and honesty are at the core of every interaction with our clients and talent." },
              { icon: "🌍", title: "Inclusivity", desc: "We celebrate diversity and ensure our platform is accessible to clients and talent worldwide." },
              { icon: "🚀", title: "Innovation", desc: "We constantly push boundaries to create the best celebrity booking experience in the world." },
            ].map((value) => (
              <div key={value.title} style={{ textAlign: "center" }}>
                <span style={{ fontSize: "36px", display: "block", marginBottom: "16px" }}>{value.icon}</span>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>{value.title}</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom links */}
        <div style={{ paddingTop: "32px", borderTop: "1px solid #eee", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: "13px", color: "#999" }}>
            Want to work with us?{" "}
            <Link href="/contact" style={{ color: "#000", fontWeight: 600, textDecoration: "none" }}>
              Get in touch
            </Link>
          </p>
          <Link href="/certificate" style={{ fontSize: "13px", color: "#000", fontWeight: 600, textDecoration: "none" }}>
            View Our Certificate →
          </Link>
        </div>

      </div>
    </div>
  );
}