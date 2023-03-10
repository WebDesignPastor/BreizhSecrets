import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
    departureMarkers: Array
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      zoom:1,
      style: "mapbox://styles/fanchpastor/cleztoc72003801o3sccvya6t"
    })


    this.#addMarkersToMap(this.departureMarkersValue)
    this.#addMarkersToMap(this.markersValue)
    this.#fitMapToMarkers(this.departureMarkersValue)
    this.#fitMapToMarkers(this.markersValue)

  }

  #addMarkersToMap(markers) {
    markers.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(this.map)
    })
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }
}
