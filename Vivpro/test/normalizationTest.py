import pytest
from flask import json
from app import app  # Absolute import since app.py is in the Vipro folder

@pytest.fixture
def client():
    app.config['TESTING'] = True  # Enable testing mode
    with app.test_client() as client:
        yield client

def test_get_songs(client):
    response = client.get('/api/songs?page=1&per_page=10')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'songs' in data
    assert len(data['songs']) <= 10  # Check pagination

def test_get_song_by_title(client):
    # Use an actual song title that exists in your dataset
    valid_song_title = '3AM'  # Adjust this to a known title from your dataset
    response = client.get(f'/api/songs/search?title={valid_song_title}')  # Adjusted to use search endpoint
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) > 0  # Ensure that we found some songs
    assert data[0]['title'] == valid_song_title  # Verify the title matches


def test_get_non_existent_song(client):
    invalid_song_title = 'abcdwdh'  # Adjust this to a known non-existent title
    response = client.get(f'/api/songs/search?title={invalid_song_title}')
    assert response.status_code == 404  

def test_rate_song_missing_rating(client):
    # Test with missing rating in the request body
    valid_song_id = '1'
    response = client.put(
        f'/api/songs/rate/{valid_song_id}',
        data=json.dumps({}),  # No rating provided
        content_type='application/json'
    )
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data['success'] is False
    assert 'error' in data 