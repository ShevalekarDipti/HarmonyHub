from flask import Blueprint, jsonify, request
from Backend import load_json, normalize_data
from flask_cors import CORS
from collections import OrderedDict
import re

api = Blueprint('api', __name__)
CORS(api)

# Get the original key order from your JSON
json_data = load_json('playlist[76][36][48][6].json')
key_order = list(json_data.keys())  # Store original key order

normalized_data = normalize_data(json_data)

@api.route('/api/songs', methods=['GET'])
def get_songs():
    page = request.args.get('page', default=0, type=int)
    per_page = request.args.get('per_page', default=10, type=int)
    start = (page - 1) * per_page
    end = start + per_page

    paginated_data = normalized_data.iloc[start:end]
    
    # Converting to dict while maitaining the  order
    songs_list = []
    for _, row in paginated_data.iterrows():
        ordered_dict = OrderedDict()
        ordered_dict['index'] = row['index'] 
        for key in key_order:  # Use the original key order
            ordered_dict[key] = row[key]
        songs_list.append(ordered_dict)

    response = OrderedDict([
        ('page', page),
        ('per_page', per_page),
        ('total_items', normalized_data.shape[0]),
        ('total_pages', (normalized_data.shape[0] + per_page - 1) // per_page),
        ('songs', songs_list)
    ])

    return response 

@api.route('/api/songs/search', methods=['GET'])
def search_songs():
    title = request.args.get('title')
    if not title:
        return jsonify({"error": "Title parameter is required"}), 400

    # Use regex to perform a case-insensitive search
    pattern = re.compile(re.escape(title), re.IGNORECASE)
    matched_songs = normalized_data[normalized_data['title'].str.contains(pattern, na=False)]

    if matched_songs.empty:
        return jsonify({"error": "Song not found"}), 404
    
    return jsonify(matched_songs.to_dict(orient='records'))


@api.route('/api/songs/rate/<string:song_id>', methods=['PUT'])
def rate_song(song_id):
    try:
        rating_data = request.json
        new_rating = rating_data.get('rating')

        # Check if the song_id exists
        if song_id not in normalized_data['id'].values:
            return jsonify({'success': False, 'error': 'Song ID does not exist'}), 404

        # Find the song in normalized_data and update its rating
        index = normalized_data.index[normalized_data['id'] == song_id].tolist()[0]
        normalized_data.at[index, 'rating'] = new_rating
        
        return jsonify({'success': True, 'song id': song_id, 'Ratings given': new_rating, 'message': 'Rating updated successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400
