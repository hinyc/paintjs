const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;

  if (operator === '+') {
    result = n1 + n2;
  }
  if (operator === '-') {
    result = n1 - n2;
  }
  if (operator === '*') {
    result = n1 * n2;
  }
  if (operator === '/') {
    result = n1 / n2;
  }
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  return String(result);
}

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches('button')) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      if (parseFloat(firstOperend.textContent) === 0) {
        firstOperend.textContent = buttonContent;
      } else {
        secondOperend.textContent = buttonContent;
      }

      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.
      console.log('숫자 ' + buttonContent + ' 버튼----------');
    }

    if (action === 'operator') {
      console.log('연산자 ' + buttonContent + ' 버튼---------');
      operator.textContent = buttonContent;
    }

    if (action === 'decimal') {
      console.log('소수점 버튼------------');

      // console.log('소수점 버튼');
    }

    if (action === 'clear') {
      firstOperend.textContent = 0;
      operator.textContent = '+';
      secondOperend.textContent = 0;
      calculatedResult.textContent = 0;
      console.log('초기화 버튼---------');
    }

    if (action === 'calculate') {
      calculatedResult.textContent = calculate(parseFloat(firstOperend.textContent), operator.textContent, parseFloat(secondOperend.textContent));
      console.log('calculate-----------');
    }
  }
});

// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector('.calculator__display--for-advanced');
// calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.
  if (target.matches('button')) {
    console.log(firstNum);
    if (action === 'number') {
      //oFA = udefined 초기값 일때 실행 첫번째 숫자 변경
      if (operatorForAdvanced === undefined) {
        display.textContent = buttonContent;
        operatorForAdvanced = true;
      } else {
        display.textContent += buttonContent;
      }
    }
    console.log('firstNum:', firstNum);
    if (action === 'operator') {
      if (operatorForAdvanced === true) {
        if (firstNum === undefined) {
          firstNum = parseFloat(display.textContent);
        } else {
          firstNum = parseFloat(calculate(firstNum, previousKey, parseFloat(display.textContent)));

          // firstNum + parseFloat(display.textContent);
          display.textContent = firstNum;
        }
      }
      previousKey = buttonContent;
      operatorForAdvanced = undefined;
    }

    if (action === 'decimal') {
      console.log(typeof display.textContent);
      if (operatorForAdvanced === undefined) {
        display.textContent = '0.';
      }
      if (!display.textContent.includes('.')) {
        display.textContent += buttonContent;
      }
      operatorForAdvanced = true;
    }

    if (action === 'clear') {
      display.textContent = 0;
      previousKey = null;
      firstNum = undefined;
      operatorForAdvanced = undefined;
      previousNum = undefined;
    }

    if (action === 'calculate') {
      // operatorForAdvanced = undefined;
      if (previousNum === undefined) {
        // 초기조건 true
        previousNum = parseFloat(display.textContent); //할당후 계산 조건은 false가 됨.

        display.textContent = calculate(firstNum, previousKey, previousNum);
      } else {
        firstNum = parseFloat(display.textContent);
        display.textContent = calculate(firstNum, previousKey, previousNum);
      }
      firstNum = calculate(firstNum, previousKey, previousNum);
      console.log('lastFirstNum:', firstNum);
    }
    console.log('sss', parseFloat(display.textContent) === 39);
    if (parseFloat(display.textContent) === 39) {
      display.textContent = '안휴 생축! 건강합시다';
    }
  }
});
// 1,0,0,.,.,1,2,5,2,+,1,2,+,1,5,-,-,2,3,-,1,4,4,2,/,2,3,/,/,1,2,*,2,3,Enter를 연속으로 누르면 -111.48956666666668이(가) 화면에 표시되어야 합니다.
