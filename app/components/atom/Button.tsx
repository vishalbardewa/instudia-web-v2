import clsx from 'clsx';
import Link from 'next/link';

export function Button({ invert, href, className, children, ...props }: any) {
  // eslint-disable-next-line no-param-reassign
  className = clsx(
    className,
    'inline-flex rounded-full px-8 py-4 text-sm font-semibold transition',
    invert ? 'bg-white' : 'text-white'
  );

  const inner = <span className="relative top-px">{children}</span>;

  if (href) {
    return (
      <Link
        target={props?.target}
        rel="noopener"
        href={href}
        className={className}
        {...props}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button className={className} {...props}>
      {inner}
    </button>
  );
}
