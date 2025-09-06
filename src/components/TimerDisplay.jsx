import ProgressBar from "./ProgressBar.jsx";

function TimerDisplay(props) {
	return (
		<div className="text-center mb-8">
			<div className="bg-gray-50 rounded-2xl p-6 mb-4">
				<div className="text-5xl font-mono font-bold text-gray-800 mb-2">
					{props.startTime !== null && props.now !== null
						? props.formatTime(
								Math.max(0, props.sessionLength * 60 - props.secondsPassed)
							)
						: props.formatTime(props.sessionLength * 60)}
				</div>
				<div className="text-sm text-gray-500">
					{props.startTime !== null
						? `${props.sessionLength} minute session`
						: "Ready to start"}
				</div>
			</div>

			{/* Progress Bar */}
			{props.startTime !== null && (
				<ProgressBar
					secondsPassed={props.secondsPassed}
					sessionLength={props.sessionLength}
				/>
			)}
		</div>
	);
}

export default TimerDisplay;
