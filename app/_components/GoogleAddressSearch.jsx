"use client";

import { MapPin } from 'lucide-react';
import React from 'react';
import dynamic from 'next/dynamic';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const GooglePlacesAutocomplete = dynamic(
  () => import('react-google-places-autocomplete'),
  { ssr: false }
);

function GoogleAddressSearch({ selectedAddress, setCoordinates }) {
  return (
    <div className='flex items-center w-full'>
      <MapPin className='h-10 w-10 p-2 rounded-l-lg text-primary bg-orange-200' />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: 'Search Property Address',
          isClearable: true,
          className: 'w-full',
          onChange: (place) => {
            selectedAddress(place);
            geocodeByAddress(place.label)
              .then(result => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                setCoordinates({ lat, lng });
              });
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;