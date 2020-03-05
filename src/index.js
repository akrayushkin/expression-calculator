function expressionCalculator(expr) {
    function isCorrectBracket (input) {
        let counter = 0;
        for (var i = 0; i < input.length; i++) {
            if (input[i] == '(') {
                counter++;
            } else if (input[i] == ')') {
                counter--;
                if (counter < 0) return false;
            }
        }
        return counter === 0 ? true : false;
    }
    function isOperator(char) {
        return '+-/*^()'.includes(char) ? true : false;
    }
    function getPriority(char) {
        switch(char) {
            case '(': return 0;
            case ')': return 1;
            case '+': return 2;
            case '-': return 3;
            case '*': return 4;
            case '/': return 4;
            default: return 5;
        }
    }
    function getExpression(input) {
        let output = '';
        const stack = [];
        for (let i = 0; i < input.length; i++) {
            let char = input[i];
            if (char === ' ') continue;
            if (/\d/.test(char)) {
                while (input[i] !== ' ' && !isOperator(input[i])) {
                    output += input[i];
                    i++;
                    if (i === input.length) break;
                }
                output += " ";
                i--;
            }
            if(isOperator(char)) {
                if (char === '(') {
                    stack.push(char);
                } else if (char === ')') {
                    let str = stack.pop();
                    while (str !== '(') {
                        output += str + ' ';
                        str = stack.pop();
                    }
                } else {
                    while (stack.length > 0 && getPriority(char) <= getPriority(stack[stack.length-1])) {
                        output += stack.pop() + " ";
                    }
                    stack.push(char);
                }
            }
        }
        while (stack.length > 0)
        output += stack.pop() + " ";
        return output;
    }
    function counting(input) {
        let result = 0;
        const stack = [];
        for (let i = 0; i < input.length; i++) {
            let char = input[i];
            if (/\d/.test(char)) {
                let str = '';
                while ( char !== ' ' && !isOperator(char) ) {
                    str += char;
                    char = input[++i];
                    if (i === input.length) break;
                }
                stack.push(str);
                i--;
            } else if (isOperator(char)) {
                const a = stack.pop();
                const b = stack.pop();
                switch (char) {
                    case '+':
                        result = +b + +a;
                        break;
                    case '-':
                        result = +b - +a;
                        break;
                    case '*':
                        result = +b * +a;
                        break;
                    case '/':
                        if (+a === 0) {
                            throw new Error('TypeError: Division by zero.');
                        } else {
                            result = +b / +a;
                        }
                        break;
                    default:
                        break;
                }
                stack.push(result);
            }
        }
        return stack[stack.length-1];
    }
    if (!isCorrectBracket(expr)) {
        throw new Error('ExpressionError: Brackets must be paired');
    } else {
        return counting(getExpression(expr));
    }
    return counting(getExpression(expr));
}

module.exports = {
    expressionCalculator
}
