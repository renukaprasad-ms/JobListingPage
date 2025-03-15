import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobServices from "../services/jobService";

// Async action to fetch all jobs from the backend
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    return await jobServices.getAllJobs(); // Calls jobServices to retrieve job listings
});

// Async action to fetch a single job by its ID
export const fetchJobById = createAsyncThunk("jobs/fetchJobById", async (jobId) => {
    return await jobServices.getJobById(jobId); // Calls jobServices to fetch specific job details
});

// Job slice to manage job-related state using Redux Toolkit
const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],         // Stores all job listings
        jobDetails: null, // Stores details of a selected job
        loading: false,   // Tracks API call status
        error: null       // Stores any API request errors
    },
    extraReducers: (builder) => { 
        builder
            // Fetch all jobs: Pending state (API request in progress)
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
            })
            // Fetch all jobs: Success state (Data retrieved successfully)
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload; // Updates the job listings
            })
            // Fetch all jobs: Error state (Request failed)
            .addCase(fetchJobs.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch jobs";
            })

            // Fetch job by ID: Pending state (Fetching job details)
            .addCase(fetchJobById.pending, (state) => {
                state.loading = true;
            })
            // Fetch job by ID: Success state (Job details received)
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.jobDetails = action.payload; // Updates the selected job details
            })
            // Fetch job by ID: Error state (Request failed)
            .addCase(fetchJobById.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch job details";
            });
    }
});

export default jobSlice.reducer;
