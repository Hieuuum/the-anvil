import Header from "./components/Header.jsx";
import TimeInput from "./components/TimeInput.jsx";
import StatusBox from "./components/StatusBox.jsx";
import TimerDisplay from "./components/TimerDisplay.jsx";
import Button from "./components/Button.jsx";
import useTimer from "./hooks/useTimer.jsx";
import formatTime from "./utils/formatTime.js";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
	const {
		startTime,
		isPaused,
		now,
		secondsPassed,
		pause,
		reset,
		start,
		sessionLength,
		setSessionLength,
		isCompleted,
	} = useTimer(30);

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
				<div className="bg-white rounded-2xl p-8 w-full max-w-md">
					<Header />

					{isCompleted ? (
						// ✅ The new "Completed" UI state
						<div className="text-center">
							<h2 className="text-2xl font-bold text-green-500">
								Session Completed!
							</h2>
							<p className="text-gray-500 mt-2">Great work.</p>
							<div className="mt-6">
								<Button behavior={reset} type="start">
									Start New Session
								</Button>
							</div>
						</div>
					) : (
						<div>
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
									<Button behavior={start} type="start" />
								) : (
									<>
										<Button behavior={reset} type="reset" />
										<Button
											behavior={pause}
											type={isPaused ? "resume" : "pause"}
										/>
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
