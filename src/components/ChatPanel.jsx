import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatPanel() {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: 1,
			from: "bot",
			text: "Hi! I\u2019m here to help. Ask me anything.",
		},
	]);
	const [input, setInput] = useState("");
	const listRef = useRef(null);

	useEffect(() => {
		if (open && listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [messages, open]);

	function toggle() {
		setOpen((v) => !v);
	}

	const handleSend = (event) => {
		event.preventDefault();

		const text = input.trim();
		if (!text) return;
		const id = Date.now();
		setMessages((m) => [...m, { id, from: "user", text }]);
		setInput("");

		const result = axios.post();

		// Simulate bot reply
		setTimeout(() => {
			setMessages((m) => [
				...m,
				{ id: Date.now() + 1, from: "bot", text: `You said: "${text}"` },
			]);
		}, 700);
	};

	return (
		<div className="fixed bottom-4 right-4 z-50 cursor-pointer">
			<div
				className={`transition-all ${open ? "translate-y-0" : "translate-y-2"}`}
			>
				{open && (
					<div className="w-80 md:w-96 bg-white border border-gray-200 rounded-lg overflow-hidden">
						<div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
							<div className="flex items-center justify-between">
								<div className="text-sm font-semibold text-gray-800">Chat</div>
								<button
									onClick={toggle}
									className="text-gray-500 text-sm hover:text-gray-700"
									aria-label="Close chat"
								>
									✕
								</button>
							</div>
						</div>
						<div
							ref={listRef}
							className="h-56 overflow-auto px-3 py-3 space-y-3 bg-white"
						>
							{messages.map((m) => (
								<div
									key={m.id}
									className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}
								>
									<div
										className={`max-w-[75%] text-sm px-3 py-2 rounded-lg ${
											m.from === "bot"
												? "bg-gray-100 text-gray-800"
												: "bg-blue-500 text-white"
										}`}
									>
										{m.text}
									</div>
								</div>
							))}
						</div>
						<form
							onSubmit={handleSend}
							className="px-3 py-2 border-t border-gray-100 bg-white"
						>
							<div className="flex gap-2">
								<input
									value={input}
									onChange={(e) => setInput(e.target.value)}
									className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-300"
									placeholder="Type a message..."
								/>
								<button
									type="submit"
									className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm"
								>
									Send
								</button>
							</div>
						</form>
					</div>
				)}

				<div className="mt-3 flex justify-end cursor-pointer">
					<button
						onClick={toggle}
						className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl"
						aria-label="Open chat"
						title="Chat"
					>
						💬
					</button>
				</div>
			</div>
		</div>
	);
}
