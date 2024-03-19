import {invoke_calc} from "./calc_func.js";
import { isFloat } from "./util/floatcheck.js";
var first_click = false;
document.querySelectorAll('.js-number-calc')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const pressed_val = button.innerHTML.trim();
      const present_disp = document
        .querySelector('.js-calc-disp-container')
        .innerHTML;
        if (first_click == false){
          document.querySelector('.js-calc-disp-container')
            .innerHTML =  pressed_val;
        }
        else{
          document.querySelector('.js-calc-disp-container')
            .innerHTML = present_disp + pressed_val;
        }
      first_click = true;
      console.log(pressed_val);         
  });
});


const in_disp = document
                  .querySelector('.js-calc-disp-container')
                  

document.querySelector('.js-clear-calc')
  .addEventListener('click', () => {
    in_disp.innerHTML = '0'; 
    first_click = false;  
});


document.querySelector('.js-eval-calc')
  .addEventListener('click', () => {
    const eval_stat = in_disp.innerHTML.trim();
    console.log('evalstring in =', eval_stat);
    let result = invoke_calc(eval_stat);
    console.log(result);
    if (isFloat(result))
    {
      in_disp.innerHTML = (result).toFixed(2);
    }
    else{
      in_disp.innerHTML = result;
    } 
});





