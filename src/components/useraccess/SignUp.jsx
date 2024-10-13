import { useEffect } from 'react';
import './SignUp.css';

function Signup() {
  useEffect(() => {

    // Validate form function
    window.validateForm = function () {
      var username = document.getElementById("name");
      var email = document.getElementById("email");
      var phone = document.getElementById("phone");
      var password = document.getElementById("pass");

      if (username.value.trim() === "") {
        document.getElementById("name").style.border = "solid 2px red";
        document.getElementById("nameError").style.visibility = "visible";
        return false;
      } else if (email.value.trim() === "") {
        document.getElementById("email").style.border = "solid 2px red";
        document.getElementById("emailError").style.visibility = "visible";
        return false;
      } else if (phone.value.trim() === "") {
        document.getElementById("phone").style.border = "solid 2px red";
        document.getElementById("phoneError").style.visibility = "visible";
        document.getElementById("phoneError").innerHTML = "*Phone Number cannot be blank";
        return false;
      } else if (phone.value.trim().length !== 10) {
        document.getElementById("phone").style.border = "solid 2px red";
        document.getElementById("phoneError").innerHTML = "*Phone number should be 10 digits";
        return false;
      } else if (password.value.trim() === "") {
        document.getElementById("pass").style.border = "solid 2px red";
        document.getElementById("passError").style.visibility = "visible";
        return false;
      } else if (password.value.trim().length < 8) {
        document.getElementById("pass").style.border = "solid 2px red";
        document.getElementById("passError").style.display = "none";
        document.getElementById("passError1").style.visibility = "visible";
        return false;
      } else {
        return true;
      }
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="/useraccess/SignUp.css" />

      <main>
        <div
          className="container shadow my-5 p-5 rounded"
          style={{ backgroundColor: "white" }}
        >
          <div className="row text-center">
            <h1 style={{ fontSize: 50, fontWeight: "bolder" }}>
              Start your journey with us
            </h1>
          </div>
          <div className="row py-5">
            <div className="col-lg-6">
              <img src="/src/assets/logup.jpeg" alt="sign up" className="  rounded-3 " />
            </div>
            <div className="col-lg-6">
              <h2 style={{ fontSize: 30, fontWeight: "bolder" }}>
                Create New Account
              </h2>
              <form
                className="py-4"
                action="SignIn.jsx"
                name="myForm"
                onSubmit="return validateForm()"
              >
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <span
                    id="nameError"
                    style={{ color: "red", visibility: "hidden" }}
                  >
                    *Name cannot be blank
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby=""
                    placeholder="your name"
                  />
                  <div id="fname" className="form-text">
                    Enter your full name
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <span
                    id="emailError"
                    style={{ color: "red", visibility: "hidden" }}
                  >
                    *Email cannot be blank
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="example@example.com"
                  />
                  <div id="" className="form-text">
                    We&apos;ll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="Phone Number" className="form-label">
                    Phone Number
                  </label>
                  <span
                    id="phoneError"
                    style={{ color: "red", visibility: "hidden" }}
                  >
                    *Phone Number cannot be blank
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="(xxx) xxx-xxxx"
                  />
                  <div id="" className="form-text">
                    Enter your phone number
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pass"
                      placeholder="Password"
                    />
                    <span
                      id="passError"
                      style={{ color: "red", visibility: "hidden" }}
                    >
                      *Password cannot be blank
                    </span>
                    <span
                      id="passError1"
                      style={{ color: "red", visibility: "hidden" }}
                    >
                      *Password length should be minimum 8 characters.
                    </span>
                    <div id="password" className="form-text">
                      Enter a strong password
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1"> Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pass"
                      placeholder="Password"
                    />
                    <div id="" className="form-text">
                      Confirm your password
                    </div>
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    I agree to the use or processing of my personal information by
                    ExpenseWize for the purpose of fulfilling this request and in
                    accordance with ExpenseWize Privacy Statement
                  </label>
                </div>
                <div className="row">
                  <button type="submit" className="btn btn-success btn-lg my-4">
                    Submit
                  </button>
                </div>
                <div className="row text-center">
                  <div className="col-md-6">
                    <div className="row">
                      <button
                        type="button"
                        className="btn btn-outline-success btn-flat"
                        title="Sign up with Google"
                      >
                        <i className="bi bi-google" />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row m-0">
                      <button
                        type="button"
                        className="btn btn-outline-success "
                        title="Sign up with Facebook"
                      >
                        <i className="bi bi-facebook" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
       {/* hidden div script */}
    </>
  );
}

export default Signup;