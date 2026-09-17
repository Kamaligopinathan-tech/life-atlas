import React from 'react';
import { GraduationCap, Plus, RefreshCw } from 'lucide-react';

export default function Navbar({ onOpenCreate, onRefresh, loading }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="navbar-logo-icon">
            <GraduationCap size={24} />
          </div>
          <div className="navbar-brand-text">
            <h1>EduTrack Pro</h1>
            <p>Student Management System • Full-Stack CRUD</p>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onRefresh}
            disabled={loading}
            title="Refresh student records"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenCreate}
          >
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </header>
  );
}
