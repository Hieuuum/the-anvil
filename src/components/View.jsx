import TimeInput from "./TimeInput.jsx";
import StatusBox from "./StatusBox.jsx";
import TimerDisplay from "./TimerDisplay.jsx";
import Button from "./Button.jsx";

function CompletedView(props) {
	return (
		<div>
			{props.startTime === null ? (
				// Session Length Input
				<TimeInput
					sessionLength={props.sessionLength}
					setSessionLength={props.setSessionLength}
				/>
			) : (
				// Time Status
				<StatusBox isPaused={props.isPaused} />
			)}

			{/* Timer Display */}
			<TimerDisplay
				startTime={props.startTime}
				sessionLength={props.sessionLength}
				now={props.now}
				secondsPassed={props.secondsPassed}
				formatTime={props.formatTime}
			/>

			{/* Action Buttons */}
			<div className="flex gap-3">
				{props.startTime === null ? (
					<Button behavior={props.start} type="start" />
				) : (
					<>
						<Button behavior={props.reset} type="reset" />
						<Button
							behavior={props.pause}
							type={props.isPaused ? "resume" : "pause"}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default CompletedView;
