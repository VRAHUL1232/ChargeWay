import { replace, useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../middleware/axiosInstance"
import React, { useContext, useEffect, useState } from 'react';
import { MapPin, Calendar, Clock, Minus, Plus, Zap, Check, Building, CheckCheck, XCircle, X } from 'lucide-react';
import axios from "axios";
import Spinner from "../components/Spinner";

export default function Booking() {
    const location = useLocation();
    // const bookingDetails = location.state.bookingDetails || ' ';
    // const bookingDetails = location.state.bookingData || ' ';
    const [bookingDetails, setBookingDetails] = useState({
        av_book_date: "",
        av_start_time: "",
        av_end_time: "",
        cost: 0,
        av_slots: 0,
        s_id: 0,
        name: '',
        address: ""
    });
    const { id } = useParams();
    const [slots, setSlots] = useState(1);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [error, setError] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST

    const subtotal = slots * bookingDetails.cost;
    const platformFee = Math.max(Math.round(subtotal * 0.02), 1)
    const total = subtotal + platformFee;

    const handleSlotChange = (increment) => {
        setSlots(prev => Math.max(1, Math.min(10, prev + increment)));
    };

    const FormattedDate = (isoDateStr) => {
        const date = new Date(isoDateStr);
        const ISTOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(date.getTime() + ISTOffset);
        return istDate.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        });
    }

    useEffect(() => {
        const getBookingData = async () => {
            try {
                setIsLoading2(true);
                const response = await axios.get(`${VITE_LOCALHOST}/getCurrentStation/${id}`);
                setBookingDetails(response.data.bookingData)
                console.log(response.data.bookingData.av_book_date, "response");
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading2(false);
            }
        }
        const getUserId = async () => {
            try {
                setIsLoading2(true)
                const response = await axiosInstance.get(`${VITE_LOCALHOST}/getUserId`);
                if (response.status === 200) {
                    console.log(response.data.userId);
                    setUserId(response.data.userId)
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading2(false)
            }
        }
        getBookingData();
        getUserId();
    }, []);

    const handleBooking = async () => {
        try {
            setIsLoading(true);
            const axiosRequest = new Promise((resolve, reject) => {
                try {
                    const response = axios.post(`${VITE_LOCALHOST}/bookSlot`,
                        {
                            userId: userId,
                            av_id: id,
                            userSlots: slots,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                    if (response.status === 408) {
                        const error = new Error(response.data.error);
                        reject(new error)
                    }
                    console.log(response, "response");
                    resolve(response)
                } catch (err) {
                    reject(new Error(err.message));
                }
            })
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), 20000)
            );

            const response = await Promise.race([axiosRequest, timeoutPromise]);

            console.log(response, "data from request");
            setIsLoading(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate("/dashboard", { replace: true });
            }, 3000);

        } catch (err) {
            setIsLoading(false);
            console.log(err, "error message");
            if (err.message === 'Request timed out') {
                setShowFailure(true);
                setError("Request timed out. Please try again.");
            } else if (err.response) {
                const error = err.response.data
                if (err.code === "ERR_BAD_REQUEST") {
                    setShowFailure(true)
                    setError("Booking Failed. " + error.error);
                } else {
                    setShowFailure(true)
                    setError("Booking failed. Check your internet connection.");
                }
            } else {
                setShowFailure(true);
                setError("Booking failed. Check your internet connection.");
            }

            setTimeout(() => {
                setShowFailure(false);
            }, 3000);
        }
    };

    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="animate-bounce mb-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                            <Check className="w-12 h-12 text-green-500 animate-pulse" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">
                        Booking Confirmed!
                    </h2>
                    <p className="text-green-100 text-lg animate-fade-in">
                        Your charging slot has been successfully reserved
                    </p>
                </div>
            </div>
        );
    }

    if (showFailure) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="mb-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                            <X className="w-12 h-12 text-red-500" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 ">
                        Booking Failed!
                    </h2>
                    <p className="text-red-100 text-lg">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col gap-6 items-center justify-center z-50">
                <div className="text-center">
                    <div className="w-20 h-20 border-8 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                </div>
                <div className="text-green-500 text-xl">
                    <h1>Processing...</h1>
                </div>
            </div>
        );
    }

    if (isLoading2) {
        return (
            <Spinner
                style={"absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20"}
            />
        )
    }

    return (
        <div className={`min-h-screen w-full sm:w-3/4 xl:w-1/2 flex flex-col justify-center m-auto px-4 py-4`}>
            {openConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-100 px-12" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 scale-100">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl text-center w-full font-bold text-gray-900">Confirm Booking</h3>
                            </div>

                            {/* Content */}
                            <div className="space-y-4 mb-6">
                                <div className="bg-green-50 rounded-lg p-4">
                                    <div className="flex items-center mb-2">
                                        <Building className="w-5 h-5 text-gray-600 mr-2" />
                                        <span className="font-semibold text-gray-900 text-md">Station Details</span>
                                    </div>
                                    <div className="flex-col gap-1 space-y-1">
                                        <p className="text-gray-700 font-medium text-md">
                                            {bookingDetails.name.split(" ").length > 8 ? bookingDetails.name.split(' ').slice(0, 8).join(" ") + '...' : bookingDetails.name}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-1 text-gray-600">
                                            <div className="flex flex-row items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span className="mr-3 text-md">{FormattedDate(bookingDetails.av_book_date)}</span>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span className="text-md">{bookingDetails.av_start_time.slice(0, 5) + ' - ' + bookingDetails.av_end_time.slice(0, 5)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4 text-md">
                                    <div className="flex items-center mb-2">
                                        <Zap className="w-5 h-5 text-blue-600 mr-2" />
                                        <span className="font-semibold text-gray-900 text-md">Booking Summary</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 text-md">Slots:</span>
                                            <span className="font-semibold text-gray-900 text-md" text-md>{slots}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 text-md">Total Amount:</span>
                                            <span className="font-bold text-green-600 text-md">₹{total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setOpenConfirm(false)}
                                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenConfirm(false);
                                        handleBooking();
                                    }}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg font-semibold  transform shadow-lg"
                                >
                                    <div className="flex items-center justify-center">
                                        <Check className="w-5 h-5 mr-2" />
                                        Confirm ₹{total}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={`p-6 space-y-6`}>
                {/* Station Information */}
                <div className={`flex flex-col justify-start items-start gap-4 bg-green-50 rounded-xl p-4`}>
                    <h2 className="font-bold text-lg text-gray-800 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-green-600" />
                        Station Details
                    </h2>

                    <div className="flex items-start">
                        <Building className="w-4 h-4 mr-2 text-green-600 mt-1 flex-shrink-0" />
                        <h3 className="font-semibold text-lg text-gray-900 ">{bookingDetails.name.split(" ").length > 15 ? bookingDetails.name.split(' ').slice(0, 15).join(" ") + '...' : bookingDetails.name}</h3>
                    </div>
                    <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 text-sm leading-relaxed">{bookingDetails.address.split(" ").length > 20 ? bookingDetails.address.split(' ').slice(0, 20).join(" ") + '...' : bookingDetails.address}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-start items-center">
                        <div className="flex flex-row items-center justify-center"><Calendar className="w-4 h-4 mr-1 text-green-600" />
                            <span className="text-gray-700">{FormattedDate(bookingDetails.av_book_date)}</span></div>
                        <div className="flex flex-row items-center justify-center"><Clock className="w-4 h-4 mr-1 text-green-600" />
                            <span className="text-gray-700">{bookingDetails.av_start_time.slice(0, 5) + ' - ' + bookingDetails.av_end_time.slice(0, 5)}</span></div>
                    </div>
                </div>

                {/* Bill Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <h2 className="font-bold text-lg text-gray-800 mb-4">Bill Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                                Cost Per Slot
                            </span>
                            <span className="text-lg sm:text-xl font-bold text-gray-800 text-center px-5">₹{bookingDetails.cost}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Platform Fee (2%)</span>
                            <span className="text-lg sm:text-xl font-bold text-gray-800 min-w-[3rem] text-center px-5">₹{platformFee}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Number of Slots</span>
                            <div className="flex items-center space-x-5">
                                <button
                                    onClick={() => handleSlotChange(-1)}
                                    disabled={slots <= 1}
                                    className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-lg sm:text-xl font-bold text-gray-800 text-center">
                                    {slots}
                                </span>
                                <button
                                    onClick={() => handleSlotChange(1)}
                                    disabled={slots >= bookingDetails.av_slots}
                                    className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                                <span className="text-lg sm:text-xl font-bold text-green-600">₹{total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Button */}
                <button
                    onClick={() => { setOpenConfirm(true) }}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <div className="flex items-center justify-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Book Charging Slot - ₹{total}
                    </div>
                </button>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By booking, you agree to our terms and conditions.
                </p>
            </div>
        </div>
    );
}