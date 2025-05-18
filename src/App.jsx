import ev from "./assets/e-v-image.jpg";
import homeCharge from "./assets/home-charging.jpg";
import publicCharge from "./assets/public-charge.jpg";
import commercialCharge from "./assets/commercial-charge.jpg";
import carCharge from "./assets/car-charge.webp";
import tesla from './assets/tesla.png';
import ola from './assets/ola.png';
import amber from './assets/amber.jpg';
import bmw from './assets/bmw.jpg';
import tata from './assets/tata.png';
export default function EFuelHomepage() {

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl text-green-500 sm:text-4xl font-bold">ChargeWay</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 lg:px-3 lg:py-2 rounded">
              Login
            </button>
            <button className="border border-green-500 hover:bg-gray-50 px-2 py-1 text-green-500 lg:px-3 lg:py-2 rounded">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto flex flex-col justify-between lg:flex-row items-center">
          <div className="w-full h-full px-4 mb-4 md:mb-8 lg:mb-0">
            <h1 className="text-xl sm:text-4xl font-bold mb-4 text-gray-800">
              <span className="text-green-500">EV-Charging points</span>
              <br />
              for your business
            </h1>
            <p className="text-gray-600 mb-6">
              Offering sustainable charging solutions for electric vehicles to
              power the future of transportation.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white lg:text-xl px-2 py-1 sm:px-6 sm:py-3 lg:px-9 lg:py-4 rounded font-medium">
              Get Started
            </button>
          </div>
          <div className="container p-4">
            <img className="w-full h-full rounded-sm" src={ev} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-3xl font-bold mb-4">
              We are the leading developer and installer of
            </h2>
            <p className="text-xl">reliable charging systems</p>
          </div>

          <div className="relative">
            <div className="flex flex-wrap mb-4">
                <>
                  <div className="w-full h-full container mx-auto lg:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={homeCharge}
                        alt="Home charging"
                        className="w-full h-50 object-cover sm:h-80 lg:h-50"
                      />
                      <div className="p-6">
                        <h3 className="text-gray-800 text-xl font-bold mb-2">
                          Home charging
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Convenient charging solutions for your home
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-full container mx-auto lg:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={publicCharge}
                        alt="Public stations"
                        className="w-full h-50 object-cover sm:h-80 lg:h-50"
                      />
                      <div className="p-6">
                        <h3 className="text-gray-800 text-xl font-bold mb-2">
                          Public stations
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Accessible charging points for all EV users
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-full container mx-auto lg:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={commercialCharge}
                        alt="Commercial solutions"
                        className="w-full h-50 object-cover sm:h-80 lg:h-50"
                      />
                      <div className="p-6">
                        <h3 className="text-gray-800 text-xl font-bold mb-2">
                          Commercial solutions
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Scalable systems with good infreastructure
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                </>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className=" text-xl sm:text-3xl font-bold text-center mb-12">
            What advantages <span className="text-green-500">will you get</span>{" "}
            using an electric car?
          </h2>

          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full lg:w-3/5 px-4 mb-8 lg:mb-0">
              <div className="container mx-auto px-6 sm:p-0 grid grid-cols-1 sm:w-4/6 lg:w-full lg:grid-cols-2 gap-6">
                <div className="flex justify-start items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-md sm:text-lg mb-1 text-gray-800">
                      High speeds
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Excellent acceleration and performance
                    </p>
                  </div>
                </div>

                <div className="flex justify-start items-center ">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-md sm:text-lg mb-1 text-gray-800">
                      Quick installation
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Fast and professional setup service
                    </p>
                  </div>
                </div>

                <div className="flex justify-start items-center ">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-md sm:text-lg mb-1 text-gray-800">
                      Renewable energy
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Clean power sources for sustainable driving
                    </p>
                  </div>
                </div>

                <div className="flex justify-start items-center ">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-md sm:text-lg mb-1 text-gray-800">
                      Free support
                    </h3>
                    <p className="text-gray-600 text-sm">
                      24/7 customer service available
                    </p>
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-md sm:text-lg mb-1 text-gray-800">
                      Save connections
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Universal compatability across models
                    </p>
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-md sm:text-lg mb-1 text-gray-800">
                      Mobile control
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Manage charging via smartphone app
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 p-4 flex justify-center">
              <img src={carCharge} className="w-full rounded-sm min-h-70 lg:h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-3xl font-bold text-center mb-12">
            Compatible with vehicle brands
          </h2>

          <div className="flex flex-wrap justify-around items-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <img src={tesla} className="w-10 h-10 sm:w-20 sm:h-20" />
              <span className="mt-2 text-sm sm:text-lg">Tesla</span>
            </div>
            <div className="flex flex-col items-center">
             <img src={ola}className="w-10 h-10 sm:w-20 sm:h-20"/>
              <span className="mt-2 text-sm sm:text-lg">Ola</span>
            </div>
            <div className="flex flex-col items-center">
             <img src={amber}className="w-10 h-10 sm:w-20 sm:h-20"/>
              <span className="mt-2 text-sm sm:text-lg">Amber</span>
            </div>
            <div className="flex flex-col items-center">
             <img src={bmw}className="w-10 h-10 sm:w-20 sm:h-20"/>
              <span className="mt-2 text-sm sm:text-lg">BMW</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={tata}className="w-10 h-10 sm:w-20 sm:h-20"/>
              <span className="mt-2 text-sm sm:text-lg">Tata</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl sm:text-4xl font-bold mb-2">$260 millions</h3>
                <p className="text-gray-300">
                  investments in charging infrastructure development
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl sm:text-4xl font-bold mb-2">1300 electric cars</h3>
                <p className="text-gray-300">
                  charged daily through our global network
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 text-black">
             Recent article and News
            </h2>
          </div>

          <div className="relative">
            <div className="flex flex-wrap mb-4">
                <>
                  <div className="w-full h-full container mx-auto lg:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={homeCharge}
                        alt="Home charging"
                        className="w-full h-50 object-cover sm:h-80 lg:h-50"
                      />
                      <div className="p-6">
                        <h3 className="text-gray-800 text-xl font-bold mb-2">
                          Home charging
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Convenient charging solutions for your home
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-full container mx-auto lg:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={publicCharge}
                        alt="Public stations"
                        className="w-full h-50 object-cover sm:h-80 lg:h-50"
                      />
                      <div className="p-6">
                        <h3 className="text-gray-800 text-xl font-bold mb-2">
                          Public stations
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Accessible charging points for all EV users
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-full container mx-auto lg:w-1/3 px-4 mb-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={commercialCharge}
                        alt="Commercial solutions"
                        className="w-full h-50 object-cover sm:h-80 lg:h-50"
                      />
                      <div className="p-6">
                        <h3 className="text-gray-800 text-xl font-bold mb-2">
                          Commercial solutions
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Scalable systems with good infreastructure
                        </p>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                </>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
