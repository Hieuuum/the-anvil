import { useState, useRef } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
	const [startTime, setStartTime] = useState(null);
	const [now, setNow] = useState(null);
	const [totalTime, setTotalTime] = useState(null);
	const intervalRef = useRef(null);

	function handleStart() {
		setStartTime(Date.now());
		setNow(Date.now());

		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 100);
	}

	function handleStop() {
		clearInterval(intervalRef.current);
	}

	let secondsPassed = 0;
	if (startTime != null && now != null) {
		secondsPassed = (now - startTime) / 1000;
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<p>Pomodoro session: {secondsPassed.toFixed(0)}</p>
				<p>Current Time: {secondsPassed.toFixed(0)}</p>
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
