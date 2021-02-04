using System.Collections.Generic;

namespace TimeManager.Domain.Entities.Projects
{
    public class Project : BaseEntity
    {
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }

        public ICollection<ProjectTimeEntry> ProjectTimeEntries { get; set; } = new HashSet<ProjectTimeEntry>();
    }
}
