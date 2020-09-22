
# saasvile

![](recording.gif)

Start the Python/Django backend. 
- Install [pipenv](https://pypi.org/project/pipenv/) for your OS.
- Activate the virtual environment: `cd saasvile-be; pipenv shell;`
- Install the dependencies: `pipenv install`.
- Load seed data: `python manage.py loaddata kira`
- Start the server: `python manage.py runserver`

In a second terminal, start the JS/React frontend.
- `cd saasvile-fe`
- `npm install && npm start`
