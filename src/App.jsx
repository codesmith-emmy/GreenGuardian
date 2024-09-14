import React from "react";
import { Home, GetStarted, LearnMore } from "@pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryContextProvider } from "./store/QueryContext";
const App = () => {
  return (
    <QueryContextProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </Router>
    </QueryContextProvider>
  );
};

export default App;
