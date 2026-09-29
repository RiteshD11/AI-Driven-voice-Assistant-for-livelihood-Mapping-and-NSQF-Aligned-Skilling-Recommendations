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

interface AnalyticsChartProps {
  title: string;
  subtitle?: string;
  type: 'bar' | 'pie' | 'line' | 'demand-bar';
  data: any[];
  className?: string;
}

const COLORS = ['#F59E0B', '#0284C7', '#10B981', '#8B5CF6', '#F43F5E', '#64748B'];

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  subtitle,
  type,
  data,
  className,
}) => {
  const tooltipStyle = {
    backgroundColor: '#FFFFFF',
    borderColor: '#E7E7E3',
    borderRadius: '14px',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
    fontSize: '12px',
    color: '#181818',
  };

  return (
    <div
      className={cn(
        'rounded-[22px] p-5 sm:p-6 bg-white border border-[#E7E7E3] flex flex-col justify-between shadow-card',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[#E7E7E3]">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#181818] tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-[#666666] mt-0.5">{subtitle}</p>}
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-[#8A8A8A] font-semibold">
          DEMO DATA
        </span>
      </div>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EC" vertical={false} />
              <XAxis dataKey="gap" stroke="#8A8A8A" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A8A8A" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="beneficiariesCount" name="Total Identified" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              <Bar dataKey="bridgedCount" name="Bridged in Training" fill="#0284C7" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : type === 'demand-bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EC" vertical={false} />
              <XAxis dataKey="trade" stroke="#8A8A8A" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A8A8A" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="enrolled" name="Enrolled Beneficiaries" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="demand" name="Market Job Vacancies" fill="#F59E0B" radius={[6, 6, 0, 0]} />
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
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            </PieChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EC" vertical={false} />
              <XAxis dataKey="district" stroke="#8A8A8A" fontSize={11} tickLine={false} />
              <YAxis stroke="#8A8A8A" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="totalProfiled" name="Profiled" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: '#F59E0B' }} />
              <Line type="monotone" dataKey="employed" name="Employed" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981' }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
