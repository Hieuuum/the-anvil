import { useState, useRef, useEffect, useCallback, useMemo } from "react";

export default function useTimer(timeInput = 30) {
	const TICK_INTERVAL_MS = 450;

	const [startTime, setStartTime] = useState(null);
	const [now, setNow] = useState(null);
	const [sessionLength, setSessionLength] = useState(timeInput);
	const intervalRef = useRef(null);
	const [isCompleted, setIsCompleted] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [pauseStartTime, setPauseStartTime] = useState(null);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const start = useCallback(() => {
		if (!sessionLength || sessionLength < 0) {
			alert("Please set a valid session length");
			return;
		}
		setStartTime(Date.now());
		setNow(Date.now());
		setIsCompleted(false);
		setIsPaused(false);
		setPauseStartTime(null);

		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, TICK_INTERVAL_MS);
	}, [sessionLength]);

	const pause = useCallback(() => {
		setIsPaused((ip) => {
			if (ip) {
				// Resuming
				setStartTime((st) => st + Date.now() - pauseStartTime);
				setNow(Date.now());
				intervalRef.current = setInterval(() => {
					setNow(Date.now());
				}, TICK_INTERVAL_MS);
				setPauseStartTime(null);
			} else {
				// Pausing
				setPauseStartTime(Date.now());
				clearInterval(intervalRef.current);
			}
			return !ip;
		});
	}, [pauseStartTime]);

	const reset = useCallback(() => {
		clearInterval(intervalRef.current);
		setStartTime(null);
		setNow(null);
		setIsCompleted(false);
		setIsPaused(false);
		setPauseStartTime(null);
	}, []);

	const secondsPassed = useMemo(() => {
		if (startTime === null || now === null) {
			return 0;
		} else {
			return (now - startTime) / 1000;
		}
	}, [now, startTime]);

	const timeRemaining = useMemo(() => {
		if (startTime === null && now === null) {
			return 0;
		} else {
			return Math.max(0, sessionLength * 60 - secondsPassed);
		}
	}, [now, startTime, sessionLength, secondsPassed]);

	// Check if session is completed
	useEffect(() => {
		// Check if the timer is active and has run out
		if (startTime && !isPaused && timeRemaining <= 0 && !isCompleted) {
			setIsCompleted(true);
			clearInterval(intervalRef.current);
			// Reset the timer state after completion
		}
		// This effect should run whenever these dependencies change
	}, [timeRemaining, startTime, isPaused, isCompleted]);

	return {
		startTime,
		now,
		isPaused,
		secondsPassed,
		start,
		pause,
		reset,
		sessionLength,
		setSessionLength,
		isCompleted,
	};
}
