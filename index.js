

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(cors());
  
const useRoute = require("./Routes/userRoute")
const chatRouter = require("./Routes/chatRoute")
const messageRouter = require("./Routes/messageRoute")

const port = process.env.PORT || 5000;


app.use(express.json());


app.use("/api/users",useRoute);
app.use("/api/chats",chatRouter);
app.use("/api/messages",messageRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/',(req,res)=>
{
    console.log("welcome to node js file")
    res.send("chat application is connected")

})

// Connecting to mongoose db
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected successfully"))
    .catch(error => console.log(`Error in connection ${error}`));
