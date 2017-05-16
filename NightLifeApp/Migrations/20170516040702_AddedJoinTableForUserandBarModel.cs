using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NightLifeApp.Migrations
{
    public partial class AddedJoinTableForUserandBarModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Bars_BarId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_BarId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BarId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "RSVP",
                columns: table => new
                {
                    BarId = table.Column<int>(nullable: false),
                    NightLifeUserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RSVP", x => new { x.BarId, x.NightLifeUserId });
                    table.ForeignKey(
                        name: "FK_RSVP_Bars_BarId",
                        column: x => x.BarId,
                        principalTable: "Bars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RSVP_AspNetUsers_NightLifeUserId",
                        column: x => x.NightLifeUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RSVP_NightLifeUserId",
                table: "RSVP",
                column: "NightLifeUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RSVP");

            migrationBuilder.AddColumn<int>(
                name: "BarId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_BarId",
                table: "AspNetUsers",
                column: "BarId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Bars_BarId",
                table: "AspNetUsers",
                column: "BarId",
                principalTable: "Bars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
