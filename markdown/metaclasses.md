# Metaclasses
#### Posted on November 1st, 2013

Python is, in general, a well designed and straightforward language. An
enterprising young programmer need only run `import this` in the interpreter
to be reminded of what it means to be "Pythonic":

> Beautiful is better than ugly.

> Explicit is better than implicit.

> Simple is better than complex.

...and so on. But what is often glossed over when praising Python for all
of its wonders is how incredibily mutable everything is. I mean *excessively*
so. You can set a variable on a *function*. You can set a variable on a *class*.
Hell, you can even set a class on a function! Generally, practices such as these
are frowned upon in most intro CS courses, and for good reason&mdash;power such as
this is too easily abused.

But, ignore all that, for today I'm going to
take you on a tour of one of the more amazing examples of Python's
mutability&mdash;metaclasses.

## What Is A Class?

Before we delve into the magic of metaclasses, we should revist classes.
What's a class? A class is used to construct an object. Sounds simple
enough. In compiled languages like Java, we know that we can define a
class, that class gets compiled, and then we can create objects using
that class at runtime. Because class definitions are resolved at compile
time, they are *immutable*. In Java, it's not possible to change a class
definition during runtime.

But what about in interpreted languages?

Interestingly, interpreted langauges don't suffer the same constraint.
Since everything happens at runtime, everything is in play! In fact,
Python classes are actually objects.

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

We just modified a class! This implies that it's not just a class, it's an
object in memory. This means we can change it. But it *is* also class, meaning
that it can be used to create objects.

    :::python
    >>> Foo
    <class __main__Foo>
    >>> f = Foo()
    >>> print(f)
    <__main__.Foo object at 0x10b45f110>

So in Python, a class is an object that can create objects. You could also
call it an "object factory". Simple.

But, what creates classes?

## Type

Before we answer that question, let's check out a particularly important
part of python: `type`. You probably know `type` as the function you
use to check the type of a variable.

    :::python
    >>> foo = "bar"
    >>> type(foo)
    <type 'str'>
    >>> x = 10
    >>> type(x)
    <type 'int'>

But `type` has another, *way* more important use: it creates classes! The
syntax is `type(name, bases, attrs)`. In fact,

    :::python
    class Foo(object):
        foo = "bar"

is really just syntactic sugar for

    :::python
    Foo = type('Foo', (object,), {'foo': 'bar'})

Check it out:

    :::python
    >>> class Foo(object):
    ...     pass
    ...
    >>> Foo
    <class __main__.Foo>
    >>>
    >>> type('Bar', (object,), {})
    >>> Bar
    <class __main__.Bar>

This means that all the class definitions you've ever written end up
calling `type` to construct the class object. So, if writing a class
lets us customize the creation of an object, is there something that
lets us customize the creation of a class?

## Metaclasses

Enter metaclasses. If you've been following along so far, you should be
quite comfortable with the following analogy: classes are to objects what
metaclasses are to classes. Let's jump right into a full-featured example.

    :::python
    import types

    def crazy_decorator(func):
        # let's pretend crazy stuff is going on here
        return func

    class MetaClass(type):
        def __new__(cls, name, bases, attrs):

            if attrs.get('decorate', False):
                for name, value in attrs.items():
                    if type(value) is types.MethodType:
                        attrs[name] = crazy_decorator(value)

            return super(MetaClass, cls).__new__(name, bases, atts)

    class Foo(object):
        __metaclass__ = MetaClass
        decorate = True

        def bar(self):
            pass


In this snippet, we create a metaclass named `MetaClass`.
`MetaClass` checks if the class it's creating has a `decorate` property
set to `True`. If so, it decorates every method on that class with
`crazy_decorator`.

There are a few things to note here.

1. Our class inherits from `type`! As we've already seen, `type`
is used to create classes, so if we're customizing this class creation
it only makes sense that we inherit from `type` rather than `object`.
2. To invoke the metaclass, the `Foo` class declares the
`__metaclass__` attribute. This is the syntax used in Python 2.7.
If you're using Python 3+, metaclasses are declared in class bases using
the `metaclass` keyword.

        :::python

        class Foo(metaclass=MetaClass):
            ...

3. The metaclass declares the `__new__` method. This method is invoked during
class creation for every class that declares `MetaClass` as a metaclass.
It receives four arguments.
    - `cls`: the class being declared.
    - `name`: the name of the class being declared.
    - `bases`: the bases of the class being declared. Here, 'bases' means parent classes.
    - `attrs`: the attributes of the class being declared.

    We can then modify these arguments at will, provided we remember to pass them to the
    superclass's `__new__` method.


## Runtime

What actually happens at runtime though? Any time Python reaches a class definition
(blocks that start with `class`), it performs the following four steps toe create the
class object.

1. Checks for a `__metaclass__` attribute in the currently-executing class declaration.
2. Checks for a `__metaclass__` attribute in any of that class's parent classes.
3. Checks for a `__metaclass__` attribute in the currently enclosing module.
4. If all of the above checks fail, it creates a regular class definition using `type`.

If at anytime during those four steps, Python finds a `__metaclass__` attribute, is executes
the code referenced by that attribute in the creation of the class.

So, if we return to our metaclass example from the preceding section and pretend we're
the Python interpreter, here (roughly) are the steps we'd take while interpreting the code
from that example.

1. import the `types module`
2. execute the `crazy_decorator` function declaration
3. execute the `MetaClass` class declaration
4. begin executing the `Foo` class declaration
5. evaluate all the regular attirubtes in the class declaration.
6. discover the `__metaclass__` attribute, pass the appropriate
attributes to `MetaClass` for the remaining creation of the class
declaration.
