// import express from "express";
// import bodyParser from "body-parser";
// // import session from "express-session";
// import env from "dotenv";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// // import { createClient } from "@supabase/supabase-js";

// const app = express();
// const port = 3000;
// env.config();
// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use(bodyParser.urlencoded({ extended: true }));

// // app.use(
// // 	session({
// // 		secret: process.env.SESSION_SECRET,
// // 		resave: false,
// // 		saveUninitialized: true,
// // 	})
// // );

// // const supabaseUrl = process.env.SUPABASE_URL;
// // const supabaseKey = process.env.SUPABASE_ANON_KEY;
// // const supabase = createClient(supabaseUrl, supabaseKey);

// // Environment-based configuration
// if (process.env.NODE_ENV === "production") {
// 	// In production, serve the built React files
// 	app.use(express.static("dist"));

// 	// Serve the React app for all non-API routes
// 	app.get("*", (req, res) => {
// 		res.sendFile(__dirname + "/dist/index.html");
// 	});
// } else {
// 	// In development, just provide a simple message
// 	app.get("/", (req, res) => {
// 		res.json({
// 			message:
// 				"Backend server running. Use Vite dev server (port 5173) for frontend.",
// 			frontend: "http://localhost:5173",
// 		});
// 	});
// }

// // Example API route (you can add your actual API routes here)
// app.get("/api/health", (req, res) => {
// 	res.json({ status: "OK", timestamp: new Date().toISOString() });
// });

// app.listen(port, () => {
// 	console.log(`Server running on port ${port}`);
// });
