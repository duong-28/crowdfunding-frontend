import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import postPledge from "../api/post-pledge.js";

function PledgeForm({ projectId, onPledgeSuccess }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [pledgeData, setPledgeData] = useState({
    amount: '',
    comment: '', 
    project: Number(projectId),
    anonymous: !auth.token,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setPledgeData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' 
        ? checked 
        : id === 'amount' 
          ? Number(value)
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
      
      await postPledge(
        supporter, 
        pledgeData.amount, 
        pledgeData.comment, 
        !token || pledgeData.anonymous,
        pledgeData.project, 
        token
      );
      
      setSuccessMessage("Pledge created successfully!");
      // Reset form
      setPledgeData({
        amount: '',
        comment: '',
        project: Number(projectId),
        anonymous: !auth.token,
      });
      // Notify parent component
      if (onPledgeSuccess) {
        onPledgeSuccess();
      }

      // Set a timeout to reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 1000);

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
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </form>
  );
}

export default PledgeForm;