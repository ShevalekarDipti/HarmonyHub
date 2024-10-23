# vivproassignment
1. clone the repo
    * git clone https://github.com/ShevalekarDipti/vivproassignment.git
    * cd Vivpro

2. frontend installations -
    * cd .\frontend\ 
    * npm install -g create-react-app
    * npm install

3. frontend run-
    * cd .\frontend\   
    * npm start

4. backend installation-
    * cd .\Vivpro\
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

    * cd .\Vivpro\
    * pip install pytest
    * venv\Scripts\activate
    * pip install -r requirements.txt
    * pytest .\test\normalizationTest.py


    References : 
    
1. Flask Testing: https://flask.palletsprojects.com/en/2.0.x/testing/
2. pytest Fixtures: https://docs.pytest.org/en/stable/fixture.html
3. Flask Test Clients: https://flask.palletsprojects.com/en/2.0.x/testing/#the-test-client
4. Flask Error Handling: https://flask.palletsprojects.com/en/2.0.x/errorhandling/
5. Pandas DataFrame Filtering: https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html
6. Pandas .iloc: https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.iloc.html
7. REST API Pagination: https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#pagination
8. Flask Pagination Examples: https://flask.palletsprojects.com/en/2.0.x/patterns/pagination/
9. React Chart.js 2 Documentation: https://react-chartjs-2.js.org/
10. Chart.js GitHub Repository: https://github.com/chartjs/Chart.js
11. Tutorial on Using Chart.js with React: https://blog.logrocket.com/how-to-use-chart-js-in-react/
12. Material UI: https://mui.com/x/react-data-grid/editing/
13. Material UI: Pagination: https://mui.com/x/react-data-grid/pagination/
14. Flask Tutorial - Building a REST API: https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
15. Stackoverflow - https://stackoverflow.com/
