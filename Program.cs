using System.Net.Http.Headers;
using DeShawnsDogWalkingZeus.Models;
using DeShawnsDogWalkingZeus.Models.DTO;

List <Dog> dogs = new List<Dog>(){
    new Dog() {
        Id = 1,
        Name = "Hera",
        CityId = 1,
        WalkerId = 1
    },
    new Dog() {
        Id = 2,
        Name = "Ares",
        CityId = 2,
        WalkerId = 2
    },
    new Dog() {
        Id = 3,
        Name = "Athena",
        CityId = 3,
        WalkerId = 3
    }
};

List <City> cities = new List<City>(){
    new City() {
        Id = 1,
        Name = "Nashville"
    },
    new City() {
        Id = 2,
        Name = "Franklin"
    },
    new City() {
        Id = 3,
        Name = "Brentwood"
    }
};

List <Walker> walkers = new List<Walker>() {
    new Walker() {
        Id = 1,
        Name = "Ezekiel",
        Cities = new List<int>{ 1 }
    },
    new Walker() {
        Id = 2,
        Name = "Jebediah",
        Cities = new List<int>{ 1, 2 }
    },
    new Walker() {
        Id = 3,
        Name = "Gabriel",
        Cities = new List<int>{ 3 }
    }
};

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () => {
    return dogs.Select(d => new DogDTO{
        Id = d.Id,
        Name = d.Name,
        CityId = d.CityId,
        WalkerId = d.WalkerId
    });
});

app.MapGet("/api/cities", () => {
    return cities.Select(c => new CityDTO{
        Id = c.Id,
        Name = c.Name
    });
});

app.MapGet("/api/walkers", () => {
    return walkers.Select(w => new WalkerDTO{
        Id = w.Id,
        Name = w.Name,
        Cities = w.Cities
    });
});

app.Run();
