from flask import Blueprint, jsonify, request
from Backend import load_json, normalize_data
from flask_cors import CORS
import re

api = Blueprint('api', __name__)
CORS(api)

# The key order was getting missed when the response was given via the endpoint, which caused the acoustic column to pop up first.
# This caused the UI to not show the title at the start of the table.
# To maintain the order of the keys as in the JSON, I had to retrieve the original order and keep sorting False in the app.
# This is why I did it.

json_data = load_json('playlist[76][36][48][6].json')
key_order = list(json_data.keys())


#used the function in backend
normalized_data = normalize_data(json_data)

#the request parameter has the page number and the entries per page so that only 10 rows are seen 
@api.route('/api/songs', methods=['GET'])
def get_songs():
   
    page = request.args.get('page', default=0, type=int)
    per_page = request.args.get('per_page', default=10, type=int)
    # toget next and next 10 entries
    start = (page - 1) * per_page
    end = start + per_page

    # slicing the normalized data to achieve pagination
    paginated_data = normalized_data.iloc[start:end]
    
    # the data was in key value pairs so having a dict was easier
    songs_list = []
    for _, row in paginated_data.iterrows():
        # learnt about using _ instead of names in CS50 lecture
        ordered_dict = {} 
        ordered_dict['index'] = row['index']
        for key in key_order:
            ordered_dict[key] = row[key]
        songs_list.append(ordered_dict)

    # forming the response dict - adding page and per page for ui purpose
    response = {
        'page': page,
        'per_page': per_page,
        'total_items': normalized_data.shape[0], # shape is used to see the number of items
        'total_pages': (normalized_data.shape[0] + per_page - 1) // per_page, 
        'songs': songs_list #song_list contains the list of the songs by the with keys and indexes
    }

    return response

@api.route('/api/songs/search', methods=['GET'])
def search_songs():
    # fetching the title  from the request parameters
    title = request.args.get('title')
    if not title:
        return jsonify({"error": "Title parameter is required"}), 400

    # used regex, which i feel is more useful when trying to match with difeerent kinds of data
    #the title strings had special chars as well as unicode which required using regex to make it more and more robust
    pattern = re.compile(re.escape(title), re.IGNORECASE)
    matched_songs = normalized_data[normalized_data['title'].str.contains(pattern, na=False)]

    if matched_songs.empty:
        return jsonify({"error": "Song not found"}), 404

    # jsonify - properly serializes complex data types
    #When orient='records', the DataFrame is converted into a list of dictionaries, where each dictionary corresponds to a row in the DataFrame
    return jsonify(matched_songs.to_dict(orient='records'))

@api.route('/api/songs/rate/<string:song_id>', methods=['PUT'])
def rate_song(song_id):
    try:
        #ratings = request.body.json
        #new_ratings = ratings.get('rating')
        rating_data = request.json
        new_rating = rating_data.get('rating')

        # Checking if the song_id exists in the normalized_data
        if song_id not in normalized_data['id'].values:
            return jsonify({'Error_occured': 'Song does not exist'}), 404

        # Find the song by its ID and update its rating
        index = normalized_data.index[normalized_data['id'] == song_id].tolist()[0]
        normalized_data.at[index, 'rating'] = new_rating
        
        return jsonify({'song id': song_id, 'Ratings given': new_rating, 'message': 'Rating updated successfully, thanks for rating the songs'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
