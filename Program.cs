using System.Net.Http.Headers;
using DeShawnsDogWalkingZeus.Models;
using DeShawnsDogWalkingZeus.Models.DTO;

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
        Name = "Ezekiel",
        Cities = new List<int>{ 1, 4 }
    },
    new Walker() {
        Id = 2,
        Name = "Jebediah",
        Cities = new List<int>{ 1, 2 }
    },
    new Walker() {
        Id = 3,
        Name = "Gabriel",
        Cities = new List<int>{ 3, 5 }
    },
    new Walker() {
        Id = 4,
        Name = "Lazarus",
        Cities = new List<int>{ 4, 3 }
    },
    new Walker() {
        Id = 5,
        Name = "Mary",
        Cities = new List<int>{ 2, 5 }
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

app.MapGet("/api/walkers", () =>
{
    return walkers.Select(w => new WalkerDTO
    {
        Id = w.Id,
        Name = w.Name,
        Cities = w.Cities
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


app.Run();
