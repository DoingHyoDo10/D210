export const addSingleMarkers = ({
    location,
    map,
  }) =>
    {
      const LOCATION = location ? [location] : [{ lat: 36.110336, lng: 128.4112384 }];

// LOCATIONS 배열의 각 위치에 대해 Marker를 생성하여 반환
return LOCATION.map(position => new google.maps.Marker({
  position,
  map,
}));
    }