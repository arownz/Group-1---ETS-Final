import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';
import signUpImage from '../../assets/logup.jpeg';
import api from '../../api/api';
import StatusMessage from '../../components/useraccess/statusmessage/StatusMessage'; 

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileImage: 'https://via.placeholder.com/150',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fullResult = reader.result;
        const truncatedResult = fullResult.substring(0, 100) + '...'; // Truncate to first 100 characters
        setFormData(prevState => ({
          ...prevState,
          profileImage: fullResult,
          truncatedProfileImage: truncatedResult
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) return "Username cannot be blank";
        if (value.trim().length < 4) return "Username should be at least 4 characters";
        break;
      case 'email':
        if (!value.trim()) return "Email cannot be blank";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
        break;
      case 'phone':
        if (!value.trim()) return "Phone number cannot be blank";
        if (!/^\d+$/.test(value)) return "Phone number should contain only digits";
        break;
      case 'password':
        if (!value.trim()) return "Password cannot be blank";
        if (value.trim().length < 4) return "Password should be at least 4 characters";
        break;
      case 'confirmPassword':
        if (!value.trim()) return "Confirm Password cannot be blank";
        if (value !== formData.password) return "Passwords do not match";
        break;
    }
    return '';
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      username: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    });
    if (validateForm()) {
      try {
        setStatusMessage({ type: 'success', message: 'Processing...' });
        const response = await api.post('/users/register', {
          user_name: formData.username,
          user_email: formData.email,
          user_phone: formData.phone,
          user_password: formData.password,
          user_profile: formData.profileImage
        });
        console.log('Registration successful', response.data);
        setStatusMessage({ type: 'success', message: 'Success! Redirecting...' });
        setTimeout(() => {
          navigate('/SignIn', { state: { message: 'Registration successful. Please log in.' } });
        }, 2000);
      } catch (error) {
        console.error('Registration error:', error);
        setStatusMessage({ type: 'error', message: 'An error occurred. Please try again.' });
        
        // Handle errors
        if (error.response) {
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        
        // Reset form fields
        setFormData({
          username: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          profileImage: 'https://via.placeholder.com/150'
        });
        setErrors({
          username: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
        setTouched({
          username: false,
          email: false,
          phone: false,
          password: false,
          confirmPassword: false
        });
      }
    } else {
      setStatusMessage({ type: 'error', message: 'Please correct the errors in the form.' });
    }
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.container} shadow my-5 p-4 p-md-5 rounded`}>
        <div className="row text-center">
          <h1 className={styles.title}>Start your journey with us</h1>
        </div>
        <div className={`row py-4 ${styles.contentRow}`}>
          <div className={`col-md-6 ${styles.imageContainer}`}>
            <img src={signUpImage} alt="sign up" className={styles.image} />
          </div>
          <div className="col-md-6">
            <h2 className={styles.subtitle}>Create New Account</h2>
            <form className="py-3" onSubmit={handleSubmit}>
            <StatusMessage type={statusMessage.type} message={statusMessage.message} />
              <div className={styles.profileImageContainer}>
                <img src={formData.profileImage} alt="Profile" className={styles.profileImage} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.imageInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your username"
                />
                {touched.username && errors.username && <div className="invalid-feedback">{errors.username}</div>}
                <div className="form-text">Enter your username (at least 4 characters)</div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                <div className="form-text">We&apos;ll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(xxx) xxx-xxxx"
                  onBlur={handleBlur}
                />
                {touched.phone && errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                <div className="form-text">Enter your phone number</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                <div className="form-text">Enter a strong password</div>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  onBlur={handleBlur}
                />
                {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                <div className="form-text">Confirm your password</div>
              </div>
              <div className="mb-3">
                <span>Already have an account? </span>
                <a href="./SignIn" className={styles.linkText}>Login here</a>
              </div>
              <div className="row">
                <button type="submit" className="btn btn-success btn-lg my-4">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;