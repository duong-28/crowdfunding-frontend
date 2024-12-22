import useProject from './use-project';
import useProjectPledges from './use-project-pledges';

export default function useProjectWithPledges(projectId) {
  const { project, isLoading: projectLoading, error: projectError } = useProject(projectId);
  const { pledges, isLoading: pledgesLoading, error: pledgesError } = useProjectPledges(projectId);

  return {
    project,
    pledges,
    isLoading: projectLoading || pledgesLoading,
    error: projectError || pledgesError
  };
} 