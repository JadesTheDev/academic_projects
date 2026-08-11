import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <h1>John Farmer</h1>
        <p className="profile-location">Charleston, SC</p>

        <div className="profile-info">
          <p>
            <strong>Member since:</strong> January 2026
          </p>

          <p>
            <strong>About:</strong> Local produce enthusiast and supporter of
            small farms.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Profile;