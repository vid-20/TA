
import React, { useState } from "react";
import "../styles/page.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Server error");
      }

      const payload = await res.json();
      alert(payload.message || "Thanks! Your message was sent.");
      setName(""); setEmail(""); setMsg("");
    } catch (err) {
      console.error("Contact submit error:", err);
      alert("Failed to send message. Check console or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-contact">
      <h1>Contact</h1>

      <div className="contact-card card">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />

          <label>Message</label>
          <textarea
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
            placeholder="Write your message..."
          />

          <div style={{ marginTop: 8 }}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}