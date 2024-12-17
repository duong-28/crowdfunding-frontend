import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import postPledge from "../api/post-pledge.js";

function PledgeForm({ projectId }) {
  // const { projectId } = props;
  const navigate = useNavigate();
  const { auth } = useAuth();
  // const [amount, setAmount] = useState("");
  // const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [pledgeData, setPledgeData] = useState({
    amount: '',
    comment: '', 
    project: Number(projectId),
    anonymous: !auth.token,
  });

  // Pledge data when user has to log in to make a pledge
  // const [pledgeData, setPledgeData] = useState({
  //   amount: "",
  //   comment: "",
  //   anonymous: false,
  //   project: projectId,
  // });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setPledgeData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' 
        ? checked 
        : id === 'amount' 
          ? Number(value)  // Convert amount to number
          : value,
    }));
  };

  const handleSubmit = async (event) => { 
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    
    try {
      const token = auth.token;
      const supporter = auth.userId;
      
      // Log the pledge attempt
      console.log('Attempting to create pledge:', {
        isAuthenticated: !!token,
        pledgeData,
        supporter
      });

      await postPledge(
        supporter, 
        pledgeData.amount, 
        pledgeData.comment, 
        !token || pledgeData.anonymous, // Force anonymous if not logged in
        pledgeData.project, 
        token
      );
      
      setSuccessMessage(`Pledge created successfully for project ${projectId}`);
      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.error("Full error:", err);
      setError(`Failed to create pledge: ${err.message}`);
    }
  };

    return (
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
        type="number"
        id="amount"
        step="1"
        placeholder="Enter Pledge Amount"
        value={pledgeData.amount}
        onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
        id="comment"
        placeholder="Enter a comment (optional)"
        value={pledgeData.comment}
        onChange={handleChange}
        />
      </div>
      {auth.token ? (
        <div className="checkbox-wrapper">
        <label htmlFor="anonymous">Make my pledge anonymous:</label>
        <input
          type="checkbox"
          id="anonymous"
          checked={pledgeData.anonymous}
          onChange={handleChange}
        />
        Pledge anonymously
        </div>
      ) : (
        <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id="anonymous"
          checked={true}
          readOnly
        />
        Pledge anonymously (Login to change this option)
        </div>
      )}
      <button type="submit">Submit Pledge</button>
      </form>
    );
  }

export default PledgeForm;