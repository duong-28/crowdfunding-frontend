import LoginForm from "../components/LoginForm";
import "../styles/AuthPages.css";

function LoginPage() {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Continue supporting youth soccer dreams</p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;