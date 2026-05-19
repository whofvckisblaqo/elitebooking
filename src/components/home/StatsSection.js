const stats = [
  { value: "500+", label: "Celebrities" },
  { value: "10K+", label: "Events Booked" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Countries" },
];

export default function StatsSection() {
  return (
    <section
      style={{
        width: "100%",
        background: "#f9f9f9",
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee",
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: "16px",
            }}
          >
            By The Numbers
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#000",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            The World's Premier<br /> Celebrity Booking Platform
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "12px",
                padding: "40px 24px",
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 800,
                  color: "#000",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </span>
              <div style={{ width: "24px", height: "2px", background: "#000" }} />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#999",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}