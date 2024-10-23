import pytest
from flask import json
from app import app 

@pytest.fixture
def client():
    app.config['TESTING'] = True 
    with app.test_client() as client:
        yield client

def test_get_songs(client):
    response = client.get('/api/songs?page=1&per_page=10')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'songs' in data
    assert len(data['songs']) <= 10  

def test_get_song_by_title(client):
   
    valid_song_title = '3AM' 
    response = client.get(f'/api/songs/search?title={valid_song_title}') 
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) > 0  
    assert data[0]['title'] == valid_song_title 


def test_get_non_existent_song(client):
    invalid_song_title = 'abcdwdh' 
    response = client.get(f'/api/songs/search?title={invalid_song_title}')
    assert response.status_code == 404  

def test_rate_song_missing_rating(client):
   
    invalid_song_id = '1'
    response = client.put(
        f'/api/songs/rate/{invalid_song_id}',
        data=json.dumps({}),  
        content_type='application/json'
    )
    assert response.status_code == 404
    data = json.loads(response.data)
    assert 'Error_occured' in data 