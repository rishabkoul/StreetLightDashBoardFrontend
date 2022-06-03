import React, { useState, useCallback, useEffect } from "react";
import Map from "../../Map";
import { Layers, TileLayer, VectorLayer } from "../../Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "../../Source";
import { fromLonLat } from "ol/proj";

import { Controls, FullScreenControl } from "../../Controls";
import RedDot from "../../images/red_dot.png";
import GreenDot from "../../images/green_dot.png";

function addMarkers(lonLatArray) {
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(
        fromLonLat([
          parseFloat(item[0].replace("'", "")),
          parseFloat(item[1].replace("'", "")),
        ])
      ),
    });
    feature.setStyle(
      new Style({
        image: new Icon({
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: item[2] === "'OK'" ? GreenDot : RedDot,
        }),
      })
    );
    return feature;
  });
  return features;
}

const MapComponent = ({ heading, url, collection }) => {
  const [center, setCenter] = useState();
  const zoom = 12;

  const [features, setFeatures] = useState();

  const getData = useCallback(() => {
    fetch(url)
      .then((response) => response.json())
      .then((actualData) => {
        setFeatures(addMarkers(actualData[0][collection]));
        setCenter([
          actualData[0]["centroid"][0][0],
          actualData[0]["centroid"][0][1],
        ]);
      });
  }, [url, collection]);

  useEffect(() => {
    // Update the document title using the browser API
    getData();
  }, [url, getData]);

  return (
    <div>
      <h3>{heading}</h3>
      {features ? (
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
            <VectorLayer source={vector({ features })} />
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
      ) : (
        <h3>Loading ...</h3>
      )}
    </div>
  );
};

export default MapComponent;
