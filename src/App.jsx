import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import JobDetails from "./pages/jobdetails/JobDetails";
import JobApplication from "./pages/jobapplication/JobApplication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/details/:id" element={<JobDetails/>}/>
        <Route path="/:id/apply" element={<JobApplication/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
