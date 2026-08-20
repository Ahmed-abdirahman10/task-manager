import React from "react";
import {
  CheckCircle2,
  CalendarDays,
  Clock3,
  AlertCircle,
  CircleAlert,
  CircleDot,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Tasks",
      value: 24,
      icon: CheckCircle2,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Today's Tasks",
      value: 8,
      icon: CalendarDays,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "This Week",
      value: 18,
      icon: Clock3,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "High Priority",
      value: 5,
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Medium Priority",
      value: 10,
      icon: CircleAlert,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Low Priority",
      value: 9,
      icon: CircleDot,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  const tasks = [
    {
      color: "bg-red-500",
      title: "Complete project documentation",
      meta: "Today • High priority",
      status: "In Progress",
      statusStyle: "bg-yellow-50 text-yellow-600",
    },
    {
      color: "bg-orange-500",
      title: "Review team tasks",
      meta: "Today • Medium priority",
      status: "Completed",
      statusStyle: "bg-green-50 text-green-600",
    },
    {
      color: "bg-green-500",
      title: "Update dashboard design",
      meta: "Tomorrow • Low priority",
      status: "Pending",
      statusStyle: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-5 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Here's an overview of your tasks.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
            >
              <div className="flex items-center justify-between">
                {/* Icon */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${stat.bg}`}
                >
                  <Icon size={22} className={stat.color} />
                </div>

                {/* Value */}
                <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {stat.value}
                </span>
              </div>

              {/* Title */}
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Tasks
            </h2>

            <p className="text-sm text-slate-500">Your latest tasks</p>
          </div>

          <button className="self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 cursor-pointer sm:self-auto">
            View All
          </button>
        </div>

        {tasks.map((task, idx) => (
          <div
            key={task.title}
            className={`flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between ${
              idx !== tasks.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${task.color}`}
              />

              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800">
                  {task.title}
                </p>

                <p className="text-xs text-slate-400">{task.meta}</p>
              </div>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium sm:ml-3 ${task.statusStyle}`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
