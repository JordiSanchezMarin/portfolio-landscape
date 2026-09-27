---
name: git-management
description: Use whenever creating or validating branches, writing commit messages, committing changes, pushing branches, or opening pull requests in this repository. Enforce the repository branch naming, Conventional Commit, and single-commit pull request rules.
---

# Git management

Apply these rules to every Git operation in this repository.

## Branch names

Use this format:

`<type>/<kebab-case-description>`

Allowed types:

- `feat` for new user-facing functionality.
- `fix` for bug fixes.
- `docs` for documentation-only work.
- `style` for formatting or visual-only changes.
- `refactor` for behavior-preserving code restructuring.
- `perf` for performance improvements.
- `test` for test-only work.
- `build` for build system or dependency changes.
- `ci` for continuous integration changes.
- `chore` for maintenance work.
- `revert` for reverting an earlier change.

Branch requirements:

- Use lowercase ASCII letters, numbers, and hyphens only after the slash.
- Use one slash between the type and description.
- Do not use spaces, underscores, consecutive hyphens, or a trailing hyphen.
- Keep the description concise and specific.
- Validate a user-provided branch name before creating it. If it is invalid, ask
  for a corrected name and suggest a compliant alternative.
- Never commit feature work directly to `main`.

Examples:

- `feat/contact-form`
- `fix/mobile-navigation-overlap`
- `chore/resume-pdf-update`

## Commit messages

Use Conventional Commits:

`<type>(<optional-scope>): <description>`

Commit requirements:

- Use one of the allowed branch types as the commit type.
- Use a short lowercase scope when it improves clarity.
- Write the description in imperative mood and lowercase.
- Do not end the subject with a period.
- Keep the complete subject at 72 characters or fewer.
- Add a body after a blank line when the motivation or behavior needs context.
- Add `BREAKING CHANGE: <description>` in the footer only for breaking changes.
- Include this trailer unless the user explicitly asks not to:

  `Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>`

Examples:

- `feat(contact): add accessible inquiry form`
- `fix(layout): prevent hotspot overlap`
- `chore(resume): update downloadable PDF`

## One commit per pull request

- A pull request branch must contain exactly one commit that is not in its base
  branch.
- Create the first commit normally.
- For every later change on the same pull request branch, stage the change and
  run `git commit --amend --no-edit` instead of creating another commit.
- After amending an already-pushed commit, update the remote with
  `git push --force-with-lease`; never use an unrestricted force push.
- If a pull request branch already contains multiple commits, squash them into
  one before the next push.
- Only break the one-commit rule when the user explicitly requests an exception.

## Before committing

1. Confirm the current branch complies with the branch naming rules.
2. Review the staged diff and exclude unrelated files.
3. Run the smallest relevant validation for the change.
4. Check the proposed commit subject against every rule above.
5. Count commits relative to the pull request base and choose a normal commit or
   `git commit --amend --no-edit` accordingly.
6. Do not commit when relevant validation is failing.

## Pushing and pull requests

- Push the current branch to `origin` and set its upstream on the first push.
- Use `--force-with-lease` only when an amended single-commit pull request branch
  must replace its previous remote commit.
- Never use `--force`.
- Target `main` when opening a pull request unless the user specifies another
  base branch.
- Do not merge a pull request automatically unless the user explicitly asks.
