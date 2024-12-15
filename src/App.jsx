import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import NavBar from "./components/NavBar";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/projects/create" element={<CreateProjectPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App; 