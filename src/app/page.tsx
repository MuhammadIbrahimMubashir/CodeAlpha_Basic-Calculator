// Basic Calculator
"use client";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = useCallback(
    (value: string) => {
      if (value === "=") {
        try {
          const res = eval(input); // Calculate result
          setResult(res.toString());
        } catch {
          setResult("Error");
        }
      } else if (value === "C") {
        setInput("");
        setResult("");
      } else if (value === "⌫") {
        setInput((prev) => prev.slice(0, -1));
      } else {
        const displayValue = value
          .replace("➕", "+")
          .replace("➖", "-")
          .replace("✖️", "*")
          .replace("➗", "/");
        setInput(input + displayValue);
      }
    },
    [input]
  );

  useEffect(() => {
    const handleKeyDown = (e: { key: string }) => {
      if (e.key === "Enter") {
        handleClick("=");
      } else if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if ("0123456789+-*/.=C".includes(e.key)) {
        handleClick(e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClick]);

  const buttons = [
    "7",
    "8",
    "9",
    "➗",
    "4",
    "5",
    "6",
    "✖️",
    "1",
    "2",
    "3",
    "➖",
    "0",
    ".",
    "=",
    "➕",
  ];

  return (
    <div>
      <div>
        <title>Basic Calculator</title>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-purple-900 via-indigo-900 to-blue-900 p-6">
        <div className="backdrop-blur-lg bg-blue-950/70 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] w-full max-w-md p-6 border border-indigo-300">
          <h1 className="text-center text-white text-4xl font-bold mb-6 tracking-wide drop-shadow-md">
            Simple Calculator
          </h1>

          <div className="bg-gray-900 rounded-2xl p-5 mb-6 shadow-inner text-right text-white space-y-3 border border-gray-700">
            <div className="text-2xl break-words text-gray-400">{input || "0"}</div>
            <div className="text-4xl font-extrabold break-words text-lime-300">{result}</div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={() => handleClick(btn)}
                className="bg-gradient-to-br from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 active:scale-95 text-black font-bold text-xl rounded-full h-16 w-16 shadow-lg transition-transform"
              >
                {btn}
              </button>
            ))}

            <button
              onClick={() => handleClick("⌫")}
              className="col-span-2 bg-gradient-to-br from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-bold rounded-xl h-12 shadow-lg"
            >
              ⌫ Backspace
            </button>

            <button
              onClick={() => handleClick("C")}
              className="col-span-2 bg-gradient-to-br from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold rounded-xl h-12 shadow-lg"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
