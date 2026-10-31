import { ClipboardX,Ellipsis } from "lucide-react";

export default function UserHistory({
  items = [], // [{ id, question, createdAt }]
  activeId,
  onSelect,
  onClear,
}) {
  return (
    <section className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Previous questions</h3>
        {items.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="btn btn-ghost btn-xs gap-1 opacity-70"
          >
            <ClipboardX className="size-4" />
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm opacity-60">No questions</p>
      ) : (
        <ul className="min-h-0 flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-thumb-base-300">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(item)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-1 text-left transition-colors ${
                    active
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-base-300 bg-base-100 hover:bg-base-200"
                  }`}
                >
                  <p className="truncate font-medium">{item.question}</p>
                  
                  <Ellipsis size={20} className="hover:bg-base-100 p-0.5 rounded-md"/>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
