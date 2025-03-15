import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById } from "../../store/jobSlice";
import styles from "./JobApplication.module.css"; 
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import NotFound from "../../components/error/NotFound";

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
  const [appliedJobs, setAppliedJobs] = useState([]); // Store applied jobs from local storage

  // Get job details, loading state, and error state from Redux store
  const { jobDetails, loading, error } = useSelector((state) => state.jobs);

  // Fetch job details when the component mounts or job ID changes
  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  // Load applied jobs from local storage
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedJobs);
    setApplied(storedJobs.some((job) => job.id === id)); // Check if current job is already applied
  }, [id]);

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
    if (!formData.name || !formData.email || !formData.phone || !formData.resume) {
      alert("Please fill out all fields and upload your resume.");
      return;
    }

    const appliedJob = {
      id,
      title: jobDetails.title,
      company: jobDetails.company,
      appliedAt: new Date().toLocaleString(),
    };

    // Store applied job in local storage
    const updatedJobs = [...appliedJobs, appliedJob];
    localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
    setAppliedJobs(updatedJobs);
    setApplied(true);

    alert("Application submitted successfully!");
  };

  // Navigate back to the previous page
  const handleCancel = () => {
    navigate(-1);
  };

  // Display loading message if job details are being fetched
  if (loading) return <Loader />;

  // Display error message if there was an issue fetching job details
  if (error) return <NotFound />;

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

        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Upload Resume</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} required />
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={handleApply} disabled={applied} className={styles.applyButton}>
            {applied ? "Applied ✅" : "Submit Application"}
          </button>
          <button onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className={styles.appliedJobs}>
        <h2>My Applied Jobs</h2>
        {appliedJobs.length === 0 ? (
          <p>No jobs applied yet.</p>
        ) : (
          <ul>
            {appliedJobs.map((job) => (
              <li key={job.id} className={styles.appliedJobItem}>
                <strong>{job.title}</strong> at {job.company} <br />
                <span>Applied on: {job.appliedAt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobApplication;
