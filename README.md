# css-standard

CSS Standard Style.

## Standard?

Yes. I means this is a [stylelint](https://github.com/stylelint/stylelint) wrapper with [standard  configuration](https://github.com/stylelint/stylelint-config-standard) built-in. No need to create `.stylelintrc`, no need for config customization, it just works!.

## Vim

Install `syntastic` and add this lines to `.vimrc`:

```vim
let g:syntastic_css_checkers = ['stylelint']
let g:syntastic_css_stylelint_exec = 'css-standard'
```
