"use strict";
var tok     //current Token
var tokens  //Token.list()
var space = ' '
let operCount = -1;


function match(k) {
    if (tok.kind == k)
        tok = tokens.pop();
    else expected(k);
}
function expected(s) {
    error(s + " expected -- " + tok + " found");
}
function error(s) {
    throw ("At index " + tok.index + ": " + s);
}
function showError(elt) {
    elt.selectionStart = tok.index
    elt.selectionEnd = tok.index + tok.length
    elt.focus();
}

class Constant {
    constructor(num) { this.num = num; }
    fValue() { return this.num; }
    toTree(param) { return space.repeat(param) + this.num + '\n' }
    toPostfix() { return this.num + ' '; }
    toString() { return this.num.toString(); }
}
class Binary {
    constructor(left, oper, right) {
        this.left = left; this.oper = oper; this.right = right;
    }
    fValue() {
        console.log(this.left)
        switch (this.oper) {
            case POWER: 
                return Math.pow(this.left, this.right);
            case PLUS: return this.left.fValue() + this.right.fValue();
            case MINUS: return this.left.fValue() - this.right.fValue();
            case STAR: return this.left.fValue() * this.right.fValue();
            case SLASH:
                let v = this.right.fValue();
                if (v == 0)
                    throw ("Division by zero");
                return this.left.fValue() / v;
            case MOD : return this.left.fValue() % this.right.fValue();
            case ABS: return Math.abs(this.left.fValue())
            case ACOS: return Math.acos(this.left)
            case ACOSH: return Math.acosh(this.left)
            case ASIN: return Math.asin(this.left)
            case ASINH: return Math.asinh(this.left)
            case ATAN: return Math.atan(this.left)
            case ATANH: return Math.atanh(this.left)
            case CEIL: return Math.ceil(this.left)
            case CBRT: return Math.cbrt(this.left)
            case EXPM1: return Math.expm1(this.left)
            case CLZ32: return Math.aclz32(this.left)
            case COS: return Math.cos(this.left)
            case COSH: return Math.cosh(this.left)
            case EXPm: return Math.exp(this.left)
            case FLOOR: return Math.floor(this.left)
            case FROUND: return Math.fround(this.left)
            case LOG: return Math.log(this.left)
            case LOG1P: return Math.log1p(this.left)
            case LOG2: return Math.log2(this.left)
            case LOG10: return Math.log10(this.left)
            case ROUND: return Math.round(this.left)
            case SIGN: return Math.sign(this.left)
            case SIN: return Math.sin(this.left)
            case SINH: return Math.sinh(this.left)
            case SQRT: return Math.sqrt(this.left)
            case TAN: return Math.tan(this.left)
            case TANH: return Math.tanh(this.left)
            case TRUNC: return Math.trunc(this.left)
            default: return NaN;
        }
    }
    toTree() {
        //return this.oper+'\n'+this.left.toTree()+this.right.toTree()
        return space.repeat(++operCount) + this.oper + '\n'
            + this.left.toTree(operCount) + this.right.toTree(operCount--)
    }
    toPostfix() {
        return this.left.toPostfix() + this.right.toPostfix() + this.oper + ' '
    }
    toString() {
        return '(' + this.left + this.oper + this.right + ')'
    }
}

function binary(e) {
    let op = tok.kind; match(op);
    return new Binary(e, op, term());
}
function expression() {
    let e = (tok.kind == MINUS) ?
        binary(new Constant(0)) : term();
    while (tok.kind == PLUS || tok.kind == MINUS || tok.kind == POWER)
        e = binary(e);
    return e;
}
function term() {
    let e = factor();
    while (tok.kind == STAR || tok.kind == SLASH || tok.kind == MOD) {
        let op = tok.kind; match(op);
        e = new Binary(e, op, factor());
        // console.log("things::")
        // console.log(e)
    }
    return e;
}
function factor() {
    console.log("Tok kind: " + tok.kind)
    switch (tok.kind) {
        case NUMBER:
            let c = tok.val;
            match(NUMBER);
            return new Constant(c);
        case LEFT:
            match(LEFT);
            let e = expression();
            match(RIGHT); return e;
        default: expected("Factor");
    }
    return null;
}