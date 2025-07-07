import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Spinner from '../components/Spinner';
import axiosInstance from '../middleware/axiosInstance';
import axios from 'axios';

const BookingSlots = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserId = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/getUserId`);
                if (response.status === 200) {
                    console.log(response.data.userId);
                    setUserId(response.data.userId)
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.post(`/getBookings/`,{
                    userId : localStorage.getItem("userId")
                });
                console.log(response.data)
                setBookings(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getUserId();
        fetchBookings();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <Spinner
                style={"absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20"}
            />
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
                            <p className="font-semibold">Error: {error}</p>
                            <button
                                onClick={fetchBookings}
                                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white p-6">
            <div className="w-full mx-auto ">

                {/* Bookings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings && bookings?.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-200 overflow-hidden"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 text-white">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg truncate">{booking.bid}</h3>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-3 space-y-2">
                                {/* Customer Info */}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <User className="w-4 h-4 text-green-600" />
                                    <span className="font-medium">{booking.book_date}</span>
                                </div>

                                {/* Date & Time */}
                                {/* <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4 text-green-600" />
                                    <span className="text-sm">{formatDate(booking.date)}</span>
                                </div> */}
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4 text-green-600" />
                                    <span className="text-sm">{booking.start_time} ()</span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-4 h-4 text-green-600" />
                                    <span className="text-sm">{booking.slots}</span>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-1 pt-2 border-t border-green-100">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="w-4 h-4 text-green-600" />
                                        <span className="text-sm">{booking.time_stamp}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4 text-green-600" />
                                        <span className="text-sm truncate">{booking.u_id}id</span>
                                    </div>
                                </div>

                                {/* Notes */}
                                {booking.notes && (
                                    <div className="pt-2 border-t border-green-100">
                                        <p className="text-sm text-gray-600 bg-green-50 p-2 rounded-md">
                                            {booking.end_time}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="px-3 pb-3">
                                <button
                                    onClick={() => handleViewDetails(booking.b_id)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {bookings.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-8 max-w-md mx-auto">
                            <Calendar className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings found</h3>
                            <p className="text-gray-600 mb-4">You don't have any scheduled appointments yet.</p>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                                Create New Booking
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingSlots;