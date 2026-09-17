import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`toast toast-${toast.type || 'info'}`}
            role="status"
          >
            {isSuccess && <CheckCircle2 size={18} className="toast-icon-success" />}
            {isError && <AlertCircle size={18} className="toast-icon-error" />}
            {!isSuccess && !isError && <Info size={18} className="toast-icon-info" />}

            <span style={{ fontWeight: 500 }}>{toast.message}</span>

            <button
              type="button"
              className="toast-close"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss message"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
