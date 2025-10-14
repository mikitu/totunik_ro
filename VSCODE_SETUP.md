# VSCode Configuration for Totunik.ro

This document outlines the VSCode configuration setup for automatic code formatting and development workflow optimization.

## 🔧 Configuration Files

### `.vscode/settings.json`
- **Format on Save**: Automatically formats code when saving files
- **Format on Paste**: Formats code when pasting content
- **ESLint Integration**: Automatically fixes ESLint issues on save
- **Import Organization**: Automatically organizes imports on save
- **File Type Associations**: Proper syntax highlighting for TypeScript/React files
- **Tailwind CSS IntelliSense**: Enhanced autocomplete for Tailwind classes

### `.vscode/extensions.json`
Recommended extensions for optimal development experience:
- **Prettier**: Code formatter
- **ESLint**: Linting and code quality
- **Tailwind CSS IntelliSense**: Tailwind class autocomplete
- **TypeScript**: Enhanced TypeScript support
- **GitLens**: Git integration and history

### `.vscode/tasks.json`
Custom tasks for development workflow:
- **Format All Files**: Formats entire codebase
- **Check Formatting**: Validates code formatting
- **Lint and Fix**: Runs ESLint with auto-fix

## 📝 Prettier Configuration

### `.prettierrc`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### `.prettierignore`
Excludes build outputs, dependencies, and generated files from formatting.

## 🚀 Usage

### Automatic Formatting
- **On Save**: Files are automatically formatted when you save (Ctrl/Cmd + S)
- **On Paste**: Pasted content is automatically formatted
- **ESLint Fixes**: ESLint issues are automatically fixed on save

### Manual Commands
```bash
# Format all files in the web app
cd apps/web
pnpm run format

# Check if files are properly formatted
pnpm run format:check

# Run ESLint with auto-fix
pnpm run lint --fix
```

### VSCode Tasks
Access via Command Palette (Ctrl/Cmd + Shift + P):
- `Tasks: Run Task` → `Format All Files`
- `Tasks: Run Task` → `Check Formatting`
- `Tasks: Run Task` → `Lint and Fix`

## 🎯 Benefits

1. **Consistent Code Style**: All team members use the same formatting rules
2. **Automatic Quality**: ESLint issues are fixed automatically
3. **Improved Productivity**: No manual formatting needed
4. **Better Collaboration**: Consistent code reduces merge conflicts
5. **Enhanced DX**: IntelliSense and autocomplete for Tailwind CSS

## 📋 File Types Supported

- **TypeScript**: `.ts`, `.tsx`
- **JavaScript**: `.js`, `.jsx`
- **JSON**: `.json`, `.jsonc`
- **CSS/SCSS**: `.css`, `.scss`
- **HTML**: `.html`
- **Markdown**: `.md`

## 🔍 Troubleshooting

### If formatting doesn't work:
1. Ensure Prettier extension is installed and enabled
2. Check that `editor.formatOnSave` is `true` in settings
3. Verify the file type has a default formatter configured
4. Restart VSCode if needed

### If ESLint doesn't auto-fix:
1. Ensure ESLint extension is installed
2. Check that `source.fixAll.eslint` is set to `"explicit"` in code actions
3. Verify ESLint configuration is valid

### Extension Installation:
VSCode should automatically suggest installing recommended extensions when you open the workspace. If not, install them manually:
- Prettier - Code formatter (esbenp.prettier-vscode)
- ESLint (dbaeumer.vscode-eslint)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)

## 📦 Package Scripts

The following scripts are available in `apps/web/package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

This setup ensures a smooth development experience with automatic code formatting, linting, and consistent code quality across the entire project.
