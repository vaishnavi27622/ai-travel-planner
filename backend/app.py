from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import re
from ollama import chat

app = Flask(__name__)
CORS(app)


# =========================================================
# PATHS
# =========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MAIN_DATASET_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "Expanded_Indian_Travel_Dataset.csv"
)

RECOMMENDATION_DATASET_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "travel_recommendations.csv"
)


# =========================================================
# LOAD MAIN DATASET
# =========================================================

try:
    df = pd.read_csv(MAIN_DATASET_PATH)
    df.columns = df.columns.str.strip()

    print("Main dataset loaded successfully!")
    print("Main records:", len(df))
    print("Main columns:", list(df.columns))

except Exception as e:
    print("Error loading main dataset:", e)
    df = pd.DataFrame()


# =========================================================
# LOAD RECOMMENDATION DATASET
# =========================================================

try:
    travel_df = pd.read_csv(RECOMMENDATION_DATASET_PATH)
    travel_df.columns = travel_df.columns.str.strip()

    print("Recommendation dataset loaded successfully!")
    print("Recommendation records:", len(travel_df))
    print(
        "Recommendation columns:",
        list(travel_df.columns)
    )

except Exception as e:
    print(
        "Error loading recommendation dataset:",
        e
    )
    travel_df = pd.DataFrame()


# =========================================================
# HOME
# =========================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "message":
            "AI Travel Planner Backend is Running!",

        "main_records":
            len(df),

        "recommendation_records":
            len(travel_df),

        "main_columns":
            list(df.columns),

        "recommendation_columns":
            list(travel_df.columns)

    })


# =========================================================
# GET ALL DESTINATIONS
# =========================================================

@app.route("/destinations", methods=["GET"])
def get_destinations():

    if "Destination Name" not in df.columns:

        return jsonify({
            "error":
                "Destination Name column not found"
        }), 500

    destinations = (
        df["Destination Name"]
        .dropna()
        .astype(str)
        .str.strip()
        .unique()
        .tolist()
    )

    return jsonify({
        "destinations":
            destinations
    })


# =========================================================
# SEARCH DESTINATION
# =========================================================

@app.route("/search", methods=["POST"])
def search_destination():

    data = request.get_json() or {}

    destination = str(
        data.get("destination", "")
    ).strip()

    if not destination:

        return jsonify({
            "error":
                "Destination is required"
        }), 400

    if "Destination Name" not in df.columns:

        return jsonify({
            "error":
                "Destination Name column not found"
        }), 500

    result = df[
        df["Destination Name"]
        .astype(str)
        .str.lower()
        .str.contains(
            destination.lower(),
            na=False,
            regex=False
        )
    ]

    if result.empty:

        return jsonify({
            "message":
                "Destination not found",
            "results":
                []
        })

    results = (
        result
        .fillna("")
        .to_dict(
            orient="records"
        )
    )

    return jsonify({
        "results":
            results
    })


# =========================================================
# CREATE DATASET ITINERARY
# =========================================================

def create_fallback_itinerary(
    recommendations,
    days
):

    itinerary_parts = []

    if not recommendations:
        return ""

    for day in range(1, days + 1):

        item = recommendations[
            (day - 1) %
            len(recommendations)
        ]

        attraction = str(
            item.get(
                "Attraction",
                ""
            )
        )

        activity = str(
            item.get(
                "Activity",
                ""
            )
        )

        restaurant = str(
            item.get(
                "Restaurant",
                ""
            )
        )

        hotel = str(
            item.get(
                "Hotel",
                ""
            )
        )

        itinerary_parts.append(

            f"""Day {day}:
Morning: {activity} at {attraction}
Afternoon: Visit {attraction}
Evening: Explore {attraction}
Restaurant: {restaurant}
Hotel: {hotel}"""
        )

    return "\n\n".join(
        itinerary_parts
    )


# =========================================================
# OPTIONAL PHI-3 SHORT ENHANCEMENT
# =========================================================

def generate_ai_summary(
    destination,
    interest,
    travel_with,
    transport,
    recommendations
):

    if not recommendations:
        return ""

    # Only send 3 records to Phi-3.
    # This keeps CPU generation faster.

    ai_records = recommendations[:3]

    places_text = ""

    for item in ai_records:

        places_text += (
            f"Attraction: "
            f"{item.get('Attraction', '')}\n"
            f"Activity: "
            f"{item.get('Activity', '')}\n"
            f"Restaurant: "
            f"{item.get('Restaurant', '')}\n"
            f"Hotel: "
            f"{item.get('Hotel', '')}\n\n"
        )

    prompt = f"""
You are a travel assistant.

Destination: {destination}
Interest: {interest}
Travel with: {travel_with}
Transport: {transport}

Based ONLY on this information:

{places_text}

Give a very short 2-sentence travel tip.
Do not invent places.
"""

    try:

        print("Calling Phi-3 Mini...")

        response = chat(

            model="phi3:mini",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            options={
                "temperature": 0.1,
                "num_predict": 100,
                "num_ctx": 1024
            }
        )

        summary = (
            response
            .get("message", {})
            .get("content", "")
            .strip()
        )

        print(
            "Phi-3 Mini completed."
        )

        return summary

    except Exception as e:

        print(
            "Phi-3 Mini error:",
            str(e)
        )

        return ""


# =========================================================
# RECOMMENDATION API
# =========================================================

@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.get_json() or {}

    # =====================================================
    # GET USER INPUT
    # =====================================================

    destination = str(
        data.get(
            "destination",
            ""
        )
    ).strip()

    try:

        days = int(
            data.get(
                "days",
                1
            )
        )

    except:

        days = 1

    budget = str(
        data.get(
            "budget",
            ""
        )
    ).strip()

    interest = str(
        data.get(
            "interest",
            ""
        )
    ).strip()

    travel_with = str(
        data.get(
            "travelWith",
            ""
        )
    ).strip()

    hotel_type = str(
        data.get(
            "hotelType",
            ""
        )
    ).strip()

    transport = str(
        data.get(
            "transport",
            ""
        )
    ).strip()


    # =====================================================
    # VALIDATION
    # =====================================================

    if not destination:

        return jsonify({
            "error":
                "Destination is required"
        }), 400

    if days < 1:

        return jsonify({
            "error":
                "Days must be at least 1"
        }), 400

    if days > 30:

        return jsonify({
            "error":
                "Maximum trip duration is 30 days"
        }), 400


    # =====================================================
    # DATASET CHECK
    # =====================================================

    if travel_df.empty:

        return jsonify({
            "error":
                "Recommendation dataset is empty"
        }), 500


    required_columns = [

        "Destination",
        "State",
        "Attraction",
        "Activity",
        "Restaurant",
        "Hotel",
        "Hotel Type",
        "Price Per Night",
        "Budget Range",
        "Interest",
        "Travel With",
        "Transport"

    ]


    missing_columns = [

        column
        for column in required_columns
        if column not in travel_df.columns

    ]


    if missing_columns:

        return jsonify({

            "error":
                "Missing dataset columns",

            "missing":
                missing_columns

        }), 500


    # =====================================================
    # DESTINATION FILTER
    # =====================================================

    destination_mask = (

        travel_df["Destination"]
        .astype(str)
        .str.strip()
        .str.lower()
        .eq(
            destination.lower()
        )

    )

    result = travel_df[
        destination_mask
    ].copy()


    # =====================================================
    # DESTINATION NOT FOUND
    # =====================================================

    if result.empty:

        return jsonify({

            "message":
                "Destination not found in recommendation dataset",

            "results":
                []

        })


    print(
        "Destination records found:",
        len(result)
    )


    # =====================================================
    # SCORE
    # =====================================================

    result["score"] = 0


    # =====================================================
    # INTEREST SCORE
    # =====================================================

    if interest:

        mask = (

            result["Interest"]
            .astype(str)
            .str.lower()
            .str.strip()
            .eq(
                interest.lower()
            )

        )

        result.loc[
            mask,
            "score"
        ] += 5


    # =====================================================
    # TRAVEL WITH SCORE
    # =====================================================

    if travel_with:

        mask = (

            result["Travel With"]
            .astype(str)
            .str.lower()
            .str.strip()
            .eq(
                travel_with.lower()
            )

        )

        result.loc[
            mask,
            "score"
        ] += 3


    # =====================================================
    # HOTEL TYPE SCORE
    # =====================================================

    if hotel_type:

        mask = (

            result["Hotel Type"]
            .astype(str)
            .str.lower()
            .str.strip()
            .eq(
                hotel_type.lower()
            )

        )

        result.loc[
            mask,
            "score"
        ] += 2


    # =====================================================
    # TRANSPORT SCORE
    # =====================================================

    if transport:

        mask = (

            result["Transport"]
            .astype(str)
            .str.lower()
            .str.strip()
            .eq(
                transport.lower()
            )

        )

        result.loc[
            mask,
            "score"
        ] += 2


    # =====================================================
    # BUDGET SCORE
    # =====================================================

    if budget:

        mask = (

            result["Budget Range"]
            .astype(str)
            .str.lower()
            .str.strip()
            .eq(
                budget.lower()
            )

        )

        result.loc[
            mask,
            "score"
        ] += 2


    # =====================================================
    # SORT
    # =====================================================

    result = result.sort_values(
        by="score",
        ascending=False
    )


    # =====================================================
    # REMOVE DUPLICATES
    # =====================================================

    result = result.drop_duplicates(
        subset=["Attraction"],
        keep="first"
    )


    # =====================================================
    # KEEP RECOMMENDATIONS
    # =====================================================

    result = result.head(10)


    # =====================================================
    # CONVERT TO JSON
    # =====================================================

    recommendations = (

        result
        .drop(
            columns=["score"],
            errors="ignore"
        )
        .fillna("")
        .to_dict(
            orient="records"
        )

    )


    print(
        "Recommendations:",
        len(recommendations)
    )


    # =====================================================
    # NO RECOMMENDATIONS
    # =====================================================

    if not recommendations:

        return jsonify({

            "message":
                "No recommendations found",

            "destination":
                destination,

            "results":
                [],

            "itinerary":
                "",

            "generatedDays":
                0

        })


    # =====================================================
    # CREATE GUARANTEED ITINERARY
    # =====================================================

    # IMPORTANT:
    # Python creates the itinerary immediately.
    # Therefore the Planner will not disappear
    # even if Phi-3 is slow.

    itinerary = create_fallback_itinerary(
        recommendations,
        days
    )


    # =====================================================
    # COUNT DAYS
    # =====================================================

    day_numbers = re.findall(

        r"\bDay\s+(\d+)\s*:",

        itinerary,

        flags=re.IGNORECASE

    )

    generated_days = len(
        set(day_numbers)
    )


    print(
        "Requested days:",
        days
    )

    print(
        "Generated days:",
        generated_days
    )


    # =====================================================
    # PHI-3 OPTIONAL
    # =====================================================

    ai_summary = generate_ai_summary(

        destination,
        interest,
        travel_with,
        transport,
        recommendations

    )


    # =====================================================
    # RETURN RESPONSE
    # =====================================================

    return jsonify({

        "message":
            "Recommendations generated successfully",

        "destination":
            destination,

        "days":
            days,

        "budget":
            budget,

        "interest":
            interest,

        "travelWith":
            travel_with,

        "hotelType":
            hotel_type,

        "transport":
            transport,

        "recommendationCount":
            len(recommendations),

        "generatedDays":
            generated_days,

        "results":
            recommendations,

        "itinerary":
            itinerary,

        "aiSummary":
            ai_summary

    })


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )