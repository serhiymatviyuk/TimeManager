using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TimeManager.Domain.Entities.Projects;
using TimeManager.Services.Projects.Contracts;

namespace TimeManager.Controllers
{
    //TODO: handle errors
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly ILogger<ProjectsController> _logger;
        private readonly IProjectService _projectService;

        public ProjectsController(ILogger<ProjectsController> logger, IProjectService projectService)
        {
            _logger = logger;
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _projectService.GetProjects());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Project project)
        {
            return Ok(await _projectService.CreateProject(project));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Project project)
        {
            await _projectService.UpdateProject(project);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            return Ok(await _projectService.DeleteProject(id));
        }
    }
}
