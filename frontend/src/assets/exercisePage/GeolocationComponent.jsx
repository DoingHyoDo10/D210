import React, { useState } from 'react';

const GeolocationComponent = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setError(null);
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <button onClick={getLocation}>Get My Location</button>
            {latitude && longitude &&
                <p>Latitude: {latitude}, Longitude: {longitude}</p>
            }
            {error &&
                <p>Error: {error}</p>
            }
        </div>
    );
};

export default GeolocationComponent;