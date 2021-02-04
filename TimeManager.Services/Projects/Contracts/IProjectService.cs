using System.Collections.Generic;
using System.Threading.Tasks;
using TimeManager.Domain.Entities.Projects;

namespace TimeManager.Services.Projects.Contracts
{
    public interface IProjectService
    {
        Task<Project> GetProject(int id);
        Task<IEnumerable<Project>> GetProjects();
        Task<Project> CreateProject(Project project);
        Task UpdateProject(Project project);
        Task<int> DeleteProject(int projectId);
    }
}
