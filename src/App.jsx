import { useState, useRef, useEffect } from "react";
import Header from "./components/Header.jsx";
import TimeInput from "./components/TimeInput.jsx";
import StatusBox from "./components/StatusBox.jsx";
import TimerDisplay from "./components/TimerDisplay.jsx";
import Button from "./components/Button.jsx";
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
		setIsPaused((ip) => {
			if (ip) {
				// Resuming

				setStartTime((st) => st + Date.now() - pauseStartTime);
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
			return !ip;
		});
	}

	function handleReset() {
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
					<Header />

					{/* Session Length Input */}
					{startTime === null ? (
						<TimeInput
							sessionLength={sessionLength}
							setSessionLength={setSessionLength}
						/>
					) : (
						<StatusBox isPaused={isPaused} />
					)}

					{/* Timer Display */}
					<TimerDisplay
						startTime={startTime}
						sessionLength={sessionLength}
						now={now}
						secondsPassed={secondsPassed}
						formatTime={formatTime}
					/>

					{/* Action Buttons */}
					<div className="flex gap-3">
						{startTime === null ? (
							<Button behavior={handleStart} type="start" />
						) : (
							<>
								<Button behavior={handleReset} type="reset" />
								<Button
									behavior={handlePause}
									type={isPaused ? "resume" : "pause"}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
