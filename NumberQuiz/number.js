// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력하고 go 버튼을 누름
// 3. if 유저가 랜덤번호를 맞추면 맞췄다 , 다운이면 다운 업이면 업
// 4. Reset버튼을 누르면 게임이 리셋된다.
// 5. 5번의 기회를 다 쓰면 게임이 끝난다.
// 6. 유저가 1~100 범위 밖에 숫자를 입력하면 알려주고 기회를 깎지 않는다.
// 7. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.
// let number = Math.floor(Math.random() * 100); // 1. 랜덤 번호 지정
const goButton = document.querySelector('.answer'); // go 버튼
const resetButton = document.querySelector('.reset'); //reset 버튼
const input = document.querySelector('.user_Number'); //input 
const p = document.createElement('p'); // p 태그 생성
const message = document.querySelector('.message_container'); //message 컨테이너
const chance = document.querySelector('.chance');

let count = 5; //시도 횟수
let overlap = []; // 중복되는 숫자가 있는지 말해줌
// let number = 0;
let number = Math.floor(Math.random() * 100);

//Quiz 함수
function Quiz(event){
    event.preventDefault();
    const userNumber = input.value;

    if(userNumber < 0 || userNumber > 100){
        p.innerText = "범위 안에 있는 숫자를 입력해주세요 (1 ~ 100)";
        message.appendChild(p);
    }
    // if(number == userNumber){
    //     p.innerText = `${number} 정답입니다!!`;
    //     message.appendChild(p);
    //     end();
    // }

    UpDown(userNumber);
}

function UpDown(userNumber){
    if(number > userNumber){
        p.textContent = "UP";
        message.appendChild(p);
    }else if(number < userNumber){
        p.textContent = "DOWN";
        message.appendChild(p);
    }else{
        p.innerText = `${number} 정답입니다!!`;
        message.appendChild(p);
        end();
    }
    count--;
    chance.textContent = `남은 기회 : ${count}`;
    if(count == 0){
        end();
    }
}



// 리셋 함수
function reset(){
    count = 6;
    input.classList.remove('none');
    input.value = "";
    p.innerText = "게임 스타트!!";
    message.appendChild(p);
    
}

//게임 종료 함수
function end(){
    p.innerText = "게임종료"
    message.appendChild(p);
    input.classList.add('none');
}

resetButton.addEventListener('click',reset);
goButton.addEventListener('click',Quiz);