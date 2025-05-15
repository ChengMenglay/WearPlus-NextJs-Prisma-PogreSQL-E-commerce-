import React from "react";
import Image from "next/image";

const Stationary = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-semibold text-center mb-2">
        Stationary stores
      </h1>

      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        We invite you to our stationary stores in Chroy Chongva and Chroy
        Chongva, where you can view and try on some of the products available in
        the online store. Our team of experts is here to help - we will find the
        right model or size.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Łódź Store */}
        <div className="flex flex-col">
          <div className="relative w-full h-64 mb-4">
            <Image
              src="/images/outside_store.webp"
              alt="Łódź Store"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-1">Chroy Chongva</h2>
              <p className="text-gray-600 mb-4">Street 241</p>
            </div>

            <div className="text-right">
              <p className="text-gray-600">MONDAY 11:00 - 19:00</p>
              <p className="text-gray-600">TUESDAY 11:00 - 19:00</p>
              <p className="text-gray-600">WEDNESDAY 11:00 - 19:00</p>
              <p className="text-gray-600">THURSDAY 11:00 - 19:00</p>
              <p className="text-gray-600">FRIDAY 11:00 - 19:00</p>
              <p className="text-gray-600">SATURDAY 12:00 - 20:00</p>
              <p className="text-gray-600">SUNDAY OUT OF ORDER</p>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/oeUxtH8vjPJN571a6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-black text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            SEE ON THE MAP
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </a>
        </div>

        {/* Gdańsk Store */}
        <div className="flex flex-col">
          <div className="relative w-full h-64 mb-4">
            <Image
              src="/images/inside_store.webp"
              alt="Gdańsk Store"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-1">Chroy Chongva</h2>
              <p className="text-gray-600 mb-4">Street 201</p>
            </div>

            <div className="text-right">
              <p className="text-gray-600">MONDAY 11:00 - 19:00</p>
              <p className="text-gray-600">TUESDAY 11:00 - 19:00</p>
              <p className="text-gray-600">WEDNESDAY 11:00 - 19:00</p>
              <p className="text-gray-600">THURSDAY 11:00 - 19:00</p>
              <p className="text-gray-600">FRIDAY 11:00 - 19:00</p>
              <p className="text-gray-600">SATURDAY 12:00 - 20:00</p>
              <p className="text-gray-600">SUNDAY OUT OF ORDER</p>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/oeUxtH8vjPJN571a6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-black text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            SEE ON THE MAP
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stationary;
