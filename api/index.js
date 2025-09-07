import express from "express";
import OpenAI from "openai";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";

const client = new OpenAI();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
	// console.log(req.body.msg);
	const response = await client.responses.create({
		model: "gpt-4o-mini",
		input: req.body.msg,
	});
	console.log(response.output_text);
	res.json(response.output_text);
	// res.json("#  I don't know   How about you?");
});

export default app;
