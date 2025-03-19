
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from google.cloud import dialogflow_v2beta1 as dialogflow
from config import DIALOGFLOW_AGENTS
import uuid

app = Flask(__name__)
CORS(app)

def detect_intent_text(project_id, session_id, text, language_code="en", location=None, agent_id=None):
    """
    Send text to Dialogflow and return the response.
    
    Args:
        project_id: Google Cloud project ID
        session_id: Session ID for the conversation
        text: Text input from the user
        language_code: Language code (default: 'en')
        location: Location for Dialogflow CX (used only for CX, can be None for ES)
        agent_id: Agent ID for Dialogflow CX (used only for CX, can be None for ES)
    """
    try:
        # For Dialogflow CX, we use a different approach
        if location and agent_id:
            # Using Dialogflow CX
            print(f"Using Dialogflow CX with project: {project_id}, location: {location}, agent: {agent_id}")
            
            # Let's use the specific DialogflowCX client
            # Import all required classes directly from the dialogflowcx module
            from google.cloud import dialogflowcx_v3
            
            # Initialize the CX client with the correct endpoint for the location
            cx_client = dialogflowcx_v3.SessionsClient(client_options={
                "api_endpoint": f"{location}-dialogflow.googleapis.com"
            })
            
            # Construct the session path correctly
            session_path = f"projects/{project_id}/locations/{location}/agents/{agent_id}/sessions/{session_id}"
            
            print(f"Using session path: {session_path}")
            
            # Create text input for CX using the correct imports
            text_input = dialogflowcx_v3.TextInput(text=text)
            query_input = dialogflowcx_v3.QueryInput(text=text_input, language_code=language_code)
            
            request_obj = dialogflowcx_v3.DetectIntentRequest(
                session=session_path,
                query_input=query_input
            )
            
            # Make the request
            try:
                response = cx_client.detect_intent(request=request_obj)
                
                # Debug info
                print(f"Query text: {response.query_result.text}")
                print(f"Intent detected: {response.query_result.intent.display_name}")
                print(f"Intent confidence: {response.query_result.intent_detection_confidence}")
                
                # Extract response text (messages)
                fulfillment_messages = []
                for message in response.query_result.response_messages:
                    if hasattr(message, 'text') and message.text:
                        fulfillment_messages.extend(message.text.text)
                
                fulfillment_text = " ".join(fulfillment_messages).strip()
                if not fulfillment_text:
                    fulfillment_text = "I'm not sure how to respond to that. Can you try again?"
            except Exception as cx_error:
                print(f"Error in CX detect_intent: {str(cx_error)}")
                fulfillment_text = f"Error communicating with Dialogflow CX: {str(cx_error)}"
                
        else:
            # Using Dialogflow ES
            session_client = dialogflow.SessionsClient()
            session_path = session_client.session_path(project_id, session_id)

            text_input = dialogflow.TextInput(text=text, language_code=language_code)
            query_input = dialogflow.QueryInput(text=text_input)

            response = session_client.detect_intent(
                request={"session": session_path, "query_input": query_input}
            )

            # Debug info
            print(f"Query text: {response.query_result.query_text}")
            print(f"Intent detected: {response.query_result.intent.display_name}")
            print(f"Intent confidence: {response.query_result.intent_detection_confidence}")
            print(f"Fulfillment text: {response.query_result.fulfillment_text}")

            # Extract fulfillment text
            fulfillment_text = response.query_result.fulfillment_text.strip()

        # Handle empty responses
        if not fulfillment_text:
            return "I'm not sure how to respond to that. Can you try again?"

        return fulfillment_text
        
    except Exception as e:
        print(f"Error in detect_intent_text: {str(e)}")
        return f"Error communicating with Dialogflow: {str(e)}"

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')
        character = data.get('character')
        session_id = data.get('session_id', 'default-session')
        
        if character not in DIALOGFLOW_AGENTS:
            return jsonify({
                'success': False,
                'error': f"Character {character} not configured"
            }), 400
            
        agent_config = DIALOGFLOW_AGENTS[character]
        
        print(f"Processing message for {character}: {message}")
        
        # Pass all parameters to detect_intent_text
        response_text = detect_intent_text(
            project_id=agent_config['project_id'],
            session_id=session_id,
            text=message,
            location=agent_config.get('location'),
            agent_id=agent_config.get('agent_id')
        )
        
        print(f"Response from Dialogflow: {response_text}")
        
        return jsonify({
            'success': True,
            'response': response_text
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
