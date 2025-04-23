using System.Net.Http.Headers;
using DeShawnsDogWalkingZeus.Models;
using DeShawnsDogWalkingZeus.Models.DTO;
using Microsoft.AspNetCore.Routing.Constraints;

List<Dog> dogs = new List<Dog>(){
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
    },
    new Dog() {
        Id = 4,
        Name = "Cerberus",
        CityId = 4,
        WalkerId = 4
    },
    new Dog(){
        Id = 5,
        Name = "Hermes",
        CityId = 5,
        WalkerId = 5
    }
};

List<City> cities = new List<City>(){
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
    },
    new City() {
        Id = 4,
        Name = "Antioch"
    },
    new City() {
        Id = 5,
        Name = "Murfreesboro"
    }
};

List<Walker> walkers = new List<Walker>() {
    new Walker() {
        Id = 1,
        Name = "Ezekiel"
    },
    new Walker() {
        Id = 2,
        Name = "Jebediah"
    },
    new Walker() {
        Id = 3,
        Name = "Gabriel"
    },
    new Walker() {
        Id = 4,
        Name = "Lazarus"
    },
    new Walker() {
        Id = 5,
        Name = "Mary"
    }
};

List<WalkerCity> walkerCities = new List<WalkerCity>(){
    new WalkerCity(){
        Id = 1,
        CityId = 1,
        WalkerId = 1
    },
    new WalkerCity(){
        Id = 2,
        CityId = 1,
        WalkerId = 4
    },
    new WalkerCity(){
        Id = 3,
        CityId = 2,
        WalkerId = 2
    },
    new WalkerCity(){
        Id = 4,
        CityId = 2,
        WalkerId = 5
    },
    new WalkerCity(){
        Id = 5,
        CityId = 3,
        WalkerId = 3
    },
    new WalkerCity(){
        Id = 6,
        CityId = 3,
        WalkerId = 1
    },
    new WalkerCity(){
        Id = 7,
        CityId = 4,
        WalkerId = 4
    },
    new WalkerCity(){
        Id = 8,
        CityId = 4,
        WalkerId = 2
    },
    new WalkerCity(){
        Id = 9,
        CityId = 5,
        WalkerId = 5
    },
    new WalkerCity(){
        Id = 10,
        CityId = 5,
        WalkerId = 3
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

app.MapGet("/api/dogs", () =>
{
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        CityId = d.CityId,
        WalkerId = d.WalkerId
    });
});

app.MapGet("/api/cities", () =>
{
    return cities.Select(c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});

app.MapGet("/api/walkers/", () =>
{
    return walkers.Select(w => new WalkerDTO
    {
        Id = w.Id,
        Name = w.Name
    });
});

app.MapGet("/api/walkercities", () =>
{
    return walkerCities.Select(wc => new WalkerCityDTO
    {
        Id = wc.Id,
        WalkerId = wc.WalkerId,
        CityId = wc.CityId

    });
});

app.MapPost("/api/dogs", (Dog dogObj) =>
{

    //if the client did not provide a valid dog object
    if (dogObj == null)
    {
        return Results.BadRequest();
    }

    //create a new id
    dogObj.Id = dogs.Max(d => d.Id) + 1;
    dogs.Add(dogObj);

    return Results.Created($"/api/dogs/{dogObj.Id}", new DogDTO
    {
        Id = dogObj.Id,
        Name = dogObj.Name,
        CityId = dogObj.CityId,
        WalkerId = dogObj.WalkerId
    });

});

app.MapPost("/api/cities", (City city) =>
{
    city.Id = cities.Max(c => c.Id) + 1;
    cities.Add(city);
    return Results.Created($"/api/cities/{city.Id}", new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    });
});

app.MapPost("/api/walkercities", (WalkerCity walkerCity) => {
    //if the client did not provide a valid walkercity object
    if (walkerCity == null)
    {
        return Results.BadRequest();
    }

    //if the relationship already exists, throw a conflict error
    if (walkerCities.Any(wc => wc.WalkerId == walkerCity.WalkerId && wc.CityId == walkerCity.CityId))
    {
        return Results.Conflict("This walker-city relationship already exists.");
    }

    //create a new id
    walkerCity.Id = walkerCities.Max(wc => wc.Id) + 1;
    walkerCities.Add(walkerCity);

        return Results.Created($"/api/walkercities/{walkerCity.Id}", new WalkerCityDTO
    {
        Id = walkerCity.Id,
        CityId = walkerCity.CityId,
        WalkerId = walkerCity.WalkerId
    });

});

app.MapPut("/api/dogs/{id}", (int id, Dog dogObj) =>
{

    //if the client did not provide a valid dog object
    if (dogObj == null)
    {
        return Results.BadRequest();
    }

    //find the id based on the one put into the parameter
    Dog foundDog = dogs.FirstOrDefault(d => d.Id == id);

    foundDog.WalkerId = dogObj.WalkerId;

    return Results.Ok(new DogDTO
    {
        Id = foundDog.Id,
        Name = foundDog.Name,
        CityId = foundDog.CityId,
        WalkerId = foundDog.WalkerId
    });
});

app.MapPut("/api/walkers/{id}", (int id, Walker walkerObj) => {

    //if the client did not provide a valid walker object
    if (walkerObj == null)
    {
        return Results.BadRequest();
    }

    Walker foundWalker = walkers.FirstOrDefault(w => w.Id == id);

    return Results.Ok(new WalkerDTO{
        Id = foundWalker.Id,
        Name = foundWalker.Name
    });

});

app.Run();
