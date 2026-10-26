
"use client";

import { useState } from "react";

type Operation = "summarize" | "rewrite" | "grammar" | "tone" | "length";

const operations: { label: string; value: Operation }[] = [
  { label: "Summarize", value: "summarize" },
  { label: "Rewrite", value: "rewrite" },
  { label: "Grammar", value: "grammar" },
  { label: "Tone", value: "tone" },
  { label: "Length", value: "length" },
];

const tones = ["Professional", "Casual", "Friendly", "Formal"] as const;
const lengths = ["Shorter", "Longer"] as const;

export default function Home() {
  const [operation, setOperation] = useState<Operation>("summarize");
  const [text, setText] = useState("");
  const [tone, setTone] = useState<(typeof tones)[number]>("Professional");
  const [length, setLength] = useState<(typeof lengths)[number]>("Shorter");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateResult() {
    if (!text.trim() || loading) return;

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const payload: { text: string; tone?: string; length?: string } = {
        text: text.trim(),
      };

      if (operation === "tone") payload.tone = tone.toLowerCase();
      if (operation === "length") payload.length = length.toLowerCase();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/v1/text/${operation}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Unable to process your text. Please try again."
        );
      }

      setResult(data.data.result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy the result. Please select and copy it manually.");
    }
  }

  function selectOperation(value: Operation) {
    setOperation(value);
    setError("");
    setCopied(false);
  }

  return (
    <main className="min-h-screen bg-white text-[#202124]">
      <header className="border-b border-gray-200">
        <div className="mx-auto flex h-[72px] max-w-[1000px] items-center gap-3 px-5">
          <h1 className="text-xl font-semibold tracking-tight">
            AI Text Toolkit
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1024px] px-5 pb-12 pt-10 sm:pt-12">
        <nav
          aria-label="Text operations"
          className="flex gap-2 overflow-x-auto border-b border-gray-200"
        >
          {operations.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => selectOperation(item.value)}
              aria-pressed={operation === item.value}
              className={`shrink-0 rounded-t-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 
                hover:cursor-pointer
              focus-visible:outline-indigo-600 ${
                operation === item.value
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {operation === "tone" && (
          <div className="flex flex-wrap items-center gap-2 py-5">
            <span className="mr-1 text-sm text-gray-500">Tone:</span>
            {tones.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTone(item)}
                aria-pressed={tone === item}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                  tone === item
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {operation === "length" && (
          <div className="flex flex-wrap items-center gap-2 py-5">
            <span className="mr-1 text-sm text-gray-500">Length:</span>
            {lengths.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLength(item)}
                aria-pressed={length === item}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                  length === item
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        <section className={operation === "tone" || operation === "length" ? "" : "pt-6"}>
          <label htmlFor="source-text" className="sr-only">
            Text to process
          </label>
          <textarea
            id="source-text"
            value={text}
            onChange={(event) => setText(event.target.value.slice(0, 10000))}
            maxLength={10000}
            placeholder="Enter your text here..."
            className="min-h-[260px] w-full resize-y rounded-xl border border-gray-200 bg-white p-5 text-base leading-7 outline-none transition-shadow placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:min-h-[285px]"
          />

          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <span className="text-sm text-gray-500" aria-live="polite">
              {text.length.toLocaleString()} / 10,000 characters
            </span>

            <button
              type="button"
              onClick={generateResult}
              disabled={!text.trim() || loading}
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-lg 
              hover:cursor-pointer bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Generating...
                </>
              ) : (
                <>Generate</>
              )}
            </button>
          </div>
        </section>

        <section
          aria-labelledby="result-heading"
          aria-live="polite"
          className="mt-4 min-h-[200px] rounded-xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <h2
              id="result-heading"
              className="text-sm font-semibold uppercase tracking-wide text-gray-700"
            >
              Result
            </h2>

            <button
              type="button"
              onClick={copyResult}
              disabled={!result}
              className="rounded-md px-2 py-1 text-sm text-gray-600 hover:cursor-pointer transition-colors hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? "Copied!" : "▢ Copy"}
            </button>
          </div>

          {error ? (
            <p role="alert" className="pt-5 text-sm text-red-600">
              {error}
            </p>
          ) : result ? (
            <p className="whitespace-pre-wrap break-words pt-5 text-base leading-7 text-gray-800">
              {result}
            </p>
          ) : (
            <p className="pt-8 text-sm leading-6 text-gray-500">
              Your refined text will appear here once generated.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
