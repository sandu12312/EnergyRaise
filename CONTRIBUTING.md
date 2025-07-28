# Professional React Native CLI Development Rules

## 📦 Project Setup & Configuration

1. Use React Native CLI for full control over native code, performance optimizations, and flexibility (e.g., integrating native modules, custom build configs).
2. Install required dependencies.
3. Use SDK versions aligned with LTS Node and stable RN versions (avoid using latest RN before it's tested in production).
4. Setup native environments properly:
   - Android: Install Android Studio, set ANDROID_HOME, configure emulator.
   - iOS: Xcode with proper provisioning and certificates.
5. Use TypeScript for type safety and scalable codebase.
6. Maintain strict linting and formatting rules using ESLint + Prettier.
7. Use .env files for sensitive configs (use react-native-dotenv or similar).

## ⚙️ Performance & Optimization

8. Avoid anonymous functions and arrow functions in render methods.
9. Use React.memo, useMemo, useCallback to avoid unnecessary re-renders.
10. Optimize images by using WebP or precompressing; lazy-load them when necessary.
11. Use FlatList over ScrollView for large lists and enable removeClippedSubviews, initialNumToRender, etc.
12. Use InteractionManager for deferring heavy tasks until animations/render complete.
13. Minimize re-renders with key-based controlled components and pure functional components.
14. Debounce or throttle expensive operations (e.g., input handlers, scroll events).
15. Avoid prop drilling — use Zustand, Redux Toolkit, or Context API appropriately.

## 🧠 Memory & Resource Management

16. Always clean up listeners, timers, and async calls in useEffect.
17. Monitor memory usage using Flipper, Xcode Instruments, and Android Profiler.
18. Avoid storing large data in component state — use a database or async storage.
19. Lazy-load components using dynamic imports or conditional rendering.
20. Keep component trees shallow and modular to reduce render pressure.

## 🧪 Debugging & Testing

21. Use Flipper with React Native Debugger plugin for inspecting app state, performance, and logs.
22. Log network requests using react-native-flipper, Axios interceptors, or Flipper Network plugin.
23. Use console.log only temporarily and clean up before commits.
24. Use Jest for unit tests, Detox for E2E, and React Native Testing Library for components.
25. Test app on multiple screen sizes and device types (emulators and physical).

## 🚀 Deployment & Store Guidelines

26. Generate release builds manually (gradlew assembleRelease for Android, xcodebuild or Xcode for iOS).
27. Sign apps correctly:
    - Android: Keystore + build.gradle setup.
    - iOS: Apple Developer account, provisioning profiles, App Store Connect.
28. Optimize build by enabling Proguard (Android) and Bitcode (iOS if required).
29. Avoid using Expo in production unless ejected — for full native control and package support.
30. Comply with App Store and Play Store guidelines (permissions, privacy policies, app icons, screenshots).

## 📖 Code & Project Structure

31. Organize your project by feature (domain-driven), not by type (models, screens, etc.).
32. Keep screens, components, services, and hooks in separate modular folders.
33. Write reusable, testable components and favor composition over inheritance.
34. Use a design system or UI library (e.g., NativeBase, UI Kitten, ShadCN if ported) to enforce consistency.
35. Avoid mixing business logic with UI logic — use controller/service layers when needed.

## 🔐 Security & Data Protection

36. Never commit API keys or secrets — use environment variables.
37. Secure storage with libraries like react-native-keychain or react-native-encrypted-storage.
38. Always validate input on both frontend and backend.
39. Use HTTPS for all API requests and validate SSL certificates.
40. If handling payments or sensitive data, comply with standards (e.g., PCI-DSS, GDPR).

## 📈 Analytics & Crash Reporting

41. Integrate crash analytics early (Sentry, Firebase Crashlytics).
42. Track user behavior with event-based analytics (e.g., Firebase Analytics, Segment).
43. Separate dev and prod environments to avoid pollution of production data.

## 🧼 Clean Code Practices

44. Use meaningful naming conventions for variables, functions, and components.
45. Keep components under 150 lines where possible.
46. Document complex logic with comments and README.md files for features.
47. Apply SOLID principles and functional programming practices where suitable.
48. Regularly refactor and review code to maintain technical quality.
