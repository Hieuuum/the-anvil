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
		}, 900);
	}

	function handlePause() {
		setIsPaused((prevVal) => {
			if (prevVal) {
				// Resuming

				setStartTime((prev) => prev + Date.now() - pauseStartTime);
				setNow(Date.now());
				intervalRef.current = setInterval(() => {
					setNow(Date.now());
				}, 900);
				setPauseStartTime(null);
			} else {
				// Pausing
				setPauseStartTime(Date.now());
				clearInterval(intervalRef.current);
			}
			return !prevVal;
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
		timeRemaining = Math.max(0, sessionLength * 60 - secondsPassed);
	}

	// Check if session is completed
	useEffect(() => {
		// Check if the timer is active and has run out
		if (startTime && !isPaused && timeRemaining <= 0 && !isCompleted) {
			setIsCompleted(true);
			clearInterval(intervalRef.current);
			alert("Session Completed!");
			// Reset the timer state after completion
			setStartTime(null);
			setNow(null);
		}
		// This effect should run whenever these dependencies change
	}, [timeRemaining, startTime, isPaused, isCompleted]);

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
				<div className="bg-white rounded-2xl p-8 w-full max-w-md">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-800 mb-2">The Anvil</h1>
						<p className="text-gray-600">Stay focused and productive</p>
					</div>

					{/* Session Length Input */}
					{startTime === null ? (
						<div className="text-center mb-6">
							<label className="block text-lg font-semibold text-gray-700 mb-3">
								Session Length (minutes)
							</label>
							<input
								type="number"
								min="0.51"
								value={sessionLength}
								onChange={(e) => setSessionLength(Number(e.target.value))}
								className="w-32 px-4 py-3 text-center text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
								placeholder="25"
							/>
						</div>
					) : (
						<div className="text-center mb-6">
							<div
								className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
									isPaused
										? "bg-yellow-100 text-yellow-800"
										: "bg-green-100 text-green-800"
								}`}
							>
								<div
									className={`w-2 h-2 rounded-full mr-2 ${
										isPaused ? "bg-yellow-500" : "bg-green-500 animate-pulse"
									}`}
								></div>
								{isPaused ? "Paused" : "Running"}
							</div>
						</div>
					)}

					{/* Timer Display */}
					<div className="text-center mb-8">
						<div className="bg-gray-50 rounded-2xl p-6 mb-4">
							<div className="text-5xl font-mono font-bold text-gray-800 mb-2">
								{startTime !== null && now !== null
									? formatTime(Math.max(0, sessionLength * 60 - secondsPassed))
									: formatTime(sessionLength * 60)}
							</div>
							<div className="text-sm text-gray-500">
								{startTime !== null
									? `${sessionLength} minute session`
									: "Ready to start"}
							</div>
						</div>

						{/* Progress Bar */}
						{startTime !== null && (
							<div className="w-full bg-gray-200 rounded-full h-2 mb-4">
								<div
									className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
									style={{
										width: `${Math.min((secondsPassed / (sessionLength * 60)) * 100, 100)}%`,
									}}
								></div>
							</div>
						)}
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3">
						{startTime === null ? (
							<button
								onClick={handleStart}
								className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
							>
								Start Timer
							</button>
						) : (
							<>
								<button
									onClick={handleClear}
									className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
								>
									Reset
								</button>
								<button
									onClick={handlePause}
									className={`flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 cursor-pointer ${
										isPaused
											? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
											: "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
									}`}
								>
									{isPaused ? "Resume" : "Pause"}
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
