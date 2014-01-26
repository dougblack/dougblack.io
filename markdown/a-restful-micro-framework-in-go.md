# A RESTful Micro-Framework in Go
#### Posted January 25th, 2014

## Why Go?

After reading countless articles about the wonders of Go, I
wanted to learn more. But, learning a new language&mdash; I
mean *really* learning it, not just getting familiar with the general
capabilities and syntax&mdash;is hard. I'm sure there are tons of books
that would purport to teach me all about it, but there is no substitute
for hands-on learning.

I'm a maintainer on the [Flask-RESTful][flask-restful] framework (which
is written in Python) but I've never built a RESTful framework from the
ground up. This should be a great opportunity to learn Go.

Let's do it.

Oh, and I've already thought of a name: `sleepy`. Clever, I know.

- [Meet net/http][meet-net-header]
- [Resource][resource-header]
- [405 Not Supported][405-header]
- [Api][api-header]
- [Putting It All Together][together-header]
- [Meeting encoding/json][json-header]
- [Construct The Response][response-header]
- [Finish The Api][finish-header]
- [Usage][usage-header]
- [Improvements][improvements-header]
- [Full Code][full-code-header]
- [Conclusion][conclusion-header]

## <a name="meet-net-header"></a>Meet `net/http`

Before we start on the RESTful part of our framework, let's get familiar
with how to use the [`http`][go-http] package to build a simple webserver
in Go.

The `http` package lets us map request paths to functions. It's
pretty simple, but provides plenty for us to work with.

    :::go
    package main

    import (
        "net/http"
    )

    func response(rw http.ResponseWriter, request *http.Request) {
        rw.Write([]byte("Hello world."))
    }

    func main() {
        http.HandleFunc("/", response)
        http.ListenAndServe(":3000", nil)
    }

When we `go run` this program, you'll notice it doesn't terminate. This
is because it's listening for connections on port 3000! Let's make a
request.

    :::bash
    $ curl localhost:3000
    Hello world.

Great. Now that we know how to build a simple server in Go. Let's make it
RESTful.

## <a name="resource-header"></a>Resource

Defining types is always a great place to start.

REST is all about resouces, so let's start with a `Resource` type. In
REST, we interact with a resource using HTTP methods. An HTTP method will
change or query the resource's state, and the resource will respond with
a status code and a potential body. The type of the body could be
anything. I think we've defined enough about a resource to create the
following type.

    :::go
    type Resource interface {
        Get(values ...url.Values) (int, interface{})
        Post(values ...url.Values) (int, interface{})
        Put(values ...url.Values) (int, interface{})
        Delete(values ...url.Values) (int, interface{})
    }

We've defined a `Resource` interface that defines the four most
common HTTP methods. The methods are *variadic*, meaning they
may be invoked with zero or more arguments. In this case, they
take a list of [`url.Values`][go-values], which is literally defined in `http`
as follows.

    :::go
    type url.Values map[string][]string

These functions return multiple arguments, an `int`, and an `interface{}`.
The `int` will be the status code of the response, while the `interface{}`
will be the data (in any format) the method returns.

## <a name="405-header"></a>405 Not Supported

But, not every resource will want to implement all of these methods.
How can we provide a default implementation of all methods that return
a `405 Method Not Supported` when called? Go doesn't allow interfaces to
provide default implementations, so I thought I was blocked. Then I
found out about *embedding*.

Basically, if you declare a struct `A` in the definition of another
struct `B`, `B` gets all of the methods of `A`, with the caveat that
the receiver of all of the embedded methods will be `A`. Using this,
I came up with the following solution:

    :::go
    type GetNotSupported struct {}
    func (GetNotSupported) Get(values ...url.Values) (int, interface{}) {
        return 405, map[string]string{"error": "Not implemented"}
    }

The definition of a `Resource` that only supports `Get` looks like
this.

    :::go
    type MyResource struct {
        PostNotSupported
        PutNotSupported
        DeleteNotSupported
    }

It's not the sexiest solution, but the only one I could think of while
still using idiomatic Go (i.e. not using the [`reflect`][go-reflect]
package).

## <a name="api-header"></a>Api

The next type we'll construct is our `Api` type. An API
*could* contain many internal fields, but let's keep it simple and
have our API just be a receiver for methods that manage our resources.

    :::go
    type Api struct {}

So, we make it an empty struct.

## <a name="together-header"></a>Putting It All Together

Revisiting our simple Go webserver, we quickly encounter a problem. Our
`Resource` methods are of type:

    :::go
    func(...url.Values) (int, interface{})

but [`http.HandleFunc`][go-handlefunc] requires a function of type:

    :::go
    func(http.ResponseWriter, *http.Request)

We need a way to rectify this discrepancy. Initially, this didn't quite
feel possible. I couldn't see how to convert a method like
`Get(values ...url.Values) (int, interface{})` to the type I needed.
It just didn't match up.

Then I remembered Go has support for first class functions! We can
pass `http.HandleFunc` a function of the correct type that turns around
and calls one of the `Resource` functions. Here's what that looks like.

    :::go

    type HandlerFunc func(http.ResponseWriter, *http.Request)

    func (api *Api) requestHandler(resource Resource) HandlerFunc {
        return func(rw http.ResponseWriter, request *http.Request) {

            method := request.Method // Get HTTP Method (string)
            request.ParseForm()      // Populates request.Form
            values := request.Form

            switch method {
            case "GET":
                code, data = resource.Get(values)
            case "POST":
                code, data = resource.Post(values)
            case "PUT":
                code, data = resource.Put(values)
            case "DELETE":
                code, data = resource.Delete(values)
            }

            // TODO: write response
        }
    }

So `requestHandler` returns a function of the correct type for
`HandleFunc`. That function dispatches to the correct `Resource`
method!

Solving this problem made me pretty happy. At first, I was stuck
because I was trying to solve this using object-oriented design. It was
a lot of fun to be initially frustrated by a perceived hole in Go's
design and then realize I was approaching the problem from the
wrong perspective. Very cool.

Anyways, back to our API.

## <a name="json-header"></a>Meet `encoding/json`

After we've received the data (of type `interface{}`) from the
`Resource` method, we need to turn it into JSON. Conveniently,
Go contains an `encoding/json` package that does just this.

The function we want is [`json.Marshal`][json-marshal]. This function
takes care of everything relates to JSON parsing for us. It takes
type `interface{}` and spits back JSON.

    ::go
    code, data = resource.Get(values)

    content, err := json.Marshal(data)
    if err != nil {
        content := api.Abort(500)
    }

Pretty straightforward.

## <a name="response-header"></a>Construct The Response

Now that we have a status code and a body, we need to actually
send the response to the client. Unsurprisingly, this is also
pretty easy with the Go standard library. We just use the
[`http.ResponseWriter`][response-writer] interface. You'll notice
it's already an input parameter to our anonymous function:

    :::go
    func(http.ResponseWriter, *http.Request)

It's a pretty simple interface.

    :::go
    rw.WriteHeader(code)
    rw.Write(content)

That's it.

## <a name="finish-header"></a>Finish The Api

We can now take a `Resource` and convert it to a method we can
give to `http.HandleFunc`. Let's make a convenience method on our
`Api` struct that makes this easy.

    :::go
    func (api *Api) AddResource(resource Resource, path string) {
        http.HandleFunc(path, api.requestHandler(resource))
    }

and a method that starts our `Api` on a given port.

    :::go
    func (api *Api) Start(port int) {
        portString := fmt.Sprintf(":%d", port)
        http.ListenAndServe(portString, nil)
    }

and finally, the `api.Abort` method we referenced earlier.

    :::go
    func (api *Api) Abort(rw http.ResponseWriter, statusCode int) {
        rw.WriteHeader(rw)
    }

## <a name="usage-header"></a>Usage

Whew. That was a lot of code snippets. Let's take a second to reflect on
what we've built by constructing an actual example. Let's assume
we've saved all of the above code into a `sleepy` module.

    :::go
    package main

    import (
        "net/url"
        "sleepy"
    )

    type HelloResource struct {
        sleepy.PostNotSupported
        sleepy.PutNotSupported
        sleepy.DeleteNotSupported
    }

    func (HelloResource) Get(values ...url.Values) (int, interface{}) {
        data := map[string]string{"hello": "world"}
        return 200, data
    }

    func main() {

        helloResource := new(HelloResource)

        var api = new(sleepy.Api)
        api.AddResource(helloResource, "/hello")
        api.Start(3000)

    }

Now we run the program and hit our new endpoint!

    :::bash
    curl localhost:3000/hello
    {"hello": "world"}

So, we construct a struct that implements `Resource`, assign it
to a path and start our `Api`. Pretty simple! We've built a working
RESTful framework in Go.

## <a name="improvements-header"></a>Improvements

There are a few things I'd like to add to `sleepy`.

- Parsing values out of the URL.
- Parameter type validation
- Support for responding with custom headers.

But not much more than that. After all, it's supposed to be a
*micro*-framework.

## <a name="full-code-header"></a>Full Code

Here's the entire 96-line framework. If you're a Go expert,
please let me know how you would have done this better!
[@dougblackio][twitter].


    :::go
    package sleepy

    import (
        "encoding/json"
        "fmt"
        "net/http"
        "net/url"
    )

    const (
        GET    = "GET"
        POST   = "POST"
        PUT    = "PUT"
        DELETE = "DELETE"
    )

    type Resource interface {
        Get(values ...url.Values) (int, interface{})
        Post(values ...url.Values) (int, interface{})
        Put(values ...url.Values) (int, interface{})
        Delete(values ...url.Values) (int, interface{})
    }

    type (
        GetNotSupported    struct{}
        PostNotSupported   struct{}
        PutNotSupported    struct{}
        DeleteNotSupported struct{}
    )

    func (GetNotSupported) Get(values ...url.Values) (int, interface{}) {
        return 405, ""
    }

    func (PostNotSupported) Post(values ...url.Values) (int, interface{}) {
        return 405, ""
    }

    func (PutNotSupported) Put(values ...url.Values) (int, interface{}) {
        return 405, ""
    }

    func (DeleteNotSupported) Delete(values ...url.Values) (int, interface{}) {
        return 405, ""
    }

    type Api struct{}

    func (api *Api) Abort(rw http.ResponseWriter, statusCode int) {
        rw.WriteHeader(statusCode)
    }

    type HandleFunc func(http.ResponseWriter, *http.Request)

    func (api *Api) requestHandler(resource Resource) HandleFunc {
        return func(rw http.ResponseWriter, request *http.Request) {

            var data interface{}
            var code int

            request.ParseForm()
            method := request.Method
            values := request.Form

            switch method {
            case GET:
                code, data = resource.Get(values)
            case POST:
                code, data = resource.Post(values)
            case PUT:
                code, data = resource.Put(values)
            case DELETE:
                code, data = resource.Delete(values)
            default:
                api.Abort(rw, 405)
                return
            }

            content, err := json.Marshal(data)
            if err != nil {
                api.Abort(rw, 500)
                return
            }

            rw.WriteHeader(code)
            rw.Write(content)
        }
    }

    func (api *Api) AddResource(resource Resource, path string) {
        http.HandleFunc(path, api.requestHandler(resource))
    }

    func (api *Api) Start(port int) {
        portString := fmt.Sprintf(":%d", port)
        http.ListenAndServe(portString, nil)
    }

## <a name="conclusion-header"></a>Conclusion

I hope this was informative. I definitely learned a lot about
the `net` package in Go and got a chance to cut my teeth on
Go's design. Again, if you see anything you would have done
better, please let me know! [@dougblack][twitter].

[`sleepy`][sleepy] is on github.

[flask-restful]: http://flask-restful.readthedocs.org/en/latest/
[json-marshal]: http://golang.org/pkg/encoding/json/#Marshal
[response-writer]: http://golang.org/pkg/net/http/#ResponseWriter
[sleepy]: http://github.com/dougblack/sleepy
[twitter]: https://twitter.com/dougblackio
[go-http]: http://golang.org/pkg/net/http/
[go-values]: http://golang.org/pkg/net/url/#Values
[go-reflect]: http://golang.org/pkg/reflect/
[go-handlefunc]: http://golang.org/pkg/net/http/#HandleFunc
[meet-net-header]: #meet-net-header
[resource-header]: #resource-header
[405-header]: #405-header
[api-header]: #api-header
[together-header]: #together-header
[json-header]: #json-header
[response-header]: #response-header
[finish-header]: #finish-header
[usage-header]: #usage-header
[improvements-header]: #Improvements-header
[full-code-header]: #full-code-header
[conclusion-header]: #conclusion-header
