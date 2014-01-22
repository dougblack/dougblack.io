# A Good .vimrc
#### Posted January 21th, 2014

## How To vimrc

There is just one rule you must follow when crafting your own .vimrc.

> Don't put any lines in your vimrc that you don't understand.

There are tons of tutorials such as this one on the internet
that contain all kinds of awesome hacks to make your Vim better, but
the absolute worst way to make your environment better is to just copy
it wholesale from others.

Spending the time to actually learn what's going into the construction
of your editor is invaluable. In the same way that copying notes off a
projector by hand often leads to increased information retention,
adding features one by one to your vimrc aids in overall Vim
comprehension.

With that said, the rest of this article will be me explaining each and
every line in my current vimrc in its entirety with the hope that you
you will find some tricks you haven't seen before. But! My vimrc is far
from perfect. I'm always looking for additions that would make my
environment better so if you think I missed something important please
let me know: [@dougblackio][twitter].

I will break it up into logical sections.

- [Colors][colors]
- [Spaces And Tabs][spaces]
- [UI Config][ui]
- [Searching][search]
- [Folding][fold]
- [Custom Movements][movement]
- [Custom Leader][leader]
- [CtrlP Settings][ctrlp-section]
- [Launch Config][launch]
- [Tmux Config][tmux]
- [Autogroups][autogroup]
- [Backups][backup]
- [Custom Functions][functions]
- [Wrapping It Up][wrap]

## <a name="colors"></a>Colors

    :::vim script
    colorscheme badwolf         " awesome colorscheme

Colors! Colorschemes are subjective, but I've currently settled on
[badwolf by Steve Losh][badwolf]. I found [solarized][solarized]
incredibly complete, but a little too bland for my taste. I enjoy colors
that pop. I also spend a good deal of time with [molokai][molokai]
and still think it's a great scheme, but simply prefer badwolf at the
moment.

Moving on:

    :::vim script
    set t_Co=256            " use 256 colors by default
    syntax enable           " enable syntax processing
    set background=dark     " set dark background

The inline comments should be enough to describe these. I'll take this
moment to plug adding comments to most if not every line in your vimrc.
If you're anything like me that file is going to get pretty long, and
chances are you won't remember what every line does forever, so adding
comments will help Future You know what the hell is going on in there.

Also, many settings in Vim have both a long name and a short name. For
instance `background` is the same as `bg`. For future readability, I
strongly recommend using the long name.

## <a name="spaces"></a>Spaces & Tabs

The incantations you must throw into your vimrc to get tabs/spaces
working the way you want can be pretty confusing, so here's a quick
refresher.

    :::vim script
    set tabstop=4       " number of visual spaces per TAB

`tabstop` is the number of spaces a tab counts for. So, when Vim opens
a file and reads a `<TAB>` character, it uses that many spaces to visually
show the `<TAB>`.

    :::vim script
    set softtabstop=4   " number of spaces in tab when editing

`softabstop` is the number of spaces a tab counts for *when editing*. So
this value is the number of spaces that is *inserted* when you hit
`<TAB>` and also the number of spaces that *are removed* when you
backspace.

    :::vim script
    set expandtab       " tabs are spaces

`expandtab` turns `<TAB>s` into spaces. That's it. So `<TAB>` just
becomes a shortcut for "insert four spaces".

Taken together, these are great options for editing files in languages
that prefer spaces over tabs, since this ensures no `<TAB>s` are actually
used. I spend most of my day in python and bash, where spaces are
the norm. I like it, since it means my source code looks the same on
every machine.

## <a name="ui"></a>UI Config

These are options that change random visuals in Vim.

    :::vim script
    set number              " show line numbers

Showing line numbers should need no justification.

    :::vim script
    set showcmd             " show command in bottom bar

`showcmd` shows the last command entered in the very bottom
right of Vim. I have it set here but it's actually not shown
in my Vim since I use [powerline][powerline] plugin (which
we will get to later).

    :::vim script
    set cursorline          " highlight current line

`cursorline` draws a horizontal highlight (or underline, depending on
your colorscheme) on the line your cursor is currently on. I've found
that this makes it easier to follow exactly what line you left off on
when you're switching back to a Vim session or switching between windows
in Vim.

    :::vim script
    filetype indent on      " load filetype-specific indent files

This both turns on filetype detection and allows loading of language
specific indentation files based on that detection. For me, this
means the python indentation file that lives at
`~/.vim/indent/python.vim` gets loaded every time I open a `*.py` file.

    :::vim script
    set wildmenu            " visual autocomplete for command menu

This is a pretty cool feature I didn't know Vim had. You know how Vim
automatically autocompletes things like filenames when you, for instance,
run `:e ~/.vim<TAB>`? Well it will provide a graphical menu of all the
matches you can cycle through if you turn on `wildmenu`.

    :::vim script
    set lazyredraw          " redraw only when we need to.

Vim loves to redraw the screen during things it probably doesn't need
to&mdash;like in the middle of macros. This tells Vim not to bother
redrawing during these scenarios, leading to faster macros.

    :::vim script
    set showmatch           " highlight matching [{()}]

With `showmatch`, when your cursor moves over a parenthesis-like
character, the matching one will be highlighted as well.

## <a name="search"></a>Searching

I love Vim's search. I love it even more with the following settings.

    :::vim script
    set incsearch           " search as characters are entered
    set hlsearch            " highlight matches

These should be pretty self explanatory. They make searching better.

    :::vim script
    nnoremap <leader><space> :nohlsearch<CR> " turn off search highlight

Vim will keep highlighted matches from searches until you either run
a new one or manually stop highlighting the old search with `:nohlsearch`.
I find myself running this all the time so I've mapped it to `,<space>`.


## <a name="fold"></a>Folding

Vim folding is a pretty sweet feature that I don't make heavy use of,
but when I want it, I want it to have reasonable settings.

    :::vim script
    set foldenable          " enable folding

Shows all folds.

    :::vim script
    set foldlevelstart=10   " open most folds by default

`foldlevelstart` is the starting fold level for opening a new buffer.
If it is set to 0, all folds will be closed. So, setting it to 99 here
ensures that no folds are closed by default when opening a new buffer.

    :::vim script
    set foldnestmax=10      " 10 nested fold max

Folds can be nested. Setting a max on the number of folds guards against
too many folds. If you need more than 10 fold levels you must be writing
some Javascript burning in callback-hell and I feel very bad for you.

    :::vim script
    nnoremap <space> za     " space open/closes folds

I change the mapping of `<space>` pretty frequently, but this is its
current command. `za` opens/closes the fold around the current block.
As an interesting aside, I've heard the `z` character is used to
represent folding in Vim because it looks like a folded piece of paper.
Probably not, but it makes a nice story. :)

    :::vim script
    set foldmethod=indent   " fold based on indent level

This tells Vim to fold based on indentation. This is especially useful
for me since I spend my days in Python. Other acceptable values are
`marker`, `manual`, `expr`, `syntax`, `diff`. Run `:help foldmethod` to
find out what each of those do.

## <a name="movement"></a>Movement

Here we start getting into custom bindings. This group of bindings
all relate to movement commands.

    :::vim script
    nnoremap j gj           " move vertically by visual line
    nnoremap k gk           " move vertically by visual line

These two allow us to move around lines visually. So if there's a very
long line that gets visually wrapped to two lines, `j` won't skip over
the "fake" part of the visual line in favor of the next "real" line.

    :::vim script
    nnoremap B ^            " move to beginning of line
    nnoremap E $            " move to end of line
    nnoremap $ <nop>        " $ doesn't do anything
    nnoremap ^ <nop>        " ^ doesn't do anything

These feel like my most controversial bindings, since they overwrite
existing movement bindings. My thinking was that hitting `^` and `$` to
jump to the beginning and  end of a line was a little too uncomfortable
for such an oft-used movement. So I rebound `E` and `B`, which are
typically used to move forwards and backwards over visual words to these
purposes.  Next I bound the old way to `<nop>` to train myself to use
the new ones.

    :::vim script
    nmap gV `[v`]           " highlight last inserted text

This one is pretty cool. It visually selects the block of characters you
added last time you were in `INSERT` mode.

## <a name="leader"></a>Leader Shortcuts

Here we've reached the meat of my custom keybindings. This section will
introduce many different plugins and custom functions that I use pretty
frequently. Let's get started.

    :::vim script
    let mapleader=","       " leader is comma

`\` is a little far away for a leader. I've found `,` to be a much
better replacement.

    :::vim script
    inoremap jk <esc>       " jk is escape

`<ESC>` is *very* far away. `jk` is a much better replacement as it's
on the home row and I actually never type it when writing text. Except
right now when I wrote this section of this post. Which I'm writing in
Vim. The workaround if you ever need to enter this rare sequence of
keys is to enter the `j`, wait for the leader-check timeout to fade,
and then enter the `k`.

    :::vim script
    nnoremap <leader>u :GundoToggle<CR>         " toggle gundo

In one of its cleverest innovations, Vim doesn't model undo as a simple
stack. In Vim it's a tree. This makes sure you never lose an action in
Vim, but also makes it much more difficult to traverse around that tree.
[gundo.vim][gundo] fixes this by displaying that undo tree in graphical form.
Get it and don't look back. Here I've mapped it to `,u`, which I like to
think of as "super undo".

    :::vim script
    nnoremap <leader>ev :vsp $MYVIMRC<CR>       " edit vimrc
    nnoremap <leader>ez :vsp ~/.zshrc<CR>       " edit zshrc
    nnoremap <leader>sv :source $MYVIMRC<CR>    " load vimrc

These are shortcuts to edit and source my vimrc and my zshrc. That's
it.

    :::vim script
    nnoremap <leader>s :mksession<CR>   " save session

Ever wanted to save a given assortment of windows so that they're there
next time you open up Vim? `:mksession` does just that! After saving
a Vim session, you can reopen it with `vim -S`. Here I've mapped
it to `,s`, which I remember by thinking of it as "super save".

    :::vim script
    nnoremap <leader>a :Ag      " open ag.vim

[The Silver Searcher][silver searcher] is a *fantastic* command line
tool to search source code in a project. It's wicked fast. Thankfully
there is a wonderful Vim plugin [ag.vim][ag] which lets you use `ag`
without leaving Vim *and* pulls the results into a quickfix window for
easily jumping to the matches. Here I've mapped it to `,a`.

## <a name="ctrlp-section"></a>CtrlP

[ctrlp.vim][ctrlp] is my life in Vim. If you've never used a fuzzy file
searcher this will open your eyes. If you're currently using
[commandt.vim][commandt], you're on the right track, but CtrlP is the
spiritual successor. It's significantly faster and more configurable than
CommandT. Anyways here are my settings for CtrlP.

    :::vim script
    let g:ctrlp_match_window = 'bottom,order:ttb'
    let g:ctrlp_switch_buffer = 0
    let g:ctrlp_working_path_mode = 0
    let g:ctrlp_custom_ignore = '\vbuild/|dist/|venv/|\.(o|swp|pyc|egg)$'

There are a few things happening here. The first is I'm telling CtrlP to
order matching files top to bottom with `ttb`. Next, we tell CtrlP to
always open files in new buffers with `let ctrlp_switch_buffer=0`.
Setting `let g:ctrl_working_path=0` lets us change the working directory
during a Vim session and make CtrlP respect that change.

Finally, `let g:ctrlp_custom_ignore` lets us ignore certain files when
fuzzy matching. The enumerated regex's largely invalidate most "build"
directories so that CtrlP doesn't waste time matching against useless
results.

## <a name="launch"></a>Launch Config

These are options set at launch to configure external tools exactly once.

    :::vim script
    set nocompatible                            " default to vim
    call pathogen#infect()                      " use pathogen
    call pathogen#runtime_append_all_bundles()  " use pathogen

`nocompatible` sets most options to the Vim defaults, rather than their
Vi counterpart. The `pathogen` options extract all of the Vim plugins
from their location in `~/.vim/bundles` to their respective places
in the `~/.vim` folder.

## <a name="tmux"></a>Tmux

    :::vim script
    if exists('$TMUX') " allows cursor change in tmux mode
        let &t_SI = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=1\x7\<Esc>\\"
        let &t_EI = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=0\x7\<Esc>\\"
    else
        let &t_SI = "\<Esc>]50;CursorShape=1\x7"
        let &t_EI = "\<Esc>]50;CursorShape=0\x7"
    endif

These lines change the cursor from block cursor mode to vertical bar
cursor mode when using tmux. Without these lines, tmux always uses
block cursor mode.

## <a name="autogroup"></a>Autogroups

    :::vim script
    augroup configgroup
        au VimEnter * highlight clear SignColumn
        au BufWritePre *.php,*.py,*.js,*.txt,*.hs,*.java,*.md :call <SID>StripTrailingWhitespaces()
        au FileType java set noexpandtab
        au FileType java set list
        au FileType java set listchars=tab:+\ ,eol:-
        au FileType java set formatprg=par\ -w80\ -T4
        au FileType php set noexpandtab
        au FileType php set list
        au FileType php set listchars=tab:+\ ,eol:-
        au FileType php set formatprg=par\ -w80\ -T4
        au FileType ruby set tabstop=2
        au FileType ruby set shiftwidth=2
        au FileType ruby set softtabstop=2
        au FileType ruby set commentstring=#\ %s
        au FileType python set commentstring=#\ %s
        au BufEnter *.cls set filetype=java
        au BufEnter *.zsh-theme set filetype=zsh
        au BufEnter Makefile set noexpandtab
        au BufEnter *.sh set tabstop=2
        au BufEnter *.sh set shiftwidth=2
        au BufEnter *.sh set softtabstop=2
    augroup END

This is a slew of commands that create language-specific settings for
certain filetypes/file extensions. It is important to note they are
wrapped in an `augroup` as this ensures the `autocmd`'s are only applied
once. In addition, the `autocmd!` directive clears all the `autocmd`'s
for the current group.

## <a name="backup"></a>Backups

If you leave a Vim process open in which you've changed file, Vim creates
a "backup" file. Then, when you open the file from a different Vim
session, Vim knows to complain at you for trying to edit a file that is
already being edited. The "backup" file is created by appending a `~` to
the end of the file in the current directory. This can get quite annoying
when browsing around a directory, so I applied the following settings
to move backups to the `/tmp` folder.

    :::vim script
    set backup
    set backupdir=~/.vim-tmp,~/.tmp,~/tmp,/var/tmp,/tmp
    set backupskip=/tmp/*,/private/tmp/*
    set directory=~/.vim-tmp,~/.tmp,~/tmp,/var/tmp,/tmp
    set writebackup

`backup` and `writebackup` enable backup support. As annoying as this
can be, it is much better than losing tons of work in an
edited-but-not-written file.

## <a name="functions"></a>Custom Functions

I've written a small number of custom functions. Here they are with
comments explaining their purpose.

    :::vim script
    " toggle between number and relativenumber
    function! ToggleNumber()
        if(&relativenumber == 1)
            set norelativenumber
            set number
        else
            set relativenumber
        endif
    endfunc

    " toggle between number and nonumber
    function! ToggleNoNumber()
        if(&number == 1)
            set nonumber
        else
            set number
        endif
    endfunc

    " strips trailing whitespace at the end of files. this
    " is called on buffer write in the autogroup above.
    function! <SID>StripTrailingWhitespaces()
        " save last search & cursor position
        let _s=@/
        let l = line(".")
        let c = col(".")
        %s/\s\+$//e
        let @/=_s
        call cursor(l, c)
    endfunction

## <a name="wrap"></a>Wrapping It Up

I hope this helped you. The reality is that this was a ton of stuff
and I still stand by this platitude:

> Don't put anything in your .vimrc you don't understand!

So, if you grab lines from this, make sure you add comments explaining
exactly what is going on. If you can't, `:help [setting]` is your best
friend.

Thanks for reading! Don't forget to send me your .vimrc tips at
[@dougblackio][twitter].

[colors]: #colors
[spaces]: #spaces
[ui]: #ui
[search]: #search
[fold]: #fold
[movement]: #movement
[leader]: #leader
[ctrlp-section]: #ctrlp-section
[launch]: #launch
[tmux]: #tmux
[autogroup]: #autogroup
[backup]: #backup
[functions]: #functions
[wrap]: #wrap
[twitter]: https://twitter.com/dougblackio
[badwolf]: https://github.com/sjl/badwolf/
[molokai]: https://github.com/tomasr/molokai.git
[solarized]: https://github.com/altercation/Vim-colors-solarized.git
[powerline]: https://github.com/Lokaltog/powerline
[gundo]: https://github.com/sjl/gundo.vim.git
[silver searcher]: https://github.com/ggreer/the_silver_searcher.git
[ag]: https://github.com/rking/ag.vim.git
[ctrlp]: https://github.com/kien/ctrlp.vim.git
[commandt]: https://github.com/wincent/Command-T.git
