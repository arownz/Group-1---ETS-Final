import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Temporarily navigate to Dashboard without authentication
    navigate('/dashboard');
  };

  return (
    <>
        
      <main>
        <div
          className="container shadow my-5 p-5 rounded"
          style={{ backgroundColor: "white" }}
        >
          <div className="row text-center">
            <h1 style={{ fontSize: 50, fontWeight: "bolder" }}>
              Log in to your account
            </h1>
          </div>
          <div className="row py-5 ">
            <div className="col px-4">
              <img
                src="Images/login.jpeg"
                alt="sign up"
                className="img-fluid rounded"
              />
            </div>
            <div className="col py-5">
              <h2 style={{ fontSize: 30, fontWeight: "bolder" }}>
                Please enter your login information
              </h2>
              <form
                className="py-4"
                onSubmit={handleSubmit}
              >
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
                    placeholder="Email"
                  />
                  <div id="emailHelp" className="form-text">
                    We&apos;ll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <span
                      id="passError"
                      style={{ color: "red", visibility: "hidden" }}
                    >
                      *Password cannot be blank
                    </span>
                    {/* <span id="passError1" style="color: red; visibility:hidden;">*Password length should be minimum 8 characters.</span> */}
                    <input
                      type="password"
                      className="form-control"
                      id="pass"
                      placeholder="Password"
                    />
                    <div id="password" className="form-text">
                      Forget Password?{" "}
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
                    Remember me
                  </label>
                </div>  
                <div className="row">
                  <button type="submit" className="btn btn-success btn-lg  my-4">
                    Log In
                  </button>
                </div>
                <div className="row text-center">
                  <div className="col-md-6">
                    <div className="row">
                      <button
                        type="button"
                        className="btn btn-outline-success btn-flat"
                      >
                        <i className="bi bi-google" />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row m-0">
                      <button type="button" className="btn btn-outline-success ">
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

      {/* hidden div script  */}
    </>

  );
}

export default SignIn;