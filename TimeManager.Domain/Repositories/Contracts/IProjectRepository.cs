using System.Collections.Generic;
using TimeManager.Domain.Entities.Projects;

namespace TimeManager.Domain.Repositories.Contracts
{
    public interface IProjectRepository
    {
        Project GetProject(int projectId);
        IEnumerable<Project> GetProjects();
        Project CreateProject(Project project);
        Project UpdateProject(Project project);
        void DeleteProject(int projectId);
        bool IsProjectExist(int projectId);
    }
}
