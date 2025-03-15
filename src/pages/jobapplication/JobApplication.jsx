import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById } from "../../store/jobSlice";
import styles from "./JobApplication.module.css";
import { useParams, useNavigate } from "react-router-dom";

const JobApplication = () => {
  const { id } = useParams(); // Get the job ID from the URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Redux dispatch function

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null, // Store uploaded resume file
  });

  const [applied, setApplied] = useState(false); // Track if the user has applied

  // Get job details, loading state, and error state from Redux store
  const { jobDetails, loading, error } = useSelector((state) => state.jobs);

  // Fetch job details when the component mounts or job ID changes
  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  // Handle text input field changes and update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle resume file upload and update form state
  const handleResumeUpload = (event) => {
    setFormData({ ...formData, resume: event.target.files[0] });
  };

  // Handle job application submission
  const handleApply = () => {
    // Ensure all fields are filled before submitting
    if (!formData.name || !formData.email || !formData.phone || !formData.resume) {
      alert("Please fill out all fields and upload your resume.");
      return;
    }

    setApplied(true); // Mark application as submitted
    alert("Application submitted successfully!");
  };

  // Navigate back to the previous page
  const handleCancel = () => {
    navigate(-1);
  };

  // Display loading message if job details are being fetched
  if (loading) return <p>Loading job details...</p>;

  // Display error message if there was an issue fetching job details
  if (error) return <p>Error loading job details.</p>;

  // Display a message if no job details are found
  if (!jobDetails) return <p>No job found.</p>;

  return (
    <div className={styles.container}>
      {/* Job Details Section */}
      <div className={styles.jobDetails}>
        <h1>{jobDetails.title}</h1>
        <h3>{jobDetails.company}</h3>
        <p className={styles.location}>{jobDetails.location}</p>
        <p className={styles.description}>{jobDetails.description}</p>
      </div>

      {/* Job Application Form */}
      <div className={styles.applySection}>
        <h2>Apply Now</h2>

        {/* Name Input Field */}
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        {/* Email Input Field */}
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Phone Number Input Field */}
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        {/* Resume Upload Field */}
        <div className={styles.formGroup}>
          <label>Upload Resume</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} required />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className={styles.buttonContainer}>
          <button onClick={handleApply} disabled={applied} className={styles.applyButton}>
            {applied ? "Applied ✅" : "Submit Application"}
          </button>
          <button onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>

      {/* Company Information Section */}
      <div className={styles.companyInfo}>
        <h3>About {jobDetails.company}</h3>
        <p>{jobDetails.companyDescription}</p>
      </div>

      {/* Similar Jobs Section */}
      <div className={styles.similarJobs}>
        <h2>Similar Jobs</h2>
        <ul>
          {jobDetails.similarJobs?.map((similarJob, index) => (
            <li key={index} className={styles.similarJobItem}>
              {similarJob.title} at {similarJob.company}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobApplication;
