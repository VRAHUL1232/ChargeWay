import React, { useContext, useEffect, useState } from 'react';
import { MapPin, Clock, Phone, Globe, Star, Navigation, X } from 'lucide-react';
import axios from 'axios';
import { UserLocationContext } from '../context/userLocation';

const PetrolStationPopup = ({ onClose, onSelectedStation }) => {

    const { location, setLocationData } = useContext(UserLocationContext);

    const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST

    const petrolStations = [
        {
            id: 1,
            name: "Nayara petrol bunk",
            rating: 4.8,
            reviews: 9,
            address: "Petrol Pump • 14 Jaykrishna Nagar, SH 113",
            hours: "Open 24 hours",
            isOpen: true,
            phone: null,
            website: null,
            services: []
        },
        {
            id: 2,
            name: "Ponarasi Enterprise",
            rating: 4.3,
            reviews: 108,
            address: "Petrol Pump • Somangalam Road Junction / N.V.R.D",
            hours: "Open 24 hours",
            isOpen: true,
            phone: "022 2286 3900",
            website: null,
            services: []
        },
        {
            id: 3,
            name: "IndianOil",
            rating: 4.0,
            reviews: 42,
            address: "Petrol Pump • Lock 117O/121, SN 610/6A16A2, Kundrathur - Sriperumbudur Rd, near Nungambakkam",
            hours: "Open • Closes 10:30 pm",
            isOpen: true,
            phone: "098415 25205",
            website: "https://iocl.com",
            services: ["On-site services"]
        },
        {
            id: 4,
            name: "Essar Petrol Pump",
            rating: 3.7,
            reviews: 120,
            address: "Petrol Pump • X3G2+R8O",
            hours: "Open • Closes 5 pm",
            isOpen: true,
            phone: "1800 120 0330",
            website: null,
            services: []
        },
        {
            id: 5,
            name: "Bharat Petroleum, Petrol Pump - Venkateshwara Fuels",
            rating: 4.0,
            reviews: 118,
            address: "Petrol Pump • SRIPREUMPUR RD.,SIRUGALATH",
            hours: "Open • Closes 10:30 pm",
            isOpen: true,
            phone: null,
            website: null,
            services: []
        },
        {
            id: 6,
            name: "Shell Petrol Bunk",
            rating: 4.2,
            reviews: 101,
            address: "Petrol Pump • Main Road, Near City Center",
            hours: "Open • Closes 11 pm",
            isOpen: true,
            phone: "044 2345 6789",
            website: "https://shell.com",
            services: ["Car wash", "Convenience store"]
        }
    ];


    useEffect(() => {
        const fetchNearbyStations = async () => {
            try {
                const response = await axios.get(`${VITE_LOCALHOST}/getNearbyStation`, {
                    params: location,
                });
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching stations:", err);
            }
        };

        fetchNearbyStations();
    }, []);


    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400 text-yellow-400 opacity-50" />);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
        }

        return stars;
    };

    const StationCard = ({ station }) => (
        <div
            className="p-4 border-b-1 border-gray-300 cursor-pointer transition-colors hover:bg-gray-100"
            onClick={() => {
                onSelectedStation(station.id)
                onClose()
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-gray-900 mb-1">{station.name}</h3>
                    <p className="text-sm text-gray-600 ">{station.address}</p>

                    <div className="flex items-center gap-1 ">
                        <span className="text-sm font-medium text-gray-700">{station.rating}</span>
                        <div className="flex items-center gap-1">
                            {renderStars(station.rating)}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-green-600" />
                        <p className='text-green-500 text-md'>Available</p>
                    </div>

                    {station.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 ">
                            <Phone className="w-4 h-4" />
                            <span>{station.phone}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full w-full bg-white z-50 flex flex-col">
            <div className="bg-white">
                <div className="pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5  md:w-8 md:h-8 text-blue-600" />
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Nearby Charging Stations</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 md:w-8 md:h-8 text-red-700" />
                    </button>
                </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {petrolStations.map((station) => (
                    <StationCard key={station.id} station={station} />
                ))}
            </div>
        </div>
    );
};

export default PetrolStationPopup;