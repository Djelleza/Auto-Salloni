import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <h2>Contact Us</h2>
          <p>
            We are here to help with any questions or requests. Fill out the form, and we will get back to you as soon as possible.
          </p>
          <ul className="contact-info">
            <li>
              <a href="tel:+1234567890">📞 +123 456 7890</a>
            </li>
            <li>
              <a href="mailto:info@luxcars.com">✉️ info@luxcars.com</a>
            </li>
          </ul>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="200"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
