const mongoose = require('mongoose');
const Neighborhood = require('./models/Neighborhood');

mongoose.connect('mongodb+srv://tarunkalisetti2017:mypass123@test.czgxucp.mongodb.net/neighborfit?retryWrites=true&w=majority&appName=test')
  .then(async () => {
    await Neighborhood.deleteMany({});
    await Neighborhood.insertMany([
      {
        name: "Greenview",
        safety: 8, nightlife: 3, schools: 9, affordability: 6,
        greenery: 9, transport: 5
      },
      {
        name: "City Center",
        safety: 5, nightlife: 9, schools: 4, affordability: 3,
        greenery: 2, transport: 9
      },
      {
        name: "Quiet Hills",
        safety: 9, nightlife: 2, schools: 8, affordability: 7,
        greenery: 10, transport: 6
      },
      {
    name: "Sunny Meadows",
    safety: 7, nightlife: 5, schools: 6, affordability: 8,
    greenery: 8, transport: 6
  },
  {
    //can add as much as we want cities here thats why mongo db is useful if u use json u have change in code also 
    //but ifu databse like this u dont needto change everywhere, just change here and they will fetch it from here 
    name: "Tech District",
    safety: 6, nightlife: 7, schools: 7, affordability: 4,
    greenery: 5, transport: 9
  }
    ]);
    console.log(" Seeded successfully");
    process.exit();
  })
  .catch(err => console.error(" Seeding error:", err));
