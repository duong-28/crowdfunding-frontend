import { useState, useEffect } from "react";
import getProjectPledges from "../api/get-project-pledges";

export default function useProjectPledges(projectId) {
    const [pledges, setPledges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchPledges = async () => {
            try {
                const pledgeData = await getProjectPledges(projectId);
                setPledges(pledgeData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPledges();
    }, [projectId]);

    return { pledges, isLoading, error };
} 