import axios from "axios"; // Importing Axios for making HTTP requests

// Base URL for API requests (currently using JSONPlaceholder for testing)
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Creating an Axios instance with default configurations
const api = axios.create({
    baseURL: API_BASE_URL, // Setting the base URL for all requests
    headers: {
        "Content-Type": "application/json" // Ensuring JSON format for request payloads
    }
});

export default api; // Exporting the Axios instance for use across the project
