from flask import jsonify, request
from models.match import Match 
from models.user import User
from datetime import datetime

class MatchController:
    def __init__(self, app, mongo):
        self.match_model = Match(mongo)
        self.app = app
        self.match_routes()

    def match_routes(self):
        @self.app.route('/api/create-match', methods=['POST'])
        def create_match():
            data = request.json
            match_name = data.get("match_name")
            match_description = data.get("match_description")
            match_date = data.get("match_date")
            match_startTime = data.get("match_startTime")
            match_endTime = data.get("match_endTime")
            match_location = data.get("match_location")  # {'name': 'location name', 'address': 'location address', 'lat': ..., 'lng': ...}
            organizer_email = data.get("organizer_email")
            match_public = data.get("match_public")
            max_participants = data.get("max_participants")

            # Convert string date to datetime object
            match_date_obj = datetime.strptime(match_date, '%Y-%m-%d')

            match = self.match_model.create_match(match_name, match_description, match_date_obj, 
                                                  match_startTime, match_endTime, match_location, 
                                                  organizer_email, match_public, max_participants
                                                  )
            if match:
                return jsonify({"message": "Match created successfully"}), 201
            return jsonify({"error": "Error creating match"}), 400
        
        @self.app.route('/api/join-match/<match_id>', methods=['POST'])
        def join_match(match_id):
            data = request.json
            user_email = data.get("user_email")
            success = self.match_model.join_match(match_id, user_email)
            if success:
                return jsonify({"message": "Successfully joined the match"}), 200
            return jsonify({"error": "Match is full or invalid participant"}), 400

        @self.app.route('/api/leave-match/<match_id>', methods=['POST'])
        def leave_match(match_id):
            data = request.json
            user_email = data.get("user_email")
            success = self.match_model.leave_match(match_id, user_email)
            if success:
                return jsonify({"message": "Successfully left the match"}), 200
            return jsonify({"error": "Error leaving the match"}), 400

        @self.app.route('/api/cancel-match/<match_id>', methods=['DELETE'])
        def cancel_match(match_id):
            data = request.json
            organizer_email = data.get("organizer_email")
            success = self.match_model.cancel_match(match_id, organizer_email)
            if success:
                return jsonify({"message": "Match cancelled successfully"}), 200
            return jsonify({"error": "Unable to cancel match or not authorized"}), 400

        @self.app.route('/api/organizer-matches', methods=['GET'])
        def get_organizer_matches():
            data = request.json
            organizer_email = data.get("organizer_email")
            matches = self.match_model.get_organizer_matches(organizer_email)
            return jsonify({"matches": matches}), 200

        @self.app.route('/api/nearby-matches', methods=['POST'])
        def get_nearby_matches():
            data = request.json
            user_location = data.get("user_location")  # {'lat': ..., 'lng': ...}
            nearby_matches = self.match_model.get_nearby_matches(user_location)
            return jsonify({"nearby_matches": nearby_matches}), 200

        @self.app.route('/api/matches-by-participant', methods=['GET'])
        def get_events_by_participant():
            data = request.json
            participant_email = data.get("participant_email")
            events = self.match_model.get_events_by_participant(participant_email)
            return jsonify({"events": events}), 200
        
        @self.app.route('/api/match/<match_id>', methods=['GET'])
        def get_match(match_id):
            match = self.match_model.get_match(match_id)
            return jsonify({"match": match}), 200
        
        @self.app.route('/api/matches', methods=['POST'])
        def get_matches():
            data = request.json
            user_email = data.get("user_email")
            matches = self.match_model.get_user_matches(user_email)
            for match in matches:
                match["_id"] = str(match["_id"])
            return jsonify({"matches": matches}), 200
        
        @self.app.route('/api/match/<match_id>', methods=['PUT'])
        def update_match(match_id):
            data = request.json
            match = self.match_model.update_match(match_id, data)
            return jsonify({"match": match}), 200
        
        @self.app.route('/api/user_upcoming_matches', methods=['POST'])
        def get_upcoming_user_matches():
            data = request.json
            user_email = data.get("user_email")
            date = data.get("date")
            date_obj = datetime.strptime(date, '%Y-%m-%d')  # Convert string date to datetime object
            print(user_email, date_obj)
            matches = self.match_model.get_upcoming_user_matches(user_email, date_obj)
            print(matches)
            for match in matches:
                match["_id"] = str(match["_id"])
            return jsonify({"matches": matches}), 200
        
        @self.app.route('/api/public-matches', methods=['POST'])
        def get_public_matches():
            data = request.json
            filters = {
                "search_term": data.get("search_term", ""),
                "location": data.get("location", None),
                "radius": data.get("radius", 5000),
                "date_from": data.get("date_from", None),
                "date_to": data.get("date_to", None),
                "start_time": data.get("start_time", None),
                "end_time": data.get("end_time", None)
            }
            
            # Pagination parameters
            page = data.get("page", 1)
            per_page = data.get("per_page", 10)

            #user email
            user_email = data.get("user_email", None)
            
            # Convert date strings to datetime objects if provided
            if filters["date_from"]:
                filters["date_from"] = datetime.strptime(filters["date_from"], '%Y-%m-%d')
            if filters["date_to"]:
                filters["date_to"] = datetime.strptime(filters["date_to"], '%Y-%m-%d')
            
            matches, total_count = self.match_model.get_public_matches(filters, user_email, page, per_page)
            
            # Convert ObjectId to string for JSON serialization
            for match in matches:
                match["_id"] = str(match["_id"])
            
            print(filters)
            
            return jsonify({
                "matches": matches,
                "pagination": {
                    "current_page": page,
                    "per_page": per_page,
                    "total_items": total_count,
                    "total_pages": (total_count + per_page - 1) // per_page
                }
            }), 200