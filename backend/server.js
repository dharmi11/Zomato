// Start Server npx nodemon server.js
const app = require("./src/app");
const connectDB = require("./src/db/db");
require("dotenv").config();
connectDB()

const PORT = 9090 ;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

