
// Agent configurations matching backend config
export const DIALOGFLOW_AGENTS: Record<string, { 
  projectId: string; 
  agentId: string; 
  location?: string;
}> = {
  "Monkey D. Luffy": {
    projectId: "fictscape-v01",
    agentId: "7f9660aa-cf6f-4470-ae63-e5d0a68e9d8e",
    location: "us-central1"
  },
  "Tony Stark": {
    projectId: "fictscape-v01",
    agentId: "297a5f15-1932-4f23-8248-1d51dcd682b2",
    location: "us-central1"
  },
  "Peter Parker": {
    projectId: "fictscape-v01",
    agentId: "6c9dbf38-4b2a-40c6-8a5e-e00dd7518d73",
    location: "us-central1"
  }
};
