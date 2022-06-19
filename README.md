# Query Runner App
This app is used to execute queries.
There are few predefined queries available in the dropdown for the user to select.
Apart from that user can type queries in the text area provided(this is a dummy section whatever the user enters the output is same).
Without entering any query in the text area if the user clicks on the execute button it throws error to the user.
On the click of the execute button the data is being displayed to the user.

# Javascript framework used in the App
React is used.
Axios is used for API call.
Json server used for data server which fetches the data from db.json.
Currently the app handles 100000 records.
If the amount of data is more that can also be handled using service worker.
Each records consists of 14 columns

# Javascript framework used in the App
The application takes 700ms to load.
This was calulated using chrome lighthouse plugin.
The load time is reduced by breaking the total data into multiple pages and showing the particular set of data at any given instance of time.

