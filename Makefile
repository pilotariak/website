# SPDX-FileCopyrightText: Copyright (C) Nicolas Lamirault <nicolas.lamirault@gmail.com>
# SPDX-License-Identifier: Apache-2.0

BANNER = P I L O T A R I A K  W E B S I T E

SHELL = /bin/bash -o pipefail

DIR = $(shell pwd)

NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m
INFO_COLOR=\033[36m
WHITE_COLOR=\033[1m
MAKE_COLOR=\033[33;01m%-20s\033[0m

.DEFAULT_GOAL := help

OK=[🟢]
KO=[🔴]
WARN=[🟠]
INFO=[🔵]


.PHONY: help
help:
	@echo -e "$(OK_COLOR)      $(BANNER)$(NO_COLOR)"
	@echo "------------------------------------------------------------------"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make ${INFO_COLOR}<target>${NO_COLOR}\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  ${INFO_COLOR}%-25s${NO_COLOR} %s\n", $$1, $$2 } /^##@/ { printf "\n${WHITE_COLOR}%s${NO_COLOR}\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

guard-%:
	@if [ "${${*}}" = "" ]; then \
		echo -e "$(ERROR_COLOR)Environment variable $* not set$(NO_COLOR)"; \
		exit 1; \
	fi

check-%:
	@if $$(hash $* 2> /dev/null); then \
		echo -e "$(OK_COLOR)$(OK)$(NO_COLOR) $*"; \
	else \
		echo -e "$(ERROR_COLOR)$(KO)$(NO_COLOR) $*"; \
	fi

##@ Development

.PHONY: dev
dev: ## Start development server
	@echo -e "$(INFO)$(INFO_COLOR)[Dev] Starting Astro development server$(NO_COLOR)"
	npm run dev

.PHONY: build
build: ## Build the website
	@echo -e "$(INFO)$(INFO_COLOR)[Build] Building Astro website$(NO_COLOR)"
	npm run build

.PHONY: preview
preview: ## Preview the built website
	@echo -e "$(INFO)$(INFO_COLOR)[Preview] Starting preview server$(NO_COLOR)"
	npm run preview

##@ Dependencies

.PHONY: install
install: ## Install dependencies
	@echo -e "$(INFO)$(INFO_COLOR)[Install] Installing dependencies$(NO_COLOR)"
	npm install

##@ Quality

.PHONY: lint
lint: ## Run linters
	@echo -e "$(INFO)$(INFO_COLOR)[Lint] Running linters$(NO_COLOR)"
	npm run lint

.PHONY: check
check: ## Run Astro check
	@echo -e "$(INFO)$(INFO_COLOR)[Check] Running Astro type check$(NO_COLOR)"
	npm run astro check

##@ Maintenance

.PHONY: clean
clean: ## Clean build artifacts
	@echo -e "$(INFO)$(INFO_COLOR)[Clean] Removing build artifacts$(NO_COLOR)"
	rm -rf dist/ .astro/
