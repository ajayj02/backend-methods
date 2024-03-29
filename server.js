const express = require("express");
const app = express();

const users = [
  {
    name: "Ajay",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

//to get requests
app.get("/", (req, res) => {
  let ajayKidneys = users[0].kidneys;
  let numberOfKidneys = ajayKidneys.length;
  let numberOfHealthyKidneys = 0;

  for (let i = 0; i < ajayKidneys.length; i++) {
    if (ajayKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }

  let numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnHealthyKidneys,
  });
});

//to post some data
app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

//to update some data
app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
});

//removing all the unhealthy kidneys
app.delete("/", (req, res) => {
  const newKidneys = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
  }
  users[0].kidneys = newKidneys;
  res.json({ msg: "done" });
});

app.listen(3000);
