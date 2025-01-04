import React from "react";
import styles from "../../assets/css/AuthForm.module.css"; // Import CSS module
import signupImage from "../../assets/images/signup-image.jpg"; 

// Import các ảnh biểu tượng
import userIcon from "../../assets/images/user.png";
import emailIcon from "../../assets/images/email.png";
import padlockIcon from "../../assets/images/padlock.png";
import padlockOutlineIcon from "../../assets/images/padlock1.png";

const RegisterForm = () => {
  return (
    <section className={styles.signup}>
      <div className={styles.container}>
        <div className={styles["signup-content"]}>
          <div className={styles["signup-form"]}>
            <h2 className={styles["form-title"]}>Sign up</h2>
            <form method="POST" className={styles["register-form"]} id="register-form">
              {/* Icon và Input cho Your Name */}
              <div className={styles["form-group"]}>
                <div className={styles["icon-input"]}>
                  <img src={userIcon} alt="User Icon" className={styles["input-icon"]} />
                  <input type="text" name="name" id="name" placeholder="Your Name" className={styles["input-field"]} />
                </div>
              </div>
              {/* Icon và Input cho Email */}
              <div className={styles["form-group"]}>
                <div className={styles["icon-input"]}>
                  <img src={emailIcon} alt="Email Icon" className={styles["input-icon"]} />
                  <input type="email" name="email" id="email" placeholder="Your Email" className={styles["input-field"]} />
                </div>
              </div>
              {/* Icon và Input cho Password */}
              <div className={styles["form-group"]}>
                <div className={styles["icon-input"]}>
                  <img src={ padlockOutlineIcon} alt="Padlock Icon" className={styles["input-icon"]} />
                  <input type="password" name="pass" id="pass" placeholder="Password" className={styles["input-field"]} />
                </div>
              </div>
              {/* Icon và Input cho Repeat Password */}
              <div className={styles["form-group"]}>
                <div className={styles["icon-input"]}>
                  <img src={padlockIcon} alt="Padlock Outline Icon" className={styles["input-icon"]} />
                  <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" className={styles["input-field"]} />
                </div>
              </div>
              {/* Checkbox Agree Term */}
              <div className={styles["form-group"]}>
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  className={styles["agree-term"]}
                />
                <label htmlFor="agree-term" className={styles["label-agree-term"]}>
                  <span>
                    <span></span>
                  </span>
                  I agree all statements in{" "}
                  <a href="#" className={styles["term-service"]}>
                    VNMU
                  </a>
                </label>
              </div>
              {/* Button Submit */}
              <div className={styles["form-group"] + " " + styles["form-button"]}>
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className={styles["form-submit"]}
                  value="Register"
                />
              </div>
            </form>
          </div>
          <div className={styles["signup-image"]}>
            <figure>
              <img src={signupImage} alt="sign up" />
            </figure>
            <a href="/login" className={styles["signup-image-link"]}>
              I am already a member
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
