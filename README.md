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


9. References : 
    
    a. Flask Testing: https://flask.palletsprojects.com/en/2.0.x/testing/
    b. pytest Fixtures: https://docs.pytest.org/en/stable/fixture.html
    c. Flask Test Clients: https://flask.palletsprojects.com/en/2.0.x/testing/#the-test-client
    d. Flask Error Handling: https://flask.palletsprojects.com/en/2.0.x/errorhandling/
    e. Pandas DataFrame Filtering: https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html
    f. Pandas .iloc: https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.iloc.html
    g. REST API Pagination: https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#pagination
    h. Flask Pagination Examples: https://flask.palletsprojects.com/en/2.0.x/patterns/pagination/
    i. React Chart.js 2 Documentation: https://react-chartjs-2.js.org/
    j. Chart.js GitHub Repository: https://github.com/chartjs/Chart.js
    k. Tutorial on Using Chart.js with React: https://blog.logrocket.com/how-to-use-chart-js-in-react/
    l. Material UI: https://mui.com/x/react-data-grid/editing/
    m. Material UI: Pagination: https://mui.com/x/react-data-grid/pagination/
    n. Flask Tutorial - Building a REST API: https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
    o. Stackoverflow - https://stackoverflow.com/
