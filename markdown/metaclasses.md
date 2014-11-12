# Metaclasses in Python
#### Posted on November 11, 2014

Python is&mdash;in general&mdash;a well designed, straightforward language. An
enterprising young programmer need only run `import this` in the interpreter
to be reminded of what it means to be "Pythonic":

> Beautiful is better than ugly.

> Explicit is better than implicit.

> Simple is better than complex.

...and so on. But what is often glossed over when praising Python for all
of its wonders is how incredibly mutable everything is. I mean *excessively*
so. You can set a variable on a *function*. You can set a variable on a *class*.
Hell, you can even set a class on a function! Generally, practices such as these
are frowned upon in most intro CS courses, and for good reason&mdash;power such as
this is too easily abused.

But, ignore all that, for today I'm going to take you on a tour of one of the more
amazing examples of Python's mutability&mdash;metaclasses.

*This article is written from the perspective of Python 2.7.*

## What Is A Class?

Before we delve into the magic of metaclasses, we should revisit classes.
What's a class? A class is used to construct an object. Sounds simple
enough. In compiled languages like Java, we know that we define a
class, that class gets compiled, and then we can create objects using
that class at runtime. Because class definitions are resolved at compile
time, they are *immutable*. In Java, it's not possible to change a class
definition during runtime. At least, not without significant black magic.

But, what about in interpreted languages?

Interestingly, interpreted languages don't suffer the same constraint.
Since everything happens at runtime, everything is in play! In fact,
Python classes are actually objects.

I'll repeat that, because it's important.

*Python classes are actually objects.*

(The same is true in Smalltalk, a significant influence on Python.)

## Classes Are Objects

This is a very strange concept if you're coming from a Java background,
but if you think about it you'll quickly realize this makes sense. If
you've ever spent time in the Python interpreter you've probably noticed
you can set attributes on just about anything.

    :::python
    >>> class Foo(object):
    ...     pass
    ...

    >>> Foo.bar = 10
    >>> Foo.bar
    10

We just modified a class! This implies that it's not just a class, it's an
object in memory. This means we can change it. But it *is* also class, meaning
that it can be used to create objects.

    :::python
    >>> Foo
    <class __main__.Foo>
    >>> f = Foo()
    >>> print(f)
    <__main__.Foo object at 0x10b45f110>

So in Python, a class is an object that can create objects. You could also
call it an "object factory". Simple.

But, what creates classes?

## Type

Before we answer that question, let's revisit out a particularly important
part of python: `type`. You probably know `type` as the function you
use to check the type of a variable.

    :::python
    >>> foo = 'bar'
    >>> type(foo)
    <type 'str'>
    >>> x = 10
    >>> type(x)
    <type 'int'>

But `type` is sneaky. It has another, *way* more important use: it is
the thing that creates classes! The syntax is `type(name, bases, attrs)`.
In fact,

    :::python
    class Foo(object):
        foo = "bar"

is really just syntactic sugar for

    :::python
    Foo = type('Foo', (object,), {'foo': 'bar'})

Check it out:

    :::python
    >>> class Foo(object):
    ...     foo = 'bar'
    ...
    >>> Foo
    <class __main__.Foo>
    >>> Foo.foo
    'bar'
    >>>
    >>> type('Bar', (object,), {'foo': 'bar'})
    >>> Bar
    <class __main__.Bar>
    >>> Bar.foo
    'bar'

This means that all the class definitions you've ever written could be
rewritten using `type`. So, if writing a class lets us customize the creation
of an object, is there something that lets us customize the creation of a class?

Great question. It's almost like you read the title of this post. You must be smart.

## Metaclasses

Enter metaclasses. If you've been following along so far, you should be
quite comfortable with the following analogy: classes are to objects what
metaclasses are to classes. Let's jump right into a full-fledged example.

    :::python
    import types

    def crazy_decorator(func):
        # let's pretend crazy stuff is going on here
        return func

    class MetaClass(type):
        def __new__(cls, name, bases, attrs):

            for name, value in attrs.items():
                if type(value) is types.MethodType:
                    attrs[name] = crazy_decorator(value)

            return super(MetaClass, cls).__new__(name, bases, attrs)

    class Foo(object):
        __metaclass__ = MetaClass

        def bar(self):
            pass

        de baz(self):
            pass


In this snippet, we create a metaclass named `MetaClass`. `MetaClass`
decorates every method the input class, and makes the *class definition*
of `Foo` automatically have `crazy_decorator` applied to each of its
methods.

There are a few things to note here.

Our metaclass inherits from `type`! As we've already seen, `type`
is used to create classes, so if we're customizing this class creation
it only makes sense that we inherit from `type` rather than `object`.

To invoke the metaclass, the `Foo` class declares the
`__metaclass__` attribute. This is the syntax used in Python 2.7.
If you're using Python 3+, metaclasses are declared in class bases using
the `metaclass` keyword.

    :::python

    class Foo(metaclass=MetaClass):
        pass

The metaclass declares the `__new__` method. This method is invoked during
class creation for every class that declares `MetaClass` as its metaclass.
It receives four arguments.

- `cls`: the class being declared.
- `name`: the name of the class being declared.
- `bases`: the bases of the class being declared. Here, 'bases' means parent classes.
- `attrs`: the attributes of the class being declared.

We can then modify these arguments at will, provided we remember to pass them to the
superclass's `__new__` method.


## Runtime

What actually happens at runtime though? Any time Python reaches a class definition
(blocks that start with `class`), it performs the following four steps to create the
class object.

1. Checks for a `__metaclass__` attribute in the currently-executing class declaration.
2. Checks for a `__metaclass__` attribute in the currently enclosing module.
3. Checks for a `__metaclass__` attribute in any of that class's parent classes.
4. If all of the above checks fail, Python defaults to the one metaclass to rule them all: `type`.

If at anytime during those four steps, Python finds a `__metaclass__` attribute, it executes
the code referenced by that attribute in the creation of the class.

So, if we return to our metaclass example from the preceding section and pretend we're
the Python interpreter, here (roughly) are the steps we'd take while interpreting the code
from that example.

1. import the `types module`
2. execute the `crazy_decorator` function declaration
3. execute the `MetaClass` class declaration
4. begin executing the `Foo` class declaration
5. discover the `__metaclass__` attribute, consult `MetaClass` for the remaining
creation of the class declaration.

Pretty straightforward. If you want to use a metaclass, you need to make sure the
`__metaclass__` attribute is correctly set somewhere in Python's resolution chain.

## When Should I Use A Metaclass?

Never.

I'm serious. If you really need to use one, you likely already know you know it.
99% of the time plain old fashioned inheritance can you get you there just fine with
infinitely lower complexity. While metaclasses are definitely fun to think about and
play with, they're just not that fun to have to pick apart when entering a new codebase for the
first time.

When I started at Twilio, we had a pretty important codebase whose design seemed to hinge
upon the magic of metaclasses. As a result, the core of the project always had a bit of
a black-box feel to me and the other engineers tasked with working on it. At first, I
thought it was cool--getting to work on a project that used such an esoteric part of Python
made me feel smart, clever, and modern. Over time, however, I began to realize that it was doing
more harm than good to our mental understanding of the project, and started to question if
it was even necessary.

Eventually, I opened up a pull request that removed the metaclasses entirely. My coworkers
excitedly +1'd and we merged.

Metaclasses are way cool, but just aren't worth it.

## Questions?

[@dougblack.io](https://twitter.com/dougblackio)
