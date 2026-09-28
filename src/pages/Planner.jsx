import { useState } from "react";

export default function Planner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState("10000-20000");
  const [interest, setInterest] = useState("Nature");
  const [travelWith, setTravelWith] = useState("Family");
  const [hotelType, setHotelType] = useState("Budget");
  const [transport, setTransport] = useState("Car");

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async () => {
    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            days: Number(days),
            budget,
            interest,
            travelWith,
            hotelType,
            transport,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to generate travel plan."
        );
      }

      if (!data.results || data.results.length === 0) {
        throw new Error(
          "No recommendations found for this destination."
        );
      }

      setPlan(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">

      <div className="mx-auto w-full max-w-6xl">

        {/* TITLE */}

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-slate-900">
            AI Travel Planner
          </h1>

          <p className="mt-2 text-base text-slate-600">
            Create a personalized travel itinerary using AI
            and travel data.
          </p>

        </div>


        {/* ============================= */}
        {/* PLANNER FORM */}
        {/* ============================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* DESTINATION */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Destination
              </label>

              <input
                type="text"
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
                placeholder="Example: Munnar"
                className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>


            {/* DAYS */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Number of Days
              </label>

              <input
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={(e) =>
                  setDays(e.target.value)
                }
                className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>


            {/* BUDGET */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Budget
              </label>

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="10000-20000">
                  ₹10,000 - ₹20,000
                </option>

                <option value="20000-50000">
                  ₹20,000 - ₹50,000
                </option>

                <option value="50000+">
                  ₹50,000+
                </option>
              </select>
            </div>


            {/* INTEREST */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Interest
              </label>

              <select
                value={interest}
                onChange={(e) =>
                  setInterest(e.target.value)
                }
                className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="Nature">Nature</option>
                <option value="Adventure">Adventure</option>
                <option value="History">History</option>
                <option value="Beaches">Beaches</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>


            {/* TRAVEL WITH */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Travel With
              </label>

              <select
                value={travelWith}
                onChange={(e) =>
                  setTravelWith(e.target.value)
                }
                className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="Family">Family</option>
                <option value="Couple">Couple</option>
                <option value="Friends">Friends</option>
              </select>
            </div>


            {/* HOTEL */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hotel Type
              </label>

              <select
                value={hotelType}
                onChange={(e) =>
                  setHotelType(e.target.value)
                }
                className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="Budget">Budget</option>
                <option value="Standard">Standard</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>


            {/* TRANSPORT */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Transport
              </label>

              <select
                value={transport}
                onChange={(e) =>
                  setTransport(e.target.value)
                }
                className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="Car">Car</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Boat">Boat</option>
              </select>
            </div>

          </div>


          {/* BUTTON */}

          <button
            type="button"
            onClick={generatePlan}
            disabled={loading}
            className="mt-8 block w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading
              ? "Generating AI Itinerary..."
              : "Generate Travel Plan"}
          </button>


          {/* ERROR */}

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

        </div>


        {/* ============================= */}
        {/* RESULTS */}
        {/* ============================= */}

        {plan && (
          <div className="mt-10 space-y-8">

            {/* SUMMARY */}

            <div className="rounded-2xl bg-white p-6 shadow-xl">

              <h2 className="text-2xl font-bold text-slate-900">
                ✈️ Trip Summary
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-3">

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-slate-500">
                    Destination
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {plan.destination}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-slate-500">
                    Duration
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {plan.days} Days
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-slate-500">
                    Interest
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {plan.interest}
                  </p>
                </div>

              </div>

            </div>


            {/* AI ITINERARY */}

            <div className="rounded-2xl bg-white p-6 shadow-xl">

              <h2 className="mb-5 text-2xl font-bold text-slate-900">
                🤖 AI Generated Itinerary
              </h2>

              <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-6 leading-7 text-slate-700">
                {plan.itinerary}
              </div>

            </div>


            {/* RECOMMENDATIONS */}

            <div className="rounded-2xl bg-white p-6 shadow-xl">

              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                📍 Recommended Places
              </h2>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                {plan.results.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                      <h3 className="text-xl font-bold text-blue-600">
                        {item.Attraction}
                      </h3>

                      <div className="mt-4 space-y-2 text-sm text-slate-600">

                        <p>
                          <strong>Activity:</strong>{" "}
                          {item.Activity}
                        </p>

                        <p>
                          <strong>Restaurant:</strong>{" "}
                          {item.Restaurant}
                        </p>

                        <p>
                          <strong>Hotel:</strong>{" "}
                          {item.Hotel}
                        </p>

                        <p>
                          <strong>Hotel Type:</strong>{" "}
                          {item["Hotel Type"]}
                        </p>

                        <p>
                          <strong>Price:</strong>{" "}
                          ₹{item["Price Per Night"]}
                        </p>

                        <p>
                          <strong>Transport:</strong>{" "}
                          {item.Transport}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}