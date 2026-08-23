/*
=========================================================
SDC445 - Interface Design
From the Farm

Description:
Profile page with an editable bio field.
The bio is displayed normally by default and switches
into edit mode when the pencil button is selected.
=========================================================
*/

import React, { useState } from "react";
import "./Profile.css";
import johnFarmerPhoto from "../products/john-farmer.jpg";

const DEFAULT_BIO =
  "Local produce enthusiast and supporter of small farms.";

const Profile = () => {
  const [savedBio, setSavedBio] = useState(DEFAULT_BIO);
  const [bioDraft, setBioDraft] = useState(DEFAULT_BIO);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioMessage, setBioMessage] = useState("");

  function handleEditBio() {
    setBioDraft(savedBio);
    setBioMessage("");
    setIsEditingBio(true);
  }

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

    setSavedBio(cleanedBio);
    setBioDraft(cleanedBio);
    setBioMessage("Bio updated successfully.");
    setIsEditingBio(false);
  }

  function handleCancelEdit() {
    setBioDraft(savedBio);
    setBioMessage("");
    setIsEditingBio(false);
  }

  return (
    <main className="profile-page">
      <section className="profile-card">

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar" aria-hidden="true">
            <img src={johnFarmerPhoto} alt="John Farmer" />
          </div>

          <div className="profile-heading">
            <h1>John Farmer</h1>
            <p className="profile-location">Charleston, SC</p>

            <div className="profile-meta">
              <span>Customer</span>
              <span>Member since January 2026</span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-content">

          <div className="profile-section-heading">
            <div>
              <p className="profile-eyebrow">ABOUT</p>
              <h2>Bio</h2>
            </div>

            {!isEditingBio && (
              <button
                type="button"
                className="bio-edit-button"
                onClick={handleEditBio}
                aria-label="Edit bio"
                title="Edit bio"
              >
                ✏️
              </button>
            )}
          </div>

          {/* Normal Bio View */}
          {!isEditingBio && (
            <div className="profile-bio-display">
              <p>{savedBio}</p>
            </div>
          )}

          {/* Editable Bio View */}
          {isEditingBio && (
            <div className="profile-bio-editor">
              <label htmlFor="profile-bio">
                Edit your bio
              </label>

              <textarea
                id="profile-bio"
                className="profile-bio-input"
                value={bioDraft}
                onChange={handleBioChange}
                maxLength={240}
                rows={5}
                placeholder="Tell the community a little about yourself..."
              />

              <div className="profile-editor-footer">
                <span className="bio-character-count">
                  {bioDraft.length}/240
                </span>

                <div className="profile-bio-actions">
                  <button
                    type="button"
                    className="bio-cancel-button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="bio-save-button"
                    onClick={handleSaveBio}
                  >
                    Save Bio
                  </button>
                </div>
              </div>
            </div>
          )}

          {bioMessage && (
            <p
              className="profile-bio-message"
              aria-live="polite"
            >
              {bioMessage}
            </p>
          )}

        </div>
      </section>
    </main>
  );
};

export default Profile;
