# Generate stylesheets.
all: render

style:
	sass --update assets/scss:assets/stylesheets

render: style
	rm  words/*.html
	python scripts/render.py

