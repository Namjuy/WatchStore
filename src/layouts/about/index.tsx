import aboutImage1 from "../../assets/image/about-1.jpg";
import aboutImage3 from "../../assets/image/about-3.jpg";
import aboutImage2 from "../../assets/image/about-2.jpg";
import './index.css'
import { memo } from "react";
import { BulbOutlined } from "@ant-design/icons";
function About() {
  return (
    <>
     <div className="about-container">
    <h2 className="about-title">About Us <BulbOutlined/>  </h2>
    <div className="about-content">
      <div className="about-section">
        <img src={aboutImage1} alt="" className="about-image"/>
        <h3 className="about-subtitle">Break through</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a 
          type specimen book. It has survived not only five centuries, but also the 
          leap into electronic typesetting, remaining essentially unchanged.
        </p>
      </div>
      <div className="about-section">
        <div className="about-subtitle">Understanding</div>
        <img src={aboutImage2} alt="" className="about-image"/>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
      <div className="about-section">
        <div className="about-subtitle">Suitable</div>
        <div className="about-text">
          
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a 
            type specimen book.
          </p>
        </div>
        <img src={aboutImage3} alt="" className="about-image about-image-right"/>
      </div>
    </div>
  </div>
    </>
  );
}
export default memo(About);
