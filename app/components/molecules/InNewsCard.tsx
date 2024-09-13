import moment from 'moment';

const MEDIA_LOGO = {
  MORUNG_EXPRESS:
    'https://morungexpress.com/public/front/images/morung_logo.png',
  NAGALAND_POST: '/assets/images/nagaland-post.jpeg',
  EASTERN_MIRROR:
    'https://scontent.fgau3-3.fna.fbcdn.net/v/t39.30808-6/357750063_688843333257024_2945734525276846803_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=wWT6XZzFdCYAX_aCxKr&_nc_ht=scontent.fgau3-3.fna&oh=00_AfBTU1xCLoT4-KHusCv_gbLvvU1ZzLbRpGYa6t1rNWXmbw&oe=65852981',
};

const people = [
  {
    name: 'Instudia organises workshop on Photography',
    link: 'https://www.nagalandpost.com/index.php/instudia-organises-workshop-on-photography/',
    email: '',
    role: 'Nagaland Post',
    imageUrl: MEDIA_LOGO.NAGALAND_POST,
    imageDimensions: {
      h: 24,
      w: 24,
    },
    dateOfPublication: moment('2022-06-25').format('LL'),
  },
  {
    name: 'Workshop on Photography and Python Programming',
    email: '',
    link: 'https://morungexpress.com/workshop-on-photography-and-python-programming',
    role: 'Morung Express',
    imageUrl: MEDIA_LOGO.MORUNG_EXPRESS,
    imageDimensions: {
      h: 12,
      w: 32,
    },
    dateOfPublication: moment('2022-06-25').format('LL'),
  },
  {
    name: 'Instudia organises workshop on Photography',
    email: '',
    link: 'https://easternmirrornagaland.com/nagaland-instudia-organises-workshop-on-photography/',
    role: 'Eastern Mirror',
    imageUrl: MEDIA_LOGO.EASTERN_MIRROR,
    imageDimensions: {
      h: 24,
      w: 24,
    },
    dateOfPublication: moment('2022-06-25').format('LL'),
  },
];

export default function InNewsCard({ mainText }: any) {
  return (
    <>
      <div className="mx-auto mb-7 max-w-6xl">
        <h1 className="ml-4 text-3xl font-extrabold text-black sm:text-5xl lg:ml-0">
          {mainText}
        </h1>
      </div>
      <div className="mx-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {people.map((person, idx) => (
          <div
            key={`${person.email}${idx}`}
            className="relative flex flex-col items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:border-gray-400 lg:flex-row"
          >
            <div className="mb-5 shrink-0 lg:mb-0">
              <img
                className={`h-${person.imageDimensions.h} w-${person.imageDimensions.w}`}
                src={person.imageUrl}
                alt="Nagaland Post Logo"
              />
            </div>
            <div className="min-w-0 flex-1">
              <a
                href={person.link}
                target="_blank"
                className="focus:outline-none"
                rel="noreferrer"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="!my-0 text-sm font-medium text-gray-900">
                  {person.name}
                </p>
                <p className="!my-0 truncate text-sm text-gray-500">
                  {person.role}
                </p>
                <p className="!my-0 truncate text-sm text-gray-500">
                  {person.dateOfPublication}
                </p>
                <a
                  href={person.link}
                  target="_blank"
                  className=""
                  rel="noreferrer"
                ></a>
                <p className="!my-0 truncate text-sm text-yellow-500">
                  Read the whole story
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
