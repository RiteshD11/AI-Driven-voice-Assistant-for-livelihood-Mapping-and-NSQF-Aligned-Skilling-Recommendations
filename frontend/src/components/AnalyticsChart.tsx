import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { cn } from '../lib/utils';
import { StatusBadge } from './StatusBadge';

interface AnalyticsChartProps {
  title: string;
  subtitle?: string;
  type: 'bar' | 'pie' | 'line' | 'demand-bar';
  data: any[];
  className?: string;
}

const COLORS = ['#f59e0b', '#06b6d4', '#10b981', '#8b5cf6', '#ec4899', '#64748b'];

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  subtitle,
  type,
  data,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-3xl p-5 sm:p-6 glass-card border border-slate-800/80 flex flex-col justify-between shadow-xl',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        <StatusBadge label="DEMO DATA" variant="neutral" size="sm" />
      </div>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="gap" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="beneficiariesCount" name="Total Identified" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="bridgedCount" name="Bridged in Training" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : type === 'demand-bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="trade" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="enrolled" name="Enrolled Beneficiaries" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="demand" name="Market Job Vacancies" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : type === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            </PieChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="district" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="totalProfiled" name="Profiled" stroke="#f59e0b" strokeWidth={2.5} />
              <Line type="monotone" dataKey="employed" name="Employed" stroke="#10b981" strokeWidth={2.5} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
