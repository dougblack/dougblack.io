# Adding Vi To Your Zsh
#### Posted October 1st, 2013

## The Omnipresence Of Vim

Vim is the best editor you've ever used.

Vim emulation seems to be everywhere: Eclipse has Vrapper, Sublime
has Vintage, Emacs has Evil. Vim bindings are so ubiquitous, you can
even find them in desktop applications such as Chrome and web apps
like Gmail. This is great. You are happy.

But do you vi while you zsh?

## Zsh Line Editing

When you type characters at your zsh prompt you're engaging the zsh
line editing module, often abbreviated `zle`. The `zle` module lets you
do fancy things like delete the entire line you're working on and
move by words instead of individual characters. The `zle` module operates
in two modes:

    :::bash
    # Emacs mode
    bindkey -e

    # Vi mode
    bindkey -v

Emacs mode is the default. Gross. Let's change it to Vi.

## Vi Mode

Engaging Vi mode is easy. As previously mentioned, all you need is
this line:

    :::bash
    bindkey -v

This allows you to press `<ESC>` to switch to `NORMAL` mode.
Predictably, this lets you move around the line in standard Vim fashion.
You can then use any of the standard vim insert keystrokes to move back
to insert mode.

The default setup will you get pretty far, but if you use it frequently
you will quickly realize it has a few shortcomings. First, there is
noticeable lag when moving between modes. Second, there is no visual
indication of which mode you're currently in. We will address these
shortcomings in the next two sections.

## Kill The Lag

By default, there is a 0.4 second delay after you hit the
`<ESC>` key and when the mode change is registered. This results
in a very jarring and frustrating transition between modes. Let's
reduce this delay to 0.1 seconds.

    :::bash
    export KEYTIMEOUT=1

This can result in issues with other terminal commands that depended
on this delay. If you have issues try raising the delay.

## Visual Indication

This is the second and far more frustrating problem. If you can't definitely
tell which mode you're in, you feel much less confident when moving around
Vi mode. To fix this problem, we need to take advantage of a few special features
of `zle`.

`zle` provides an interface for extension and customization through *widgets*. In
addition to being able to define your own widgets, `zle` comes with quite a few
handy built-in widgets that we can hijack to accomplish what we want.

The first is `zle-line-init`. Per the zsh documentation:

> Executed every time the line editor is started to read a new line of input.

The second is `zle-keymap-select`. Per the zsh documentation:

> Executed every time the keymap changes, i.e. the special parameter KEYMAP is set to a different value, while the line editor is active. Initialising the keymap when the line editor starts does not cause the widget to be called. This can be used for detecting switches between the vi command (vicmd) and insert (usually main) keymaps.

Sounds perfect, if we can modify the code run during these two events, we have
found the hooks we need to modify our prompt depending on which mode we're in!

The syntax for adding custom a function to a `zle` widget looks like this:

    :::bash
    something() {
        zle backward-word
    }
    zle -N something

This has just added a brand new widget to zsh that executes `something()` when called.
But this widget won't ever get run, since the `something()` widget doesn't get called
by default. Using the widgets from above, we can rewrite the prompt every time we
leave or enter the different Vim modes.

## Color Prompt Function

Currently, my prompt looks something like this:

    :::bash
    [~/code]:                                  [master]

The current directory is on the left and my current git branch is on the right.
I want to add a `[NORMAL]` status message to the right prompt when I'm in command
mode for vim so that it looks like this:

    :::bash
    [~/code]:                         [NORMAL] [master]

So let's take a look at our actual function that updates my prompt. I'll present
it in full here first, and then step through it slowly and explain more.

    :::bash
    function zle-line-init zle-keymap-select {
        VIM_PROMPT="%{$fg_bold[yellow]%} [% NORMAL]% %{$reset_color%}"
        RPS1="${${KEYMAP/vicmd/$VIM_PROMPT}/(main|viins)/} $(git_custom_status) $EPS1"
        zle reset-prompt
    }

Let's look at the `VIM_PROMPT` variable. If you've never messed with zsh colors, take
note that the `%{fg_bold[yellow]%}` snippet sets the text color of everything that
comes after it to yellow. So, the `[% NORMAL]%` bit outputs `[NORMAL]` in yellow. The
`%` symbols are used to escape the brackets. Finally, we'll have to end with `%{$reset_color%}`
to stop outputting yellow.

Next, we have to put this snippet in the right prompt depending on the current vim mode.
To understand the next line, you'll need to know about zsh parameter expansion. Basically,
it's just `${VARIABLE/PATTERN/REPLACEMENT}`.  If the `VARIABLE` matches the `PATTERN`,
replace it with `REPLACEMENT`. The line we're looking at is this:

    :::bash
    RPS1="${${KEYMAP/vicmd/$VIM_PROMPT}/(main|viins)/}$(git_custom_status) $EPS1"

In this case, we use a double parameter expansion. The first replaces the expansion
of `KEYMAP` (the current vim mode) with our yellow `[NORMAL]` prompt *if* `KEYMAP` is
currently set to `vimcmd` (command mode). But, what if `KEYMAP` isn't set to `vicmd`?
Then the `KEYMAP` expansion won't be set to `$VIM_PROMPT`, in which case it will be
either `main` or `viins`. The last half of the expansion replaces either of those
strings with nothing, so we don't add the yellow `[NORMAL]` string to our prompt.
Perfect.

Finally, we run:

    :::bash
    zle reset-prompt

To redraw the current prompt.

## Attach The Widgets

We have a working function, but how do we register with `zle`? You'll notice our
function is named `zle-line-init` and `zle-keymap-select`. As previously discussed, these
are also the names of two important widgets that get triggered when moving between Vim modes.
So, to make our new widget respond to the correct Vim mode we have to add these widgets to
the `zle` module. This is easy, the lines are:

    :::bash
    zle -N zle-line-init
    zle -N zle-keymap-select

## Common Key Bindings

As awesome as vim mode is, you might still miss some bindings that are standard
in most shells. For example, `<Ctrl-P>` to cycle backwards through previous
commands. As you might assume, `zle` lets you create custom bindings too. Here
are a few that I've found useful.

    :::bash
    # Use vim cli mode
    bindkey '^P' up-history
    bindkey '^N' down-history

    # backspace and ^h working even after
    # returning from command mode
    bindkey '^?' backward-delete-char
    bindkey '^h' backward-delete-char

    # ctrl-w removed word backwards
    bindkey '^w' backward-kill-word

    # ctrl-r starts searching history backward
    bindkey '^r' history-incremental-search-backward

## Full Snippet

Here's the full snippet:

    :::bash
    bindkey -v

    bindkey '^P' up-history
    bindkey '^N' down-history
    bindkey '^?' backward-delete-char
    bindkey '^h' backward-delete-char
    bindkey '^w' backward-kill-word
    bindkey '^r' history-incremental-search-backward

    function zle-line-init zle-keymap-select {
        VIM_PROMPT="%{$fg_bold[yellow]%} [% NORMAL]%  %{$reset_color%}"
        RPS1="${${KEYMAP/vicmd/$VIM_PROMPT}/(main|viins)/}$(git_custom_status) $EPS1"
        zle reset-prompt
    }

    zle -N zle-line-init
    zle -N zle-keymap-select
    export KEYTIMEOUT=1

This goes in your `.zshrc` file.

## Wrapping It Up

That's pretty much it. You should now have a more informative, prettier prompt and know
a little more about how `zle` works!

*Update:* From the short discussion of this article on [lobsters](https://lobste.rs/s/tfjs4k/adding_vi_to_your_zsh)
I was tipped off to the existence of [opp.zsh](https://github.com/hchbaw/opp.zsh), a wonderful
plugin for zsh that makes vi mode even better! This enables text objects &mdash;, a wonderful
magical feature added in Vim. Text object support lets you run commands like `ciw` (for change
inner word) that make line editing even simpler. I highly recommend checking out opp.zsh for an
even better vi-mode in zsh.

Questions? [@dougblackio](https://twitter.com/dougblackio)
