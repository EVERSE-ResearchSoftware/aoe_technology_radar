---
title: "Git"
ring: adopt
segment: maintainability
tags: [version-control, collaboration]
---

Git is a distributed version control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.

## Key Features

- **Distributed**: Every developer has a full copy of the repository
- **Branching**: Create lightweight branches for features or experiments
- **Fast**: Most operations are performed locally
- **Staging Area**: Review changes before committing
- **History**: Complete history of all changes

## Why Git is Essential

Git has become the de facto standard for version control in research software because:

- Enables collaboration across distributed teams
- Provides complete history and traceability
- Supports multiple workflows (feature branches, GitFlow, etc.)
- Integrates with platforms like GitHub, GitLab, Bitbucket
- Free and open source

## Basic Commands

```bash
# Initialize a repository
git init

# Stage changes
git add .

# Commit changes
git commit -m "Your message"

# Push to remote
git push origin main

# Pull latest changes
git pull
```

## Best Practices

1. Commit often with meaningful messages
2. Use branches for new features
3. Pull before you push
4. Review changes before committing
5. Use .gitignore to exclude unnecessary files

## Resources

- [Official Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Learning Lab](https://lab.github.com/)
