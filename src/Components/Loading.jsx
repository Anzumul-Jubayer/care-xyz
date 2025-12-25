"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-200 bg-opacity-70 z-50">
      <div className="flex flex-col items-center">
        
        <div className="w-16 h-16 border-4 border-t-primary border-b-primary border-l-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
        
        <p className="mt-4 text-gray-700 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
