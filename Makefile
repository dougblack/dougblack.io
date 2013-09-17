# Generate stylesheets.
all: render

style:
	rvm use 2.0.0
	sass --update assets/scss:assets/stylesheets

render: style
	python scripts/render.py

