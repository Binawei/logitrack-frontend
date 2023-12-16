import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

function Map({ currentLocationRef, otherLocationRef }) {
  const [currLocation, setCurrLocation] = useState({});
  const [directions, setDirections] = useState(null);
  const [otherLocationCoords, setOtherLocationCoords] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (currLocation.lat !== 0 && currLocation.lng !== 0 && otherLocationCoords) {
      requestDirections();
    }
  }, [currLocation, otherLocationCoords]);

  const mapContainerStyle = {
    width: '100%',
    height: '830px',
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrLocation({ lat: latitude, lng: longitude });


     
      const currentLocationText = currentLocationRef.current.textContent;
      const otherLocationText = otherLocationRef.current.textContent;

   
      geocodeAddress(currentLocationText).then((location) => {
        if (location) {
          
          setCurrLocation(location);
        }
      });

     
      geocodeAddress(otherLocationText).then((location) => {
        if (location) {
 
          setOtherLocationCoords(location);
        }
      });
    });
  };

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
      const data = await response.json();
      console.log("Google API Key:", process.env.REACT_APP_GOOGLE_API_KEY);

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('Geocoding failed');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const center = {
    lat: currLocation.lat,
    lng: currLocation.lng,
  };

  const requestDirections = () => {
    const directionsRequest = {
      origin: { lat: currLocation.lat, lng: currLocation.lng },
      destination: otherLocationCoords,
      travelMode: 'DRIVING',
    };

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(directionsRequest, (response, status) => {
      if (status === 'OK') {
        setDirections(response);
      } else {
        console.error('Directions request failed:', status);
      }
    });
  };

  return (
    <div className='map'>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={17}
        >
          
          <Marker position={center} label='' />
          {otherLocationCoords && <Marker position={otherLocationCoords} label='' />}
          {directions && <DirectionsRenderer directions={directions}/>}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;