import React, { useContext, useEffect, useState } from 'react';
import { MapPin, Clock, Phone, Globe, Star, Navigation, X } from 'lucide-react';
import axios from 'axios';
import { UserLocationContext } from '../context/userLocation';
import Spinner from '../components/Spinner';

const PetrolStationPopup = ({ onClose, onSelectedStation , getDistanceTime}) => {

    const { location } = useContext(UserLocationContext);

    const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST

    const [nearbyData, setNearbyData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchNearbyStations = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${VITE_LOCALHOST}/getNearbyStation`, {
                    params: location,
                });
                console.log(response.data);
                setNearbyData(response.data.data);
            } catch (err) {
                console.error("Error fetching stations:", err);
            } finally {
                setIsLoading(false)
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
                getDistanceTime(station.s_id)
                onSelectedStation(station.s_id)
                onClose()
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-gray-900 mb-1">{station.name}</h3>
                    <p className="text-sm text-gray-600 ">{station.address.length>45 ? station.address.slice(0,45)+'...' : station.address}</p>

                    <div className="flex items-center gap-1 ">
                        <span className="text-sm font-medium text-gray-700">{station.review}</span>
                        <div className="flex items-center gap-1">
                            {renderStars(station.review)}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-green-600" />
                        <p className='text-green-500 text-md'>Available</p>
                    </div>


                    <div className="flex items-center gap-2 text-sm text-gray-600 ">
                        <p>Distance</p>
                        <span>{station.distance} Km</span>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <Spinner
                style={"absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20"}
            />
        )
    }

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
                {nearbyData?.map((station) => (
                    <StationCard key={station.s_id} station={station} />
                ))}
            </div>
        </div>
    );
};

export default PetrolStationPopup;