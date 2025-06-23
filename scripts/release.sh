#!/bin/bash

# Release script for @busha/ramp-web-sdk

echo "🚀 Releasing @busha/ramp-web-sdk"

# Check if version type is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/release.sh [patch|minor|major]"
    echo "  patch: 0.1.0 → 0.1.1 (bug fixes)"
    echo "  minor: 0.1.0 → 0.2.0 (new features)"
    echo "  major: 0.1.0 → 1.0.0 (breaking changes)"
    exit 1
fi

VERSION_TYPE=$1

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo "❌ Invalid version type. Use: patch, minor, or major"
    exit 1
fi

echo "📦 Bumping version ($VERSION_TYPE)..."
npm version $VERSION_TYPE --no-git-tag-version

# Get the new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ New version: $NEW_VERSION"

# Commit the version bump
echo "📝 Committing version bump..."
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"

# Create and push tag
echo "🏷️ Creating tag v$NEW_VERSION..."
git tag "v$NEW_VERSION"

# Push changes
echo "🚀 Pushing to main and tags..."
git push origin main
git push origin "v$NEW_VERSION"

echo "🎉 Release v$NEW_VERSION published!"
echo "📋 Check the GitHub Actions tab for build status." 