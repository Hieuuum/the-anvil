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

	function handleStart() {
		if (!sessionLength || sessionLength < 0) {
			alert("Please set a valid session length");
			return;
		}
		setStartTime(Date.now());
		setNow(Date.now());
		setIsCompleted(false);

		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 900);
	}

	function handleStop() {
		clearInterval(intervalRef.current);
		setStartTime(null);
		setNow(null);
		setIsCompleted(false);
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

	function handlePause() {
		if (isPaused) {
			intervalRef.current = setInterval(() => {
				setNow(Date.now());
			}, 900);
		} else {
			clearInterval(intervalRef.current);
		}
		setIsPaused((val) => {
			return !val;
		});
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

	// Calculate progress
	// const progress =
	// 	sessionLength > 0
	// 		? Math.min((secondsPassed / (sessionLength * 60)) * 100, 100)
	// 		: 0;

	// useEffect(() => {
	// 	return () => {
	// 		if (intervalRef.current) {
	// 			clearInterval(intervalRef.current);
	// 		}
	// 	};
	// }, []);

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div
					className={`flex flex-col items-center justify-center ${startTime !== null ? "invisible" : "visible"}`}
				>
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
				<p className="flex items-center justify-center">
					{startTime !== null &&
						now !== null &&
						formatTime(sessionLength * 60 - secondsPassed)}
				</p>
				<div className="flex items-center justify-center gap-2">
					<button></button>
					{startTime === null ? (
						<button
							onClick={handleStart}
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
						>
							Start Timer
						</button>
					) : (
						<>
							<button
								onClick={handleStop}
								className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${startTime === null ? "invisible" : "visible"}`}
							>
								Clear Timer
							</button>
							<button
								onClick={handlePause}
								className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${startTime === null ? "invisible" : "visible"}`}
							>
								Pause Timer
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
