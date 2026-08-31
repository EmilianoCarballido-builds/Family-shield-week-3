"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileText, Mic, MicOff, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  MAX_NARRATIVE_LENGTH,
  MIN_NARRATIVE_LENGTH,
  validateNarrative,
} from "@/lib/intake-validation";

interface SpeechResultLike {
  isFinal: boolean;
  0: { transcript: string };
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: ArrayLike<SpeechResultLike>;
}

interface SpeechRecognitionErrorLike extends Event {
  error: string;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const FICTIONAL_EXAMPLE =
  "Abuela, tuve un accidente. No le digas a nadie y deposita hoy a esta nueva cuenta.";

export function TransferIntake() {
  const [narrative, setNarrative] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Type the request or use the microphone.");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const supported = Boolean(
      window.SpeechRecognition || window.webkitSpeechRecognition,
    );
    const supportUpdate = window.setTimeout(() => {
      setVoiceSupported(supported);
      if (!supported) {
        setStatus("Voice input is unavailable in this browser. You can type instead.");
      }
    }, 0);

    return () => {
      window.clearTimeout(supportUpdate);
      recognitionRef.current?.abort();
    };
  }, []);

  function updateNarrative(value: string) {
    setNarrative(value);
    setError("");
    setIsReady(false);
  }

  function loadExample() {
    updateNarrative(FICTIONAL_EXAMPLE);
    setStatus("Fictional example loaded. You can edit it before continuing.");
    textareaRef.current?.focus();
  }

  function toggleListening() {
    if (isListening) {
      recognitionRef.current?.stop();
      setStatus("Voice input stopped. Review and edit the transcript.");
      return;
    }

    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      setVoiceSupported(false);
      setStatus("Voice input is unavailable in this browser. You can type instead.");
      textareaRef.current?.focus();
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "es-MX";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const spokenParts: string[] = [];
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        if (result?.isFinal && result[0]?.transcript) {
          spokenParts.push(result[0].transcript);
        }
      }

      const spokenText = spokenParts.join(" ").trim();
      if (spokenText) {
        setNarrative((current) =>
          `${current.trim()} ${spokenText}`.trim().slice(0, MAX_NARRATIVE_LENGTH),
        );
        setError("");
        setIsReady(false);
        setStatus("Voice captured. Review and edit the transcript before continuing.");
      }
    };

    recognition.onerror = (event) => {
      const denied = event.error === "not-allowed" || event.error === "service-not-allowed";
      setStatus(
        denied
          ? "Microphone access was denied. Nothing was recorded; type the request instead."
          : "We could not capture that. Try again or type the request instead.",
      );
      setIsListening(false);
      textareaRef.current?.focus();
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    try {
      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
      setStatus("Listening in Spanish (Mexico). Speak now.");
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setStatus("The microphone could not start. Type the request instead.");
      textareaRef.current?.focus();
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateNarrative(narrative);

    if (!result.valid) {
      setError(result.error);
      setIsReady(false);
      setStatus("The description needs attention before it can continue.");
      textareaRef.current?.focus();
      return;
    }

    setNarrative(result.value);
    setError("");
    setIsReady(true);
    setStatus("Description ready. AI review will be connected in the next build.");
  }

  function resetIntake() {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setNarrative("");
    setError("");
    setIsReady(false);
    setIsListening(false);
    setStatus("Description cleared. Type the request or use the microphone.");
    textareaRef.current?.focus();
  }

  return (
    <form className="intake-form" onSubmit={handleSubmit} noValidate>
      <div className="intake-heading">
        <div>
          <label htmlFor="urgent-request">What did the requester say?</label>
          <p id="urgent-request-help">
            Do not enter real names, account numbers, or private information.
          </p>
        </div>
        <Button className="example-button" type="button" variant="ghost" size="sm" onClick={loadExample}>
          <FileText aria-hidden="true" /> Use fictional example
        </Button>
      </div>

      <textarea
        ref={textareaRef}
        id="urgent-request"
        name="urgentRequest"
        value={narrative}
        onChange={(event) => updateNarrative(event.target.value)}
        minLength={MIN_NARRATIVE_LENGTH}
        maxLength={MAX_NARRATIVE_LENGTH}
        rows={5}
        placeholder="Example: They said it was urgent, asked me not to call anyone, and requested a transfer to a new account."
        aria-describedby={`urgent-request-help urgent-request-count voice-status${error ? " urgent-request-error" : ""}`}
        aria-invalid={Boolean(error)}
      />

      <div className="intake-meta">
        <span id="urgent-request-count">
          {narrative.length}/{MAX_NARRATIVE_LENGTH} characters
        </span>
        {narrative.length > 0 && (
          <button className="clear-button" type="button" onClick={resetIntake}>
            <RotateCcw aria-hidden="true" /> Clear
          </button>
        )}
      </div>

      {error && (
        <p className="field-error" id="urgent-request-error" role="alert">
          {error}
        </p>
      )}

      <div className="intake-controls">
        <Button
          className={isListening ? "voice-button is-listening" : "voice-button"}
          type="button"
          variant="outline"
          size="lg"
          onClick={toggleListening}
          aria-pressed={isListening}
          disabled={voiceSupported === null || voiceSupported === false}
        >
          {isListening ? <MicOff aria-hidden="true" /> : <Mic aria-hidden="true" />}
          {isListening ? "Stop listening" : "Use microphone"}
        </Button>
        <Button className="save-description" type="submit" size="lg">
          {isReady ? <Check aria-hidden="true" /> : null}
          {isReady ? "Description ready" : "Save description"}
        </Button>
      </div>

      <p className={isReady ? "voice-status is-ready" : "voice-status"} id="voice-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
