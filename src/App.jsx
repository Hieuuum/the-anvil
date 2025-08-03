import { useState, useRef, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
	const [startTime, setStartTime] = useState(null);
	const [now, setNow] = useState(null);
	const [sessionLength, setSessionLength] = useState(30);
	const intervalRef = useRef(null);
	const [isCompleted, setIsCompleted] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [pauseStartTime, setPauseStartTime] = useState(null);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	function handleStart() {
		if (!sessionLength || sessionLength < 0) {
			alert("Please set a valid session length");
			return;
		}
		setStartTime(Date.now());
		setNow(Date.now());
		setIsCompleted(false);
		setIsPaused(false);
		setPauseStartTime(null);

		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 100);
	}

	function handlePause() {
		if (isPaused) {
			// Resuming
			setStartTime((prev) => prev + Date.now() - pauseStartTime);
			setPauseStartTime(null);
			intervalRef.current = setInterval(() => {
				setNow(Date.now());
			}, 900);
		} else {
			// Pausing
			setPauseStartTime(Date.now());
			clearInterval(intervalRef.current);
		}
		setIsPaused((val) => {
			return !val;
		});
	}

	function handleClear() {
		clearInterval(intervalRef.current);
		setStartTime(null);
		setNow(null);
		setIsCompleted(false);
		setIsPaused(false);
		setPauseStartTime(null);
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
	let timeRemaining = 0;
	if (startTime != null && now != null) {
		secondsPassed = (now - startTime) / 1000;
		timeRemaining = sessionLength * 60 - secondsPassed;

		// Check if session is completed
		if (timeRemaining <= 0 && !isCompleted) {
			setIsCompleted(true);
			clearInterval(intervalRef.current);
			alert("Session Completed!");
			setStartTime(null);
			setNow(null);
		}
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				{startTime === null ? (
					<div className="flex flex-col items-center justify-center">
						<label className="block font-bold mb-2 text-xl">
							Session Length (minutes)
						</label>
						<input
							type="number"
							min="1"
							max="120"
							value={sessionLength}
							onChange={(e) => setSessionLength(Number(e.target.value))}
							className={`px-3 py-2 border rounded-md`}
						/>
					</div>
				) : (
					<label className="block font-bold mb-2 text-xl">
						{isPaused ? "Paused" : "Running..."}
					</label>
				)}
				<p className="flex items-center justify-center">
					{startTime !== null &&
						now !== null &&
						formatTime(sessionLength * 60 - secondsPassed)}
				</p>
				<div className="flex items-center justify-center gap-2">
					{startTime === null ? (
						<button
							onClick={handleStart}
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
						>
							Start
						</button>
					) : (
						<>
							<button
								onClick={handleClear}
								className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
							>
								Clear
							</button>
							<button
								onClick={handlePause}
								className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
							>
								{isPaused ? "Resume" : "Pause"}
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
