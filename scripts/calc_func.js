export function invoke_calc(str){
  let op = create_tokens(str);
  let res = intopost(op);
  let result = eval_postfix(res);
  //console.log(result[0]);
  return result[0];
}


function intopost(s){

  let st = []; 
		let result = "";
    let res_arr = [];

		for(let i = 0; i < s.length; i++) {
			let c = s[i];
			if(typeof c === 'number'){
				result += c;
        res_arr.push(c);
      }

			else if(c == '(')
				st.push('(');

			else if(c == ')') {
				while(st[st.length - 1] != '(')
				{
					result += st[st.length - 1];
          res_arr.push(st[st.length - 1]);
					st.pop();
				}
				st.pop();
			}
			else {
				while(st.length != 0 && prec(s[i]) <= prec(st[st.length - 1])) {
					result += st[st.length - 1];
          res_arr.push(st[st.length - 1])

					st.pop(); 
				}
				st.push(c);
			}
		}
		while(st.length != 0) {
			result += st[st.length - 1];
      res_arr.push(st[st.length - 1])
			st.pop();
		}
    console.log('postfix array', res_arr);

    return res_arr;
}



function eval_postfix(queue)
{
  let op_stack = [];
  console.log(queue);
  while(queue.length > 0){
    let q_item = queue.shift();
    if (typeof q_item === 'number'){
      op_stack.push(q_item);
    }
    else if(q_item === '+' || q_item === '-' || 
            q_item === 'X' ||q_item === '/')
    {
        let num2 = op_stack.pop();
        let num1 = op_stack.pop();
        let result = real_op(num1, num2, q_item);
        op_stack.push(result);
        console.log('calc ops',num1, num2, q_item);

    }
  //console.log(queue, op_stack);

  }
  return op_stack
}

function real_op(num1, num2, op){

  let result;
    // Switch case for different operators
    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '/':
            // Check for division by zero
            if (num2 !== 0) {
                result = num1 / num2;
            } else { 
                console.log("Error: Division by zero!");
            }
            break;
        case 'X':
            result = num1 * num2;
            break;
    }
    return result;
}

function prec(operator) {
  switch (operator) {
      case '+':
      case '-':
          return 1;
      case 'X':
      case '/':
          return 2;
      default:
          return 0; // Default precedence for non-operators
  }
}

// Toeknization
function create_tokens(str){
  const split_str = str.split('');
  let op = [];
  let current_number = '';

  split_str.forEach((char) => {
    if (char.match(/\d|\./)){
      current_number = current_number + char;
    }
    else{
      console.log(current_number)
      if(current_number){
        op.push(parseFloat(current_number));
        current_number = '';
      }
      if(char.match(/\+|\-|\X|\/|\(|\)/)){
        op.push(char);
      }
    }
  });
  if(current_number){
    op.push(parseFloat(current_number));
  }
  console.log(op);
  return op;
}