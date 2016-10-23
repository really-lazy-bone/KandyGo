var kandyTypeData = [
  {
    "eventName": "halloween",
    "eventDisplayName": "Halloween",
    "eventDescription": "spooky fun festival for kids and adults",
    "candyType": "bite-size-candy",
    "candyName": "Bite-Sized Candy",
    "candyImageName": "bite-size.svg",
    "candyDescription": "cheap candy from cheap people lol",
    "candyConversionRate": 0.05
  },
  {
    "eventName": "halloween",
    "eventDisplayName": "Halloween",
    "eventDescription": "spooky fun festival for kids and adults",
    "candyType": "normal-candy",
    "candyName": "Normal Candy",
    "candyImageName": "normal-size.svg",
    "candyDescription": "your everyday standard candy",
    "candyConversionRate":0.10
  },
  {
    "eventName": "halloween",
    "eventDisplayName": "Halloween",
    "eventDescription": "spooky fun festival for kids and adults",
    "candyType": "full-size-candy",
    "candyName": "Full-Size Candy",
    "candyImageName": "full-size.svg",
    "candyDescription": "only the rich and elite can afford this. Full-sized bars",
    "candyConversionRate":0.5
  },
  {
    "eventName": "halloween",
    "eventDisplayName": "Halloween",
    "eventDescription": "Community event to clean the beach",
    "candyType": "mastercard-candy",
    "candyName": "Mastercard Candy",
    "candyImageName": "mastercard-candy.svg",
    "candyDescription": "Priceless",
    "candyConversionRate":1
  },
  {
    "eventName": "heal-the-bay-mastercard",
    "eventDisplayName": "Heal the Bay (Sponsored by Mastercard)",
    "eventDescription": "Community event to clean the beach",
    "candyType": "mastercard-candy",
    "candyName": "Mastercard Candy",
    "candyImageName": "mastercard-candy.svg",
    "candyDescription": "Priceless",
    "candyConversionRate":1
  }
];



var conn = new Mongo();
var db = conn.getDB("kandygo");
db.kandytypes.remove({});

//create the names collection and add documents to it
kandyTypeData.forEach(function(kandyType){
  print("inserting: "+kandyType);
  db.kandytypes.insert(kandyType);
});

db.kandytypes.find({});
