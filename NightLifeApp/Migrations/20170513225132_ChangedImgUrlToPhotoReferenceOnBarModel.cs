using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NightLifeApp.Migrations
{
    public partial class ChangedImgUrlToPhotoReferenceOnBarModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImgUrl",
                table: "Bars",
                newName: "PlaceId");

            migrationBuilder.RenameColumn(
                name: "BarUrl",
                table: "Bars",
                newName: "PhotoReference");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlaceId",
                table: "Bars",
                newName: "ImgUrl");

            migrationBuilder.RenameColumn(
                name: "PhotoReference",
                table: "Bars",
                newName: "BarUrl");
        }
    }
}
