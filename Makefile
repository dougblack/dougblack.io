# Generate stylesheets.
all: render

style:
	sass --update assets/scss:assets/stylesheets

render: style
	python scripts/render.py

watch:
	sass --watch assets/scss:assets/stylesheets

update:
	git pull origin master
	rvm use 2.0.0
	make render
