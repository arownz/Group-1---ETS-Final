import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';
import styles from './SignIn.module.css';
import signInImage from '../../assets/login.jpeg';
import StatusMessage from '../../components/useraccess/statusmessage/StatusMessage';

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    if (rememberedUser) {
      setFormData(prev => ({
        ...prev,
        email: rememberedUser.email,
        password: rememberedUser.password,
        rememberMe: true
      }));
    }
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setStatusMessage({ type: 'success', message: location.state.message });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (statusMessage.message) {
      const timer = setTimeout(() => {
        setStatusMessage({ type: '', message: '' });
        if (statusMessage.type === 'success' && statusMessage.message.includes('Success')) {
          navigate('/Dashboard');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateField(name, type === 'checkbox' ? checked : value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value.trim()) error = "Email cannot be blank";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case 'password':
        if (!value.trim()) error = "Password cannot be blank";
        else if (value.trim().length < 4) error = "Password should be at least 4 characters";
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach(key => {
      if (key !== 'rememberMe') {
        validateField(key, formData[key]);
        if (errors[key]) isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true
    });
    if (validateForm()) {
      try {
        setStatusMessage({ type: 'success', message: 'Processing...' });
        const response = await api.post('/users/login', {
          user_email: formData.email,
          user_password: formData.password
        });
        const { token, userId, username } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        if (formData.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({
            email: formData.email,
            password: formData.password
          }));
        } else {
          localStorage.removeItem('rememberedUser');
        }
        setStatusMessage({ type: 'success', message: 'Success! Redirecting...' });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setStatusMessage({ type: 'error', message: 'Incorrect email or password. Please try again.' });
        } else {
          setStatusMessage({ type: 'error', message: 'An error occurred. Please try again.' });
        }
      }
    } else {
      setStatusMessage({ type: 'error', message: 'Please correct the errors in the form.' });
    }
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.container} shadow my-5 p-4 p-md-5 rounded`}>
        <div className="row text-center">
          <h1 className={styles.title}>Log in to your account</h1>
        </div>
        <div className={`row py-4 ${styles.contentRow}`}>
          <div className={`col-md-6 ${styles.imageContainer}`}>
            <img src={signInImage} alt="sign in" className={styles.image} />
          </div>
          <div className="col-md-6">
            <h2 className={styles.subtitle}>Please enter your login information</h2>
            <form className="py-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                />
                {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                <div className="form-text">We&apos;ll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    onBlur={handleBlur}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
                <div className="form-text">Enter your login password</div>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="mb-3">
                <span>Don&apos;t have an account yet? </span>
                <a href="./SignUp" className={styles.linkText}>Register here</a>
              </div>
              <StatusMessage type={statusMessage.type} message={statusMessage.message} />
              <div className="row">
                <button type="submit" className={`btn btn-success btn-lg my-4 ${styles.submitButton}`}>
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignIn;