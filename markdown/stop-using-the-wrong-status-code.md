# Stop Using The Wrong Status Code
#### Posted on September 14th, 2013

By my count there are over [75 HTTP status codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes). Most people probably only know about three of them. I'm sure The People Who Make Standards have probably spent a lot of time carefully arguing and slowly deliberating to reach the current set of HTTP status codes.

So, when you decide to send a 400 Bad Request back because you got a PATCH and you don't know what to do with it you are being lazy and you suck. This is the equivalent of only having one phrase for "I don't understand that sentence" in your vocabulary: "bad sentence". Its ambiguity is cruel and it does nothing to aid your conversational partner in redrafting their sentence to make sense.

What do you do if your framework forces the above behavior? *Get better tools*! This is no longer acceptable behavior on the internet. Using Python? Check out [Flask-RESTful](http://flask-restful.readthedocs.org/en/latest/). Using Ruby? [Rails](http://rubyonrails.org) has got you covered. Java? [DropWizard](http://dropwizard.codahale.com/) looks pretty good. If you're building an API, chances are high the language you're writing it in has a solid, status-code-respecting framework to help you.

Status codes. Use them correctly.

I hope you 202'd this post.
