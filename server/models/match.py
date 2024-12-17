from bson.objectid import ObjectId

class Match:
    def __init__(self, mongo):
        self.db = mongo.myDatabase.matches

    def create_match(self, match_name, match_description, match_date, match_startTime, match_endTime, match_location, organizer_email, match_public, max_participants):
        match = {
            "match_name": match_name,
            "match_description": match_description,
            "match_date": match_date,
            "match_time": match_startTime,
            "match_endTime": match_endTime,
            "match_location": {
                "name": match_location["name"],
                "address": match_location["address"],
                "location": {
                    "type": "Point",
                    "coordinates": [match_location["lng"], match_location["lat"]]
                }
            },
            "organizer": organizer_email,
            "match_public": match_public,
            "participants": [],
            "max_players": max_participants,
            "current_players": 0,
            "match_status": "open"
        }
        self.db.insert_one(match)
        return match
    
    def get_match(self, match_id):
        return self.db.find_one({"_id": ObjectId(match_id)})
    
    def update_match(self, match_id, match):
        old_match = self.db.find_one({"_id": ObjectId(match_id)})
        match['match_location'] = {
            "name": match["match_location"]["name"],
            "address": match["match_location"]["address"],
            "location": {
                "type": "Point",
                "coordinates": [match["match_location"]["lng"], match["match_location"]["lat"]]
            }
        }
        if old_match and match:
            self.db.update_one({"_id": ObjectId(match_id)}, {"$set": match})
            return match
        return match
    
    def join_match(self, match_id, user_email):
        match = self.db.find_one({"_id": ObjectId(match_id)})
        if not match:
            return False
        if match["current_players"] < match["max_players"]:
            self.db.update_one(
                {"_id": ObjectId(match_id)},
                {
                    "$push": {"participants": [user_email]},
                    "$inc": {"current_players": 1}
                }
            )
            if match["current_players"] + 1 == match["max_players"]:
                self.db.update_one({"_id": ObjectId(match_id)}, {"$set": {"match_status": "full"}})
            return True
        return False  # Match is already full
    
    def leave_match(self, match_id, user_email):
        match = self.db.find_one({"_id": ObjectId(match_id)})
        if match:
            self.db.update_one(
                {"_id": ObjectId(match_id)},
                {
                    "$pull": {"participants": {"user_email": user_email}},
                    "$inc": {"current_players": -1},
                    "$set": {"match_status": "open"}
                }
            )
            return True
        return False
    
    def cancel_match(self, match_id, organizer_email):
        match = self.db.find_one({"_id": ObjectId(match_id)})
        if match and match["organizer"] == organizer_email:
            self.db.delete_one({"_id": ObjectId(match_id)})
            return True
        return False
    
    def get_organizer_matches(self, organizer_email):
        if organizer_email:
            return list(self.db.find({"organizer": organizer_email}))
        return []
    
    def get_nearby_matches(self, user_location):
        radius = 1000 # 1km radius
        lat = user_location["lat"] # user's latitude
        lng = user_location["lng"] # user's longitude
        return list(self.db.find({
            "match_location.location": {
                "$near": {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [lng, lat]
                    },
                    "$maxDistance": radius
                }
            },
            "match_status": "open",
            "match_public": True
        }))
    
    def get_events_by_participant(self, participant_email):
        return list(self.db.find({
            "participants": {
                "$elemMatch": {
                    "user_email": participant_email
                }
            }
        }))
    
    def get_upcoming_user_matches(self, user_email, date_obj):
        print(date_obj)
        print(user_email)

        return list(self.db.find({
            "match_date": {
                "$gte": date_obj
            },
            "$or": [
                {
                    "participants": {
                        "$elemMatch": {
                            "user_email": user_email
                        }
                    }
                },
                {
                    "organizer": user_email
                }
            ]
        }))
    
    def get_user_matches(self, user_email):
        return list(self.db.find({
            "$or": [
                {
                    "participants": {
                        "$elemMatch": {
                            "user_email": user_email
                        }
                    }
                },
                {
                    "organizer": user_email
                }
            ]
        }))
    
    def get_public_matches(self, filters, user_email, page=1, per_page=10):
        # Start with base query for public and open matches
        query = {
            "match_public": True,
            "match_status": "open",
            "$and": [
                {"organizer": {"$ne": user_email}},  # Exclude if the user is the organizer
                {"participants": {"$nin": [user_email]}}  # Exclude if the user is in participants
            ]
        }
        
        # Add name search if provided
        if filters["search_term"]:
            query["match_name"] = {"$regex": filters["search_term"], "$options": "i"}
        
        # Add date range filter if provided
        if filters["date_from"] or filters["date_to"]:
            date_query = {}
            if filters["date_from"]:
                date_query["$gte"] = filters["date_from"]
            if filters["date_to"]:
                date_query["$lte"] = filters["date_to"]
            if date_query:
                query["match_date"] = date_query
        
        
        # Add time range filter if provided
        if filters["start_time"]:
            query["match_time"] = {"$gte": filters["start_time"]}
        if filters["end_time"]:
            query["match_endTime"] = {"$lte": filters["end_time"]}
        
        # Handle location-based search
        if filters.get("location") and isinstance(filters["location"], dict):
            query["match_location.location"] = {
                "$geoWithin": {
                    "$centerSphere": [
                        [
                            filters["location"]["lng"],
                            filters["location"]["lat"]
                        ],
                        filters["radius"] / 6378100  # Convert radius from meters to radians (Earth radius = 6378100 meters)
                    ]
                }
            }
        
        # Get total count for pagination
        total_count = self.db.count_documents(query)
        
        # Calculate skip value
        skip = (page - 1) * per_page
        
        # Execute the query with pagination
        matches = list(self.db.find(query)
                    .skip(skip)
                    .limit(per_page))
        
        return matches, total_count
