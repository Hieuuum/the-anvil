function ProgressBar(props) {
	return (
		<div className="w-full bg-gray-200 rounded-full h-2 mb-4">
			<div
				className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
				style={{
					width: `${Math.min((props.secondsPassed / (props.sessionLength * 60)) * 100, 100)}%`,
				}}
			></div>
		</div>
	);
}

export default ProgressBar;
