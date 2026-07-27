```markdown
# Shadow-AI-Defense Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns and conventions used in the Shadow-AI-Defense repository, a TypeScript project built with the Astro framework. You'll learn how to structure files, write and organize code, follow commit conventions, and understand the project's approach to testing. This guide ensures consistency and best practices for contributors.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userProfile.ts`, `shadowDefenseLogic.ts`

### Import Style
- Use **relative imports** for referencing local modules.
  - Example:
    ```typescript
    import { calculateRisk } from './riskCalculator';
    ```

### Export Style
- Use **named exports** for all modules.
  - Example:
    ```typescript
    // In riskCalculator.ts
    export function calculateRisk() { ... }
    ```

### Commit Messages
- Follow **conventional commit** style.
- Use the `feat` prefix for new features.
- Keep commit messages concise (average ~24 characters).
  - Example:
    ```
    feat: add risk calculation logic
    ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or module  
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Implement the feature using TypeScript and Astro conventions.
3. Use relative imports for any dependencies.
4. Export your functions or components using named exports.
5. Write corresponding tests in a `.test.ts` file.
6. Commit your changes using the `feat` prefix and a concise message.
   - Example: `feat: implement defense strategy`
7. Open a pull request for review.

### Refactoring Code
**Trigger:** When improving or restructuring existing code  
**Command:** `/refactor-code`

1. Identify the code to refactor.
2. Rename files if necessary, maintaining camelCase.
3. Update imports to remain relative.
4. Ensure all exports remain named.
5. Update or add tests as needed.
6. Commit with a conventional message.
   - Example: `feat: refactor risk logic`
7. Submit changes for review.

## Testing Patterns

- Test files use the `*.test.*` naming pattern.
  - Example: `riskCalculator.test.ts`
- The specific testing framework is not defined, but tests should be colocated with or near the modules they test.
- Example test file structure:
  ```typescript
  import { calculateRisk } from './riskCalculator';

  describe('calculateRisk', () => {
    it('returns correct risk value', () => {
      expect(calculateRisk(...)).toBe(...);
    });
  });
  ```

## Commands
| Command         | Purpose                                 |
|-----------------|-----------------------------------------|
| /add-feature    | Start the workflow for adding a feature |
| /refactor-code  | Begin the code refactoring process      |
```
