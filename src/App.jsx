import { useState, useRef } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
	const [timer, setTimer] = useState(0);
	const [isStarted, setStarted] = useState(false);
	const intervalRef = useRef(null);

	function handleClick() {
		setStarted((prevState) => {
			setInterval(
				() => {
					setTimer((prevTimer) => {
						return prevTimer + 1;
					});
				},
				prevState ? 0 : 1000
			);
			console.log(prevState ? 0 : 1000);
			return prevState ? false : true;
		});
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<p>Current Time: {timer}</p>
				<button
					onClick={handleClick}
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
				>
					Start Timer
				</button>
			</div>
		</>
	);
}

export default App;
