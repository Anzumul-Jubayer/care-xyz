import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 text-primary/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-base-content/70 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-base-content/60">
            It might have been moved or deleted, or you may have mistyped the URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          <Link href="/services" className="btn btn-outline btn-primary btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Browse Services
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-base-100 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-3">Need Help?</h3>
          <p className="text-base-content/70 mb-4">
            Here are some helpful links to get you back on track:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="link link-primary">
              Home
            </Link>
            <span className="text-base-content/30">•</span>
            <Link href="/services" className="link link-primary">
              Services
            </Link>
            <span className="text-base-content/30">•</span>
            <Link href="/login" className="link link-primary">
              Login
            </Link>
            <span className="text-base-content/30">•</span>
            <Link href="/register" className="link link-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
