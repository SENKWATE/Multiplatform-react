import React from "react";

function Footer(props) {
  return (
    <footer
      className="sticky-footer"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        color: "white",
        opacity: "0.8"
      }}
    >
      <div className="container">
        <div className="text-center">
          <small>This website is hosted by Zain</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;