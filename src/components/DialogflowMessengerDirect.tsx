
import React, { useEffect, useRef } from 'react';
import { DIALOGFLOW_AGENTS } from '../config/agents';

interface DialogflowMessengerDirectProps {
  characterName: string;
}

export function DialogflowMessengerDirect({ characterName }: DialogflowMessengerDirectProps) {
  // Find the agent configuration for the character
  const agentConfig = DIALOGFLOW_AGENTS[characterName];
  const containerRef = useRef<HTMLDivElement>(null);
  const messengerLoadedRef = useRef(false);

  useEffect(() => {
    if (!agentConfig || messengerLoadedRef.current) return;

    // Load Dialogflow Messenger scripts and styles
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
    document.head.appendChild(styleLink);

    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script.async = true;
    document.body.appendChild(script);

    // Create messenger element when script is loaded
    script.onload = () => {
      // Wait for the custom elements to be defined
      if (customElements.get('df-messenger')) {
        renderMessenger();
      } else {
        // Wait for custom elements to be defined
        customElements.whenDefined('df-messenger').then(() => {
          renderMessenger();
        });
      }
    };

    function renderMessenger() {
      // Clear any existing messenger elements in our container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        
        // Create a new df-messenger element
        const messenger = document.createElement('df-messenger');
        messenger.setAttribute('location', agentConfig.location || 'us-central1');
        messenger.setAttribute('project-id', agentConfig.projectId);
        messenger.setAttribute('agent-id', agentConfig.agentId);
        messenger.setAttribute('language-code', 'en');
        messenger.setAttribute('max-query-length', '-1');
        
        // Expand the chat by default
        messenger.setAttribute('expand', 'true');
        
        // Add messenger to the DOM
        containerRef.current.appendChild(messenger);
        messengerLoadedRef.current = true;
      }
    }

    return () => {
      // Clean up
      if (document.head.contains(styleLink)) {
        document.head.removeChild(styleLink);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      messengerLoadedRef.current = false;
    };
  }, [characterName, agentConfig]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {/* Dialogflow messenger will be dynamically added here */}
      <style>
        {`
          df-messenger {
            z-index: 999;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            --df-messenger-font-color: #000;
            --df-messenger-font-family: Google Sans;
            --df-messenger-chat-background: #f3f6fc;
            --df-messenger-message-user-background: #d3e3fd;
            --df-messenger-message-bot-background: #fff;
          }
          
          df-messenger-chat {
            height: 100% !important;
            width: 100% !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </div>
  );
}
