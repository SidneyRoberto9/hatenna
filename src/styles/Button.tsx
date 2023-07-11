import { W, w } from 'windstitch';

export const Button = w.button(
  'flex items-center justify-center rounded-lg p-2 transition-all duration-300',
  {
    variants: {
      favorite: {
        true: 'border border-pink-500 bg-pink-400 text-secondary hover:border-primary hover:bg-secondary  hover:text-primary',
        false:
          'border border-primary bg-secondary text-primary hover:border-pink-500 hover:bg-pink-400 hover:text-secondary',
        default: '',
      },
      link: (yes: boolean) =>
        yes
          ? 'mx-4 my-2 rounded-md bg-primary-button px-4 py-2 text-secondary hover:bg-Accent'
          : '',
      form: {
        loading: 'h-10 my-1 bg-gray-300 cursor-not-allowed text-white',
        stock: 'my-1 bg-primary-button hover:bg-Accent cursor-pointer text-white',
        base: '',
      },
      redirect: (yes: boolean) =>
        yes ? 'cursor-pointer bg-primary-button text-white hover:bg-Accent' : '',
    },
    defaultVariants: {
      favorite: 'default',
      redirect: false,
      link: false,
      form: 'base',
    },
  },
);

export type ButtonProps = W.Infer<typeof Button>;
