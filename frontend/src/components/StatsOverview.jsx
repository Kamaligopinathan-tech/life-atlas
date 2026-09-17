import React from 'react';
import { Users, UserCheck, Award, TrendingUp } from 'lucide-react';

export default function StatsOverview({ stats }) {
  if (!stats) return null;

  return (
    <section className="stats-grid" aria-label="Dashboard Statistics">
      <div className="stat-card">
        <div className="stat-info">
          <h3>Total Enrolled</h3>
          <div className="stat-value">{stats.total_students ?? 0}</div>
          <div className="stat-sub">Registered across all depts</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-indigo">
          <Users size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>Active Students</h3>
          <div className="stat-value">{stats.active_students ?? 0}</div>
          <div className="stat-sub">Currently attending classes</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-emerald">
          <UserCheck size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>Average GPA</h3>
          <div className="stat-value">
            {stats.average_gpa !== undefined ? Number(stats.average_gpa).toFixed(2) : '0.00'}
          </div>
          <div className="stat-sub">Scale of 0.00 – 4.00</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-sky">
          <TrendingUp size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h3>Graduated Alumni</h3>
          <div className="stat-value">{stats.graduated_students ?? 0}</div>
          <div className="stat-sub">Completed degree program</div>
        </div>
        <div className="stat-icon-wrapper stat-icon-amber">
          <Award size={24} />
        </div>
      </div>
    </section>
  );
}
