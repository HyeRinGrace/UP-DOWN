// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력하고 go 버튼을 누름
// 3. if 유저가 랜덤번호를 맞추면 맞췄다 , 다운이면 다운 업이면 업
// 4. Reset버튼을 누르면 게임이 리셋된다.
// 5. 5번의 기회를 다 쓰면 게임이 끝난다.
// 6. 유저가 1~100 범위 밖에 숫자를 입력하면 알려주고 기회를 깎지 않는다.
// 7. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.



const goButton = document.querySelector('.answer'); // go 버튼
const resetButton = document.querySelector('.reset'); //reset 버튼
const input = document.querySelector('.user_Number'); //input 
const p = document.createElement('p'); // p 태그 생성
const message = document.querySelector('.message_container'); //message 컨테이너
const chance = document.querySelector('.chance'); // 남은기회
const gitFailShow = document.querySelector('.gitFailShow'); //fail 이미지
const gitGoodShow = document.querySelector('.gitGoodShow'); //success 이미지

let number = 0; //랜덤 넘버는 항상 변하기 때문에 0으로 세팅
let count = 5; //시도 횟수
let overlap = []; // 중복숫자를 담기위한 공란 배열 선언

function newNumber(){
    number = Math.floor(Math.random() * 100);//100까지의 랜덤함수
}
newNumber();// 랜덤함수 호출

//Quiz 함수
function Quiz(event){
    event.preventDefault();
    
    const userNumber = input.value; //유저가 입력하는 수를 userNumber로 받겠다.
    
    // userNumber가 범위에서 벗어나면 출력하는 조건문
    if(userNumber < 0 || userNumber > 100){
        p.innerText = "범위 안에 있는 숫자를 입력해주세요 (1 ~ 100)";
        message.appendChild(p);

        return; // 리턴을 해줘야 여기서 끝나기 때문에 카운터가 감소하지 않음
    }
    //유저가 입력한 숫자가 배열안에 있다면 중복함수라고 알려줌
    if(overlap.includes(userNumber)){
        p.textContent = `${userNumber}는 이미 입력하신 숫자입니다. 다시 입력해주세요`;
        message.appendChild(p);
        return; //마찬가지로 리턴을 해줘야 카운터가 감소되지 않음
    }
    console.log(number); // 테스트때문에 콘솔에 랜덤숫자 결과를 미리 알기위해 선언
    UpDown(userNumber); //userNumber은 Quiz함수에서만 사용가능하기때문에 UpDown 함수에서도 해당 값을
    // 넘겨주기 위해 파라미터 전달
}

// UP & Down 을 표시해줄 함수 Quiz 함수로 부터 유저의 입력값을 파라미터로 가져옴
function UpDown(userNumber){

    // 조건문을 이용하여 랜덤함수랑 비교하는 조건연산문을 작성
    if(number > userNumber){
        p.textContent = "UP";
        message.appendChild(p);
        gitFailShow.style.display = "flex"; //움직이는 사진을 보여주기 위해 선언
    }else if(number < userNumber){
        p.textContent = "DOWN";
        message.appendChild(p);
        gitFailShow.style.display = "flex";
    }else{
        p.innerText = `${number}  정답입니다!!`;
        message.appendChild(p);
        goButton.disabled = true;
        gitFailShow.style.display = "none"; // 정답을 맞췄을때는 failgit을 안보이게 바꿔줘야함
        gitGoodShow.style.display = "flex";
        return; // 마찬가지로 정답을 맞춘 이후에는 카운트 함소가 감소되지 않도록 해줌
    }

    overlap.push(userNumber); //배열 마지막에 유저가 입력한 함수 추가해줌

    count--; // 유저가 UP Down을 할때마다 count를 감소 시켜주고
    chance.textContent = `남은 기회 : ${count}`;

    if(count == 0){ // count 값이 0이 되면, end()함수 호출 이때, end함수는 종료함수이다. 아래에 있음
        end(); //end 함수 호출
    }
}


// 리셋 함수
function reset(){
    count = 5; // 카운트 개수 초기화
    chance.textContent = `남은 기회 : ${count}`;
    input.value = ""; //input 안에 있는 값도 "" 초기화 시켜줌
    p.innerText = "게임 스타트!!";
    message.appendChild(p);
    overlap = []; //물로 이미 게임을 한번진행했다면 담겨있는 배열도 공란 배열로 초기화시켜주고
    goButton.disabled = false; // go 버튼도 다시 활성화 시켜줌
    gitFailShow.style.display = "none"; //git 이미지들도 안보이게 다시 초기화
    gitGoodShow.style.display = "none";
    return;
    // newNumber();
    
}

//게임 종료 함수
function end(){
    goButton.disabled = true;//go 버튼 상태값을 disabled로 바꿔줌 true의 반대는 false임
    p.innerText = "게임종료"
    message.appendChild(p);
}

// 클릭 이벤트 리스너들 출력
resetButton.addEventListener('click',reset);
goButton.addEventListener('click',Quiz);