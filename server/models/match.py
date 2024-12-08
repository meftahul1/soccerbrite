from bson.objectid import ObjectId

class Match:
    def __init__(self, mongo):
        self.db = mongo.myDatabase.matches

    def create_match(self, match_name, match_description, match_date, match_time, match_location, organizer_email, match_public, max_participants):
        match = {
            "match_name": match_name,
            "match_description": match_description,
            "match_date": match_date,
            "match_time": match_time,
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
