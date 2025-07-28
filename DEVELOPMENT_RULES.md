# React Native Development Rules - Concise Version

## Core Principles

- Use TypeScript for type safety
- Follow clean code practices (meaningful names, small components, SOLID)
- Separate business logic from UI components
- Optimize performance (avoid unnecessary renders, use proper list components)
- Clean up resources (listeners, timers, async calls)
- Secure sensitive data (API keys, user data)
- Always use the latest stable versions of node modules and SDKs
- Ensure version compatibility across all dependencies

## Key Practices

1. **Performance**

   - Use React.memo, useMemo, useCallback for optimizations
   - FlatList instead of ScrollView for lists
   - Debounce expensive operations
   - Avoid anonymous functions in render

2. **State Management**

   - Context API for simple state
   - Zustand/Redux for complex state
   - Avoid prop drilling

3. **Code Structure**

   - Organize by feature/domain
   - Keep components under 150 lines
   - Use separate folders for screens, components, services, hooks

4. **Security**

   - Store secrets in .env files
   - Use secure storage for sensitive data
   - HTTPS for all API requests

5. **Testing & Quality**

   - Write tests for critical components
   - Test on multiple screen sizes
   - Remove console.logs before commits

6. **Versioning & Dependencies**
   - Use the latest stable versions of all dependencies
   - Keep React Native, Node.js, and native SDKs up-to-date
   - Lock dependency versions in package.json to prevent breaking changes
   - Regularly update dependencies for security patches
   - Test thoroughly after any dependency update

## Tech Stack

- React Native CLI with TypeScript
- Firebase for backend services
- Styled Components/NativeWind for styling
- React Navigation for routing
