import React, { useState } from "react";
import { Eye, EyeOff, Loader2, CheckSquare } from "lucide-react";

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
        <div className="relative hidden w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 p-10 text-white lg:flex lg:w-1/2 lg:p-14">

          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-black/10 blur-2xl" />

          {/* Illustration — a figure walking through a city skyline, built entirely
              from SVG shapes so there's no dependency on an external image file */}
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full"
            viewBox="0 0 400 320"
            preserveAspectRatio="xMidYMax slice"
            fill="none"
            aria-hidden="true"
          >
            {/* City skyline, far background */}
            <g fill="white" fillOpacity="0.06">
              <rect x="0" y="220" width="34" height="100" />
              <rect x="40" y="190" width="28" height="130" />
              <rect x="74" y="235" width="22" height="85" />
              <rect x="102" y="165" width="40" height="155" />
              <rect x="148" y="205" width="26" height="115" />
              <rect x="180" y="180" width="32" height="140" />
              <rect x="218" y="225" width="20" height="95" />
              <rect x="244" y="200" width="34" height="120" />
              <rect x="284" y="240" width="26" height="80" />
              <rect x="316" y="195" width="30" height="125" />
              <rect x="352" y="230" width="24" height="90" />
              <rect x="380" y="200" width="20" height="120" />
            </g>

            {/* Ground shadow beneath the figure */}
            <ellipse cx="215" cy="313" rx="46" ry="7" fill="black" fillOpacity="0.18" />

            {/* Walking figure, side profile, mid-stride */}
            <g fill="white" fillOpacity="0.34">
              {/* trailing leg */}
              <path d="M195 190 L182 260 L172 305 L189 307 L202 262 L211 197 Z" />
              {/* leading leg */}
              <path d="M219 192 L236 255 L249 303 L232 307 L215 258 L204 197 Z" />
              {/* torso */}
              <path d="M182 95 C179 128 184 162 195 190 L219 190 C228 160 230 128 225 95 C213 84 194 84 182 95 Z" />
              {/* trailing arm */}
              <path d="M187 108 C172 120 163 140 165 161 L178 165 C178 145 185 129 196 116 Z" />
              {/* leading arm */}
              <path d="M221 111 C234 124 241 143 237 163 L224 166 C225 146 219 130 210 118 Z" />
              {/* head */}
              <circle cx="204" cy="70" r="23" />
              {/* hood / collar */}
              <path d="M180 96 C184 87 224 87 228 96 C221 104 187 104 180 96 Z" />
            </g>
          </svg>

          {/* Soft vignette so the panel reads with more depth, like a toned photo */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.25)_100%)]" />

          <div className="relative z-10">
            <span className="text-2xl font-bold tracking-tight">
              Task Manager
            </span>
          </div>

          <div className="relative z-10 max-w-sm">
            <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
              Welcome back!
            </h1>

            <p className="mt-4 text-sm leading-6 text-indigo-50 lg:text-base">
              We are glad to see you again! Organize your tasks, track
              progress, and stay on top of your work — all in one place.
            </p>
          </div>

          <div className="relative z-10 h-4" />
        </div>

        {/* Right panel — the actual form */}
        <div className="relative flex w-full flex-col justify-center overflow-hidden p-6 sm:p-10 lg:w-1/2 lg:p-16">

          {/* Decorative background accents so this side doesn't read as bare white */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-50 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-slate-50 blur-2xl" />

          <svg
            className="pointer-events-none absolute bottom-6 right-6 h-28 w-28 opacity-[0.06]"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <rect x="15" y="10" width="70" height="80" rx="8" fill="#4f46e5" />
            <rect x="27" y="28" width="46" height="6" rx="3" fill="white" />
            <rect x="27" y="44" width="46" height="6" rx="3" fill="white" />
            <rect x="27" y="60" width="30" height="6" rx="3" fill="white" />
          </svg>

          <div className="relative z-10 mx-auto w-full max-w-sm">

            {/* Mobile-only brand mark since the left panel is hidden below md */}
            <div className="mb-6 flex items-center gap-2 lg:hidden">
              <span className="text-lg font-bold text-indigo-700">
                Task Manager
              </span>
            </div>

            {/* Badge icon */}
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
              <CheckSquare size={22} className="text-indigo-700" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {mode === "login" ? "Log In" : "Create Account"}
            </h2>


            {success && (
              <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
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
                        : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/15"
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
                      : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/15"
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
                        : "border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/15"
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
                    className="h-4 w-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-600"
                  />
                  Remember Me
                </label>

                {mode === "login" && (
                  <button
                    type="button"
                    className="text-sm font-medium text-indigo-700 hover:text-indigo-800 cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
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
                  className="font-semibold text-indigo-700 hover:text-indigo-800 cursor-pointer"
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
