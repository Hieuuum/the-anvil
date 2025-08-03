import { useState, useRef } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
	const [startTime, setStartTime] = useState(null);
	const [now, setNow] = useState(null);
	const [sessionLength, setSessionLength] = useState(30);
	const intervalRef = useRef(null);

	function handleStart() {
		if (!sessionLength || sessionLength < 0) {
			alert("Please set a valid session length");
			return;
		}
		setStartTime(Date.now());
		setNow(Date.now());

		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 900);
	}

	function handleStop() {
		clearInterval(intervalRef.current);
	}

	function formatTime(secs) {
		const totalSeconds = Math.floor(secs);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = Math.floor(totalSeconds % 60);
		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
		}
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	}

	let secondsPassed = 0;
	if (startTime != null && now != null) {
		secondsPassed = (now - startTime) / 1000;
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div className="mb-4">
					<label className="block text-sm font-medium mb-2">
						Session Length (minutes):
					</label>
					<input
						type="number"
						min="1"
						max="120"
						value={sessionLength}
						onChange={(e) => setSessionLength(Number(e.target.value))}
						className="px-3 py-2 border rounded-md"
					/>
				</div>
				<p>
					{sessionLength != null &&
						formatTime(sessionLength * 60 - secondsPassed)}
				</p>
				<div className="flex gap-2">
					<button
						onClick={handleStart}
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
					>
						Start Timer
					</button>
					<button
						onClick={handleStop}
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
					>
						Stop Timer
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
