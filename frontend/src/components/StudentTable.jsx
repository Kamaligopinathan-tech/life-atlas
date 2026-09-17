import React from 'react';
import { Eye, Edit2, Trash2, GraduationCap, AlertCircle } from 'lucide-react';

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

export default function StudentTable({
  students,
  loading,
  onView,
  onEdit,
  onDelete,
  onOpenCreate,
}) {
  if (loading && (!students || students.length === 0)) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <div className="empty-state-icon animate-pulse">
            <GraduationCap size={32} />
          </div>
          <h3>Loading Student Records...</h3>
          <p>Connecting to backend API and fetching data.</p>
        </div>
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
    <div className="table-card">
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Full Name & Email</th>
              <th>Department</th>
              <th>Enrolled Date</th>
              <th>GPA</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <span className="code-badge">{student.student_id}</span>
                </td>
                <td>
                  <div className="student-meta">
                    <span className="student-name">
                      {student.first_name} {student.last_name}
                    </span>
                    <span className="student-email">{student.email}</span>
                  </div>
                </td>
                <td>{student.department}</td>
                <td>{student.enrollment_date}</td>
                <td>
                  <span className={`gpa-pill ${getGpaClass(student.gpa)}`}>
                    ★ {Number(student.gpa).toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(student.status)}`}>
                    ● {student.status}
                  </span>
                </td>
                <td>
                  <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="action-btn action-btn-view"
                      onClick={() => onView(student)}
                      title="View student profile"
                      aria-label={`View profile of ${student.first_name}`}
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      className="action-btn action-btn-edit"
                      onClick={() => onEdit(student)}
                      title="Edit student"
                      aria-label={`Edit ${student.first_name}`}
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      type="button"
                      className="action-btn action-btn-delete"
                      onClick={() => onDelete(student)}
                      title="Delete student"
                      aria-label={`Delete ${student.first_name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
