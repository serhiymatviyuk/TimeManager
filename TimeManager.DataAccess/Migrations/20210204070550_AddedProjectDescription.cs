using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeManager.DataAccess.Migrations
{
    public partial class AddedProjectDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectDescription",
                table: "Projects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectDescription",
                table: "Projects");
        }
    }
}
