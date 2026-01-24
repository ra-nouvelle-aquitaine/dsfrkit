.PHONY: install build dev dev-docs dev-example storybook lint lint-fix format format-check typecheck test clean release release-dry help

# Default target
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ──────────────────────────────────────────────
# Setup
# ──────────────────────────────────────────────

install: ## Install all dependencies
	pnpm install

# ──────────────────────────────────────────────
# Build
# ──────────────────────────────────────────────

build: ## Build all packages
	pnpm build

build-tokens: ## Build tokens package only
	pnpm --filter=@dsfrkit/tokens build

build-config: ## Build config package only
	pnpm --filter=@dsfrkit/config build

build-react: ## Build react package only
	pnpm --filter=@dsfrkit/react build

build-icons: ## Build icons package only
	pnpm --filter=@dsfrkit/icons build

build-cli: ## Build CLI package only
	pnpm --filter=@dsfrkit/cli build

# ──────────────────────────────────────────────
# Development
# ──────────────────────────────────────────────

dev: ## Start all packages in dev mode
	pnpm dev

dev-docs: ## Start docs app in dev mode
	pnpm dev:docs

dev-example: ## Start React Vite example in dev mode
	pnpm dev:example

storybook: ## Start Storybook
	pnpm storybook

# ──────────────────────────────────────────────
# Code quality
# ──────────────────────────────────────────────

lint: ## Run Biome linter
	pnpm lint

lint-fix: ## Run Biome linter with auto-fix
	pnpm lint:fix

format: ## Format code with Biome
	pnpm format

format-check: ## Check code formatting
	pnpm format:check

typecheck: ## Run TypeScript type checking
	pnpm typecheck

test: ## Run tests
	pnpm test

# ──────────────────────────────────────────────
# Quality gate (CI)
# ──────────────────────────────────────────────

check: lint typecheck build ## Run all checks (lint + typecheck + build)

# ──────────────────────────────────────────────
# Release
# ──────────────────────────────────────────────

release: ## Run semantic release
	pnpm release

release-dry: ## Run semantic release in dry-run mode
	pnpm release:dry

# ──────────────────────────────────────────────
# Cleanup
# ──────────────────────────────────────────────

clean: ## Clean all build artifacts and node_modules
	pnpm clean

clean-dist: ## Clean only dist folders
	pnpm turbo clean
