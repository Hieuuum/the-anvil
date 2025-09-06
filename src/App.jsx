import Header from "./components/Header.jsx";
import useTimer from "./hooks/useTimer.jsx";
import formatTime from "./utils/formatTime.js";
import View from "./components/View.jsx";
import CompletedView from "./components/CompletedView.jsx";
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
		status,
	} = useTimer(30);

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
				<div className="bg-white rounded-2xl p-8 w-full max-w-md">
					<Header />

					{status === "completed" ? (
						<CompletedView onReset={reset} />
					) : (
						<View
							status={status}
							startTime={startTime}
							isPaused={isPaused}
							now={now}
							secondsPassed={secondsPassed}
							pause={pause}
							reset={reset}
							start={start}
							sessionLength={sessionLength}
							setSessionLength={setSessionLength}
							isCompleted={isCompleted}
							formatTime={formatTime}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
