# A Good Terminal Setup
#### Posted December 23, 2013

## Terminal?

Terminal. Even in the modern age of indisputably fantastic IDE's and other GUI
development tools, developing from the terminal provides some benefits that
standard desktop development still fails to match. Arguing those benefits is
not the point of this article though!

Here I'll cover what I believe is a very solid terminal development setup. Is it
the best? Most definitely not. With every additional month in my software development
career my development environment continues to improve. I've no doubt
my environment a year from now will be significantly better than it is now. I've just
reached a point where I'm fairly comfortable saying I've arrived at a pretty
productive, lightweight, and above all fun environment for my day to day development.

Disclaimer: I spend most of my day writing python, bash, and ruby. If you're writing
mostly Java or C++, you're likely spending a lot of your day in an IDE, and the
terminal becomes distinctly less attractive.

## Hardware/OS

This is a guide on terminal setup, but you'll need a UNIX-like environment to follow
along. I do most of my development on a Macbook Air. OS X is a great environment
for my style of development.

## iTerm2, not Terminal.app

If you're coming from Windows, Terminal.app likely looks pretty sweet. Don't be
fooled&mdash;grab [iterm2](http://www.iterm2.com/) right away and don't look
back. The colors are better, the fonts look better, the settings are better. It
is better.

## Brew

Brew is an OS X package manager and it is fantastic. Get it.

## Autojump

Are you still `cd`ing around everywhere? Welcome to the 21st century, grab yourself
an `autojump` and take a seat. Autojump basically just manages a database of folders
you've visited and lets you jump between them by just specifying part of the path.

So, instead of:

    :::bash
    [~/]: cd path/to/my/project
    [~/path/to/my/project]:

you can do

    :::bash
    [~/]: j project
    [~/path/to/my/project]:

Much faster.

## Tmux

This is the latest addition to my environment. Tmux is a Terminal MUltipleXer.
It's basically a window manager for you terminal, where each window/pane is its
own shell session. So you can split your terminal in half and have a file open in
one split and an ssh session to your serve in the other half. iTerm2 provides this
same functionality at the GUI level, but I'm a big fan of having heavily customizable
tools and tmux appears to have better prospects in this regard. It also has this
thing called `copy-mode`, where you can do a vi-like visual block selection thing
to copy text from one window to another without using the mouse. The mouse is evil.
This is a win.

## Vim

This is by far my highest recommended tool of this entire article. Vim changed my
development speed and enjoyment immensely. Editing text used to be a point, click,
then type a little then point, click, then type a little experience. Now it is a
type a little, then a little more, then continue typing, then keep typing experience.
Has Vim made me a better developer? No. Your editor can't do that. But it has lowered
the barriers to my text-editing experience. Additionally, Vim is fun. It just is.
Wrangling text in Vim is a pleasant experience and there are times where I reach for
an open side-project just because I feel like spending some time in vim. Vim really
lowered the barrier from my brain to code on a screen.

Check out my [vimrc](https://github.com/dougblack/dotfiles/blob/master/.vimrc).

## Zsh

Time to talk shells. `bash` is great, but I've found `zsh` to be better. It has sexier
prompts, better autocompletion, and awesome goodies like command syntax coloring.

Seriously, the tab completion alone elevates it far above bash.  Add to that the ability
to define wonderful prompts (with the help of [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)),
and [vi-mode](./zsh-vi-mode.html), and you're already well on your way to having a kickass command line experience.
