let wallet = 10000;
let debt = 0;

// スロット確率モデル（期待値マイナス）
function spinSlot() {
    wallet -= 100; // 1プレイ100円

    const r = Math.random();
    let payout = 0;

    if (r < 0.01) {
        payout = 500; // 5倍
    } else if (r < 0.11) {
        payout = 200; // 2倍
    } else {
        payout = 0; // ハズレ
    }

    wallet += payout;
    log(`結果: +¥${payout} （財布: ¥${wallet}）`);

    checkBankruptcy();
    render();
}

function atmLoan() {
    wallet += 10000;
    debt += 15000; // 金利付き返済
    log(`ATM利用: +¥10000 → 返済額 ¥15000に増加`);
    render();
}

function checkBankruptcy() {
    if (wallet <= 0) {
        log("財布が空になりました… ATMで延命はできますが返済は重くなります😢");
    }
}

function render() {
    document.getElementById("wallet").innerText = `財布: ¥${wallet}`;
    document.getElementById("debt").innerText = `借金: ¥${debt}`;
}

function log(msg) {
    document.getElementById("log").innerHTML += msg + "<br>";
    const logBox = document.getElementById("log");
    logBox.scrollTop = logBox.scrollHeight;
}

document.getElementById("spinBtn").onclick = spinSlot;
document.getElementById("atmBtn").onclick = atmLoan;

render();
