import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function App() {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: 1,
			from: "bot",
			text: "Hi! I'm here to help! Ask me anything.",
		},
	]);
	const [input, setInput] = useState("");
	const listRef = useRef(null);

	// Effect to scroll to the bottom of the message list when new messages are added
	useEffect(() => {
		if (open && listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [messages, open]);

	// Toggles the chat panel's visibility
	function toggle() {
		setOpen((v) => !v);
	}

	// Handles sending a new message
	const handleSend = async (event) => {
		event.preventDefault();

		const text = input.trim();
		if (!text) return;

		// Add user message to the list
		const userMessage = { id: Date.now(), from: "user", text };
		setMessages((m) => [...m, userMessage]);
		setInput("");

		try {
			const url = "/chat";
			const response = await axios.post(url, { msg: text });
			const aiReply = response.data;

			setMessages((m) => [
				...m,
				{ id: Date.now() + 1, from: "bot", text: aiReply },
			]);
		} catch (error) {
			console.error("Error sending message:", error);
			const errorReply = {
				id: Date.now() + 1,
				from: "bot",
				text: "Sorry, I'm having trouble connecting. Please try again later.",
			};
			setMessages((m) => [...m, errorReply]);
		}
	};

	return (
		// The main container for the chat widget
		<div className="fixed bottom-4 right-4 z-50">
			<div
				className={`transition-all duration-300 ${
					open
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-4 pointer-events-none"
				}`}
			>
				{/* The chat panel itself */}
				<div className="w-80 md:w-96 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[32rem]">
					{/* Header */}
					<div className="px-4 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<div className="text-sm font-semibold text-gray-800">
								Your AI-Powered Productivity Coach
							</div>
							<button
								onClick={toggle}
								className="text-gray-500 text-2xl leading-none hover:text-gray-800"
								aria-label="Close chat"
							>
								&times;
							</button>
						</div>
					</div>

					{/* Message list */}
					<div
						ref={listRef}
						className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
					>
						{messages.map((m) => (
							<div
								key={m.id}
								className={`flex items-end gap-2 ${
									m.from === "bot" ? "justify-start" : "justify-end"
								}`}
							>
								{m.from === "bot" && (
									<div
										className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0"
										title="Bot"
									></div>
								)}
								<div
									className={`max-w-[80%] px-3 py-2 rounded-xl whitespace-pre-line list-inside ${
										m.from === "bot"
											? "bg-gray-200 text-gray-800 rounded-bl-none"
											: "bg-blue-500 text-white rounded-br-none"
									}`}
								>
									{m.text}
								</div>
							</div>
						))}
					</div>

					{/* Input form */}
					<form
						onSubmit={handleSend}
						className="p-3 border-t border-gray-200 bg-white"
					>
						<div className="flex gap-2 items-center">
							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
								placeholder="Type a message..."
								aria-label="Chat input"
							/>
							<button
								type="submit"
								className="p-2 w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
								disabled={!input.trim()}
								aria-label="Send message"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="m3 3 3 9-3 9 19-9Z" />
									<path d="M6 12h16" />
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* The button to open/close the chat panel */}
			<div className="flex justify-end">
				<button
					onClick={toggle}
					className={`h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
					aria-label="Toggle chat"
					title="Chat"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
						<path d="M8 12h.01" />
						<path d="M12 12h.01" />
						<path d="M16 12h.01" />
					</svg>
				</button>
			</div>
		</div>
	);
}
