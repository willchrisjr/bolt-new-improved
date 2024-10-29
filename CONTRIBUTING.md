# Contributing to Bolt.new Fork

First off, thank you for considering contributing to Bolt.new! This fork aims to expand the capabilities of the original project by integrating multiple LLM providers and enhancing functionality. Every contribution helps make Bolt.new a better tool for developers worldwide.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Adding New LLM Providers and Models](#adding-new-llm-providers-and-models)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### 🐞 Reporting Bugs and Feature Requests
- Check the issue tracker to avoid duplicates
- Use the issue templates when available
- Include as much relevant information as possible
- For bugs, add steps to reproduce the issue

### 🔧 Code Contributions
1. Fork the repository
2. Create a new branch for your feature/fix
3. Write your code
4. Submit a pull request

### ✨ Becoming a Core Contributor
We're looking for dedicated contributors to help maintain and grow this project. If you're interested in becoming a core contributor, please fill out our [Contributor Application Form](https://forms.gle/TBSteXSDCtBDwr5m7).

## Pull Request Guidelines

### 📝 PR Checklist
- [ ] Branch from the main branch
- [ ] Update documentation if needed
- [ ] Manually verify all new functionality works as expected
- [ ] Keep PRs focused and atomic

### 👀 Review Process
1. Manually test the changes
2. At least one maintainer review required
3. Address all review comments
4. Maintain clean commit history

## Coding Standards

### 💻 General Guidelines
- Follow existing code style
- Comment complex logic
- Keep functions focused and small
- Use meaningful variable names

## Development Setup

### 🔄 Initial Setup
1. Clone the repository:
```bash
git clone https://github.com/coleam00/bolt.new-any-llm.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
   - Rename `.env.example` to `.env.local`
   - Add your LLM API keys (only set the ones you plan to use):
```bash
GROQ_API_KEY=XXX
OPENAI_API_KEY=XXX
ANTHROPIC_API_KEY=XXX
...
```
   - Optionally set debug level:
```bash
VITE_LOG_LEVEL=debug
```
**Important**: Never commit your `.env.local` file to version control. It's already included in .gitignore.

### 🚀 Running the Development Server
```bash
pnpm run dev
```

**Note**: You will need Google Chrome Canary to run this locally if you use Chrome! It's an easy install and a good browser for web development anyway.

## Adding New LLM Providers and Models

To add new LLM providers and models, follow these steps:

1. **Update `MODEL_LIST` in `app/utils/constants.ts`**:
   - Open the `app/utils/constants.ts` file.
   - Locate the `MODEL_LIST` constant.
   - Add a new entry to the `MODEL_LIST` array with the following structure:
     ```typescript
     {
       name: 'model-id', // The model ID from the provider's API documentation
       label: 'Model Label', // A label for the frontend model dropdown
       provider: 'ProviderName' // The name of the provider
     }
     ```

2. **Implement Provider-Specific Logic**:
   - If the provider is not already implemented, you will need to add provider-specific logic in `app/lib/.server/llm/model.ts`.
   - Create a new function for the provider that encapsulates its specific logic.
   - Ensure the function returns a consistent interface.

3. **Manage API Keys and Base URLs**:
   - Add the provider's API key and base URL to the central configuration in `app/lib/.server/llm/api-key.ts`.
   - Use environment variables to manage these values.

4. **Handle Errors Gracefully**:
   - Implement error handling for the new provider to manage issues like invalid API keys or network errors.

5. **Document the New Provider**:
   - Update the documentation in `app/lib/.server/llm/model.ts` to include the new provider.
   - Add any specific requirements or limitations for the new provider.

6. **Test the Integration**:
   - Manually verify that the new provider and model work as expected.
   - Ensure that the functions return a consistent interface and handle errors gracefully.

7. **Update the `README.md`**:
   - Add information about the new provider and model to the `README.md` file.
   - Include any specific setup instructions or requirements.

By following these steps, you can add new LLM providers and models to Bolt.new, making it even more versatile and powerful.
