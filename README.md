# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey monicasvr!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/monicasvr/skills-build-applications-w-copilot-agent-mode/issues/1)

## Codespaces / Environment

- The frontend reads `VITE_CODESPACE_NAME` at build/runtime to construct the backend URL when running in GitHub Codespaces. If you run the app in Codespaces set `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` (or your environment) to the Codespace name.
- Example `.env.local` entry (copy from `octofit-tracker/frontend/.env.local.example`):

```
VITE_CODESPACE_NAME=your-codespace-name
```

- If `VITE_CODESPACE_NAME` is not set the frontend falls back to `http://localhost:8000` so local development still works.

