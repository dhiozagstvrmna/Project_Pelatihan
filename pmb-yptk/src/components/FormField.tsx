import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export default function FormField({ label, name, error, hint, children }: FormFieldProps) {
  return (
    <div className={error ? "field field--error" : "field"}>
      <label htmlFor={name}>{label}</label>
      {children}
      {hint && !error && <small className="hint">{hint}</small>}
      {error && <small className="error">{error}</small>}
    </div>
  );
}
