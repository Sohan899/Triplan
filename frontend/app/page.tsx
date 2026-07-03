'use client'
import { useState } from "react";
import { Loader2, Plane, MapPin, Hotel, UtensilsCrossed, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

interface TravelDetails{
  destination:string
  duration: number
  budget: number
  travelers: number
  travel_type: string
  interests: string[]
  overview: string
}


interface Place {
  name: string
  description: string
  category: string
  location: string
  how_to_reach: string
  best_time: string
  duration: string
  entry_fee: string
  rating: number
  tips: string
  image_url: string
  maps_link: string
}

interface Restaurant {
  name: string
  cuisine: string
  description: string
  budget_level: string
  avg_cost_per_person: string
  location: string
  rating: number
  specialties: string[]
  atmosphere: string
  best_time: string
  reservation_needed: boolean
  image_url: string
  maps_link: string
}

interface Hotel {
  name: string
  category: string
  description: string
  location: string
  price_per_night: string
  total_estimated: string
  rating: number
  amenities: string[]
  room_type: string
  proximity: string
  booking_tip: string
  image_url: string
  maps_link: string
}

interface Activity {
  time: string
  activity: string
  description: string
  location: string
  duration: string
  cost: string
}

interface Itinerary {
  day: number
  title: string
  activities: Activity[]
  meals: {
    breakfast: string
    lunch: string
    dinner: string
  }
  estimated_cost: string
  tips: string
}

interface TravelPlan {
  travel_details: TravelDetails
  places: Place[]
  restaurants: Restaurant[]
  hotels: Hotel[]
  itinerary: Itinerary[]
  budget_breakdown: {
    accommodation: number
    food: number
    activities: number
    transportation: number
    miscellaneous: number
    total_estimated: number
    user_budget: number
    remaining: number
    within_budget: boolean
  }
}

export default function Home() {
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null)
  const [error, setError] = useState('')


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTravelPlan(null)

    try {
      const response = await fetch('http://127.0.0.1:5000/api/plan_travel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput}),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create travel plan')
      }

      setTravelPlan(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Travel Planner</h1>
        <p className="text-muted-foreground">Plan your perfect trip with AI-powered recommendations</p>
      </div>

       {/* Input Form */}
      {!travelPlan && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Describe Your Dream Trip</CardTitle>
            <CardDescription>
              Tell us about your destination, duration, budget, and interests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="e.g., I want to visit Tokyo for 5 days with a budget of $3000. I love anime, traditional temples, sushi, and shopping..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[150px]"
                required
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Your Travel Plan...
                  </>
                ) : (
                  <>
                    <Plane className="mr-2 h-4 w-4" />
                    Generate Travel Plan
                  </>
                )}
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-4 border rounded-lg text-destructive">
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {travelPlan && (
        <div className="space-y-6">
          {/* Summary Header */}
          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Travel Plan</CardTitle>
              <CardDescription>
                {travelPlan.travel_details.overview}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="text-lg font-semibold">{travelPlan.travel_details.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-lg font-semibold">{travelPlan.travel_details.duration} days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="text-lg font-semibold">${travelPlan.travel_details.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Travelers</p>
                  <p className="text-lg font-semibold">{travelPlan.travel_details.travelers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Breakdown */}
          {travelPlan.budget_breakdown && (
            <Card>
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
                <CardDescription>
                  {travelPlan.budget_breakdown.within_budget 
                    ? `You're within budget! ${travelPlan.budget_breakdown.remaining >= 0 ? `$${travelPlan.budget_breakdown.remaining.toFixed(2)} remaining` : ''}`
                    : `Budget exceeded by $${Math.abs(travelPlan.budget_breakdown.remaining).toFixed(2)}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accommodation</span>
                    <span className="font-semibold">${travelPlan.budget_breakdown.accommodation.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Food & Dining</span>
                    <span className="font-semibold">${travelPlan.budget_breakdown.food.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Activities & Attractions</span>
                    <span className="font-semibold">${travelPlan.budget_breakdown.activities.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transportation</span>
                    <span className="font-semibold">${travelPlan.budget_breakdown.transportation.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Miscellaneous</span>
                    <span className="font-semibold">${travelPlan.budget_breakdown.miscellaneous.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-semibold">Total Estimated Cost</span>
                    <span className="text-lg font-bold">${travelPlan.budget_breakdown.total_estimated.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Your Budget</span>
                    <span className="text-lg font-bold">${travelPlan.budget_breakdown.user_budget.toFixed(2)}</span>
                  </div>
                  <div className={`border-t pt-3 flex justify-between items-center ${travelPlan.budget_breakdown.within_budget ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="font-semibold">
                      {travelPlan.budget_breakdown.within_budget ? 'Remaining' : 'Over Budget'}
                    </span>
                    <span className="text-lg font-bold">
                      {travelPlan.budget_breakdown.within_budget ? '+' : '-'}
                      ${Math.abs(travelPlan.budget_breakdown.remaining).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs for different sections */}
          <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="itinerary">
                <Calendar className="h-4 w-4 mr-2" />
                Itinerary
              </TabsTrigger>
              <TabsTrigger value="places">
                <MapPin className="h-4 w-4 mr-2" />
                Places ({travelPlan.places.length})
              </TabsTrigger>
              <TabsTrigger value="restaurants">
                <UtensilsCrossed className="h-4 w-4 mr-2" />
                Restaurants ({travelPlan.restaurants.length})
              </TabsTrigger>
              <TabsTrigger value="hotels">
                <Hotel className="h-4 w-4 mr-2" />
                Hotels ({travelPlan.hotels.length})
              </TabsTrigger>
            </TabsList>
            {/* Itinerary Tab */}
            <TabsContent value="itinerary" className="space-y-4">
              {travelPlan.itinerary.map((day) => (
                <Card key={day.day}>
                  <CardHeader>
                    <CardTitle>Day {day.day}: {day.title}</CardTitle>
                    <CardDescription>
                      Estimated Cost: {day.estimated_cost}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="border-l-2 pl-4">
                        <div className="flex gap-3">
                          <Badge variant="outline">{activity.time}</Badge>
                          <div className="flex-1">
                            <h4 className="font-semibold">{activity.activity}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                              <span>{activity.location}</span>
                              <span>{activity.duration}</span>
                              <span>{activity.cost}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div>
                        <p className="font-semibold text-sm">Breakfast</p>
                        <p className="text-sm text-muted-foreground">{day.meals.breakfast}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Lunch</p>
                        <p className="text-sm text-muted-foreground">{day.meals.lunch}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Dinner</p>
                        <p className="text-sm text-muted-foreground">{day.meals.dinner}</p>
                      </div>
                    </div>

                    {day.tips && (
                      <div className="border p-3 rounded-lg">
                        <p className="font-semibold text-sm">Tips for the Day</p>
                        <p className="text-sm text-muted-foreground mt-1">{day.tips}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            {/* Places Tab */}
            <TabsContent value="places">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelPlan.places.map((place, idx) => (
                  <Card key={idx}>
                    <div className="relative h-48">
                      <img
                        src={place.image_url}
                        alt={place.name}
                        className="w-full h-full object-cover rounded-t-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://source.unsplash.com/800x600/?landmark,tourism'
                        }}
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{place.name}</CardTitle>
                        <Badge>{place.category}</Badge>
                      </div>
                      <CardDescription>
                        Rating: {place.rating}/5.0
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{place.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <span>{place.location}</span>
                        </div>
                        <p>{place.how_to_reach}</p>
                        <div className="flex justify-between">
                          <span>{place.best_time}</span>
                          <span>{place.entry_fee}</span>
                        </div>
                      </div>
                      {place.tips && (
                        <div className="border p-2 rounded text-sm">
                          <span className="font-semibold">Tip:</span> {place.tips}
                        </div>
                      )}
                      <a
                        href={place.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full" variant="outline" size="sm">
                          View on Maps
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Restaurants Tab */}
            <TabsContent value="restaurants">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelPlan.restaurants.map((restaurant, idx) => (
                  <Card key={idx}>
                    <div className="relative h-48">
                      <img
                        src={restaurant.image_url}
                        alt={restaurant.name}
                        className="w-full h-full object-cover rounded-t-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://source.unsplash.com/800x600/?food,restaurant'
                        }}
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <Badge>{restaurant.budget_level}</Badge>
                      </div>
                      <CardDescription>
                        {restaurant.cuisine} • Rating: {restaurant.rating}/5.0
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{restaurant.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Price</span>
                          <span>{restaurant.avg_cost_per_person}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Atmosphere</span>
                          <span>{restaurant.atmosphere}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Best time</span>
                          <span>{restaurant.best_time}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-2">Must Try:</p>
                        <div className="flex flex-wrap gap-2">
                          {restaurant.specialties.map((item, i) => (
                            <Badge key={i} variant="secondary">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      {restaurant.reservation_needed && (
                        <p className="text-sm">Reservation recommended</p>
                      )}
                      <a
                        href={restaurant.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full" variant="outline" size="sm">
                          View on Maps
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Hotels Tab */}
            <TabsContent value="hotels">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelPlan.hotels.map((hotel, idx) => (
                  <Card key={idx}>
                    <div className="relative h-48">
                      <img
                        src={hotel.image_url}
                        alt={hotel.name}
                        className="w-full h-full object-cover rounded-t-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://source.unsplash.com/800x600/?hotel,luxury'
                        }}
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{hotel.name}</CardTitle>
                        <Badge>{hotel.category}</Badge>
                      </div>
                      <CardDescription>
                        Rating: {hotel.rating}/5.0
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{hotel.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Per Night</span>
                          <span>{hotel.price_per_night}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total</span>
                          <span className="font-semibold">{hotel.total_estimated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Room</span>
                          <span>{hotel.room_type}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <span className="text-xs">{hotel.proximity}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-2">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 6).map((amenity, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{amenity}</Badge>
                          ))}
                        </div>
                      </div>
                      {hotel.booking_tip && (
                        <div className="border p-2 rounded text-sm">
                          <span className="font-semibold">Tip:</span> {hotel.booking_tip}
                        </div>
                      )}
                      <a
                        href={hotel.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full" variant="outline" size="sm">
                          View on Maps
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          {/* Back Button */}
          <div className="text-center pt-8">
            <Button
              onClick={() => {
                setTravelPlan(null)
                setUserInput('')
              }}
              variant="outline"
            >
              Plan Another Trip
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
