"use client";

import { useEffect, useRef, useState } from "react";

let longdo;
let map;

const LongdoMap = ({ id, mapKey, callback, markers, geometries }) => {
  const mapRef = useRef(null); // Reference to the map container
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadLongdoScript = () => {
      const existingScript = document.getElementById("longdoMapScript");

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://api.longdo.com/map/?key=${mapKey}`;
        script.id = "longdoMapScript";
        document.body.appendChild(script);

        script.onload = () => {
          initializeMap();
          if (callback) callback();
        };
      } else {
        initializeMap();
        if (callback) callback();
      }
    };

    const initializeMap = () => {
      longdo = window.longdo;
      map = new window.longdo.Map({
        placeholder: mapRef.current,
        language: "en",
      });

      addMarkers();
      doGeometries();

      // right click to copy lat long
      map.Event.bind("beforeContextmenu", function (event) {
        var element = document.createElement("div");
        element.innerHTML = "Copy Position";
        element.style.cursor = "pointer";
        element.onclick = async function () {
          map.Ui.ContextMenu.visible(false);
          const lat = event.location.lat;
          const lon = event.location.lon;

          // Copy coordinates to clipboard
          const coordinates = `${lat},${lon}`;
          navigator.clipboard.writeText(coordinates);
          const clipboardData = await navigator.clipboard.readText();
          console.log("Retrieved clipboard data:", clipboardData);
          alert("Copied Position");
        };
        event.add(element);
      });

      //variables
      const result = document.getElementById("result");
      const search = document.getElementById("search");
      const suggest = document.getElementById("suggest");
      map.Search.placeholder(result);

      //search function
      search.onkeyup = function (e) {
        if ((e || window.e).key != 13) return;
        doSearch();
      };

      //suggest function
      map.Event.bind("suggest", (result) => {
        // Check if the result matches the current search value
        if (result.meta.keyword !== search.value) return;

        // Clear previous suggestions
        suggest.innerHTML = "";

        // Populate suggestions
        result.data.forEach((item) => {
          const link = document.createElement("a");
          link.innerHTML = item.d; // Display text
          link.href = "javascript:void(0);"; // Prevent default navigation
          link.style.display = "block"; // Ensure suggestions are visible
          link.style.padding = "5px"; // Add padding for better UX
          link.style.cursor = "pointer"; // Change cursor style for better UX

          // Attach click event to suggestion
          link.onclick = () => {
            // search.value = item.w; // Set the search input value
            // suggest.style.display = "none"; // Hide the suggestion box
            // setQuery(search.value)
            // doSearch(); // Trigger the search

            search.value = item.w; // Update the search input value
            setQuery(item.w); // Update the state
            suggest.style.display = "none"; // Hide the suggestions
            doSearch(item.w);
          };

          // Append the link to the suggestion box
          suggest.appendChild(link);
        });

        // Show suggestions
        suggest.style.display = "block";
      });

      search.oninput = () => {
        if (search.value.length < 3) {
          suggest.style.display = "none"; // Hide suggestions if input is too short
          result.style.display = "none"; // Hide suggestions if input is too short
          return;
        }

        // Fetch and display suggestions
        map.Search.suggest(search.value, {
          limit: 10, // Adjust the number of suggestions
        });
      };

    };

    loadLongdoScript();
  }, [mapKey, callback, markers, geometries]); // Dependencies ensure the script only loads when mapKey or callback changes

  const addMarkers = () => {
    markers.forEach(({ lon, lat, properties = {} }) => {
      const marker = new longdo.Marker(
        { lon: parseFloat(lon), lat: parseFloat(lat) },
        {
          title: properties.title || "Marker",
          icon: {
            url: "https://map.longdo.com/mmmap/images/pin_mark.png",
            // url: "https://cdn.pixabay.com/photo/2024/11/14/14/43/bell-9197145_1280.jpg",
            offset: { x: 12, y: 45 },
          },
          detail: properties.detail || "",
          draggable: properties.draggable || false,
          weight: longdo.OverlayWeight.Top,
        }
      );
      map.Overlays.add(marker);
    });
  };

  const doGeometries = () => {
    const { points, properties } = geometries;

    let geometry;
    if(points && geometries){
        geometry = new longdo.Polygon(points, properties);
    }


    if (geometry) map.Overlays.add(geometry);

    // map.Overlays.add(geometry);
  };

  // const doSearch = (e) => {
  //   if(e){
  //     e.preventDefault()
  //   }
  //   map.Search.search(query, {
  //     // area: 10,
  //     limit: 10,
  //   });
  //   result.style.display = "block";
  // };

  const doSearch = (event) => {
    let searchQuery;

    // Check if the function is triggered by an event
    if (event?.preventDefault) {
      event.preventDefault(); // Prevent the default form submission
      searchQuery = query; // Use the current query state
    } else if (typeof event === "string") {
      searchQuery = event; // Use the query passed as an argument
    }

    // Perform the search with the determined query
    map.Search.search(searchQuery, {
      limit: 10,
    });
    result.style.display = "block";
  };

  return (
    <>
      <div id={id} ref={mapRef} className="w-full h-[400px]"></div>
      <form onSubmit={doSearch} className="flex flex-col p-2">
        <label htmlFor="search" className="mb-2 text-sm font-medium uppercase">
          Search
        </label>
        <div className="flex flex-row gap-2 justify-start items-center p-2">
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            className="p-1 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>
      <div id="result" className="border-2 border-red-600"></div>
      <div id="suggest" className="border-2 border-blue-600"></div>
    </>
  );
};

export default LongdoMap;
