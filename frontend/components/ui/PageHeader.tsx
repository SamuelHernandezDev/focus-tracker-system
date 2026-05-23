//frontend\components\ui\PageHeader.tsx
"use client";

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, description, children }: Props) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
      
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {children}
      </div>
    </div>
  );
}