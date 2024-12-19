import "./PledgeList.css";

function PledgeList({ pledges }) {
    return (
        <div className="pledge-list">
            <h2>Project Pledges</h2>
            {pledges.length === 0 ? (
                <p>No pledges yet. Be the first to support this project!</p>
            ) : (
                <ul>
                    {pledges.map((pledge, index) => (
                        <li key={index} className="pledge-item">
                            <p className="pledge-amount">${pledge.amount}</p>
                            <p className="pledge-comment">{pledge.comment}</p>
                            <p className="pledge-supporter">
                                Supported by: {pledge.supporter}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PledgeList; 