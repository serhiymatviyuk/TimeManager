using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TimeManager.Domain.Entities.Projects;

namespace TimeManager.DataAccess
{
    public class TimeManagerContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTimeEntry> ProjectTimeEntries { get; set; }

        public TimeManagerContext(DbContextOptions<TimeManagerContext> options)
            : base(options)
        {
        }
    }
}
