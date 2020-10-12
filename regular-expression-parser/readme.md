# Regular expression parser  

[View Kata](https://www.codewars.com/kata/5470c635304c127cad000f0d)

Your task is to implement a simple regular expression parser. We will have a parser that outputs the following AST of a regular expression:  

```javascript
new Normal(c)          // A character that is not in "()*|."
new Any()              // Any character
new ZeroOrMore(regexp) // Zero or more occurances of the same regexp
new Or(regexp,regexp)  // A choice between 2 regexps
new Str([regexp])      // A sequence of regexps
```

As with the usual regular expressions, `Any` is denoted by the `'.'` character, `ZeroOrMore` is denoted by a subsequent `'*'` and `Or` is denoted by `'|'`. Brackets, `(` and `)`, are allowed to group a sequence of regular expressions into the `Str` object.  

`Or` is not associative, so `"a|(a|a)"` and `"(a|a)|a"` are both valid regular expressions, whereas `"a|a|a"` is not.  

Operator precedences from highest to lowest are: `*`, sequencing and `|`. Therefore the followings hold:  

```javascript
"ab*"     -> new Str([ new Normal('a'), new ZeroOrMore(new Normal ('b')) ])
"(ab)*"   -> new ZeroOrMore(new Str([ new Normal('a'), new Normal('b') ]))
"ab|a"    -> new Or( new Str([ new Normal('a'), new Normal('b') ]), new Normal ('a') )
"a(b|a)"  -> new Str([ new Normal('a'), new Or( new Normal('b'), new Normal('a') ) ])
"a|b*"    -> new Or( new Normal('a'), new ZeroOrMore(new Normal('b')) )
"(a|b)*"  -> new ZeroOrMore(new Or( new Normal('a'), new Normal('b') ))
```

Some examples:  

```javascript
"a"          -> new Normal('a')
"ab"         -> new Str([ new Normal('a'), new Normal('b') ])
"a.*"        -> new Str([ new Normal('a'), new ZeroOrMore(new Any()) ])
"(a.*)|(bb)" -> new Or( new Str([ new Normal('a'), new ZeroOrMore(new Any()) ])
                      , new Str([ new Normal('b'), new Normal('b') ])
                      )
```

The followings are invalid regexps and the parser should return `Nothing` in Haskell / `0` in C or C++ / `null` in JavaScript or C# / `""` in Python / `new Void()` in Java/`Void()` in Kotlin:  

`""`, `")("`, `"*"`, `"a("`, `"()"`, `"a**"`, etc.  

Feel free to use any parser combinator libraries available on codewars, or implement the parser "from scratch".  
