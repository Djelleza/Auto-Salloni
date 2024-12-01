import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import "../styles/About.css"; // Add your custom CSS styling

const About = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleAnswer = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  const faq = [
    {
      question: "Where is the location?",
      answer: "Our location is in the city center, at XYZ address, Dajti Street, Tirana.",
    },
    {
      question: "From which country are the cars imported?",
      answer: "The cars are mainly imported from Germany, Switzerland, and Japan.",
    },
    {
      question: "Do you sell unused cars?",
      answer: "Yes, we also offer brand-new cars for our clients.",
    },
    {
      question: "Can I buy a car on credit?",
      answer: "Yes, we provide financing options through various credit plans for clients.",
    },
    {
      question: "If I buy a car from you, will you take my current car?",
      answer: "Yes, we offer the option to trade in your car when purchasing another one.",
    },
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            AutoSallon Luxury is your destination for high-class cars. With over 20 years of experience in the industry, 
            we have built a reputation for providing luxurious cars and exceptional customer service.
          </p>

          <div className="faq-section">
            {faq.map((item, index) => (
              <div className="faq-item" key={index}>
                <button onClick={() => toggleAnswer(index)} className="faq-question">
                  {item.question}
                  {selectedQuestion === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div 
                  className={`faq-answer ${selectedQuestion === index ? 'open' : ''}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-image">
          <img
            src="https://images.stockcake.com/public/0/e/3/0e3b86ea-4321-4f50-9673-c79705f9297f_large/luxurious-car-collection-stockcake.jpg"
            alt="Luxurious cars"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
