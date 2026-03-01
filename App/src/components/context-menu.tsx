import React from 'react';
import type { ContextMenuItem } from '@/types';
import { cn } from '@/lib/utils';

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  onClose: () => void;
  onAction: (actionId: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  items,
  onClose,
  onAction,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close context menu"
        className="fixed inset-0 z-[98] cursor-default"
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed z-[99] min-w-56 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-lg',
          'animate-in fade-in-0 zoom-in-95 duration-100'
        )}
        style={{ left: position.x, top: position.y }}
        role="menu"
      >
        {items.map((item) => {
          if (item.separator) {
            return <div key={item.id} className="my-1 h-px bg-border" />;
          }

          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                'flex w-full items-center justify-between px-3 py-2 text-left text-sm',
                'hover:bg-accent hover:text-accent-foreground',
                'disabled:pointer-events-none disabled:opacity-50'
              )}
              disabled={item.disabled}
              onClick={() => {
                item.action();
                onAction(item.id);
                onClose();
              }}
              role="menuitem"
            >
              <span className="flex items-center gap-2">
                {item.icon ? <span className="opacity-70">{item.icon}</span> : null}
                <span>{item.label}</span>
              </span>
              {item.shortcut ? (
                <span className="text-xs text-muted-foreground">{item.shortcut}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </>
  );
};
