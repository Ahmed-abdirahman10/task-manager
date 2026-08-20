import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
];

function Sidebar({ open, onClose }) {
  const asideRef = useRef(null);

  // Close on outside click (mobile drawer only)
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (asideRef.current && !asideRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop (mobile only) */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        ref={asideRef}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[80%] flex-col border-r border-slate-800 bg-slate-950 px-4 py-6 text-white transition-transform duration-300 ease-in-out
        lg:sticky lg:top-0 lg:z-30 lg:w-64 lg:max-w-none lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center justify-between gap-3 px-3">
          <span className="text-xl font-semibold tracking-tight sm:text-2xl">
            Task Manager
          </span>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-slate-500">
            MENU
          </p>

          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`
                  }
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className="shrink-0 transition-transform group-hover:scale-105"
                  />

                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-4">
          {/* Logout */}
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white cursor-pointer">
            <LogOut size={20} />
            <span>Logout</span>
          </button>

          {/* User */}
          <div className="mt-4 flex items-center gap-3 px-2 pt-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-950 text-sm font-bold text-indigo-300">
              JD
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-white">
                John Doe
              </span>

              <span className="text-xs text-slate-500">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
