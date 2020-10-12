const { parseRegExp, Normal, Any, ZeroOrMore, Or, Str } = require('./solution.js');

const normal = (...a) => new Normal(...a);
const any = (...a) => new Any(...a);
const zeroOrMore = (...a) => new ZeroOrMore(...a);
const or = (...a) => new Or(...a);
const str = (...a) => new Str(...a);

const escHTML = s => s.replace(/"|\\|&|<|>/g, c => ({ "\"": "\\\"", "\\": "\\\\", "&": "&", "<": "<", ">": ">" })[c]);
function validate(exs) {
    for (const [input, output] of exs)
        it('should return ' + JSON.stringify(output) + ' given "' + escHTML(input) + '" as input'
        , () => expect(parseRegExp(input)).toEqual(output)
        );
}

describe("Precedence examples", () => {
    validate([
        ["ab*", str([normal('a'), zeroOrMore(normal('b'))])],
        ["(ab)*", zeroOrMore(str([normal('a'), normal('b')]))],
        ["ab|a", or(str([normal('a'), normal('b')]), normal('a'))],
        ["a(b|a)", str([normal('a'), or(normal('b'), normal('a'))])],
        ["a|b*", or(normal('a'), zeroOrMore(normal('b')))],
        ["(a|b)*", zeroOrMore(or(normal('a'), normal('b')))],
    ]);
});
describe("The other examples", () => {
    validate([
        ["a", normal('a')],
        ["ab", str([normal('a'), normal('b')])],
        ["a*", zeroOrMore(normal('a'))],
        ["a.*", str([normal('a'), zeroOrMore(any())])],
        ["a|b", or(normal('a'), normal('b'))],
        ["a|b*", or(normal('a'), zeroOrMore(normal('b')))],
        ["(ab)*", zeroOrMore(str([normal('a'), normal('b')]))],
        ["(a.*)|(bb)", or(str([normal('a'), zeroOrMore(any())]), str([normal('b'), normal('b')]))],
    ]);
});
describe("Invalid examples", () => {
    validate([
        ["", null],
        [")(", null],
        ["*", null],
        ["a(", null],
        ["()", null],
        ["a**", null],
    ]);
});
describe("Or is not associative", () => {
    validate([
        ["a|(a|a)", or(normal('a'), or(normal('a'), normal('a')))],
        ["(a|a)|a", or(or(normal('a'), normal('a')), normal('a'))],
        ["a|a|a", null],
    ]);
});
describe("Complex examples", () => {
    validate([
        ["((aa)|ab)*|a", or(zeroOrMore(or(str([normal('a'), normal('a')]), str([normal('a'), normal('b')]))), normal('a'))],
        ["((a.)|.b)*|a", or(zeroOrMore(or(str([normal('a'), any()]), str([any(), normal('b')]))), normal('a'))],
    ]);
});