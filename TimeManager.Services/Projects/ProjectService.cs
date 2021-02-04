using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeManager.Domain.Entities.Projects;
using TimeManager.Domain.Repositories.Contracts;
using TimeManager.Services.Projects.Contracts;

namespace TimeManager.Services.Projects
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public Task<Project> GetProject(int id)
            => Task.Factory.StartNew(() => _projectRepository.GetProject(id));

        public Task<IEnumerable<Project>> GetProjects()
            => Task.Factory.StartNew(() => _projectRepository.GetProjects());

        public Task<Project> CreateProject(Project project)
            => Task.Factory.StartNew(() =>
            {
                return _projectRepository.CreateProject(project);
            });

        public Task UpdateProject(Project project)
            => Task.Factory.StartNew(() =>
            {
                return _projectRepository.UpdateProject(project);
            });

        public Task<int> DeleteProject(int projectId)
            => Task.Factory.StartNew(() =>
            {
                _projectRepository.DeleteProject(projectId);
                return projectId;
            });
    }
}
