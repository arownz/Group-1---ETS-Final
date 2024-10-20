// Setting.jsx
import { useState } from 'react';
import styles from './Setting.module.css';

const Setting = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [userData, setUserData] = useState({
    profileImage: 'https://via.placeholder.com/150',
    username: 'User',
    email: 'user@gmail.com',
    registeredDate: '04/12/2023',
    phoneNumber: '9245657856',
    password: 'expensewize'
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
    setShowPassword(false);
    setConfirmationMessage('');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
    setConfirmationMessage('Profile updated successfully!');
    setTimeout(() => setConfirmationMessage(''), 3000);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setConfirmationMessage('');
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.miniNav}>
        <button
          className={`${styles.navButton} ${activeTab === "account" ? styles.active : ""}`}
          onClick={() => handleTabClick("account")}
        >
          Account
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "password" ? styles.active : ""}`}
          onClick={() => handleTabClick("password")}
        >
          Password
        </button>
      </div>
      <div className={styles.mainContent}>
        <h2>Settings</h2>
        {confirmationMessage && <div className={styles.confirmationMessage}>{confirmationMessage}</div>}
        <div className={styles.settingsForm}>
          {activeTab === "account" && (
            <form className={styles.accountForm}>
              <div className={styles.profileImageContainer}>
                <img src={userData.profileImage} alt="Profile" className={styles.profileImage} />
                {isEditing && (
                  <input type="file" accept="image/*" onChange={handleImageChange} className={styles.imageInput} />
                )}
              </div>
              <div className={styles.formGroup}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Registered Date</label>
                <input type="text" value={userData.registeredDate} disabled />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className={styles.buttonGroup}>
                {!isEditing ? (
                  <button type="button" className={styles.editButton} onClick={handleEditClick}>
                    Edit
                  </button>
                ) : (
                  <>
                    <button type="button" className={styles.updateButton} onClick={handleUpdateClick}>
                      Update
                    </button>
                    <button type="button" className={styles.cancelButton} onClick={handleCancelClick}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
          {activeTab === "password" && (
            <form className={styles.passwordForm}>
              <div className={styles.formGroup}>
                <label>Current Password</label>
                <div className={styles.passwordInputGroup}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    disabled={true} // Always disabled
                    className={styles.currentPassword}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.viewPasswordButton}
                  >
                    {showPassword ? "Hide" : "View"}
                  </button>
                </div>
              </div>
              {isEditing && (
                <>
                  <div className={styles.formGroup}>
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      onChange={handleInputChange}
                      className={styles.newPassword}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleInputChange}
                      className={styles.confirmPassword}
                    />
                  </div>
                </>
              )}
              <div className={styles.buttonGroup}>
                {!isEditing ? (
                  <button
                    type="button"
                    className={styles.editButton}
                    onClick={handleEditClick}
                  >
                    Change Password
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className={styles.updateButton}
                      onClick={handleUpdateClick}
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div >
  );
};

export default Setting;