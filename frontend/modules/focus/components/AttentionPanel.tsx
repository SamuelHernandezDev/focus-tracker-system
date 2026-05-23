//frontend\modules\focus\components\AttentionPanel.tsx
type Props = {
  title: string;

  description?: string;

  children: React.ReactNode;
};

export default function AttentionPanel({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
      <div>
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>

        {description && (
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        )}
      </div>

      {children}
    </div>
  );
}
