import React from "react";
import styles from "../../assets/css/AuthForm.module.css"; // Import CSS Modules
import signinImage from "../../assets/images/signin-image.jpg";

// Import các ảnh biểu tượng
import userIcon from "../../assets/images/user.png";
import padlockIcon from "../../assets/images/padlock.png";
import facebookIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/twitter.png";
import googleIcon from "../../assets/images/google.png";

const LoginForm = () => {
  return (
    <section className={styles["sign-in"]}>
      <div className={styles["container"]}>
        <div className={styles["signin-content"]}>
          <div className={styles["signin-image"]}>
            <figure>
              <img src={signinImage} alt="sign in" />
            </figure>
            <a href="/register" className={styles["signup-image-link"]}>
              Create an account
            </a>
          </div>
          <div className={styles["signin-form"]}>
            <h2 className={styles["form-title"]}>Sign In</h2>
            <form method="POST" className={styles["register-form"]} id="login-form">
              <div className={styles["form-group"]}>
                {/* Icon và Input cho Your Name */}
                <div className={styles["icon-input"]}>
                  <img src={userIcon} alt="User Icon" className={styles["input-icon"]} />
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                    className={styles["input-field"]}
                  />
                </div>
              </div>
              <div className={styles["form-group"]}>
                {/* Icon và Input cho Password */}
                <div className={styles["icon-input"]}>
                  <img src={padlockIcon} alt="Padlock Icon" className={styles["input-icon"]} />
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    className={styles["input-field"]}
                  />
                </div>
              </div>
              <div className={styles["form-group"]}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className={styles["agree-term"]}
                />
                <label htmlFor="remember-me" className={styles["label-agree-term"]}>
                  <span>
                    <span></span>
                  </span>
                  Remember me
                </label>
              </div>
              <div className={styles["form-group"] + " " + styles["form-button"]}>
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className={styles["form-submit"]}
                  value="Log in"
                />
              </div>
            </form>
            <div className={styles["social-login"]}>
              <span className={styles["social-label"]}>Or login with</span>
              <ul className={styles["socials"]}>
                <li>
                  <a href="#">
                    <img
                      src={facebookIcon}
                      alt="Facebook"
                      className={styles["social-icon"]}
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src={twitterIcon}
                      alt="Twitter"
                      className={styles["social-icon"]}
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src={googleIcon}
                      alt="Google"
                      className={styles["social-icon"]}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
