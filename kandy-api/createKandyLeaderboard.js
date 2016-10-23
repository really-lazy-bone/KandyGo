var leaderboardData = [
  {
    name: "Candy Pirate",
    candyCount: 9987953,
  },
  {
    name: "Mr. Chocolate",
    candyCount: 23332
  },
  {
    name: "Eric Liao",
    candyCount: 426
  },
  {
    name: "Michael Hsu",
    candyCount: 10

  },
  {
    name: "Precious Pierre",
    candyCount: 1
  }
];

var conn = new Mongo();
var db = conn.getDB("kandygo");
db.leaderboard.remove({});

//create the names collection and add documents to it
leaderboardData.forEach(function(leaderboard){
  db.leaderboard.insert(leaderboard);
});

db.leaderboard.find({});
