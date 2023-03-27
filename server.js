// import app.js from the folder backend
const app = require("./backend/app");

// backend server is listening on http://localhost:3000
app.listen(3000, ()=> {
    console.log("Express Application is listening on PORT 3000 ...");
});