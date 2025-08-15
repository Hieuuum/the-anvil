function TimeInput(props) {
	return (
		<div className="text-center mb-6">
			<label className="block text-lg font-semibold text-gray-700 mb-3">
				Session Length (minutes)
			</label>
			<input
				type="number"
				min="0.51"
				value={props.sessionLength}
				onChange={(e) => props.setSessionLength(Number(e.target.value))}
				className="w-32 px-4 py-3 text-center text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
				placeholder="25"
			/>
		</div>
	);
}

export default TimeInput;
