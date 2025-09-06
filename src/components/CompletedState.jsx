function CompletedState(props) {
	return (
		<div className="text-center">
			<h2 className="text-2xl font-bold text-green-500">Session Completed!</h2>
			<p className="text-gray-500 mt-2">Great work.</p>
			<div className="mt-6">
				<Button behavior={props.behavior} type="start">
					Start New Session
				</Button>
			</div>
		</div>
	);
}

export default CompletedState;
