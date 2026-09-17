import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, UserPlus, Edit3 } from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Data Science',
];

const STATUS_CHOICES = ['Active', 'Inactive', 'Graduated', 'Suspended'];

export default function StudentModal({ isOpen, onClose, onSubmit, studentToEdit }) {
  const isEditing = Boolean(studentToEdit);

  const initialFormState = {
    student_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    enrollment_date: new Date().toISOString().split('T')[0],
    gpa: '3.50',
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        student_id: studentToEdit.student_id || '',
        first_name: studentToEdit.first_name || '',
        last_name: studentToEdit.last_name || '',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        department: studentToEdit.department || 'Computer Science',
        enrollment_date: studentToEdit.enrollment_date || '',
        gpa: studentToEdit.gpa !== undefined ? String(studentToEdit.gpa) : '',
        status: studentToEdit.status || 'Active',
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
    setServerError('');
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    // Student ID
    if (!formData.student_id.trim()) {
      newErrors.student_id = 'Student ID is required.';
    } else if (!/^[A-Za-z0-9\-]{4,20}$/.test(formData.student_id.trim())) {
      newErrors.student_id = 'Must be 4-20 alphanumeric characters or hyphens (e.g. STU-2026-001).';
    }

    // First Name
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required.';
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = 'First name must be at least 2 characters.';
    }

    // Last Name
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required.';
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = 'Last name must be at least 2 characters.';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15) {
        newErrors.phone = 'Phone number must contain between 7 and 15 digits.';
      }
    }

    // Department
    if (!formData.department) {
      newErrors.department = 'Department is required.';
    }

    // Enrollment Date
    if (!formData.enrollment_date) {
      newErrors.enrollment_date = 'Enrollment date is required.';
    }

    // GPA
    const gpaNum = parseFloat(formData.gpa);
    if (formData.gpa === '' || isNaN(gpaNum)) {
      newErrors.gpa = 'GPA is required and must be numeric.';
    } else if (gpaNum < 0.0 || gpaNum > 4.0) {
      newErrors.gpa = 'GPA must be between 0.00 and 4.00.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error upon typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        student_id: formData.student_id.trim().toUpperCase(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        gpa: parseFloat(formData.gpa).toFixed(2),
      };

      await onSubmit(payload, studentToEdit ? studentToEdit.id : null);
      onClose();
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        const fieldErrors = {};
        for (const [key, val] of Object.entries(err.errors)) {
          fieldErrors[key] = Array.isArray(val) ? val.join(' ') : String(val);
        }
        setErrors(fieldErrors);
      } else {
        setServerError(err.message || 'Failed to save student record.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title" id="modal-title">
            {isEditing ? (
              <>
                <Edit3 size={20} color="var(--primary)" />
                <span>Edit Student Record</span>
              </>
            ) : (
              <>
                <UserPlus size={20} color="var(--primary)" />
                <span>Enroll New Student</span>
              </>
            )}
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {serverError && (
              <div
                style={{
                  backgroundColor: 'var(--danger-light)',
                  color: 'var(--danger)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.875rem',
                }}
              >
                <AlertCircle size={18} />
                <span>{serverError}</span>
              </div>
            )}

            <div className="form-grid">
              {/* Student ID */}
              <div className="form-group form-group-full">
                <label className="form-label" htmlFor="student_id">
                  <span>Student ID / Roll Code <span className="required-star">*</span></span>
                  <span className="form-help">e.g. STU-2026-001</span>
                </label>
                <input
                  id="student_id"
                  name="student_id"
                  type="text"
                  className={`form-input ${errors.student_id ? 'is-invalid' : ''}`}
                  value={formData.student_id}
                  onChange={handleChange}
                  placeholder="e.g. STU-2026-001"
                  required
                />
                {errors.student_id && (
                  <div className="error-text">
                    <AlertCircle size={14} />
                    <span>{errors.student_id}</span>
                  </div>
                )}
              </div>

              {/* First Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="first_name">
                  <span>First Name <span className="required-star">*</span></span>
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  className={`form-input ${errors.first_name ? 'is-invalid' : ''}`}
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="e.g. Alice"
                  required
                />
                {errors.first_name && (
                  <div className="error-text">
                    <AlertCircle size={14} />
                    <span>{errors.first_name}</span>
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="last_name">
                  <span>Last Name <span className="required-star">*</span></span>
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  className={`form-input ${errors.last_name ? 'is-invalid' : ''}`}
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="e.g. Johnson"
                  required
                />
                {errors.last_name && (
                  <div className="error-text">
                    <AlertCircle size={14} />
                    <span>{errors.last_name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  <span>Email Address <span className="required-star">*</span></span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@university.edu"
                  required
                />
                {errors.email && (
                  <div className="error-text">
                    <AlertCircle size={14} />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  <span>Contact Phone <span className="required-star">*</span></span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1-555-0199"
                  required
                />
                {errors.phone && (
                  <div className="error-text">
                    <AlertCircle size={14} />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              {/* Department */}
              <div className="form-group">
                <label className="form-label" htmlFor="department">
                  <span>Department <span className="required-star">*</span></span>
                </label>
                <select
                  id="department"
                  name="department"
                  className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="error-text">
                    <AlertCircle size={14} />
                    <span>{errors.department}</span>
                  </div>
                )}
              </div>

              {/* Enrollment Date */}
              <div className="form-group">
                <label className="form-label" htmlFor="enrollment_date">
                  <span>Enrollment Date <span className="required-star">*</span></span>
                </label>
                <input
                  id="enrollment_date"
                  name="enrollment_date"
                  type="date"
                  className={`form-input ${errors.enrollment_date ? 'is-invalid' : ''}`}
                  value={formData.enrollment_date}
                  onChange={handleChange}
                  required
                />
                {errors.enrollment_date && (
                  <div className="error-text">
                    <AlertCircle size={14} />
                    <span>{errors.enrollment_date}</span>
                  </div>
                )}
              </div>

              {/* GPA */}
              <div className="form-group">
                <label className="form-label" htmlFor="gpa">
                  <span>Cumulative GPA <span className="required-star">*</span></span>
                  <span className="form-help">0.00 – 4.00</span>
                </label>
                <input
                  id="gpa"
                  name="gpa"
                  type="number"
                  step="0.01"
                  min="0.00"
                  max="4.00"
                  className={`form-input ${errors.gpa ? 'is-invalid' : ''}`}
                  value={formData.gpa}
                  onChange={handleChange}
                  placeholder="3.75"
                  required
                />
                {errors.gpa && (
                  <div className="error-text">
                    <AlertCircle size={14} />
                    <span>{errors.gpa}</span>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="form-group">
                <label className="form-label" htmlFor="status">
                  <span>Academic Status <span className="required-star">*</span></span>
                </label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {STATUS_CHOICES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <Save size={16} />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Student' : 'Enroll Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
