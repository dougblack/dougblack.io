# Modern static site generator for dougblack.io
# No SCSS compilation needed - using modern CSS!

.PHONY: all build serve install clean help

# Default target
all: build

# Build the site
build:
	@source venv/bin/activate && python scripts/render.py build

# Alias for build (backwards compatibility)
render: build

# Development server with live reload
serve:
	@source venv/bin/activate && python scripts/render.py serve

# Create virtual environment and install dependencies
venv:
	python3 -m venv venv

install: venv
	source venv/bin/activate && pip install -r requirements.txt

# Update and rebuild (for deployment)
update:
	git pull origin master
	make build

# Clean up
clean:
	rm -rf venv

# Show help
help:
	@echo "Available targets:"
	@echo "  make          - Build the site (default)"
	@echo "  make build    - Build the site"
	@echo "  make serve    - Run dev server with live reload"
	@echo "  make install  - Set up virtual environment and install dependencies"
	@echo "  make update   - Pull latest changes and rebuild"
	@echo "  make clean    - Remove virtual environment"
