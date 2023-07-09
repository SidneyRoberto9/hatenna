import { W, w } from 'windstitch';

export const Button = w.button(
  'flex items-center justify-center rounded-lg p-2 transition-all duration-500',
  {
    variants: {
      favorite: (yes: boolean | undefined) =>
        typeof yes === 'undefined'
          ? ''
          : yes
          ? 'border border-pink-500 bg-pink-400 text-secondary hover:border-primary hover:bg-secondary hover:text-primary'
          : 'border border-primary bg-secondary text-primary hover:border-pink-500 hover:bg-pink-400  hover:text-secondary',
      link: (yes: boolean) =>
        yes
          ? 'mx-4 my-2 rounded-md bg-primary-button px-4 py-2 text-secondary hover:bg-Accent'
          : '',
    },
    defaultVariants: {
      favorite: undefined,
      link: false,
    },
  },
);

export type ButtonProps = W.Infer<typeof Button>;
