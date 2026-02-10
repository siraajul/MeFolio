export const metadata = {
  title: "Sanity Studio",
  description: "Content Management System",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ margin: 0, padding: 0, height: "100vh" }}>
      {children}
    </div>
  );
}
