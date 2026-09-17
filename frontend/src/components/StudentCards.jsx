import React from 'react';
import { Eye, Edit2, Trash2, Mail, Phone, Calendar, BookOpen, AlertCircle } from 'lucide-react';

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

export default function StudentCards({
  students,
  loading,
  onView,
  onEdit,
  onDelete,
  onOpenCreate,
}) {
  if (loading && (!students || students.length === 0)) {
    return (
      <div className="empty-state">
        <h3>Loading Student Cards...</h3>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <div className="empty-state-icon">
            <AlertCircle size={32} />
          </div>
          <h3>No Student Records Found</h3>
          <p>
            No student matches your current filters, or the database is currently empty.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenCreate}
          >
            Create First Student
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {students.map((student) => (
        <div key={student.id} className="student-card">
          <div>
            <div className="card-header">
              <div>
                <span className="code-badge">{student.student_id}</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '8px' }}>
                  {student.first_name} {student.last_name}
                </h3>
              </div>
              <span className={`badge ${getStatusBadgeClass(student.status)}`}>
                ● {student.status}
              </span>
            </div>

            <div className="card-body">
              <div className="card-field">
                <BookOpen size={14} />
                <span>{student.department}</span>
              </div>
              <div className="card-field">
                <Mail size={14} />
                <span>{student.email}</span>
              </div>
              <div className="card-field">
                <Phone size={14} />
                <span>{student.phone}</span>
              </div>
              <div className="card-field">
                <Calendar size={14} />
                <span>Enrolled: {student.enrollment_date}</span>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Cumulative GPA
              </span>
              <span className={`gpa-pill ${getGpaClass(student.gpa)}`}>
                ★ {Number(student.gpa).toFixed(2)}
              </span>
            </div>

            <div className="row-actions">
              <button
                type="button"
                className="action-btn action-btn-view"
                onClick={() => onView(student)}
                title="View Profile"
              >
                <Eye size={15} />
              </button>
              <button
                type="button"
                className="action-btn action-btn-edit"
                onClick={() => onEdit(student)}
                title="Edit Student"
              >
                <Edit2 size={15} />
              </button>
              <button
                type="button"
                className="action-btn action-btn-delete"
                onClick={() => onDelete(student)}
                title="Delete Student"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
