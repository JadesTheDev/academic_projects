/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Profile page with an editable bio text field. The bio uses
React state as a controlled component for user input.
=========================================================
*/

import React, { useState } from "react";
import "./Profile.css";

const DEFAULT_BIO = "Local produce enthusiast and supporter of small farms.";

const Profile = () => {
  const [bioDraft, setBioDraft] = useState(DEFAULT_BIO);
  const [savedBio, setSavedBio] = useState(DEFAULT_BIO);
  const [bioMessage, setBioMessage] = useState("");

  function handleBioChange(event) {
    setBioDraft(event.target.value);
    setBioMessage("");
  }

  function handleSaveBio() {
    const cleanedBio = bioDraft.trim().replace(/\s+/g, " ");

    if (cleanedBio.length === 0) {
      setBioMessage("Bio cannot be empty.");
      return;
    }

    setBioDraft(cleanedBio);
    setSavedBio(cleanedBio);
    setBioMessage("Bio saved successfully.");
  }

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

          <div className="profile-bio-section">
            <label htmlFor="profile-bio">
              <strong>Bio</strong>
            </label>

            <textarea
              id="profile-bio"
              className="profile-bio-input"
              value={bioDraft}
              onChange={handleBioChange}
              maxLength={240}
              rows={4}
              placeholder="Tell the community a little about yourself..."
            />

            <div className="profile-bio-actions">
              <span>{bioDraft.length}/240</span>
              <button type="button" onClick={handleSaveBio}>
                Save Bio
              </button>
            </div>

            {bioMessage && (
              <p className="profile-bio-message" aria-live="polite">
                {bioMessage}
              </p>
            )}
          </div>

          <div className="profile-saved-bio">
            <strong>About:</strong>
            <p>{savedBio}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
