import clsx from 'clsx';

function Office({ name, children, invert = false }: any) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600'
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  );
}

export function Offices({ invert = false, ...props }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="instudia" invert={invert}>
          First Floor, Vikiye Center, Opp. Notun Bosti Gate
          <br />
          Dimapur, Nagaland 797112
        </Office>
      </li>
    </ul>
  );
}
