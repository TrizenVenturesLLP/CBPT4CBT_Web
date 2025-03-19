import React, { useEffect } from 'react';

const DialogflowMessenger: React.FC = () => {
  useEffect(() => {
    const script1 = document.createElement('link');
    script1.rel = 'stylesheet';
    script1.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
      if (document.body.contains(script2)) {
        document.body.removeChild(script2);
      }
    };
  }, []);

  return (
    <>
      <div id="df-messenger-container">
        <df-messenger 
          location="us-central1"
          project-id="fictscape-v01"
          agent-id="6c9dbf38-4b2a-40c6-8a5e-e00dd7518d73"
          language-code="en"
          max-query-length="-1"
        >
          <df-messenger-chat-bubble chat-title="Peter Parker" />
        </df-messenger>
      </div>

      <style>
        {`
          df-messenger {
            z-index: 999;
            position: fixed;
            --df-messenger-font-color: #000;
            --df-messenger-font-family: Google Sans;
            --df-messenger-chat-background: #f3f6fc;
            --df-messenger-message-user-background: #d3e3fd;
            --df-messenger-message-bot-background: #fff;
            bottom: 16px;
            right: 16px;
          }
        `}
      </style>
    </>
  );
};

export default DialogflowMessenger;