# SoccerBrite Server

This is the server application for SoccerBrite, built using Flask.

## Requirements

- Python 3.8+
- Flask
- Other dependencies listed in `requirements.txt`

## Installation

1. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

1. Set the Flask application environment variable:

   ```bash
   export FLASK_APP=app.py  # On Windows use `set FLASK_APP=app.py`
   ```

2. Run the Flask server:
   ```bash
   flask run
   ```

The server will start on `http://127.0.0.1:5000/`.

## Project Structure

```
/soccerbrite
    /server
        app.py
        requirements.txt
        README.md
```

- `app.py`: The main Flask application file.
- `requirements.txt`: List of dependencies.
