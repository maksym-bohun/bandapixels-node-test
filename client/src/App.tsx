import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<div>ID</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
