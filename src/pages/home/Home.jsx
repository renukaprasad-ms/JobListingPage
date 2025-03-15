import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../store/jobSlice";
import SearchBar from "../../components/searchBar/SearchBar";
import JobCard from "../../components/jobcard/JobCard";
import Loader from "../../components/loader/Loader";
import Header from "../../components/header/Header";
import NotFound from "../../components/error/NotFound";
import styles from "./Home.module.css";
import bgc from "../../assets/bgc.avif";

const Home = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [searchBar, setSearchBar] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10; // Number of jobs displayed per page

  // Fetch jobs when the component mounts
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Ensure jobs data is available before handling pagination
  if (!jobs || jobs.length === 0) {
    return <Loader />; // Display loading state if jobs are not available
  }

  // Calculate total number of pages based on available jobs
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Determine jobs to display on the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handlers for pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.home}>
      {/* Background image container */}
      <div className={styles.bgcContainer}>
        <img src={bgc} alt="Background" />
      </div>

      {/* Header with Search Bar Toggle */}
      <Header setSearchBar={setSearchBar} searchBar={searchBar} />
      {searchBar && <SearchBar />} {/* Show search bar if enabled */}

      {/* Display loading state, error message, or job listings */}
      {loading && <Loader />}
      {error && <NotFound />}

      {/* Job Listings */}
      <div className={styles.jobContainer}>
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
