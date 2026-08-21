import React, { useState } from "react";
import { Eye, EyeOff, Loader2, TrendingUp } from "lucide-react";

// Simple email format check — good enough for client-side validation
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Login = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState("login"); // "login" | "signup"

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear the field-level error as soon as the user starts fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (formError) setFormError("");
  };

  const validate = () => {
    const nextErrors = {};

    if (mode === "signup" && !form.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!validate()) return;

    setSubmitting(true);

    try {
      // Swap this out for a real API call, e.g.:
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Invalid email or password.");
      // const data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 900));

      setSuccess(true);
      onLoginSuccess?.(form);
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "signup" : "login"));
    setErrors({});
    setFormError("");
    setSuccess(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl lg:flex-row lg:rounded-3xl">

        {/* Left panel — decorative, hidden on small screens */}
        <div className="relative hidden w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 p-10 text-white md:flex md:w-1/2 lg:p-14">

          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-black/10 blur-2xl" />
          <svg
            className="pointer-events-none absolute bottom-0 right-0 h-2/3 w-2/3 opacity-20"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="140" cy="160" r="90" fill="white" />
          </svg>

          <div className="relative z-10">
            <span className="text-2xl font-bold italic tracking-tight">
              Payyed
            </span>
          </div>

          <div className="relative z-10 max-w-sm">
            <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
              Welcome back!
            </h1>

            <p className="mt-4 text-sm leading-6 text-emerald-50 lg:text-base">
              We are glad to see you again! Instant deposits, withdrawals
              &amp; payouts trusted by millions worldwide.
            </p>
          </div>

          <div className="relative z-10 h-4" />
        </div>

        {/* Right panel — the actual form */}
        <div className="flex w-full flex-col justify-center p-6 sm:p-10 md:w-1/2 lg:p-16">
          <div className="mx-auto w-full max-w-sm">

            {/* Mobile-only brand mark since the left panel is hidden below md */}
            <div className="mb-6 flex items-center gap-2 md:hidden">
              <span className="text-lg font-bold italic text-emerald-600">
                Payyed
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {mode === "login" ? "Log In" : "Create Account"}
            </h2>

            {success && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {mode === "login"
                  ? "Logged in successfully."
                  : "Account created successfully."}
              </div>
            )}

            {formError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">

              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    autoComplete="name"
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                      errors.name
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/15"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  autoComplete="email"
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.email
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/15"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                      errors.password
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/15"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me / Forgot password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Remember Me
                </label>

                {mode === "login" && (
                  <button
                    type="button"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login"
                  : "Create Account"}
              </button>

              <p className="text-center text-sm text-slate-500">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  {mode === "login" ? "Sign Up" : "Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
