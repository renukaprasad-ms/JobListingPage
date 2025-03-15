import React from "react";
import styles from "./JobCard.module.css"; // Importing CSS module for styling
import { useNavigate } from "react-router-dom"; // Importing navigation hook

// Card component representing a single job listing
const Card = ({ job }) => {
  const navigate = useNavigate(); // Hook to navigate between routes

  // Function to navigate to job details page
  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div 
      className={styles.card} 
      onClick={() => handleDetails(job.id)} // Navigate to job details on card click
    >
      <div className={styles.companyLogo}></div> {/* Placeholder for company logo */}

      <div className={styles.info}>
        <h3 className={styles.company}>XYZ Company</h3> {/* Company name */}
        <h2 className={styles.title}>{job.title}</h2> {/* Job title */}
        <p className={styles.location}>On-site | Full-Time</p> {/* Job location and type */}

        {/* Job description - trims text if longer than 100 characters */}
        <p className={styles.description}>
          {job.body.length > 100 ? job.body.substring(0, 100) + "..." : job.body}
        </p>

        {/* Footer with "Show details" link */}
        <div className={styles.footer}>
          <span className={styles.details}>Show details</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
