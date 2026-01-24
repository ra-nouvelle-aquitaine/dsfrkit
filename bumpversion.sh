#!/bin/bash
set -e

# Script de bump de version pour semantic-release (monorepo pnpm)
# Arguments:
#   $1 - Version précédente (ex: 1.0.0)
#   $2 - Nouvelle version (ex: 1.1.0)
#   $3 - Type de release (major, minor, patch)

LAST_VERSION=$1
NEXT_VERSION=$2
RELEASE_TYPE=$3

if [ -z "$NEXT_VERSION" ]; then
  echo "Usage: $0 <last_version> <next_version> <release_type>"
  exit 1
fi

echo "══════════════════════════════════════════════════════════"
echo "  DSFRKit - Mise à jour de version"
echo "  $LAST_VERSION -> $NEXT_VERSION ($RELEASE_TYPE)"
echo "══════════════════════════════════════════════════════════"

# Fonction pour mettre à jour la version dans un package.json
update_package_version() {
  local pkg_file=$1
  local version=$2

  if [ -f "$pkg_file" ]; then
    # Utilise jq si disponible, sinon sed
    if command -v jq &> /dev/null; then
      jq --arg v "$version" '.version = $v' "$pkg_file" > "$pkg_file.tmp" && mv "$pkg_file.tmp" "$pkg_file"
    else
      sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$version\"/" "$pkg_file"
    fi
    echo "  ✓ $(dirname $pkg_file | xargs basename)"
  fi
}

# Mise à jour du package.json racine
echo ""
echo "Mise à jour du package racine..."
update_package_version "package.json" "$NEXT_VERSION"

# Mise à jour de tous les packages du workspace
echo ""
echo "Mise à jour des packages du workspace..."
for pkg in packages/*/package.json; do
  update_package_version "$pkg" "$NEXT_VERSION"
done

# Mise à jour du pnpm-lock.yaml (régénération)
echo ""
echo "Mise à jour du lockfile..."
pnpm install --lockfile-only --ignore-scripts 2>/dev/null || true
echo "  ✓ pnpm-lock.yaml"

echo ""
echo "══════════════════════════════════════════════════════════"
echo "  Version mise à jour avec succès: v$NEXT_VERSION"
echo "══════════════════════════════════════════════════════════"
