import React from 'react';
import { X, Mail, Phone, Calendar, BookOpen, Clock, Award, Edit2 } from 'lucide-react';

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Active':
      return 'badge-active';
    case 'Graduated':
      return 'badge-graduated';
    case 'Inactive':
      return 'badge-inactive';
    case 'Suspended':
      return 'badge-suspended';
    default:
      return 'badge-inactive';
  }
}

function getGpaClass(gpa) {
  const num = parseFloat(gpa);
  if (num >= 3.5) return 'gpa-high';
  if (num >= 3.0) return 'gpa-med';
  if (num >= 2.0) return 'gpa-low';
  return 'gpa-risk';
}

export default function StudentDetailModal({ student, isOpen, onClose, onEdit }) {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <div className="modal-content" style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div className="modal-title" id="detail-title">
            <span className="code-badge">{student.student_id}</span>
            <span>Student Profile</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {student.first_name} {student.last_name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {student.department}
                </span>
              </div>
            </div>
            <span className={`badge ${getStatusBadgeClass(student.status)}`} style={{ padding: '6px 14px', fontSize: '0.8125rem' }}>
              ● {student.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Cumulative GPA
              </span>
              <span className={`gpa-pill ${getGpaClass(student.gpa)}`} style={{ fontSize: '1.1rem', marginTop: '4px' }}>
                ★ {Number(student.gpa).toFixed(2)} / 4.00
              </span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Academic Standing
              </span>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: Number(student.gpa) >= 3.5 ? 'var(--success)' : 'var(--text-main)' }}>
                {Number(student.gpa) >= 3.5 ? "Dean's Honors" : Number(student.gpa) >= 3.0 ? 'Good Standing' : 'Academic Notice'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="card-field" style={{ fontSize: '0.9rem' }}>
              <Mail size={16} color="var(--primary)" />
              <strong style={{ minWidth: '100px', color: '#475569' }}>Email:</strong>
              <a href={`mailto:${student.email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                {student.email}
              </a>
            </div>

            <div className="card-field" style={{ fontSize: '0.9rem' }}>
              <Phone size={16} color="var(--primary)" />
              <strong style={{ minWidth: '100px', color: '#475569' }}>Phone:</strong>
              <a href={`tel:${student.phone}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
                {student.phone}
              </a>
            </div>

            <div className="card-field" style={{ fontSize: '0.9rem' }}>
              <BookOpen size={16} color="var(--primary)" />
              <strong style={{ minWidth: '100px', color: '#475569' }}>Department:</strong>
              <span>{student.department}</span>
            </div>

            <div className="card-field" style={{ fontSize: '0.9rem' }}>
              <Calendar size={16} color="var(--primary)" />
              <strong style={{ minWidth: '100px', color: '#475569' }}>Enrolled On:</strong>
              <span>{student.enrollment_date}</span>
            </div>

            <div className="card-field" style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border)' }}>
              <Clock size={14} />
              <span>Record created: {new Date(student.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(student);
            }}
          >
            <Edit2 size={16} />
            <span>Edit Record</span>
          </button>
        </div>
      </div>
    </div>
  );
}
