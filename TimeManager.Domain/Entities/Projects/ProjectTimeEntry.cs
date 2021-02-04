using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TimeManager.Domain.Entities.Projects
{
    public class ProjectTimeEntry : BaseEntity
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int ProjectId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(ProjectId))]
        public virtual Project Project { get; set; }
    }
}
