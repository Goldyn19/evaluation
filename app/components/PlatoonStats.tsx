'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PlatoonStat {
  platoonNumber: number;
  totalMembers: number;
  submittedForms: number;
}

export default function PlatoonStats() {
  const [stats, setStats] = useState<PlatoonStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/platoon-stats');
        if (!response.ok) {
          throw new Error('Failed to fetch platoon statistics');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('Failed to load platoon statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading statistics...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  const data = stats.map(stat => ({
    name: `Platoon ${stat.platoonNumber}`,
    'Total Members': stat.totalMembers,
    'Submitted Forms': stat.submittedForms,
    'Not Submitted': stat.totalMembers - stat.submittedForms,
  }));

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Platoon Form Submission Statistics</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Submitted Forms" fill="#1BAE70" />
          <Bar dataKey="Not Submitted" fill="#E53E3E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 