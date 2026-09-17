import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import SearchFilterBar from './components/SearchFilterBar';
import StudentTable from './components/StudentTable';
import StudentCards from './components/StudentCards';
import StudentModal from './components/StudentModal';
import StudentDetailModal from './components/StudentDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { api } from './services/api';

export default function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filters & layout state
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [ordering, setOrdering] = useState('-created_at');
  const [viewMode, setViewMode] = useState('table');

  // Modal dialog states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToView, setStudentToView] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch student records from API
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getStudents({
        search,
        department,
        status,
        ordering,
      });
      setStudents(data);
    } catch (err) {
      showToast(err.message || 'Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, department, status, ordering, showToast]);

  // Fetch overview stats
  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  }, []);

  // Initial load and filter change trigger
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleRefresh = async () => {
    await Promise.all([fetchStudents(), fetchStats()]);
    showToast('Records refreshed successfully.', 'info');
  };

  // CRUD: Create or Update submit handler
  const handleSaveStudent = async (payload, id) => {
    if (id) {
      // Update (PUT)
      await api.updateStudent(id, payload);
      showToast(`Student ${payload.first_name} ${payload.last_name} updated successfully.`);
    } else {
      // Create (POST)
      await api.createStudent(payload);
      showToast(`Student ${payload.first_name} ${payload.last_name} enrolled successfully.`);
    }
    await Promise.all([fetchStudents(), fetchStats()]);
  };

  // CRUD: Delete handler
  const handleConfirmDelete = async (id) => {
    try {
      await api.deleteStudent(id);
      showToast('Student record deleted permanently.');
      await Promise.all([fetchStudents(), fetchStats()]);
    } catch (err) {
      showToast(err.message || 'Failed to delete student.', 'error');
    }
  };

  return (
    <div className="app-container">
      <Navbar
        onOpenCreate={() => {
          setStudentToEdit(null);
          setIsCreateModalOpen(true);
        }}
        onRefresh={handleRefresh}
        loading={loading}
      />

      <main className="main-content">
        <StatsOverview stats={stats} />

        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          status={status}
          onStatusChange={setStatus}
          ordering={ordering}
          onOrderingChange={setOrdering}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {viewMode === 'table' ? (
          <StudentTable
            students={students}
            loading={loading}
            onView={(student) => setStudentToView(student)}
            onEdit={(student) => setStudentToEdit(student)}
            onDelete={(student) => setStudentToDelete(student)}
            onOpenCreate={() => {
              setStudentToEdit(null);
              setIsCreateModalOpen(true);
            }}
          />
        ) : (
          <StudentCards
            students={students}
            loading={loading}
            onView={(student) => setStudentToView(student)}
            onEdit={(student) => setStudentToEdit(student)}
            onDelete={(student) => setStudentToDelete(student)}
            onOpenCreate={() => {
              setStudentToEdit(null);
              setIsCreateModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Modal: Create & Edit */}
      <StudentModal
        isOpen={isCreateModalOpen || Boolean(studentToEdit)}
        studentToEdit={studentToEdit}
        onClose={() => {
          setIsCreateModalOpen(false);
          setStudentToEdit(null);
        }}
        onSubmit={handleSaveStudent}
      />

      {/* Modal: Read-one Profile View */}
      <StudentDetailModal
        student={studentToView}
        isOpen={Boolean(studentToView)}
        onClose={() => setStudentToView(null)}
        onEdit={(student) => setStudentToEdit(student)}
      />

      {/* Modal: Delete Confirmation */}
      <DeleteConfirmModal
        student={studentToDelete}
        isOpen={Boolean(studentToDelete)}
        onClose={() => setStudentToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
