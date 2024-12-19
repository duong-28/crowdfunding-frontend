import SignUpForm from "../components/SignUpForm";
import "../styles/AuthPages.css";

function SignUpPage() {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Join Atletico</h1>
                    <p>Start making a difference in youth soccer</p>
                </div>
                <SignUpForm />
            </div>
        </div>
    );
}

export default SignUpPage;