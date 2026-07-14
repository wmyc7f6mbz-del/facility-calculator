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

/* =====================================================
   V1.3 Smart Help
===================================================== */

const infoData = {

    capacity: {
        title: "🔋 배터리 정격용량 (Ah)",
        text: `배터리가 규정된 방전 조건에서 공급할 수 있는 전류의 양입니다.

예시
• 100Ah → 10A를 약 10시간 공급
• 200Ah → 20A를 약 10시간 공급

TIP
업체 담당자에게 배터리 전체 용량을 확인하세요.`
    },

    efficiency: {
        title: "⚡ 가용효율 (%)",
        text: `배터리 정격용량 중 실제 사용할 수 있는 비율입니다.



TIP
일반적으로 80%를 많이 사용합니다.`
    },

    aging: {
        title: "📉 열화계수 (%)",
        text: `배터리 노후화에 따른 성능 감소를 반영하는 값입니다.

예시
• 새 배터리 : 100%
• 사용 중 : 90%
• 노후 : 80%

TIP
배터리 성능시험 결과를 적용하면 가장 정확합니다.`
    },

    load: {
        title: "🔌 부하 (W)",
        text: `정류기가 실제 공급하는 소비전력입니다.

예시
• 서버 : 250W
• 스위치 : 80W
• 모니터 : 80W

총 부하 = 410W

TIP
정류기 용량(kVA)이 아니라 실제 소비전력(W)을 입력하세요.`
    },

    reserve: {
        title: "🛡 보수율 (%)",
        text: `정류기 부하전력의 설계 여유를 위한 안전계수입니다.

일반적으로
• 100%
• 110%

을 많이 사용합니다.

TIP
시설관리에서는 110%를 적용하는 경우가 많습니다.`
    }

};


/* ============================= */

const infoModal = document.getElementById("infoModal");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const closeInfo = document.getElementById("closeInfo");

document.querySelectorAll(".info-btn").forEach(button => {

    button.addEventListener("click", () => {

        const data = infoData[button.dataset.info];

        infoTitle.textContent = data.title;
        infoText.innerText = data.text;

        infoModal.classList.add("show");

    });

});

closeInfo.addEventListener("click", () => {

    infoModal.classList.remove("show");

});


/* 모달 바깥 클릭 시 닫기 */

infoModal.addEventListener("click", (e) => {

    if(e.target === infoModal){

        infoModal.classList.remove("show");

    }

});


/* ESC 키로 닫기 */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        infoModal.classList.remove("show");

    }

});
