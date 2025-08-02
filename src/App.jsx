import { useState, useRef } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
	const [startTime, setStartTime] = useState(null);
	const [now, setNow] = useState(null);
	const [sessionLength, setSessionLength] = useState(null);
	const intervalRef = useRef(null);

	function handleStart() {
		setStartTime(Date.now());
		setNow(Date.now());

		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 1000);
	}

	function handleStop() {
		clearInterval(intervalRef.current);
	}

	function formatTime(seconds) {
		const secondsLeft = Math.floor(seconds % 60);
		const minutesLeft = Math.floor(seconds / 60);
		const hoursLeft = Math.floor(seconds / 3600);
		console.log(minutesLeft);
		return `You have ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds left.`;
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
