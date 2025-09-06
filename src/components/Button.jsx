function Button(props) {
	const style = {
		start:
			"from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
		reset: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
		resume:
			"from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
		pause:
			"from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
	};
	const content = {
		start: "Start Timer",
		reset: "Reset",
		pause: "Pause",
		resume: "Resume",
	};
	return (
		<button
			onClick={() => props.behavior()}
			className={`flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 cursor-pointer text-white bg-gradient-to-r ${
				style[props.type]
			}`}
		>
			{content[props.type]}
		</button>
	);
}

export default Button;
