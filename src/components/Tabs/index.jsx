"use client";

import React, { useEffect, useState } from "react";

const FunctionalTabs = ({ markers, setMarkers, geometries, setGeometries}) => {
  // State for managing active tab and todos
  const [activeTab, setActiveTab] = useState("form");
  const [geoType, setGeoType] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLontitude] = useState("");
  const [markerName, setMarkerName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [pointLat, setPointLat] = useState("");
  const [pointLon, setPointLon] = useState("");
  // const [points, setPoints] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState("");
  const [points, setPoints] = useState([
    {
      lat: "",
      lon: "",
    },
  ]);
  const [properties, setProperties] = useState({
    title: "",
    detail: "",
    label: "",
    labelOptions: {
      font: "Sarabun", // Default Thai font
      size: 14,
      color: "rgba(0, 0, 0, 1)",
    },
    popup: "",
    visibleRange: {
      min: 7,
      max: 18,
    },
    lineWidth: 2,
    lineColor: "rgba(0, 0, 0, 1)",
    fillColor: "rgba(255, 0, 0, 0.4)",
    clickable: true,
    draggable: false,
    weight: "Top",
    rotate: 0,
  });
  // Geometries add function
  const handleAddGeometry = (type) => {
    setGeoType(type);
    // console.log('geotype', type)
    // console.log('markers', markers)
    if (type === "None") {
      setGeometries();
    }
    if (markers && markers.length !== 0) {
      const newGeometry = {
        id: Date.now(),
        position: markers,
        type: type,
        properties: {
          title: type,
          detail:'',
          label:'',
          labelOptions:'',
          popup:'',
          visibleRange:'',
          lineWidth:'',
          lineColor:'',
          fillColor:'',
          clickable:'',
          draggable:'',
          weight:'',
          rotate:'',
        },
      };

      setGeometries(newGeometry);
    }
  };

  // Marker add function
  const handleAddMarker = (e) => {
    e.preventDefault();
    if (!markerName.trim() || !latitude.trim() || !longtitude.trim()) {
      return;
    }

    const newMarker = {
      id: Date.now(),
      lat: latitude,
      lon: longtitude,
      properties: {
        title: markerName,
        detail:'',
        icon:{
          url:'',
          offset:'',
          html:'',
        },
        popup:{
          html:'',
        },
        visibleRange:'',
        clickable:'',
        draggable:'',
        weight:'',
        rotate:'',
      },
    };

    setMarkers([...markers, newMarker]);

    // Clear the input fields after submission
    setMarkerName("");
    setLatitude("");
    setLontitude("");
  };

  // Render Functional tabs
  const renderTabs = () => {
    const tabs = [
      { id: "marker", label: "Marker" },
      { id: "geo", label: "Geometries" },
      { id: "search", label: "Search" },
    ];

    return (
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 transition-colors duration-300 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  // Render Marker Add Form Tab
  const renderMarkerTab = () => {
    const geotype = [
      { id: "None", label: "None (ไม่มี)" },
      { id: "Polyline", label: "Polyline (เส้น)" },
      { id: "Polygon", label: "Polygon (รูปหลายเหลี่ยม)" },
      { id: "Circle", label: "Circle (วงกลม)" },
      { id: "Dot", label: "Dot (จุด)" },
      { id: "Donut", label: "Donut (รูปหลายเหลี่ยมแบบมีรู)" },
      { id: "Rectangle", label: "Rectangle (รูปสี่เหลี่ยม)" },
    ];
    return (
      <>
        {/* adding marker form */}
        <form
          onSubmit={handleAddMarker}
          className="space-y-4 flex flex-col justify-center items-start border rounded-md p-2 my-4"
        >
          <div className="flex flex-row justify-start items-center w-full gap-2 p-1">
            <label>Marker Name:</label>
            <input
              type="text"
              value={markerName}
              onChange={(e) => setMarkerName(e.target.value)}
              placeholder="Enter a Marker Name"
              className="w-1/3 p-2 border rounded"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full gap-2">
            <div className="flex flex-row justify-center items-center w-full gap-2 p-1">
              <label>Latitude:</label>
              <input
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter a Latitude"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex flex-row justify-center items-center w-full gap-2 p-1">
              <label>Longtitude:</label>
              <input
                type="number"
                value={longtitude}
                onChange={(e) => setLontitude(e.target.value)}
                placeholder="Enter a Longtitude"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Marker
          </button>
        </form>

        {/* show marker list */}
        <div className="p-2 my-2 rounded-md">
          <h2 className="text-xl font-bold mb-4">Marker List</h2>
          <div className="bg-white p-3 rounded shadow-md border mx-2 w-1/2">
            <p className="text-gray-600">Total Markers</p>
            <p className="text-2xl font-bold">{markers.length}</p>
          </div>
          {markers.length === 0 ? (
            <p className="text-gray-500 flex justify-between items-center p-2 rounded w-1/2 my-4 mx-2">
              No Marker yet. Add a Marker to get started!
            </p>
          ) : (
            <ul className="space-y-2">
              {markers.map((marker) => (
                <li
                  key={marker?.id}
                  className="flex justify-between items-center p-2 border rounded w-1/2 my-4 mx-2"
                >
                  <span className="flex flex-row items-center gap-2">
                    <h2 className="text-lg font-bold uppercase">
                      {marker?.properties?.title}
                    </h2>
                    <p className="text-slate-500">lat: {marker?.lat}</p>
                    <p className="text-slate-500">lon: {marker?.lon}</p>
                  </span>

                  <button
                    onClick={() =>
                      setMarkers(markers.filter((t) => t.id !== marker.id))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* gemetrics type */}
        {/* 
        //   .filter with the markers length for avai geotype
         */}
        <div className="flex mb-4 border p-2 rounded-md">
          {geotype.map((geotype) => (
            <button
              key={geotype.id}
              onClick={() => handleAddGeometry(geotype.id)}
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                geoType === geotype.id
                  ? "border-2 border-blue-500 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {geotype.label}
            </button>
          ))}
        </div>
      </>
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  
    if (!keyword.trim()) {
      alert("Please enter a keyword to search.");
      return;
    }
  
    const searchData = {
      keyword,
      option,
    };
  
    console.log("Search Data:", searchData);
  
    // Clear input fields after submission
    setKeyword("");
    setOption("");
  };
  

  // Render Geometries Tab ** return function with {return}
  // const renderGeoTab = () => {
  //   // State for managing area name and points

  
  //   // Function to add a point
  //   const handleAddPoint = (e) => {
  //     e.preventDefault();
  
  //     if (!pointLat.trim() || !pointLon.trim()) {
  //       alert("Please enter both latitude and longitude.");
  //       return;
  //     }
  
  //     const newPoint = {
  //       id: Date.now(),
  //       lat: parseFloat(pointLat),
  //       lon: parseFloat(pointLon),
  //     };
  
  //     setPoints([...points, newPoint]);
  
  //     // Clear the input fields after adding a point
  //     setPointLat("");
  //     setPointLon("");
  //   };
  
  //   // Function to handle geometry submission
  //   // const handleAddArea = () => {
  //   //   if (!areaName.trim()) {
  //   //     alert("Please enter an area name.");
  //   //     return;
  //   //   }
  
  //   //   if (points.length === 0) {
  //   //     alert("Please add at least one point to create an area.");
  //   //     return;
  //   //   }
  
  //   //   const newGeometry = {
  //   //     id: Date.now(),
  //   //     name: areaName,
  //   //     points: points,
  //   //     type: "Polygon", // Assuming we are creating a polygon
  //   //   };
  
  //   //   setGeometries(newGeometry);
  
  //   //   // Reset form fields after submission
  //   //   setAreaName("");
  //   //   setPoints([]);
  //   // };

  //   const handleAddArea = () => {
  //     if (!areaName.trim()) {
  //       alert("Please enter an area name.");
  //       return;
  //     }
    
  //     if (points.length < 3) {
  //       alert("A polygon requires at least three points.");
  //       return;
  //     }
    
  //     // Prepare polygon data
  //     const polygonData = {
  //       coordinates: points.map((point) => ({ lon: point.lon, lat: point.lat })),
  //       options: {
  //         title: areaName, // Popup title
  //         detail: "-", // Popup detail
  //         label: areaName, // Show label
  //         lineWidth: 2,
  //         lineColor: "rgba(0, 0, 0, 1)",
  //         fillColor: "rgba(255, 0, 0, 0.4)",
  //         visibleRange: { min: 7, max: 18 },
  //         editable: true,
  //         weight: longdo.OverlayWeight.Top,
  //       },
  //     };
    
  //     // Pass polygonData to LongdoMap component
  //     setGeometries(polygonData);
    
  //     // Reset form fields
  //     setAreaName("");
  //     setPoints([]);
  //   };
    
  
  //   return (
  //     <>
  //       <form className="space-y-4 border rounded-md p-4 my-4">
  //         <div className="flex flex-col gap-2">
  //           <label className="font-semibold">Area Name:</label>
  //           <input
  //             type="text"
  //             value={areaName}
  //             onChange={(e) => setAreaName(e.target.value)}
  //             placeholder="Enter area name"
  //             className="w-full p-2 border rounded"
  //           />
  //         </div>
  
  //         <div className="flex flex-row gap-4">
  //           <div className="flex flex-col w-1/2">
  //             <label className="font-semibold">Latitude:</label>
  //             <input
  //               type="number"
  //               value={pointLat}
  //               onChange={(e) => setPointLat(e.target.value)}
  //               placeholder="Enter latitude"
  //               className="w-full p-2 border rounded"
  //             />
  //           </div>
  
  //           <div className="flex flex-col w-1/2">
  //             <label className="font-semibold">Longitude:</label>
  //             <input
  //               type="number"
  //               value={pointLon}
  //               onChange={(e) => setPointLon(e.target.value)}
  //               placeholder="Enter longitude"
  //               className="w-full p-2 border rounded"
  //             />
  //           </div>
  //         </div>
  
  //         <button
  //           onClick={handleAddPoint}
  //           className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
  //         >
  //           Add Point
  //         </button>
  
  //         {/* Display added points */}
  //         {points.length > 0 && (
  //           <div className="my-4">
  //             <h2 className="text-lg font-bold mb-2">Points List</h2>
  //             <ul className="space-y-2">
  //               {points.map((point, index) => (
  //                 <li
  //                   key={point.id}
  //                   className="flex justify-between items-center p-2 border rounded"
  //                 >
  //                   <span className="font-semibold">
  //                     Point {index + 1}: Lat {point.lat}, Lon {point.lon}
  //                   </span>
  //                   <button
  //                     onClick={() =>
  //                       setPoints(points.filter((p) => p.id !== point.id))
  //                     }
  //                     className="text-red-500 hover:text-red-700"
  //                   >
  //                     Delete
  //                   </button>
  //                 </li>
  //               ))}
  //             </ul>
  //           </div>
  //         )}
  
  // <div className="">
  //         <h1>Properties</h1>
  //         <div className="border-t pt-6">
  //           <h2 className="text-lg font-bold mb-4">Properties</h2>

  //           <div className="space-y-4">
  //             <div className="grid grid-cols-2 gap-4">
  //               <div className="flex flex-col gap-2">
  //                 <label className="font-medium">Detail</label>
  //                 <input
  //                   type="text"
  //                   value={properties.detail}
  //                   onChange={(e) =>
  //                     handlePropertyChange("detail", e.target.value)
  //                   }
  //                   placeholder="Enter detail"
  //                   className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                 />
  //               </div>

  //               <div className="flex flex-col gap-2">
  //                 <label className="font-medium">Label</label>
  //                 <input
  //                   type="text"
  //                   value={properties.label}
  //                   onChange={(e) =>
  //                     handlePropertyChange("label", e.target.value)
  //                   }
  //                   placeholder="Enter label"
  //                   className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                 />
  //               </div>

  //               <div className="flex flex-col gap-2">
  //                 <label className="font-medium">Line Width</label>
  //                 <input
  //                   type="number"
  //                   value={properties.lineWidth}
  //                   onChange={(e) =>
  //                     handlePropertyChange("lineWidth", Number(e.target.value))
  //                   }
  //                   min="1"
  //                   max="10"
  //                   className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                 />
  //               </div>

  //               <div className="flex flex-col gap-2">
  //                 <label className="font-medium">Line Color</label>
  //                 <div className="flex gap-2">
  //                   <input
  //                     type="color"
  //                     value={properties.lineColor.replace(/[^#\d]/g, "#000")}
  //                     onChange={(e) =>
  //                       handlePropertyChange("lineColor", e.target.value)
  //                     }
  //                     className="w-12 h-10 border rounded"
  //                   />
  //                   <input
  //                     type="text"
  //                     value={properties.lineColor}
  //                     onChange={(e) =>
  //                       handlePropertyChange("lineColor", e.target.value)
  //                     }
  //                     placeholder="rgba(0, 0, 0, 1)"
  //                     className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                   />
  //                 </div>
  //               </div>

  //               <div className="flex flex-col gap-2">
  //                 <label className="font-medium">Fill Color</label>
  //                 <div className="flex gap-2">
  //                   <input
  //                     type="color"
  //                     value={properties.fillColor.replace(/[^#\d]/g, "#f00")}
  //                     onChange={(e) =>
  //                       handlePropertyChange("fillColor", e.target.value)
  //                     }
  //                     className="w-12 h-10 border rounded"
  //                   />
  //                   <input
  //                     type="text"
  //                     value={properties.fillColor}
  //                     onChange={(e) =>
  //                       handlePropertyChange("fillColor", e.target.value)
  //                     }
  //                     placeholder="rgba(255, 0, 0, 0.4)"
  //                     className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                   />
  //                 </div>
  //               </div>

  //               <div className="flex flex-col gap-2">
  //                 <label className="font-medium">Visible Range</label>
  //                 <div className="flex gap-2">
  //                   <input
  //                     type="number"
  //                     value={properties.visibleRange.min}
  //                     onChange={(e) =>
  //                       handleNestedPropertyChange(
  //                         "visibleRange",
  //                         "min",
  //                         Number(e.target.value)
  //                       )
  //                     }
  //                     placeholder="Min"
  //                     className="w-1/2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                   />
  //                   <input
  //                     type="number"
  //                     value={properties.visibleRange.max}
  //                     onChange={(e) =>
  //                       handleNestedPropertyChange(
  //                         "visibleRange",
  //                         "max",
  //                         Number(e.target.value)
  //                       )
  //                     }
  //                     placeholder="Max"
  //                     className="w-1/2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="flex gap-4">
  //               <div className="flex items-center gap-2">
  //                 <input
  //                   type="checkbox"
  //                   checked={properties.clickable}
  //                   onChange={(e) =>
  //                     handlePropertyChange("clickable", e.target.checked)
  //                   }
  //                   className="w-4 h-4 rounded border-gray-300"
  //                 />
  //                 <label>Clickable</label>
  //               </div>

  //               <div className="flex items-center gap-2">
  //                 <input
  //                   type="checkbox"
  //                   checked={properties.draggable}
  //                   onChange={(e) =>
  //                     handlePropertyChange("draggable", e.target.checked)
  //                   }
  //                   className="w-4 h-4 rounded border-gray-300"
  //                 />
  //                 <label>Draggable</label>
  //               </div>
  //             </div>

  //             <div className="flex flex-col gap-2">
  //               <label className="font-medium">Label Options</label>
  //               <div className="grid grid-cols-3 gap-4">
  //                 <input
  //                   type="text"
  //                   value={properties.labelOptions.font}
  //                   onChange={(e) =>
  //                     handleNestedPropertyChange(
  //                       "labelOptions",
  //                       "font",
  //                       e.target.value
  //                     )
  //                   }
  //                   placeholder="Font family"
  //                   className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                 />
  //                 <input
  //                   type="number"
  //                   value={properties.labelOptions.size}
  //                   onChange={(e) =>
  //                     handleNestedPropertyChange(
  //                       "labelOptions",
  //                       "size",
  //                       Number(e.target.value)
  //                     )
  //                   }
  //                   placeholder="Font size"
  //                   className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                 />
  //                 <input
  //                   type="text"
  //                   value={properties.labelOptions.color}
  //                   onChange={(e) =>
  //                     handleNestedPropertyChange(
  //                       "labelOptions",
  //                       "color",
  //                       e.target.value
  //                     )
  //                   }
  //                   placeholder="Font color"
  //                   className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //         <button
  //           type="button"
  //           onClick={handleAddArea}
  //           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
  //         >
  //           Create Geometry
  //         </button>
  //       </form>
  //     </>
  //   );
  // };
  
  const renderGeoTab = () => {

    const handleAddPoint = () => {
      if (points.some((point) => point.lat === "" || point.lon === "")) {
        return alert(
          "Please fill in all latitude and longitude fields before adding a new point."
        );
      }
  
      setPoints([...points, { lat: "", lon: "" }]);
    };
  
    const handleChange = (index, key, value) => {
      const updatedPoints = [...points];
      updatedPoints[index][key] = value;
      setPoints(updatedPoints);
    };
  
    const handleDeletePoint = (index) => {
      if (points.length === 1) {
        return alert("You must have at least one point.");
      }
      const updatedPoints = points.filter((_, i) => i !== index);
      setPoints(updatedPoints);
    };
  
    const handlePasteFromClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        const [lat, lon] = text.split(",").map((value) => value.trim());
        if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
          alert(
            "Invalid coordinates in clipboard. Please copy in the format: lat,lon"
          );
          return;
        }
  
        const updatedPoints = [...points];
        const lastPointIndex = updatedPoints.length - 1;
  
        updatedPoints[lastPointIndex] = {
          lat: parseFloat(lat),
          lon: parseFloat(lon),
        };
  
        setPoints(updatedPoints);
      } catch (err) {
        alert(
          "Failed to read clipboard data. Please check clipboard permissions."
        );
      }
    };
  
    const handlePropertyChange = (key, value) => {
      setProperties(prev => ({
        ...prev,
        [key]: value
      }));
    };
  
    const handleNestedPropertyChange = (parent, key, value) => {
      setProperties(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [key]: value
        }
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!areaName.trim()) {
        return alert("Area name is required.");
      }
  
      if (
        points.length < 3 ||
        points.some((point) => point.lat === "" || point.lon === "")
      ) {
        return alert("At least three valid points are required.");
      }
  
      // Submit the form values
      const newGeometry = {
        id: Date.now(),
        points: points,
        type: "Polygon",
        properties: properties,
      };
      setGeometries(newGeometry)
      console.log('newGeometry', newGeometry)
      alert("Area created successfully!");
  
      // Reset the form
      setAreaName("");
      setPoints([{ lat: "", lon: "" }]);
    };
  
    return (
      <div className="w-full mx-auto p-4 border rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Area Name:</label>
            <input
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="Enter area name"
              className="w-full p-2 border rounded"
            />
          </div>
  
          <div className="my-4">
            <h2 className="text-lg font-bold mb-2">Points</h2>
            {points.map((point, index) => (
              <div key={index} className="flex flex-col gap-2 mb-4">
                <label className="font-semibold">{`Point ${index + 1}`}</label>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col w-1/2">
                    <label>Latitude:</label>
                    <input
                      type="number"
                      value={point.lat}
                      onChange={(e) => handleChange(index, "lat", e.target.value)}
                      placeholder="Enter latitude"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label>Longitude:</label>
                    <input
                      type="number"
                      value={point.lon}
                      onChange={(e) => handleChange(index, "lon", e.target.value)}
                      placeholder="Enter longitude"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {index === points.length - 1 && (
                    <button
                      type="button"
                      onClick={handlePasteFromClipboard}
                      className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Paste
                    </button>
                  )}
                  {!index <= 1 ?? (
                    <button
                      type="button"
                      onClick={() => handleDeletePoint(index)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
  
            <button
              type="button"
              onClick={handleAddPoint}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Add Point
            </button>
          </div>
  
          <div className="">
            <h1>Properties</h1>
            <div className="border-t pt-6">
              <h2 className="text-lg font-bold mb-4">Properties</h2>
  
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Detail</label>
                    <input
                      type="text"
                      value={properties.detail}
                      onChange={(e) =>
                        handlePropertyChange("detail", e.target.value)
                      }
                      placeholder="Enter detail"
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
  
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Label</label>
                    <input
                      type="text"
                      value={properties.label}
                      onChange={(e) =>
                        handlePropertyChange("label", e.target.value)
                      }
                      placeholder="Enter label"
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
  
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Line Width</label>
                    <input
                      type="number"
                      value={properties.lineWidth}
                      onChange={(e) =>
                        handlePropertyChange("lineWidth", Number(e.target.value))
                      }
                      min="1"
                      max="10"
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
  
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Line Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={properties.lineColor.replace(/[^#\d]/g, "#000")}
                        onChange={(e) =>
                          handlePropertyChange("lineColor", e.target.value)
                        }
                        className="w-12 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={properties.lineColor}
                        onChange={(e) =>
                          handlePropertyChange("lineColor", e.target.value)
                        }
                        placeholder="rgba(0, 0, 0, 1)"
                        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
  
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Fill Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={properties.fillColor.replace(/[^#\d]/g, "#f00")}
                        onChange={(e) =>
                          handlePropertyChange("fillColor", e.target.value)
                        }
                        className="w-12 h-10 border rounded"
                      />
                      <input
                        type="text"
                        value={properties.fillColor}
                        onChange={(e) =>
                          handlePropertyChange("fillColor", e.target.value)
                        }
                        placeholder="rgba(255, 0, 0, 0.4)"
                        className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
  
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Visible Range</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={properties.visibleRange.min}
                        onChange={(e) =>
                          handleNestedPropertyChange(
                            "visibleRange",
                            "min",
                            Number(e.target.value)
                          )
                        }
                        placeholder="Min"
                        className="w-1/2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        value={properties.visibleRange.max}
                        onChange={(e) =>
                          handleNestedPropertyChange(
                            "visibleRange",
                            "max",
                            Number(e.target.value)
                          )
                        }
                        placeholder="Max"
                        className="w-1/2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
  
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={properties.clickable}
                      onChange={(e) =>
                        handlePropertyChange("clickable", e.target.checked)
                      }
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <label>Clickable</label>
                  </div>
  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={properties.draggable}
                      onChange={(e) =>
                        handlePropertyChange("draggable", e.target.checked)
                      }
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <label>Draggable</label>
                  </div>
                </div>
  
                <div className="flex flex-col gap-2">
                  <label className="font-medium">Label Options</label>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={properties.labelOptions.font}
                      onChange={(e) =>
                        handleNestedPropertyChange(
                          "labelOptions",
                          "font",
                          e.target.value
                        )
                      }
                      placeholder="Font family"
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      value={properties.labelOptions.size}
                      onChange={(e) =>
                        handleNestedPropertyChange(
                          "labelOptions",
                          "size",
                          Number(e.target.value)
                        )
                      }
                      placeholder="Font size"
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={properties.labelOptions.color}
                      onChange={(e) =>
                        handleNestedPropertyChange(
                          "labelOptions",
                          "color",
                          e.target.value
                        )
                      }
                      placeholder="Font color"
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create Area
          </button>
        </form>
      </div>
    );
  };

  // Render Geometries Tab return hmtl with ()
  //   const renderGeoTab = () => (
  //     <>
  //       <p>{geoType}</p>
  //     </>
  //   );

  // Render Statistics Tab
  const renderSearchTab = () => (
    <>
    </>
  );

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "marker":
        return renderMarkerTab();
      case "geo":
        return renderGeoTab();
      case "search":
        return renderSearchTab();
      default:
        return renderMarkerTab();
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-6  rounded-lg shadow-md">
      {renderTabs()}
      {renderTabContent()}
    </div>
  );
};

export default FunctionalTabs;
