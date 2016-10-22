var exampleUserCandyData = [
  {
  userName: "eric",
  userDisplayName: "Eric",
  userPofile: "",
  candies: [
    {
      "candyObject": {
          "eventName": "halloween",
          "eventDisplayName": "Halloween",
          "eventDescription": "spooky fun festival for kids and adults",
          "candyType": "bite-size-candy",
          "candyName": "Bite-Sized Candy",
          "candyImageName": "bite-size.svg",
          "candyDescription": "cheap candy from cheap people lol",
          "candyConversionRate": 0.05
        },
      "count": 500
    },
    {
      "candyObject":  {
          "eventName": "halloween",
          "eventDisplayName": "Halloween",
          "eventDescription": "spooky fun festival for kids and adults",
          "candyType": "normal-candy",
          "candyName": "Normal Candy",
          "candyImageName": "normal-size.svg",
          "candyDescription": "your everyday standard candy",
          "candyConversionRate":0.10
        },
      "count": 100
    },
    {
      "candyObject":    {
          "eventName": "halloween",
          "eventDisplayName": "Halloween",
          "eventDescription": "spooky fun festival for kids and adults",
          "candyType": "full-size-candy",
          "candyName": "Full-Size Candy",
          "candyImageName": "full-size.svg",
          "candyDescription": "only the rich and elite can afford this. Full-sized bars",
          "candyConversionRate":0.5
        },
      "count": 100
    }
  ]
}];

var conn = new Mongo();
var db = conn.getDB("kandygo");
db.kandyusers.remove({});

//create the names collection and add documents to it
exampleUserCandyData.forEach(function(kandyUser){
  db.kandyusers.insert(kandyUser);
});

db.kandyusers.find({});
