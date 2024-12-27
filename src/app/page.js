'use client'
import LongdoMap from "@/components/LondoMap";
import FunctionalTabs from "@/components/Tabs";
import { useRef, useState } from "react";


export default function Home() {
  const [markers, setMarkers] = useState([])
  const [geometries, setGeometries] = useState('')

  return (
    <>
      <div className="w-screen h-max">
        <LongdoMap 
        id="longdo-map" 
        mapKey="0e924cd81f0408d76704d07a36c35a6d" 
        markers={markers} 
        geometries={geometries} 
        />
      </div>
      <FunctionalTabs
      markers={markers} 
      setMarkers={setMarkers} 
      geometries={geometries} 
      setGeometries={setGeometries}
      />
    </>
  );
}
