import { getAPIKey, getBaseURL } from '~/lib/.server/llm/api-key';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { ollama } from 'ollama-ai-provider';
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createMistral } from '@ai-sdk/mistral';

interface ModelProvider {
  (apiKey: string, model: string): any;
}

interface ModelProviderWithBaseURL {
  (baseURL: string, apiKey: string, model: string): any;
}

const modelProviders: Record<string, ModelProvider | ModelProviderWithBaseURL> = {
  'Anthropic': getAnthropicModel,
  'OpenAI': getOpenAIModel,
  'Groq': getGroqModel,
  'OpenRouter': getOpenRouterModel,
  'Google': getGoogleModel,
  'OpenAILike': getOpenAILikeModel,
  'Deepseek': getDeepseekModel,
  'Mistral': getMistralModel,
  'Ollama': getOllamaModel,
};

export function getAnthropicModel(apiKey: string, model: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic(model);
}

export function getOpenAILikeModel(baseURL: string, apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL,
    apiKey,
  });

  return openai(model);
}

export function getOpenAIModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    apiKey,
  });

  return openai(model);
}

export function getMistralModel(apiKey: string, model: string) {
  const mistral = createMistral({
    apiKey
  });

  return mistral(model);
}

export function getGoogleModel(apiKey: string, model: string) {
  const google = createGoogleGenerativeAI(
    apiKey,
  );

  return google(model);
}

export function getGroqModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey,
  });

  return openai(model);
}

export function getOllamaModel(baseURL: string, model: string) {
  let Ollama = ollama(model);
  Ollama.config.baseURL = `${baseURL}/api`;
  return Ollama;
}

export function getDeepseekModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.deepseek.com/beta',
    apiKey,
  });

  return openai(model);
}

export function getOpenRouterModel(apiKey: string, model: string) {
  const openRouter = createOpenRouter({
    apiKey
  });

  return openRouter.chat(model);
}

export function getModel(provider: string, model: string, env: Env) {
  const apiKey = getAPIKey(env, provider);
  const baseURL = getBaseURL(env, provider);

  if (!apiKey) {
    throw new Error(`Invalid API key for provider: ${provider}`);
  }

  const modelProvider = modelProviders[provider];

  if (!modelProvider) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  try {
    if (provider === 'OpenAILike' || provider === 'Ollama') {
      return (modelProvider as ModelProviderWithBaseURL)(baseURL, apiKey, model);
    } else {
      return (modelProvider as ModelProvider)(apiKey, model);
    }
  } catch (error) {
    throw new Error(`Error fetching model from provider ${provider}: ${error.message}`);
  }
}

/**
 * Supported Providers:
 * - Anthropic
 * - OpenAI
 * - Groq
 * - OpenRouter
 * - Google
 * - OpenAILike
 * - Deepseek
 * - Mistral
 * - Ollama
 */
