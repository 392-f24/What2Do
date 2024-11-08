import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from './Card';
import { MapPin, Calendar, ArrowRight, Clock, Trash} from "lucide-react";

export function TripCard({ trip, tripId, rec, onDelete}) {
  const navigate = useNavigate();
  
  const gradient = useMemo(() => {
    const gradients = [
      'from-blue-500 to-purple-500',
      'from-green-400 to-blue-500',
      'from-pink-500 to-rose-500',
      'from-orange-400 to-pink-500',
      'from-indigo-500 to-blue-500'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }, [tripId]);

  const handleViewItinerary = () => {
    console.log('navigating...')
    navigate(`/summary/${tripId}`);
  };

  return (
    rec ? (
      <Card className="w-full min-w-80 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className={`h-20 bg-gradient-to-r ${gradient} p-6`}>
          <div className="flex items-start justify-between">
            <div className="bg-white/20 rounded-lg px-3 py-1 text-white text-sm font-medium">
              {trip.days} Days
            </div>
            <button onClick={onDelete}
             className="group rounded-md p-1 text-white hover:bg-white/20">
              <Trash className="w-4 h-4" />
          </button>
          </div>
        </div>
        <CardHeader className="pt-4">
          <CardTitle className="text-xl font-bold text-gray-900">
            {trip.tripName.length > 35 ? `${trip.tripName.slice(0, 35)}...` : trip.tripName}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{trip.days} Days of Adventure</span>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between pb-4">
          <button onClick={handleViewItinerary}
             className="group flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View Itinerary
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </CardFooter>
      </Card>
    ) : (
      <Card className="w-full min-w-80 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className={`h-32 bg-gradient-to-r ${gradient} p-6`}>
          <div className="flex items-start justify-between">
            <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm font-medium">
              {trip.days} Days
            </div>
            <button onClick={onDelete}
             className="group rounded-md p-1 text-white hover:bg-white/20">
              <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>
        <CardHeader className="pt-4">
          <CardTitle className="text-xl font-bold text-gray-900">
            {trip.tripName.length > 35 ? `${trip.tripName.slice(0, 35)}...` : trip.tripName}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{trip.days} Days Journey</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(trip.locations).slice(0, 2).map(([key, location]) => (
              <div key={key} className="flex items-start gap-3">
                <div className="mt-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Day {location.day}</h4>
                  <p className="text-sm text-gray-600">{location.destination}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between pb-4">
          <button onClick={handleViewItinerary}
             className="group flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View Full Itinerary
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </CardFooter>
      </Card>
    )
  );
}