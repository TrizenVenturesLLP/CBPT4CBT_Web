# FictScape Backend

This is the backend service for FictScape, handling Dialogflow interactions.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Unix/MacOS: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up Google Cloud credentials:
- Create a service account in Google Cloud Console
- Download the JSON key file
- Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to point to your key file:
  ```bash
  # Windows
  set GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json
  
  # Unix/MacOS
  export GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json
  ```

5. Run the application:
```bash
python app.py
```

The server will start at http://localhost:5000