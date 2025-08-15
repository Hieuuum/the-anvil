function StatusBox(props) {
	return (
		<div className="text-center mb-6">
			<div
				className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
					props.isPaused
						? "bg-yellow-100 text-yellow-800"
						: "bg-green-100 text-green-800"
				}`}
			>
				<div
					className={`w-2 h-2 rounded-full mr-2 ${
						props.isPaused ? "bg-yellow-500" : "bg-green-500 animate-pulse"
					}`}
				></div>
				{props.isPaused ? "Paused" : "Running"}
			</div>
		</div>
	);
}

export default StatusBox;
