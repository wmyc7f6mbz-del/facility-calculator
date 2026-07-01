const battery = document.getElementById("battery");
const available = document.getElementById("available");
const aging = document.getElementById("aging");
const load = document.getElementById("load");
const reserve = document.getElementById("reserve");

const result = document.getElementById("result");

// 저장된 값 불러오기
[battery, available, aging, load, reserve].forEach(input => {
    input.value = localStorage.getItem(input.id) || "";

    input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
    });
});

// 계산하기
document.getElementById("calcBtn").addEventListener("click", () => {

    const b = Number(battery.value);
    const a = Number(available.value) / 100;
    const g = Number(aging.value) / 100;
    const l = Number(load.value);
    const r = Number(reserve.value) / 100;

    if (l <= 0 || r <= 0) {
        result.textContent = "입력값을 확인하세요.";
        return;
    }

    const time = (b * a * g) / (l * r);

const totalMinutes = Math.round(time * 60);
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;

result.innerHTML =
    `<strong>${time.toFixed(2)} 시간</strong><br><br>` +
    `(${hours}시간 ${minutes}분)`;
});

// 초기화
document.getElementById("resetBtn").addEventListener("click", () => {

    [battery, available, aging, load, reserve].forEach(input => {
        input.value = "";
        localStorage.removeItem(input.id);
    });

    result.textContent = "0.000 시간";
});
// 서비스 워커 등록(PWA)
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {
                console.log("✅ Service Worker 등록 완료");
            })
            .catch((err) => {
                console.error("❌ Service Worker 등록 실패", err);
            });
    });
}