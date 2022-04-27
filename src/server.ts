import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import book_routes from "./handlers/book";
import product_routes from "./handlers/products";
import user_routes from "./handlers/user"


dotenv.config(); 

const app: express.Application = express();
// const address: string = "0.0.0.0:8080";
const PORT = 3002

app.use(bodyParser.json());

book_routes(app);
product_routes(app);
user_routes(app);



app.get("/", async function (req: Request, res: Response) {
  
  res.send("this is server");
 
  
});


app.listen(PORT, function () {
  console.log(`started app on port: ${PORT}`);
});