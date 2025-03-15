import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById } from "../../store/jobSlice";
import styles from "./JobDetails.module.css";
import Loader from "../../components/loader/Loader";
import NotFound from "../../components/error/NotFound";

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL parameters
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Hook for navigation
  const { jobDetails, loading, error } = useSelector((state) => state.jobs); // Get job details from Redux store

  // Fetch job details when the component mounts or when job ID changes
  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  // Show loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  // Show error component if fetching job details fails
  if (error) {
    return <NotFound />;
  }

  return (
    <div className={styles.container}>
      {/* Back to Home Button */}
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <span className={styles.backIcon}>←</span> Back to Home
      </button>

      {/* Job Header Section */}
      <div className={styles.header}>
        <div className={styles.companyLogo}></div> {/* Placeholder for company logo */}
        <div className={styles.jobInfo}>
          <h2 className={styles.company}>XYZ Company</h2> {/* Company Name */}
          <h2 className={styles.title}>{jobDetails?.title}</h2> {/* Job Title */}
          <p className={styles.location}>On-site | Full-Time</p> {/* Job Location and Type */}
        </div>
        <button className={styles.applyButton} onClick={() => navigate(`/${id}/apply`)}>
          Apply Now
        </button>
      </div>

      {/* Job Content Section */}
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <h2 className={styles.aboutLabel}>About The Job</h2>
          <p className={styles.body}>{jobDetails?.body}</p> {/* Job Description */}
          <div className={styles.footer}>
            User ID: {jobDetails?.userId} | Job ID: {jobDetails?.id} {/* Job Metadata */}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className={styles.rightColumn}>
          <div className={styles.sideInfo}>
            <h3>Job Details</h3>
            <p>Employment Type: Full-Time</p>
            <p>Industry: Tech</p>
            <p>Experience Level: Mid-Senior</p>
          </div>
          <div className={styles.recruiterInfo}>
            <h3>Posted by</h3>
            <div className={styles.recruiterProfile}>
              <div className={styles.recruiterAvatar}></div> {/* Placeholder for recruiter avatar */}
              <div>
                <p>John Doe</p>
                <p>Hiring Manager at XYZ Company</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
