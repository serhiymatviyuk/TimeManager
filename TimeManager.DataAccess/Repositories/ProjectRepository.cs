using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TimeManager.Domain.Entities.Projects;
using TimeManager.Domain.Repositories.Contracts;

namespace TimeManager.DataAccess.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DbSet<Project> _projects;
        private readonly TimeManagerContext _dbContext;

        public ProjectRepository(TimeManagerContext dbContext)
        {
            _projects = dbContext.Projects;
            _dbContext = dbContext;
        }

        public bool IsProjectExist(int projectId) 
            => _projects.Any(x => x.Id == projectId);
        
        public Project GetProject(int projectId)
            => _projects.FirstOrDefault(x => x.Id == projectId);

        public IEnumerable<Project> GetProjects()
            => _projects.Include(x => x.ProjectTimeEntries).ToList();
        
        public Project CreateProject(Project project)
        {
            _projects.Add(project);

            _dbContext.SaveChanges();

            return project;
        }

        public Project UpdateProject(Project project)
        {
            var timeEntriesToDelete = _dbContext.ProjectTimeEntries
                .Where(x => x.ProjectId == project.Id)
                .Where(x => !project.ProjectTimeEntries.Select(t => t.Id).Contains(x.Id))
                .ToList();

            if (timeEntriesToDelete.Any())
            {
                _dbContext.ProjectTimeEntries.RemoveRange(timeEntriesToDelete);
            }

            _projects.Update(project);
            _dbContext.SaveChanges();

            return project;
        }

        public void DeleteProject(int projectId)
        {
            var originalProject = GetProject(projectId);

            _dbContext.ProjectTimeEntries.RemoveRange(originalProject.ProjectTimeEntries);
            _projects.Remove(originalProject);

            _dbContext.SaveChanges();
        }

    }
}
