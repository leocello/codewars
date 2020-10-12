class Normal {
    constructor (char) {
        this.char = char;
    }
}

class Any {
}

class ZeroOrMore {
    constructor (regex) {
        this.regex = regex;
    }
}

class Or {
    constructor (left, right) {
        this.leftRegex = left;
        this.rightRegex = right;
    }
}

class Str {
    constructor (regexes) {
        this.regexes = regexes;
    }
}

function parseRegExp(s) {
    const parse = s => {
        if (s.length == 0) {
            throw "Invalid - Empty expression";
        }

        let resp = null;
    
        for (let i = 0; i < s.length; i++) {
            let current = s[i];
            let next = !!s[i + 1] ? s[i + 1] : null;
        
            if (current == '*' || current == ')') {
                throw "Invalid - " + current;
            }

            else if (current == '|') {
                let openBrackets = 0;
                for (let j = i + 1; j < s.length; j++) {
                    if (s[j] == '(') {
                        openBrackets++;
                    }

                    if (s[j] == ')') {
                        openBrackets--;
                    }

                    if (s[j] == '|' && openBrackets == 0) {
                        throw "Invalid - | is not associative";    
                    }
                }

                resp = new Or(resp, parse(s.substring(i+1)));
                break;
            }

            else if (current == '(') {
                if (next == ')') {
                    throw "Invalid - Empty sub-expression";
                }

                let j = i + 1;
                let openBrackets = 1;
                let countSubChars = 0;
                while (openBrackets > 0) {
                    if (j >= s.length) {
                        throw "Invalid - finished without closing brackets";
                    }

                    if (s[j] == ')') {
                        openBrackets--;
                    }

                    if (s[j] == '(') {
                        openBrackets++;
                    }

                    countSubChars++;
                    j++;
                }

                let newItem = parse(s.substr(i+1, countSubChars - 1));
                i = j - 1;
                next = !!s[j] ? s[j] : null;
                
                if (next == '*') {
                    newItem = new ZeroOrMore(newItem);
                    i++;
                }

                if (resp == null) {
                    resp = newItem;
                } else if (resp instanceof Str) {
                    resp.regexes.push(newItem);
                } else {
                    resp = new Str([resp, newItem]);
                }
            }

            else {
                let newItem = current == '.' ? new Any() : new Normal(current);
                if (next == '*') {
                    newItem = new ZeroOrMore(newItem);
                    i++;
                }

                if (resp == null) {
                    resp = newItem;
                } else if (resp instanceof Str) {
                    resp.regexes.push(newItem);
                } else {
                    resp = new Str([resp, newItem]);
                }
            }
        }

        return resp;
    };
    
    try {
        return parse(s);
    } catch (e) {
        // console.log(e);
        return null;
    }
}

module.exports = {
    parseRegExp,
    Normal,
    Any,
    ZeroOrMore,
    Or,
    Str,
};