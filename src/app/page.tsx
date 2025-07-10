"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function HairWashReminder() {
  const [washDay, setWashDay] = useState<Date | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const savedWashDay = localStorage.getItem("lastWashDay");
    if (savedWashDay) {
      setWashDay(new Date(savedWashDay));
    }
  }, []);

  const checkWashDay = () => {
    if (!washDay) {
      setResult("Please select a wash day first");
      return;
    }

    const today = new Date();
    const daysSinceWash = Math.floor(
      (today.getTime() - washDay.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceWash % 2 === 1) {
      setResult(`Today (${format(today, "MMMM do")}) is NOT a wash day`);
    } else {
      setResult(`Today (${format(today, "MMMM do")}) is a wash day!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Hair Wash Reminder
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="washDay">
            Select your last wash day:
          </label>
          <input
            id="washDay"
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              setWashDay(selectedDate);
              localStorage.setItem("lastWashDay", selectedDate.toISOString());
            }}
            value={washDay ? format(washDay, "yyyy-MM-dd") : ""}
          />
        </div>

        <button
          onClick={checkWashDay}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
        >
          Check Today Status
        </button>

        {result && (
          <div
            className={`mt-6 p-4 rounded text-center ${
              result.includes("NOT")
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
