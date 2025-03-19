import { useEffect, useState } from "react";
import carbonContext from "./carbonContext"

export const CarbonProvider = ({ children }) => {
  const [distance, setDistance] = useState(localStorage.getItem("distance") || "");
  const [transportType, setTransportType] = useState(localStorage.getItem("transportType") || "");
  const [carbonFootprint, setCarbonFootprint] = useState(localStorage.getItem("carbonFootprint") || 0);

  useEffect(() => {
      localStorage.setItem("distance", distance);
  }, [distance]);

  useEffect(() => {
      localStorage.setItem("transportType", transportType);
  }, [transportType]);

  useEffect(() => {
      localStorage.setItem("carbonFootprint", carbonFootprint);
  }, [carbonFootprint]);

    return (
      <carbonContext.Provider  value={{ distance, setDistance, transportType, setTransportType  , setCarbonFootprint , carbonFootprint}}>
        {children}
      </carbonContext.Provider>
    );
  };