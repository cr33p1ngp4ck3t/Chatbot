import axios from 'axios';

export class NexusAI {
  constructor() {}

  // Fetch configuration from the server API
  async getConfig() {
    try {
      const response = await axios.get('../api/config'); // Fetch config from API
      return response.data;
    } catch (error) {
      console.error('Error fetching config:', error);
      return {};
    }
  }

  // Nested Model Class
  static Model = class {
    static async diffusions() {
      try {
        const config = await new NexusAI().getConfig();
        const apiKey = config.key || '';
        const endpoint = config.endpoint || '';
        const headers = { 'X-API-Key': apiKey };

        const response = await axios.get(`${endpoint}/models`, { headers });
        const data = response.data;

        const diffusions = [];
        for (const model of data.data || []) {
          if (model.type === 'v1/images/generations') {
            diffusions.push(model.id.toLowerCase());
          }
        }
        return diffusions;
      } catch (error) {
        console.error('Error fetching diffusion models:', error);
        return [];
      }
    }

    static async llms() {
      try {
        const config = await new NexusAI().getConfig();
        const apiKey = config.key || '';
        const endpoint = config.endpoint || '';
        const headers = { 'X-API-Key': apiKey };

        const response = await axios.get(`${endpoint}/models`, { headers });
        const data = response.data;

        const llms = [];
        for (const model of data.data || []) {
          if (model.type === 'v1/chat/completions') {
            llms.push(model.id.toLowerCase());
          }
        }
        return llms;
      } catch (error) {
        console.error('Error fetching LLM models:', error);
        return [];
      }
    }
  };

  async chatCompletions(model, messages, maxTokens = 1024) {
    try {
      const config = await this.getConfig();
      const endpoint = config.endpoint || '';
      const apiKey = config.key || '';
      const url = `${endpoint}/chat/completions`;

      const headers = {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      };

      const payload = { model, messages, max_tokens: maxTokens, stream: true };
      const response = await axios.post(url, payload, { headers });

      if (response.data.choices) {
        return { text: response.data.choices[0].message.content };
      } else {
        return { error: 'No response from API' };
      }
    } catch (error) {
      console.error('Error in chat completions:', error);
      return { error: 'Error communicating with chatbot' };
    }
  }
}

export default NexusAI;
