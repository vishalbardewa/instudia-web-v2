import React from 'react';

interface ICategory {
  name: string;
  href: string;
}

interface IAuthor {
  name: string;
  href: string;
  imageUrl: string;
}

interface IBlogCardProps {
  title: string;
  imageUrl: string;
  category: ICategory;
  href: string;
  description: string;
  author: IAuthor;
  date: string;
  datetime: string;
  readingTime: string;
}

export default function BlogCard({
  title,
  imageUrl,
  category,
  href,
  description,
  author,
  date,
  datetime,
  readingTime,
}: IBlogCardProps) {
  return (
    <div
      key={title}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg"
    >
      <div className="shrink-0">
        <img className="h-48 w-full object-cover" src={imageUrl} alt="" />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-yellow-600">
            <a href={category.href} className="text-yellow-600 hover:underline">
              {category.name}
            </a>
          </p>
          <a href={href} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <p className="mt-3 text-base text-gray-500">{description}</p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="shrink-0">
            <a href={author.href}>
              <span className="sr-only text-yellow-600">{author.name}</span>
              <img
                className="h-10 w-10 rounded-full"
                src={author.imageUrl}
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="!my-0 text-sm font-medium text-gray-900">
              <a href={author.href} className="over:underline text-yellow-600">
                {author.name}
              </a>
            </p>
            <div className="!my-0 flex space-x-1 text-sm text-gray-500">
              <time dateTime={datetime}>{date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{readingTime} read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
