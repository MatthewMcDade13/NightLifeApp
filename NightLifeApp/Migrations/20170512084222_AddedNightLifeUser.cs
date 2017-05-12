using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NightLifeApp.Migrations
{
    public partial class AddedNightLifeUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NightLifeUserId",
                table: "Bars",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bars_NightLifeUserId",
                table: "Bars",
                column: "NightLifeUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bars_AspNetUsers_NightLifeUserId",
                table: "Bars",
                column: "NightLifeUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bars_AspNetUsers_NightLifeUserId",
                table: "Bars");

            migrationBuilder.DropIndex(
                name: "IX_Bars_NightLifeUserId",
                table: "Bars");

            migrationBuilder.DropColumn(
                name: "NightLifeUserId",
                table: "Bars");
        }
    }
}
