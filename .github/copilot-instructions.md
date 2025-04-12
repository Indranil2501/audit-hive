# Copilot Instructions

## Project Overview
This project is a React-based web application that uses the following technologies:

- **React**: The primary UI framework for building user interfaces.
- **Material UI**: A popular React UI framework for component styling and design consistency.
- **Redux**: A state management library for managing application state.

## Guidelines for Development

### React
- Use functional components with hooks (e.g., `useState`, `useEffect`, `useSelector`, `useDispatch`) for state and lifecycle management.
- Follow best practices for component structure and reusability.
- Ensure proper routing using `react-router-dom`.

### Material UI
- Use Material UI components for consistent styling and design.
- Customize Material UI themes as needed to match the application's branding.
- Avoid inline styles; prefer Material UI's `sx` prop or styled components.

### Redux
- Use `@reduxjs/toolkit` for creating slices and managing the Redux store.
- Keep the Redux state structure simple and modular.
- Use `useSelector` to access state and `useDispatch` to dispatch actions.

## Folder Structure
- **src/components**: Reusable UI components.
- **src/pages**: Page-level components for routing.
- **src/redux**: Redux store configuration.
- **src/features**: Feature-specific slices and logic.
- **src/api**: API service files for handling network requests.

## Coding Standards
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for consistent code quality.
- Use meaningful variable and function names.
- Write comments for complex logic or non-obvious code.
- Ensure all code is properly linted and formatted before committing.

## Testing
- Write unit tests for components and Redux slices using `@testing-library/react` and `jest`.
- Ensure all tests pass before merging code.

## Contribution Workflow
1. Create a new branch for each feature or bug fix.
2. Write clean, modular, and well-documented code.
3. Test your changes locally.
4. Submit a pull request for review.
5. Address any feedback before merging.

## Additional Notes
- Use the `.env` files for managing environment-specific configurations.
- Follow the `README.md` for running and building the project.

By adhering to these instructions, you can ensure a consistent and maintainable codebase.
