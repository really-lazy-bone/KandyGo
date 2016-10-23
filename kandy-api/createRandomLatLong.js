var exampleLatLong = [
  {
    "lat":36.122821,
    "long": -115.169009
  },
  {
    "lat": 36.1225935,
    "long": -115.1704145
  },
  {
    "lat": 36.120828,
    "long": -115.168544
  },
  {
    "lat": 36.120686,
    "long": -115.1717265
  }
];

var conn = new Mongo();
var db = conn.getDB("kandygo");
db.randomlatlong.remove({});

//create the names collection and add documents to it
exampleLatLong.forEach(function(latlong){
  db.randomlatlong.insert(latlong);
});

db.randomlatlong.find({});
