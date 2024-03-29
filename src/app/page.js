'use client';
import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState();

  useEffect(() => {
    console.log('book title:', bookTitle);
    console.log('book author:', bookAuthor);
    console.log('book genre', bookGenre);
    console.log(bookData);
    if (!bookData) {
      readBookRecomendation();
    }
  }, [bookTitle, bookAuthor, bookGenre, bookData]);

  const readBookRecomendation = async () => {
    try {
      const response = await fetch('/api/books', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status == 200) {
        const responseData = await response.json(); // Parse the JSON response body
        setBookData(responseData.data);
      } else {
        const responseData = await response.json(); // Parse the JSON response body
        console.log(responseData.error); // Log the parsed JSON data
      }
    } catch (error) {
      console.log('there was an error', error);
    }
  };

  const onSubmitBookRecommendation = async (e) => {
    e.preventDefault();
    const body = { title: bookGenre, author: bookAuthor, genre: bookGenre };
    setLoading(true);
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        const responseData = await response.json(); // Parse the JSON response body
        alert(responseData.error); // Log the parsed JSON data
      } else {
        const responseData = await response.json(); // Parse the JSON response body
        console.log(responseData); // Log the parsed JSON data
        resetForm();
        readBookRecomendation();
        alert('form submitted successfuly');
      }
    } catch (error) {
      console.log('there was an error submitting', error);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setBookTitle('');
    setBookAuthor('');
    setBookGenre('');
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Book Recommendation
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form
        onSubmit={onSubmitBookRecommendation}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="book-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Book Name
            </label>
            <div className="mt-2.5">
              <input
                onChange={(e) => setBookTitle(e.target.value)}
                value={bookTitle}
                type="text"
                name="book-name"
                id="book-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="author-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Author Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                onChange={(e) => setBookAuthor(e.target.value)}
                value={bookAuthor}
                name="author-name"
                id="author-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="genre"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Genre
            </label>
            <div className="mt-2.5">
              <input
                value={bookGenre}
                onChange={(e) => setBookGenre(e.target.value)}
                type="text"
                name="genre"
                id="genre"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      <div className="mt-16 flex gap-4 flex-wrap justify-between">
        {bookData ? (
          bookData.map((item, index) => (
            <div
              key={index}
              className="block min-w-[400px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {item.bookTitle}
              </h5>
              <p className="font-normal text-gray-700 ">{item.bookAuthor}</p>
              <p className="text-gray-500 font-light">{item.bookGenre}</p>
            </div>
          ))
        ) : (
          <p>ahaha</p>
        )}
      </div>
    </div>
  );
}
