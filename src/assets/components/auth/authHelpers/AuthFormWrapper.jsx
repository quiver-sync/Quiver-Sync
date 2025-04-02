export function AuthFormWrapper({ title, subtitle, icon, children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 via-blue-100 to-sky-200 flex items-center justify-center px-4 py-6 sm:px-6">
      <div className="w-md max-w-sm sm:max-w-md bg-white/90 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-xl p-5 sm:p-8">
        <div className="text-center">
          {icon && <div className="mx-auto mb-3">{icon}</div>}
          <h2 className="text-xl sm:text-2xl font-bold text-sky-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="mt-6 space-y-6">{children}</div>
      </div>
    </div>
  );
}
