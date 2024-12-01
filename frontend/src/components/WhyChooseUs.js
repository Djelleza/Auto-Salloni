import React from "react";
import "../styles/WhyChooseUs.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function WhyChooseUs() {
  return (
    <div className="whyChooseUs">
      <h2>Pse të zgjidhni AutoCar Luxury?</h2>
      <div className="features">
        <div className="feature">
          <VerifiedIcon style={{ fontSize: "60px", color: "#f44336" }} />
          <h3>Brende të shumta të veturave</h3>
          <p>
            Ne ofrojmë shumëllojshmëri të veturave nga markat dhe modelet e ndryshme që mund të përmirësojnë përvojën tuaj.
          </p>
        </div>
        <div className="feature">
          <GroupIcon style={{ fontSize: "60px", color: "#4caf50" }} />
          <h3>Staf i kualifikuar</h3>
          <p>
            Standardet e cilësisë dhe kujdesi ndaj klientit janë elementët kryesorë të shërbimit tonë.
          </p>
        </div>
        <div className="feature">
          <AttachMoneyIcon style={{ fontSize: "60px", color: "#2196f3" }} />
          <h3>Shpejtë dhe financim i sigurtë</h3>
          <p>
            Ju ndihmojmë të gjeni financimin e duhur për ëndrrat tuaja, pa shqetësime për historikun tuaj kreditor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
