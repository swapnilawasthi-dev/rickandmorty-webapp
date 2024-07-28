import React from "react";

function Card({ character }) {
  return (
    <div className="card">
      <div
        className="card-header"
        style={{
          backgroundImage: `url(${character?.image})`,
          borderTopRightRadius: "30px",
          borderTopLeftRadius: "30px",
        }}
      ></div>

      <div className="card-body">
        <h2 className="name">John Smith</h2>
        <h4 className="job-title">Product Designer</h4>
      </div>

      <div className="card-footer">
        <div className="stats">
          <div className="stat">
            <span className="label">Following</span>
            <span className="value">56K</span>
          </div>
          <div className="stat">
            <span className="label">Followers</span>
            <span className="value">940</span>
          </div>
          <div className="stat">
            <span className="label">Likes</span>
            <span className="value">320</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
