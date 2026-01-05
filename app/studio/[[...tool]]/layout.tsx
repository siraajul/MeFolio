// Disable body styles for Sanity Studio
export const metadata = {
  title: "MeFolio Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
