import React from 'react';
import { Search, LayoutList, LayoutGrid } from 'lucide-react';

const DEPARTMENTS = [
  'All',
  'Computer Science',
  'Information Technology',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Data Science',
];

const STATUSES = ['All', 'Active', 'Inactive', 'Graduated', 'Suspended'];

export default function SearchFilterBar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  ordering,
  onOrderingChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="controls-card">
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, student ID, or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search students"
        />
      </div>

      <div className="filters-group">
        <select
          className="filter-select"
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.filter(d => d !== 'All').map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Statuses</option>
          {STATUSES.filter(s => s !== 'All').map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={ordering}
          onChange={(e) => onOrderingChange(e.target.value)}
          aria-label="Sort records"
        >
          <option value="-created_at">Newest First</option>
          <option value="created_at">Oldest First</option>
          <option value="student_id">Student ID (A–Z)</option>
          <option value="first_name">Name (A–Z)</option>
          <option value="-gpa">GPA (Highest)</option>
          <option value="gpa">GPA (Lowest)</option>
        </select>

        <div className="view-toggle" role="radiogroup" aria-label="Layout view switcher">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => onViewModeChange('table')}
            title="Table View"
            aria-checked={viewMode === 'table'}
          >
            <LayoutList size={18} />
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => onViewModeChange('cards')}
            title="Card Grid View"
            aria-checked={viewMode === 'cards'}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
