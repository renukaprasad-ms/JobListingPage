import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice"; // Importing the job reducer

// Configuring the Redux store
const store = configureStore({
    reducer: {
        jobs: jobReducer // Assigning jobSlice reducer to manage job-related state
    }
});

export default store; // Exporting the store to be used across the application
