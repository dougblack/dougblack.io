---
title: Flask-RESTful 101
date: 2013-09-14
description: An introduction to building RESTful APIs with Flask-RESTful, my favorite Python framework
tags: [python, flask, rest, api, web]
---

# Flask-RESTful 101
#### Posted on September 14th, 2013

There are tons of great frameworks to help you build restful APIs. Today we're going to look at my favorite python framework: [Flask-RESTful][flask-restful-home]. I'm also completely and totally biased towards it, since it was built by Twilio and I'm currently a maintainer of the [project][flask-restful-github]. That being said, let's get started.

## Flask
Flask-RESTful is an extension of [Flask][flask-home], which itself is built on many of the excellent utilities provided by [Werkzeug][werkzeug-home]. Flask lets you do things like this:

    :::python
    from flask import Flask

    @app.route('/<string:path>', methods=['GET'])
    def root(path):
        return 'You requested: /' + path

    if __name__ == '__main__':
        app.run()

## A Simple API
As you might guess, this snippet creates a simple Flask server that responds to every request with the path requested. This is cool. Let's see how we might use Flask to build a RESTful API. We need a simple API to build, so let's build an API for managing a set of tasks. A Task API.

First let's define our endpoints. For this simple example, we'll only have one: `/tasks`. We need to allow creating a new task, retrieving all tasks, and retrieving a single task. Using what we know about Flask, the code for our Task API might look something like this:

    :::python
    from flask import Flask, request
    import task_db # handles all database interaction

    app = Flask(__name__)

    @app.route('/tasks', methods=['GET'])
    def get_all_tasks():
        return task_db.fetch_all_tasks()

    @app.route('/tasks', methods=['POST'])
    def create_task():
        task_string = request.form['task']
        task_db.create_task(task_string)
        return task_string

    @app.route('/tasks/<int:id>', methods=['GET'])
    def get_task(id)
        return task_db.fetch_task(id)

Great! We've got an API for tasks. But, do you see any issues using Flask to build a RESTful API? One of the biggest ideas behind REST is using HTTP to interact with *resources*. The problem with this code is our resource is split up over multiple methods. There's no encapsulation. While the API itself incorporates basic elements of REST, the code completely fails to capture these ideas. This is bad! There's no reason our internal code shouldn't match the external appearance of our API.

## Flask-RESTful

Enter Flask-RESTful. The same API looks like this in Flask-RESTful.

    :::python
    from flask import Flask
    from flask.ext import restful

    app = Flask(__name__)
    api = restful.Api(app)

    class Users(restful.Resource):
        def get(self):
            return task_db.fetch_all_tasks()

        def post(self):
            task_string = request.form['task']
            task_db.create_task(task_string)
            return task_string

    class User(restful.Resource)
        def get(self, id):
            return task_db.fetch_task(id)

    api.add_resource(Users, '/users')
    api.add_resource(User, '/user/<int:id>')

We have classes now! This is a huge deal. Our routes now map directly to *objects*. Even better, the methods on a given class are exactly the same as their HTTP counterparts. We no longer have to deal with naming methods on our routes like `create_task`, since there's a 1 to 1 mapping between HTTP methods and methods on our classes.

So what's actually happening here? Let's investigate.

## The API Object

First, we create a Flask-RESTful `Api` object. The `Api` object is used to assign our eventual resources to routes. We'll temporarily skip to the end of the script to show what the `Api` is used for:

    ::python
    api.add_resource(Users, '/users')
    api.add_resource(User, '/user/<int:id>')

As you might have guessed, these two lines add a given resource to our API at the specified route. We no longer need to enumerate what methods a route supports, since Flask-RESTful resolves this information by inspecting what methods you've defined on your resource object.

## Variable Rules

You might be wondering what the `<int:id>` snippet means. This is called a *variable rule*. It assigns whatever is in that part of the URI for the incoming request into a variable called "id" which is passed to the get method for User. The "int" part of the rule just makes the type of variable an int instead of a string so we can pass it directly to the `fetch_task` call.

## POST Params

Finally, you might be wondering how to get values out of the POST params. Check it out:

    :::python
    task_string = request.form['task']

POST params live on the `request` object in a `form` dictionary. It's as simple as that.
That wraps up this intro. I hope you like what you've seen so far. For more on Flask-RESTful, check out the [docs][flask-docs].

## Twilio + Flask-RESTful = <3
If you have any doubts about the viability of Flask-RESTful as framework, I'd like to let you in on a little not-so-secret: the Twilio API is powered by Flask-RESTful (and some other awesome framework magic that I'm saving for another post).

[flask-restful-github]: https://github.com/twilio/flask-restful
[flask-restful-home]: http://flask-restful.readthedocs.org/en/latest/index.html
[flask-docs]: http://flask-restful.readthedocs.org/en/latest/quickstart.html
[flask-home]: http://flask.pocoo.org/docs/
[werkzeug-home]: http://werkzeug.pocoo.org/
