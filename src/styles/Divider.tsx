import { w } from 'windstitch';

export const Divider = w.span('h-0.5 border-t-0 bg-primary opacity-20', {
  variants: {
    opacity: {
      50: 'h-1 w-full rounded-lg bg-primary/50',
      stock: 'my-2',
    },
  },
  defaultVariants: {
    opacity: 'stock',
  },
});
