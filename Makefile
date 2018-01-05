# Generate stylesheets.
all: render

style:
	sass --update assets/scss:assets/stylesheets

render: style
	source venv/bin/activate; python scripts/render.py

watch:
	sass --watch assets/scss:assets/stylesheets

update:
	git pull origin master
	rvm use 2.0.0
	make render

venv:
	virtualenv venv

install: venv
	source venv/bin/activate; pip install -r requirements.txt

clean:
	rm -rf venv
