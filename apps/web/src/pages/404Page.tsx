import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex h-screen  items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
      <div className="w-full flex items-center justify-center  lg:w-1/2">
        <img
          className="hidden lg:block"
          src="/404.png"
          alt=""
        />
        <img
          className="hidden md:block lg:hidden"
          src="/404-small.png"
          alt=""
        />
        <img
          className="md:hidden"
          src="/404-sx.png"
          alt=""
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
          Looks like you've found the doorway to the great nothing
        </h1>
        <p className="py-4 text-base text-gray-800">
          The content you’re looking for doesn’t exist. Either it was removed,
          or you mistyped the link.
        </p>
        <p className="py-2 text-base text-gray-800">
          Sorry about that! Please visit our homepage to get where you need to
          go.
        </p>
        <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
          Go back to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
