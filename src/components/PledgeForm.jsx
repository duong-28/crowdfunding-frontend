import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postPledge from "../api/post-pledge.js";
import { use } from "react";

function PledgeForm(projectId) {
  // const { projectId } = props;
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [amount, setAmount] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [pledgeData, setPledgeData] = useState({
    amount: '',
    comment: '', 
    project: projectId,
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
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => { 
    event.preventDefault();
    setError("")
    setSuccessMessage("")
    
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to make a pledge")
        return;
      }

      await postPledge(pledgeData, token)
      navigate(`/projects/${projectId}`);

      setSuccessMessage(`Pledge created successfully for project ${projectId}`);
    } catch (err) {
      setError(`Failed to create pledge: ${err.message}`);
    }
  };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type = "number"
            id = "amount"
            step = "1"
            placeholder="Enter Pledge Amount"
            value={pledgeData.amount}
            onChange={handleChange} 
          />
        </div><div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id = "comment"
            placeholder="Enter a comment (optional)"
            value={pledgeData.comment}
            onChange={handleChange} 
          />
        </div>
        <div className="checkbox-wrapper">
          <label htmlFor="anonymous">Make my pledge anonymous:</label>
            <input
              type = "checkbox"
              id = "anonymous"
              checked={pledgeData.anonymous}
              onChange={handleChange} 
            />
            Pledge anonymously
        </div>
        <button type="submit">Submit Pledge</button>
      </form>
    );
  }

export default PledgeForm;