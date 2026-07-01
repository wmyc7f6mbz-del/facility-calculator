// ===============================
// Facility Calculator Pro V1.2
// ===============================

const capacity = document.getElementById("capacity");
const efficiency = document.getElementById("efficiency");
const aging = document.getElementById("aging");
const load = document.getElementById("load");
const reserve = document.getElementById("reserve");

const result = document.getElementById("result");

const calculateBtn = document.getElementById("calculateBtn");
const copyBtn = document.getElementById("copyBtn");
const darkMode = document.getElementById("darkMode");



// ===============================
// 저장
// ===============================

function saveData(){

    localStorage.setItem("capacity",capacity.value);
    localStorage.setItem("efficiency",efficiency.value);
    localStorage.setItem("aging",aging.value);
    localStorage.setItem("load",load.value);
    localStorage.setItem("reserve",reserve.value);

}



// ===============================
// 불러오기
// ===============================

function loadData(){

    capacity.value=localStorage.getItem("capacity")||"";
    efficiency.value=localStorage.getItem("efficiency")||"";
    aging.value=localStorage.getItem("aging")||"";
    load.value=localStorage.getItem("load")||"";
    reserve.value=localStorage.getItem("reserve")||"";

}



// ===============================
// 계산
// ===============================

function calculate(){

    if(
        capacity.value==="" ||
        efficiency.value==="" ||
        aging.value==="" ||
        load.value==="" ||
        reserve.value===""){

        result.innerHTML="⚠️ 입력값을 모두 입력해주세요.";
        return;
    }

    const c=Number(capacity.value);
    const e=Number(efficiency.value)/100;
    const a=Number(aging.value)/100;
    const l=Number(load.value);
    const r=Number(reserve.value)/100;

    const hour=((c*e)*a)/(l*r);

    const h=Math.floor(hour);

    const m=Math.round((hour-h)*60);

    result.innerHTML=
        `
        🔋 <br><br>

        ${h}시간 ${m}분<br><br>

        ${hour.toFixed(2)} Hours
        `;

    saveData();

}



// ===============================
// 계산 버튼
// ===============================

calculateBtn.addEventListener("click",calculate);



// ===============================
// Enter 계산
// ===============================

document.querySelectorAll("input").forEach(input=>{

    input.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            calculate();

        }

    });

});



// ===============================
// 결과 복사
// ===============================

copyBtn.addEventListener("click",()=>{

    navigator.clipboard.writeText(result.innerText);

    alert("결과가 복사되었습니다.");

});



// ===============================
// 다크모드
// ===============================

if(localStorage.getItem("darkMode")==="on"){

    document.body.classList.add("dark");

    darkMode.checked=true;

}

darkMode.addEventListener("change",()=>{

    if(darkMode.checked){

        document.body.classList.add("dark");

        localStorage.setItem("darkMode","on");

    }else{

        document.body.classList.remove("dark");

        localStorage.setItem("darkMode","off");

    }

});



// ===============================
// 입력 저장
// ===============================

document.querySelectorAll("input[type='number']").forEach(input=>{

    input.addEventListener("input",saveData);

});



// ===============================
// 시작
// ===============================

loadData();
