#!/usr/bin/env python3
"""
Modern static site generator for dougblack.io
Supports front matter, RSS/sitemap generation, and live reload dev server
"""

import os
import sys
import argparse
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Dict, Optional
import yaml
import frontmatter
import markdown
import jinja2
from feedgen.feed import FeedGenerator
import http.server
import socketserver
import threading
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class Post:
    """Represents a blog post with metadata"""

    def __init__(self, filepath: Path, config: dict):
        self.filepath = filepath
        self.config = config
        self.slug = self.filepath.stem  # Set slug first!

        # Parse front matter
        with open(filepath, 'r', encoding='utf-8') as f:
            self.post = frontmatter.load(f)

        # Extract metadata with fallbacks
        self.title = self.post.get('title', self._title_from_filename())
        self.date = self._parse_date()
        self.description = self.post.get('description', '')
        self.tags = self.post.get('tags', [])

        # Generate HTML content
        self.content = self._render_markdown()

    def _title_from_filename(self) -> str:
        """Generate title from filename if not in front matter"""
        return ' '.join(word.title() for word in self.slug.split('-'))

    def _parse_date(self) -> datetime:
        """Parse date from front matter or use file modification time"""
        if 'date' in self.post:
            date_val = self.post['date']
            if isinstance(date_val, datetime):
                # Ensure timezone-aware
                if date_val.tzinfo is None:
                    return date_val.replace(tzinfo=timezone.utc)
                return date_val
            if isinstance(date_val, str):
                try:
                    dt = datetime.strptime(date_val, '%Y-%m-%d')
                    return dt.replace(tzinfo=timezone.utc)
                except ValueError:
                    pass

        # Fallback to file modification time
        dt = datetime.fromtimestamp(self.filepath.stat().st_mtime)
        return dt.replace(tzinfo=timezone.utc)

    def _render_markdown(self) -> str:
        """Convert markdown to HTML with extensions"""
        extensions = self.config['build'].get('markdown_extensions', [])
        extension_configs = {}

        if 'codehilite' in extensions:
            extension_configs['codehilite'] = self.config['build'].get('codehilite', {})

        return markdown.markdown(
            self.post.content,
            extensions=extensions,
            extension_configs=extension_configs
        )

    @property
    def url(self) -> str:
        """Full URL to the post"""
        return f"{self.config['site']['url']}/words/{self.slug}.html"

    @property
    def output_path(self) -> Path:
        """Output HTML file path"""
        return Path(self.config['paths']['output']) / f"{self.slug}.html"


class SiteGenerator:
    """Main site generator class"""

    def __init__(self, config_path: str = 'config.yaml'):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)

        # Setup Jinja2
        template_loader = jinja2.FileSystemLoader(
            searchpath=self.config['paths']['templates']
        )
        self.jinja_env = jinja2.Environment(loader=template_loader)

        self.posts: List[Post] = []

    def load_posts(self) -> List[Post]:
        """Load and parse all markdown files"""
        markdown_dir = Path(self.config['paths']['markdown'])
        self.posts = []

        for filepath in markdown_dir.glob('*.md'):
            try:
                post = Post(filepath, self.config)
                self.posts.append(post)
            except Exception as e:
                print(f"Error processing {filepath}: {e}", file=sys.stderr)

        # Sort by date, newest first
        self.posts.sort(key=lambda p: p.date, reverse=True)
        return self.posts

    def render_posts(self):
        """Render all posts to HTML"""
        template = self.jinja_env.get_template('word.html')
        output_dir = Path(self.config['paths']['output'])
        output_dir.mkdir(exist_ok=True)

        for post in self.posts:
            output_html = template.render(
                title=post.title,
                content=post.content,
                post=post
            )

            with open(post.output_path, 'w', encoding='utf-8') as f:
                f.write(output_html)

            print(f"Rendered: {post.slug}")

    def generate_rss(self):
        """Generate RSS feed"""
        if not self.config['feed'].get('enabled', False):
            return

        fg = FeedGenerator()
        fg.id(self.config['site']['url'])
        fg.title(self.config['feed']['title'])
        fg.author({'name': self.config['site']['author']})
        fg.link(href=self.config['site']['url'], rel='alternate')
        fg.description(self.config['feed']['description'])
        fg.language('en')

        # Add posts to feed
        for post in self.posts[:10]:  # Latest 10 posts
            fe = fg.add_entry()
            fe.id(post.url)
            fe.title(post.title)
            fe.link(href=post.url)
            fe.description(post.description or post.content[:200])
            fe.published(post.date)

        # Write RSS file
        output_path = self.config['feed']['output']
        fg.rss_file(output_path, pretty=True)
        print(f"Generated RSS feed: {output_path}")

    def generate_sitemap(self):
        """Generate XML sitemap"""
        if not self.config['sitemap'].get('enabled', False):
            return

        sitemap_xml = ['<?xml version="1.0" encoding="UTF-8"?>']
        sitemap_xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

        # Add homepage
        sitemap_xml.append('  <url>')
        sitemap_xml.append(f'    <loc>{self.config["site"]["url"]}/</loc>')
        sitemap_xml.append('    <changefreq>weekly</changefreq>')
        sitemap_xml.append('    <priority>1.0</priority>')
        sitemap_xml.append('  </url>')

        # Add posts
        for post in self.posts:
            sitemap_xml.append('  <url>')
            sitemap_xml.append(f'    <loc>{post.url}</loc>')
            sitemap_xml.append(f'    <lastmod>{post.date.strftime("%Y-%m-%d")}</lastmod>')
            sitemap_xml.append('    <changefreq>monthly</changefreq>')
            sitemap_xml.append('    <priority>0.8</priority>')
            sitemap_xml.append('  </url>')

        sitemap_xml.append('</urlset>')

        # Write sitemap file
        output_path = self.config['sitemap']['output']
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(sitemap_xml))

        print(f"Generated sitemap: {output_path}")

    def build(self):
        """Full build: load posts, render HTML, generate feeds"""
        print("Building site...")
        self.load_posts()
        print(f"Found {len(self.posts)} posts")
        self.render_posts()
        self.generate_rss()
        self.generate_sitemap()
        print("Build complete!")


class LiveReloadHandler(FileSystemEventHandler):
    """Watch for file changes and trigger rebuild"""

    def __init__(self, generator: SiteGenerator):
        self.generator = generator
        self.last_build = 0

    def on_modified(self, event):
        if event.is_directory:
            return

        # Debounce: only rebuild once per second
        import time
        now = time.time()
        if now - self.last_build < 1:
            return

        # Only rebuild for relevant files
        filepath = Path(event.src_path)
        if filepath.suffix in ['.md', '.html', '.yaml', '.css']:
            print(f"\n{filepath.name} changed, rebuilding...")
            try:
                self.generator.build()
                self.last_build = now
            except Exception as e:
                print(f"Build error: {e}", file=sys.stderr)


def serve(generator: SiteGenerator, port: int = 8000):
    """Run development server with live reload"""
    # Start file watcher
    observer = Observer()
    handler = LiveReloadHandler(generator)

    # Watch markdown, templates, and CSS directories
    observer.schedule(handler, generator.config['paths']['markdown'], recursive=False)
    observer.schedule(handler, generator.config['paths']['templates'], recursive=False)
    observer.schedule(handler, 'assets/css', recursive=False)
    observer.schedule(handler, '.', recursive=False)  # For config.yaml

    observer.start()
    print(f"Watching for changes...")

    # Start HTTP server
    class Handler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, format, *args):
            # Suppress default logging
            pass

    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"\nDevelopment server running at http://localhost:{port}")
        print("Press Ctrl+C to stop\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server...")
            observer.stop()

    observer.join()


def main():
    parser = argparse.ArgumentParser(description='Static site generator for dougblack.io')
    parser.add_argument('command', nargs='?', default='build',
                       choices=['build', 'serve'],
                       help='Command to run (default: build)')
    parser.add_argument('--port', type=int, default=8000,
                       help='Port for dev server (default: 8000)')
    parser.add_argument('--config', default='config.yaml',
                       help='Config file path (default: config.yaml)')

    args = parser.parse_args()

    # Initialize generator
    try:
        generator = SiteGenerator(args.config)
    except FileNotFoundError:
        print(f"Error: Config file '{args.config}' not found", file=sys.stderr)
        sys.exit(1)

    # Execute command
    if args.command == 'build':
        generator.build()
    elif args.command == 'serve':
        # Initial build
        generator.build()
        # Start server with live reload
        port = generator.config.get('dev', {}).get('port', args.port)
        serve(generator, port)


if __name__ == '__main__':
    main()
