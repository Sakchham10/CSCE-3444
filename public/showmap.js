mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: single_restaurant.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(single_restaurant.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3> ${single_restaurant.Name}</h3>`
        )
    )
    .addTo(map)