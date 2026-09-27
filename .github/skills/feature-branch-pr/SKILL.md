---
name: feature-branch-pr
description: Use whenever the user requests a new feature, enhancement, or user-facing behavior change in this repository. Require a user-chosen branch name, implement the feature on that branch, and automatically open a pull request targeting main.
---

# Feature branch and pull request workflow

Follow this workflow for every new feature, enhancement, or user-facing behavior
change. Do not use it for explanations, research, content-only questions, or
explicitly requested direct fixes on the current branch.

## Before implementation

1. Inspect the current branch, working tree, and configured remotes.
2. If the user did not provide a branch name, ask for one before changing files.
   Suggest a concise kebab-case name based on the feature.
3. Do not discard, stash, overwrite, or include unrelated local changes. If
   existing changes prevent a safe branch switch, explain the conflict and wait.
4. Fetch `origin/main` and create the requested branch from the latest
   `origin/main`.
5. If the requested branch already exists, do not overwrite it. Confirm whether
   to continue on that branch or choose another name.

## Implementation

1. Implement the complete requested feature on the new branch.
2. Keep the change focused and include directly related tests and documentation.
3. Run the smallest relevant validation commands for the change.
4. Fix failures caused by the feature before continuing.

## Commit and publish

1. Review the diff and exclude unrelated files.
2. Commit the completed feature with a concise imperative commit message.
3. Include this trailer in the commit:

   `Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>`

4. Push the branch to `origin` and set its upstream.

## Pull request

1. Automatically create a GitHub pull request from the feature branch to
   `main`; do not ask for separate permission after the user requested the
   feature.
2. Use a clear title describing the outcome.
3. In the body, include:
   - A concise summary of the user-visible change.
   - The important implementation details.
   - The validation performed.
4. Return the branch name and pull request URL to the user.

## Safety rules

- Never commit directly to `main` for a feature covered by this skill.
- Never force-push, rewrite history, or delete branches.
- Never open the pull request when validation required for the change is
  failing.
- Never merge the pull request automatically unless the user explicitly asks.
- If GitHub authentication or push access is unavailable, keep the completed
  branch and commit locally and report the exact blocker.
