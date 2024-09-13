import { useCallback, useEffect, useState } from 'react';

import {
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  UsersIcon,
} from '@heroicons/react/outline';

import { classNames } from '@/utils/classnames';

interface IFeatureList {
  key: string;
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconForeground: string;
  iconBackground: string;
  value?: any;
}

const initialActions: IFeatureList[] = [
  {
    key: 'duration',
    title: 'Duration',
    href: '#',
    icon: ClockIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    key: 'prerequisites',
    title: 'Prerequisites',
    href: '#',
    icon: BadgeCheckIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    key: 'keySkills',
    title: 'Key Skills',
    href: '#',
    icon: UsersIcon,
    iconForeground: 'text-light-blue-700',
    iconBackground: 'bg-light-blue-50',
  },
  {
    key: 'level',
    title: 'Level',
    href: '#',
    icon: CashIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
];

export default function FeatureList({ features }: any) {
  const [actions, setActions] = useState(initialActions);
  const addFeatureContent = useCallback(
    (items: any) =>
      items.map((item: any) => ({
        ...item,
        value: features[item.key],
      })),
    [features]
  );

  useEffect(() => {
    setActions(addFeatureContent(initialActions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 lg:w-2/3">
      {actions.map((action, actionIdx) => {
        return (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1
                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                : '',
              'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  'rounded-lg inline-flex p-3 ring-4 ring-white'
                )}
              >
                {/* <action.icon className="h-6 w-6" aria-hidden="true" /> */}
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href={action.href} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
              <p className="mt-2 text-sm text-gray-500">{action?.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
