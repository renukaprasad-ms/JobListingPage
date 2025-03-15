import api from "./api"; // Importing the configured Axios instance

// Function to fetch all jobs from the API
const getAllJobs = async () => {
  try {
    const response = await api.get("/posts"); // Making a GET request to fetch job listings
    return response.data; // Returning the fetched job data
  } catch (err) {
    console.error(err); // Logging the error for debugging
    throw err; // Throwing the error to be handled by the caller
  }
};

// Function to fetch job details by ID
const getJobById = async (jobId) => {
  try {
    const response = await api.get(`/posts/${jobId}`); // Making a GET request to fetch a specific job
    return response.data; // Returning the job details
  } catch (err) {
    console.error(err); // Logging the error for debugging
    throw err; // Throwing the error to be handled by the caller
  }
};

// Exporting job service functions for use in other parts of the application
export default {
    getAllJobs,
    getJobById
};
