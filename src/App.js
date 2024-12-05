import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import UserList from "./components/UserList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("employ-login"));

  if (!token) {
    return <AuthScreen setToken={setToken} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
