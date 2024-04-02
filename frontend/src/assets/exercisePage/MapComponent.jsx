
import { GoogleMapsWrapper } from "./GoogleMapsWrapper";
import { GoogleMaps } from "./GoogleMaps";

  
  export const MapComponent = ({location}) => (
    <GoogleMapsWrapper>
      <GoogleMaps location={location} />
    </GoogleMapsWrapper>
  );