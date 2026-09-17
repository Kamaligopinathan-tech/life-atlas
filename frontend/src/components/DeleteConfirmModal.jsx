import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ student, isOpen, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !student) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(student.id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title">
      <div className="modal-content" style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div className="modal-title" id="delete-dialog-title" style={{ color: 'var(--danger)' }}>
            <AlertTriangle size={20} />
            <span>Confirm Deletion</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cancel deletion"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', marginBottom: '12px' }}>
            Are you sure you want to delete the student record for:
          </p>
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--danger-light)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #fecaca',
              marginBottom: '16px',
            }}
          >
            <div style={{ fontWeight: 700, color: '#991b1b', fontSize: '1rem' }}>
              {student.first_name} {student.last_name}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#b91c1c', marginTop: '2px' }}>
              ID: {student.student_id} • Dept: {student.department}
            </div>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            This action cannot be undone. The record will be permanently deleted from the database.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'Deleting...' : 'Delete Student'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
