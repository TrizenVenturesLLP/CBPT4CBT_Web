
const API_URL = 'http://localhost:5000/api';

export const sendMessageToDialogflow = async (
  message: string, 
  character: string, 
  sessionId: string = 'default-session'
): Promise<string> => {
  try {
    console.log('Sending message to Flask backend:', { message, character, sessionId });
    
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        character,
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Received response from Flask backend:', data);

    if (!data.success) {
      throw new Error(data.error || 'Failed to get response from server');
    }

    return data.response;
  } catch (error) {
    console.error('Error in sendMessageToDialogflow:', error);
    throw error;
  }
};
