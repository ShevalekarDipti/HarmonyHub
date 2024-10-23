# vivproassignment
1. clone the repo
    * git clone https://github.com/ShevalekarDipti/vivproassignment.git
    * cd Vivpro

2. frontend installations -
    * cd .\frontend\ 
    * npm install

3. frontend run-
    * cd .\frontend\   
    * npm start

4. backend installation-
    * pip install Flask
    * pip install Flask-CORS

5. backend run-
    * python .\api.py   

6. To test in postman-
    * set to GET, add URL = http://127.0.0.1:5000/api/songs?page=1&per_page=10
    * set to GET, add URL = http://127.0.0.1:5000/api/songs/search?title=3AM&page=1&per_page=$10
    * set to PUT, add URL = http://127.0.0.1:5000/api/songs/rate/5vYA1mW9g2Coh1HUFUSmlb
        in json body add
        {
        "rating": 4
            }
        in headers add-
        Content-Type = application/json

7. To check API response in browser 
    * inspect the page 
    * Go to network 
    * try hitting different end points
    * Click on newly generated element
    * check the reponse format and data

8. To run unit tests-
    * cd Vivpro
    * pytest .\test\normalizationTest.py

