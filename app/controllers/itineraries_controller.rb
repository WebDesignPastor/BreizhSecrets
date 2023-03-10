class ItinerariesController < ApplicationController
  def index
    if params[:query].present?
      @itineraries = Itinerary.where(category: params[:query])
    else
      @itineraries = Itinerary.all
    end

    @itineraries_markers = @itineraries.geocoded.map do |itinerary|
      {
        lat: itinerary.latitude,
        lng: itinerary.longitude
      }
    end
  end

  def show
    @itinerary = Itinerary.find(params[:id])
    @trip = Trip.new

    @markers = {
      lat: @itinerary.latitude,
      lng: @itinerary.longitude
    }
  end
end
