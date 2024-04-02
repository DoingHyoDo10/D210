import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export  const GoogleMapsWrapper = ({children}) => {
  
  const apiKey = "AIzaSyA7cuC-dzEXgBRPgwQiQp_jBVRaZtphYK0";

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};