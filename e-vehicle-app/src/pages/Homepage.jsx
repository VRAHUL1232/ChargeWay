import ev from "../assets/e-v-image.jpg";
import homeCharge from "../assets/home-charging.jpg";
import publicCharge from "../assets/public-charge.jpg";
import commercialCharge from "../assets/commercial-charge.jpg";
import carCharge from "../assets/car-charge.webp";
import tesla from "../assets/tesla.png";
import ola from "../assets/ola.png";
import amber from "../assets/amber.jpg";
import bmw from "../assets/bmw.jpg";
import tata from "../assets/tata.png";
import Header1 from "../components/Header1";
import Header4 from "../components/Header4";
import SecondaryButton from "../components/Secondarybutton";
import Header2 from "../components/Header2";
import Header3 from "../components/Header3";
import Tick from "../components/Tick";
import PrimaryButton from "../components/PrimaryButton";
import article1 from "../assets/article1.jpg";
import article2 from "../assets/article2.jpg";
import article3 from "../assets/article3.jpg";
import { Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  const redirectLogin = () => {
    navigate("/login");
  };

  const redirectSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white p-2 sm:p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-green-500`}
            >
              <span>ChargeWay</span>
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <SecondaryButton
              onClickFunction={redirectLogin}
              style={`hover:bg-green-600 text-white bg-green-500`}
            >
              Login
            </SecondaryButton>
            <SecondaryButton
              onClickFunction={redirectSignUp}
              style={`border border-green-500 hover:bg-gray-50 text-green-500`}
            >
              Sign Up
            </SecondaryButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto flex flex-col justify-between lg:flex-row items-center">
          <div className="w-full h-full px-4 mb-4 md:mb-8 lg:mb-0">
            <Header1 style={`text-black`}>
              <span className="text-green-500">EV-Charging points</span>
              <br />
              for your business
            </Header1>
            <Header4 style={`text-gray-600 mb-6`}>
              Offering sustainable charging solutions for electric vehicles to
              power the future of transportation.
            </Header4>
            <PrimaryButton
              onClickFunction={redirectLogin}
              style={`px-2 py-1 sm:px-6 sm:py-3 lg:px-9 lg:py-4 text-md lg:text-xl bg-green-500 hover:bg-green-600 text-white`}
            >
              Get Started
            </PrimaryButton>
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
            <Header2 style={`text-white`}>
              We are the leading developer and installer of
            </Header2>
            <Header3 style={`text-white font-semibold`}>
              reliable charging systems
            </Header3>
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
                      <Header3 style={`text-gray-800`}>Home charging</Header3>
                      <Header4 style={`text-gray-600 mb-4`}>
                        Convenient charging solutions for your home
                      </Header4>
                      <SecondaryButton
                        onClickFunction={redirectLogin}
                        style={`bg-green-500 hover:bg-green-600 text-white`}
                      >
                        Learn More
                      </SecondaryButton>
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
                      <Header3 style={`text-gray-800`}>Public stations</Header3>
                      <Header4 style={`text-gray-600 mb-4`}>
                        Accessible charging points for all EV users
                      </Header4>
                      <SecondaryButton
                        onClickFunction={redirectLogin}
                        style={`bg-green-500 hover:bg-green-600 text-white`}
                      >
                        Learn More
                      </SecondaryButton>
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
                      <Header3 style={`text-gray-800`}>
                        Commercial solutions
                      </Header3>
                      <Header4 style={`text-gray-600 mb-4`}>
                        Scalable systems with good infreastructure
                      </Header4>
                      <SecondaryButton
                        onClickFunction={redirectLogin}
                        style={`bg-green-500 hover:bg-green-600 text-white`}
                      >
                        Learn More
                      </SecondaryButton>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <Header2 style={`text-center mb-12`}>
            What advantages <span className="text-green-500">will you get</span>{" "}
            using an electric car?
          </Header2>
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full lg:w-3/5 px-4 mb-8 lg:mb-0">
              <div className="container mx-auto px-6 sm:p-0 grid grid-cols-1 sm:w-4/6 lg:w-full lg:grid-cols-2 gap-6">
                <div className="flex justify-start items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Tick />
                  </div>
                  <div>
                    <Header3>High Speed</Header3>
                    <Header4>Excellent acceleration and performance</Header4>
                  </div>
                </div>

                <div className="flex justify-start items-center ">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Tick />
                  </div>
                  <div>
                    <Header3> Quick installation</Header3>
                    <Header4>Fast and professional setup service</Header4>
                  </div>
                </div>

                <div className="flex justify-start items-center ">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Tick />
                  </div>
                  <div>
                    <Header3>Renewable energy</Header3>
                    <Header4>
                      Clean power sources for sustainable driving
                    </Header4>
                  </div>
                </div>

                <div className="flex justify-start items-center ">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Tick />
                  </div>
                  <div>
                    <Header3>Free support</Header3>
                    <Header4>24/7 customer service available</Header4>
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Tick />
                  </div>
                  <div>
                    <Header3> Save connections</Header3>
                    <Header4>Universal compatability across models</Header4>
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Tick />
                  </div>
                  <div>
                    <Header3> Mobile control</Header3>
                    <Header4>Manage charging via smartphone app</Header4>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 p-4 flex justify-center">
              <img
                src={carCharge}
                className="w-full rounded-sm min-h-70 lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <Header2 style={`mb-8 text-center`}>
            {" "}
            Compatible with vehicle brands
          </Header2>

          <div className="flex flex-wrap justify-around items-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <img src={tesla} className="w-10 h-10 sm:w-20 sm:h-20" />
              <Header4 style={`sm:text-lg mt-2`}>Tesla</Header4>
            </div>
            <div className="flex flex-col items-center">
              <img src={ola} className="w-10 h-10 sm:w-20 sm:h-20" />
              <Header4 style={`sm:text-lg mt-2`}>Ola</Header4>
            </div>
            <div className="flex flex-col items-center">
              <img src={amber} className="w-10 h-10 sm:w-20 sm:h-20" />
              <Header4 style={`sm:text-lg mt-2`}>Amber</Header4>
            </div>
            <div className="flex flex-col items-center">
              <img src={bmw} className="w-10 h-10 sm:w-20 sm:h-20" />
              <Header4 style={`sm:text-lg mt-2`}>BMW</Header4>
            </div>
            <div className="flex flex-col items-center">
              <img src={tata} className="w-10 h-10 sm:w-20 sm:h-20" />
              <Header4 style={`sm:text-lg mt-2`}>Tata</Header4>
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
                <Header1 style={`text-white`}> $260 millions</Header1>
                <Header4 style={`text-gray-300`}>
                  investments in charging infrastructure development
                </Header4>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="border-l-4 border-green-500 pl-4">
                <Header1 style={`text-white`}>1300 electric cars</Header1>
                <Header4 style={`text-gray-300`}>
                  charged daily through our global network
                </Header4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Header2 style={`text-black`}>Recent article and News</Header2>
          </div>

          <div className="w-full h-full relative">
            <div className="flex flex-wrap mb-4">
              {/* Using flex and h-full to ensure equal heights */}
              <div className="w-full lg:w-1/3 px-4 mb-8 flex">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col w-full">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={article1}
                      alt="Home charging"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div>
                      <Header3 style={`text-gray-800`}>
                        More than 1 in 4 cars sold worldwide this year is set to
                        be electric as EV sales continue to grow
                      </Header3>
                      <Header4 style={`text-gray-600 mb-4`}>
                        Following another year of robust growth, global sales of
                        electric cars are on track to surpass 20 million in
                        2025, accounting for over a quarter of cars sold
                        worldwide, according to the new edition of the IEA's
                        annual Global EV Outlook.
                      </Header4>
                    </div>
                    <div className="mt-auto">
                      <a
                        href="https://www.iea.org/news/more-than-1-in-4-cars-sold-worldwide-this-year-is-set-to-be-electric-as-ev-sales-continue-to-grow"
                        className="text-green-500 text-sm sm:text-lg"
                      >
                        {"Read more ->"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 px-4 mb-8 flex">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col w-full">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={article2}
                      alt="Public stations"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div>
                      <Header3 style={`text-gray-800`}>
                        This Electric Car Saved Its Owner Rs 18 Lakh In Fuel
                        Over 2 Years, Going Strong Even After 5,00,000 km
                      </Header3>
                      <Header4 style={`text-gray-600 mb-4`}>
                        As electric vehicle (EV) technology matures, real-world
                        stories are increasingly challenging long-held
                        apprehensions about battery life and long-distance
                        dependability. A striking example has emerged from South
                        Korea, where a Hyundai Ioniq 5 has clocked an
                        extraordinary 5.8 lakh kilometres.
                      </Header4>
                    </div>
                    <div className="mt-auto">
                      <a
                        href="https://www.news18.com/auto/this-electric-car-saved-its-owner-rs-18-lakh-in-fuel-over-2-years-going-strong-even-after-500000-km-ws-dkl-9324657.html"
                        className="text-green-500 text-sm sm:text-lg"
                      >
                        {"Read more ->"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3 px-4 mb-8 flex">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col w-full">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={article3}
                      alt="Commercial solutions"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div>
                      <Header3 style={`text-gray-800`}>
                        Enjoy zero cost mobility with EVs and rooftop solar
                        charging
                      </Header3>
                      <Header4 style={`text-gray-600 mb-4`}>
                        Increasing emphasis on rooftop solar energy generation
                        makes EVs fully green from well to wheel as they can be
                        convenient charged from the energy produced without any
                        use of fossil fuels while delivering the added benefits
                        of the zero carbon emission. This further lowers the
                        total cost of ownership of EVs.
                      </Header4>
                    </div>
                    <div className="mt-auto">
                      <a
                        href="https://timesofindia.indiatimes.com/auto/electric-cars/enjoy-zero-cost-mobility-with-evs-and-rooftop-solar-charging/articleshow/113844131.cms"
                        className="text-green-500 text-sm sm:text-lg"
                      >
                        {"Read more ->"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Footer section*/}
      <section className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="w-full h-full container mx-auto flex flex-wrap px-6 gap-4">
          <div className="w-full flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-xl sm:text-2xl xl:text-4xl font-bold text-green-500">
              ChargeWay
            </h1>
            <div className="flex flex-wrap justify-between gap-3 items-center">
              <Header4>About</Header4>
              <Header4>Products</Header4>
              <Header4>Community</Header4>
              <Header4>Contact</Header4>
              <Header4>Carriers</Header4>
            </div>
          </div>
          <div className="w-full flex flex-row  justify-center sm:justify-end gap-4">
            <Facebook className="text-gray-400" />
            <Instagram className="text-gray-400" />
            <Twitter className="text-gray-400" />
            <X className="text-gray-400" />
            <Linkedin className="text-gray-400" />
          </div>
          <div className="w-full flex flex-row justify-center">
            <Header4 style={`text-gray-400`}>
              &copy;2023 ChargeWay all rights reserved
            </Header4>
          </div>
        </div>
      </section>
    </div>
  );
}
