import { useState, useEffect } from 'react';
import styles from './Setting.module.css';
import api from '../../../api/api'; // Make sure this path is correct

const Setting = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    profileImage: 'https://via.placeholder.com/150',
    username: '',
    email: '',
    registeredDate: '',
    phoneNumber: '',
    password: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/users/profile');
      setUserData({
        profileImage: `data:image/jpeg/;base64,${response.data.user_profile}`,
        username: response.data.user_name,
        email: response.data.user_email,
        registeredDate: new Date(response.data.user_registered_date).toLocaleDateString(),
        phoneNumber: response.data.user_phone,
        password: '********' // Masked password
      });
      setActualPassword(response.data.user_password); // Store actual password
    } catch (error) {
      console.error('Error fetching user data:', error);
      setConfirmationMessage('Error fetching user data');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
    setShowPassword(false);
    setConfirmationMessage('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    try {
      if (activeTab === "account") {
        await api.put('/users/profile', {
          user_profile: userData.profileImage,
          user_name: userData.username,
          user_email: userData.email,
          user_phone: userData.phoneNumber
        });
      } else if (activeTab === "password") {
        if (newPassword !== confirmPassword) {
          setConfirmationMessage('New passwords do not match');
          setTimeout(() => setConfirmationMessage(''), 3000);
          return;
        }
        await api.put('/users/password', {
          currentPassword: actualPassword,
          newPassword: newPassword,
        });
      }
      setIsEditing(false);
      setConfirmationMessage('Profile updated successfully!');
      setTimeout(() => setConfirmationMessage(''), 3000);
      fetchUserData(); // Refresh user data
    } catch (error) {
      console.error('Error updating profile:', error);
      setConfirmationMessage('Error updating profile');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setConfirmationMessage('');
    fetchUserData(); // Reset to original data
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
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

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        {confirmationMessage && (
          <div className={`${styles.confirmationMessage} ${confirmationMessage.includes('Error') ? styles.errorMessage : styles.successMessage}`}>
            {confirmationMessage}
          </div>
        )}
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
                    value={showPassword ? actualPassword : '********'}
                    disabled={true}
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
                    <div className={styles.passwordInputGroup}>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={newPassword || ''}
                        onChange={handlePasswordChange}
                        className={styles.newPassword}
                        placeholder="Enter your new password"
                      />
                      <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        className={styles.viewPasswordButton}
                      >
                        {showNewPassword ? "Hide" : "View"}
                      </button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Confirm New Password</label>
                    <div className={styles.passwordInputGroup}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handlePasswordChange}
                        className={styles.confirmPassword}
                        placeholder="Confirm your new password"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className={styles.viewPasswordButton}
                      >
                        {showConfirmPassword ? "Hide" : "View"}
                      </button>
                    </div>
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