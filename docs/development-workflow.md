# Development Workflow

This project uses a PR-based workflow with Vercel Preview/Production separation.

## Branch Rules

- `main`: production only.
- `feature/*`: new features.
- `fix/*`: bug fixes.
- `chore/*`: maintenance and configuration updates.

## Release Model

- `main` is connected to **Vercel Production**.
- PR branches are validated on **Vercel Preview** before merge.
- All changes must merge into `main` through Pull Requests.

## Daily Flow

1. Sync local `main` with remote latest.
2. Create a branch from `main` (`feature/*`, `fix/*`, or `chore/*`).
3. Implement changes locally.
4. Run local checks:
   - `pnpm lint`
   - `pnpm type-check`
   - `pnpm build`
5. Push the branch.
6. Open a Pull Request to `main`.
7. Wait for CI to pass.
8. Verify core flows on Vercel Preview (desktop + mobile).
9. Merge PR into `main`.
10. Confirm Vercel Production deployment from `main`.

## Must-Not Rules

- Do not push directly to `main`.
- Do not merge unfinished or unverified work to `main`.
- Do not skip Preview manual verification before merge.

## Branch Protection (for `main`)

`main` should be protected in GitHub repository settings.

Required:
- Require a pull request before merging.
- Require status checks to pass before merging.
- Require branches to be up to date before merging.

Recommended:
- Restrict direct pushes (admins-only if your team needs emergency override).
- Disable force pushes.
- Require at least 1 approval.
