var leaderboardData = [
  {
    name: "Candy Pirate",
    candyCount: 9987953,
  },
  {
    name: "Mr. Chocolate",
    candyCount: 23332
  }
  {
    name: "Eric Liao",
    candyCount: 23
  }
  {
    name: "Michael Hsu",
    candyCount: 10

  }
  {
    name: "Precious Pierre",
    candyCount: 1
  }
];

var conn = new Mongo();
var db = conn.getDB("kandygo");
db.leaderboard.remove({});

//create the names collection and add documents to it
exampleUserCandyData.forEach(function(kandyUser){
  db.kandyusers.insert(kandyUser);
});

db.kandyusers.find({});
