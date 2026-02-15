export const metadata = {
  title: "Our Services - Care.IO",
  description: "Browse our comprehensive range of professional home care services including baby care, elderly care, sick care, and more. Quality care from certified professionals.",
  keywords: ["care services", "home care services", "baby care", "elderly care", "sick care", "nursing services", "professional caregivers"],
  openGraph: {
    title: "Our Services - Care.IO",
    description: "Browse our comprehensive range of professional home care services. Quality care from certified professionals.",
    type: "website",
    url: "https://care-io.com/services",
    siteName: "Care.IO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services - Care.IO",
    description: "Browse our comprehensive range of professional home care services.",
  },
};

export default function ServicesLayout({ children }) {
  return <>{children}</>;
}
