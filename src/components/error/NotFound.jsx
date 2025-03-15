import React from "react";
import styles from "./NotFound.module.css"; // Importing CSS module for styling
import { useNavigate } from "react-router-dom"; // Importing hook for navigation

const NotFound = () => {
  const navigate = useNavigate(); // Hook to enable navigation

  return (
    <div className={styles.errorWrapper}> {/* Wrapper for the entire error page */}
      <div className={styles.center}> {/* Centering the content */}
        <section className={styles.error}> {/* Error section */}
          <h1 className={styles.error__title}>404</h1> {/* Displaying error code */}
          <h2 className={styles.error__type}>Page not found</h2> {/* Error message */}
          <p className={styles.error__cta}>
            We’re sorry, the page you have looked for does not exist in our
            database! Maybe go to our
            <span 
              className={`${styles.error__link} ${styles.error__link__purple}`} 
              onClick={() => navigate("/")} // Navigate back to home page on click
            >
              home page
            </span>{" "}
          </p>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
