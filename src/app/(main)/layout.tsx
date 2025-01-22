import Breadcrumb from '@/components/Breadcrumb';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
} 