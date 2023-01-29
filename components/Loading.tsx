export function Loading() {
  return (
    <div className="animate-pulse">
      <div className="space-y-3 mb-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  )
}

export function LoadingList() {
  return (
    <div className="max-w-md p-4 space-y-4 divide-y divide-gray-200 rounded animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-slate-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-slate-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-slate-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-slate-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-slate-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-slate-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-slate-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-slate-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-slate-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-slate-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-slate-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-slate-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-slate-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-slate-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-slate-300 rounded-full w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function LoadingChart() {
  return (
    <div className="p-4 animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2.5"></div>
      <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
      <div className="flex items-baseline mt-4 space-x-6">
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full h-56 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-20"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
        <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-40"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
