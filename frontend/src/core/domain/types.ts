export type RouteRecord = {
    id: number;
    routeId: string;
    vesselType: string;
    fuelType: string;
    year: number;
    ghgIntensity: number; // gCO2e/MJ
    fuelConsumption: number; // t
    distance: number; // km
    totalEmissions: number; // t
    isBaseline?: boolean;
  };
  
  export type ComparisonRow = {
    routeId: string;
    baselineIntensity: number;
    comparisonIntensity: number;
    percentDiff: number;
    compliant: boolean;
  };
  
  export type CBRecord = {
    shipId: string;
    year: number;
    cbGco2eq: number;
  };
  