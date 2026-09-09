export default function CampusLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-7 sm:px-6 lg:px-8">
      <div className="h-3 w-28 rounded bg-gray-200" />
      <div className="mt-7 grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="hidden rounded-2xl border border-gray-100 bg-white p-5 lg:block">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="mt-4 h-2 w-full rounded bg-gray-100" />
          <div className="mt-7 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-10 rounded-xl bg-gray-100" />
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="h-48 bg-[#00498d]/10 sm:h-56" />
          <div className="space-y-4 p-6 sm:p-8">
            <div className="h-6 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-5/6 rounded bg-gray-100" />
            <div className="mt-7 h-11 w-40 rounded-xl bg-[#00498d]/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
