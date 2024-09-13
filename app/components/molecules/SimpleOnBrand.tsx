import { ISimpleOnBrand } from '@/interfaces';

export default function SimpleOnBrand({
  className,
  mainText,
  secondaryText,
}: ISimpleOnBrand) {
  return (
    <div className={`bg-yellow-500 ${className}`}>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {mainText}
          </h2>
          <p className="mt-3 text-base text-white sm:mt-4 sm:text-xl">
            {secondaryText}
          </p>
        </div>
      </div>
    </div>
  );
}
