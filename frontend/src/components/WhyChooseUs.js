import React from "react";
import "../styles/WhyChooseUs.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function WhyChooseUs() {
  return (
    <div className="whyChooseUs">
      <h2>Why Choose AutoCar Luxury?</h2>
      <div className="features">
        <div className="feature">
          <VerifiedIcon style={{ fontSize: "60px", color: "#f44336" }} />
          <h3>Wide Range of Car Brands</h3>
          <p>
            We offer a variety of cars from different brands and models to enhance your experience.
          </p>
        </div>
        <div className="feature">
          <GroupIcon style={{ fontSize: "60px", color: "#4caf50" }} />
          <h3>Qualified Staff</h3>
          <p>
            Quality standards and customer care are the key elements of our service.
          </p>
        </div>
        <div className="feature">
          <AttachMoneyIcon style={{ fontSize: "60px", color: "#2196f3" }} />
          <h3>Fast and Secure Financing</h3>
          <p>
            We help you find the right financing for your dreams, without worrying about your credit history.
          </p>
        </div>
      </div>
    </div>
  );
}


export default WhyChooseUs;
