const mongoose = require("mongoose");
const URI = "mongodb+srv://salaoUser:5295bhff@clusterdev.asa64tr.mongodb.net/Barber-Pro?retryWrites=true&w=majority&appName=ClusterDev";


mongoose
  .connect(URI)
  .then(() => console.log("DB is up!!!"))
  .catch(() => console.log(err));
