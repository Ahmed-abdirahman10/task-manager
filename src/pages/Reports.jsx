import React from "react";
import {
  CheckCircle2,
  Clock3,
  AlertCircle,
  ListTodo,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Target,
} from "lucide-react";

const Reports = () => {
  const stats = [
    {
      title: "Total Tasks",
      value: 48,
      change: "+12%",
      trend: "up",
      icon: ListTodo,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Completed",
      value: 29,
      change: "+18%",
      trend: "up",
      icon: CheckCircle2,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "In Progress",
      value: 11,
      change: "+5%",
      trend: "up",
      icon: Clock3,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Overdue",
      value: 8,
      change: "-8%",
      trend: "down",
      icon: AlertCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  const priorities = [
    {
      name: "High",
      count: 9,
      percentage: 19,
      color: "bg-red-500",
      text: "text-red-600",
    },
    {
      name: "Medium",
      count: 23,
      percentage: 48,
      color: "bg-orange-500",
      text: "text-orange-600",
    },
    {
      name: "Low",
      count: 16,
      percentage: 33,
      color: "bg-green-500",
      text: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-5 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Reports
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your productivity and task performance.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 cursor-pointer">
          <CalendarDays size={17} />
          This Week
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon size={22} className={stat.iconColor} />
                </div>

                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon size={14} />
                  {stat.change}
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500">{stat.title}</p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Completion + Priority */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Completion Rate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Completion Rate
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Overall task completion
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-indigo-50 p-3">
              <Target className="text-indigo-600" size={21} />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-[conic-gradient(#4f46e5_0deg_217deg,#e2e8f0_217deg_360deg)] sm:h-48 sm:w-48">
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white sm:h-36 sm:w-36">
                <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  60%
                </span>

                <span className="mt-1 text-xs text-slate-400">Completed</span>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-xs text-green-600">Completed</p>

              <p className="mt-1 text-xl font-bold text-green-700">29</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Remaining</p>

              <p className="mt-1 text-xl font-bold text-slate-700">19</p>
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Tasks by Priority
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Distribution of all tasks
            </p>
          </div>

          <div className="mt-8 space-y-7">
            {priorities.map((priority) => (
              <div key={priority.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${priority.color}`}
                    />

                    <span className="text-sm font-medium text-slate-700">
                      {priority.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">
                      {priority.count}
                    </span>

                    <span className="text-xs text-slate-400">
                      ({priority.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${priority.color}`}
                    style={{ width: `${priority.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity Summary */}
      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-xl bg-indigo-600 p-3 text-white">
            <TrendingUp size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-indigo-900">Good progress!</h2>

            <p className="mt-1 text-sm leading-6 text-indigo-700">
              You completed 29 tasks this week, which is
              <span className="font-semibold"> 18% more </span>
              than the previous week. Keep up the great work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
