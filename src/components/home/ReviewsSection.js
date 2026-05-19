import Image from "next/image";

const reviews = [
  {
    name: "Michael Thompson",
    country: "United States",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    review: "EliteBooking made the entire process seamless. We booked a top musician for our corporate gala and the experience was absolutely world-class. Highly recommend!",
    event: "Corporate Gala",
    celebrity: "Music Artist",
  },
  {
    name: "Sophia Mensah",
    country: "United Kingdom",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    rating: 5,
    review: "I was skeptical at first but EliteBooking delivered beyond my expectations. Our wedding was made unforgettable with the celebrity appearance we booked. Thank you!",
    event: "Wedding Ceremony",
    celebrity: "Celebrity Appearance",
  },
  {
    name: "Carlos Rodriguez",
    country: "Spain",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    review: "The team was professional, responsive and the booking process was incredibly smooth. The celebrity we hired for our product launch made it a massive success.",
    event: "Product Launch",
    celebrity: "Tech Influencer",
  },
  {
    name: "Aisha Nwosu",
    country: "Nigeria",
    photo: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=200&q=80",
    rating: 5,
    review: "Outstanding service from start to finish. EliteBooking connected us with an A-list comedian for our charity event and it was a night nobody will forget.",
    event: "Charity Event",
    celebrity: "Comedian",
  },
  {
    name: "James Park",
    country: "South Korea",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    review: "We've used EliteBooking twice now for our annual conferences. Each time the experience has been flawless. The celebrities they represent are truly elite.",
    event: "Annual Conference",
    celebrity: "Keynote Speaker",
  },
  {
    name: "Emma Laurent",
    country: "France",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    rating: 5,
    review: "I booked a fashion icon for our brand launch through EliteBooking. The whole experience was premium, professional and worth every penny. Will definitely use again.",
    event: "Brand Launch",
    celebrity: "Fashion Icon",
  },
];

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      style={{
        width: "100%",
        background: "#fff",
        borderTop: "1px solid #eee",
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
            Client Reviews
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#000",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            What Our Clients Say
          </h2>
          <p style={{ fontSize: "15px", color: "#999", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Thousands of event organizers trust EliteBooking to deliver world-class experiences.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              style={{
                background: "#f9f9f9",
                border: "1px solid #eee",
                borderRadius: "20px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "all 0.3s ease",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "3px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      fontSize: "16px",
                      color: star <= review.rating ? "#000" : "#ddd",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review text */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#444",
                  lineHeight: 1.8,
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                "{review.review}"
              </p>

              {/* Event badge */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#000",
                    background: "#fff",
                    border: "1px solid #eee",
                    padding: "4px 12px",
                    borderRadius: "999px",
                  }}
                >
                  {review.event}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#999",
                    background: "#fff",
                    border: "1px solid #eee",
                    padding: "4px 12px",
                    borderRadius: "999px",
                  }}
                >
                  {review.celebrity}
                </span>
              </div>

              {/* Reviewer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "16px",
                  borderTop: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#eee",
                  }}
                >
                  <Image
                    src={review.photo}
                    alt={review.name}
                    fill
                    sizes="44px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#000", marginBottom: "2px" }}>
                    {review.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#999" }}>
                    {review.country}
                  </p>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <span style={{ fontSize: "20px" }}>✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <p style={{ fontSize: "15px", color: "#999", marginBottom: "20px" }}>
            Join thousands of satisfied clients worldwide
          </p>
          <a
            href="/celebrities"
            style={{
              display: "inline-block",
              background: "#000",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              padding: "16px 40px",
              borderRadius: "999px",
              textDecoration: "none",
            }}
          >
            Book a Celebrity Today
          </a>
        </div>

      </div>
    </section>
  );
}