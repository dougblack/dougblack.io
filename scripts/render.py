import markdown
import jinja2
import os
from os.path import splitext

TEMPLATE_FILE = "word.html"

markdown_files = os.listdir('markdown')

for file in markdown_files:
    with open("markdown/%s" % file) as f:
        content = f.read()

    title = file[:-3].split('-')
    title = ' '.join(word.title() for word in title)
    md = markdown.markdown(content, extensions=['codehilite'])
    template_loader = jinja2.FileSystemLoader(searchpath="templates")
    template_env = jinja2.Environment(loader=template_loader)
    template = template_env.get_template(TEMPLATE_FILE)
    output = template.render(title=title, content=md)

    html_filename = splitext(file)[0] + '.html'
    with open('words/%s' % html_filename, 'w') as f:
        f.write(output)
