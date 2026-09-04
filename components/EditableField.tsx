"use client";

import { useState } from "react";

type Props = {
  value: string;
  placeholder: string;
  editLabel: string;
  saveLabel: string;
  type?: "text" | "email";
  error?: string | null;
  onSave: (value: string) => void;
};

export function EditableField({
  value,
  placeholder,
  editLabel,
  saveLabel,
  type = "text",
  error,
  onSave,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function startEdit() {
    setDraft(value);
    setEditing(true);
  }

  function commit() {
    onSave(draft.trim());
    setEditing(false);
  }

  if (!editing) {
    return (
      <div className="group flex w-full max-w-md items-center justify-center gap-2">
        <p
          className={`min-w-0 truncate text-center text-[17px] tracking-[-0.02em] ${
            value ? "text-stone-800" : "text-stone-400"
          }`}
        >
          {value || placeholder}
        </p>
        <button
          type="button"
          onClick={startEdit}
          aria-label={editLabel}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-200/70 hover:text-stone-700"
        >
          <PencilIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-1">
      <div className="flex w-full items-center gap-2 border-b border-stone-400/70 pb-1">
        <input
          autoFocus
          type={type}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") commit();
            if (event.key === "Escape") {
              setDraft(value);
              setEditing(false);
            }
          }}
          placeholder={placeholder}
          aria-label={placeholder}
          className="min-w-0 flex-1 bg-transparent text-center text-[17px] tracking-[-0.02em] text-stone-800 outline-none placeholder:text-stone-400"
        />
        <button
          type="button"
          onClick={commit}
          aria-label={saveLabel}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#006039] transition hover:bg-[#006039]/10"
        >
          <CheckIcon />
        </button>
      </div>
      {error ? <p className="text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20h4.5L19.2 9.3a1.5 1.5 0 0 0 0-2.1L16.8 4.8a1.5 1.5 0 0 0-2.1 0L4 15.5V20Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5 9.5 17 19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
