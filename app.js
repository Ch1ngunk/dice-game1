//Тоглоомийн бүх газарт ашиглагдах глобал хувьсагчдыг энд зарлая
//Тоглоом дууссан эсэхийг хадгалах төлвийн хувьсагч
var isGameOver;
//Аль тоглогч шоо шидэх вэ гэдгийг энл хадгална
var activePlayer;

// 2 тоглогчийн цуглуулсан оноонууд
var scores;

//идэвхитэй тоглогчийн цуглуулж байгаа ээлжийн оноо
var roundScore;
// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");

//Тоглоомыг эхлүүлнэ
initGame();
//Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {

    if (isGameOver !== true) {
       //1-6 доторх санамсаргүй нэг тоо авж гаргана
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    //Шооны зургийг веб дээр гаргаж ирнэ
    
    diceDom.style.display = "block";
    //Буусан санамсаргүй тоонд харгалзах шооны зургийг веб дээр гаргаж ирнэ 
    diceDom.src = "dice-" + diceNumber + ".png";
    // БУУСАН ТОО НЬ 1 ЭЭС ЯЛГААТАЙ БОЛ ИДЭВХИТЭЙ ТОГЛОГЧИЙН ЭЭЛЖИЙН ОНООГ НЭМЭГДҮҮЛНЭ
    if (diceNumber !== 1) {
        //1ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө
        roundScore = roundScore + diceNumber;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    } else {
        //1 буусан тоглогчийн ээлжийг энэ хэсэгт сольж өгнө
        switchToNextPlayer();
    } 
    } else {
        alert("Тоглоом дууссан байна. New Game товчийг даран шинээр эхэлнэ үү.")
    }
    
});

//HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
    //Уг тоглогчийн цуглуулсан ээлжний оноог глобал оноон дээр нь нэмж өгнө
    /*if (activePlayer === 0) {
        scores[0] = scores[0] + roundScore;
    } else {
        scores[1] = scores[1] + roundScore;
    }*/
    

    scores[activePlayer] = scores[activePlayer] + roundScore;
    //Дэлгэц дээрхи оноог өөрчилнө
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    //Уг тоглогч хожсон эсэхийг (оноо нь 100-аас их эсэх ) шалгах
    if (scores[activePlayer] >= 10) {
    //Тоглоомыг дууссан төлөвт оруулна
        isGameOver = true;
        //Ялагч гэсэн текстийг нэрний оронд гаргана
        document.getElementById("name-" + activePlayer).textContent = "Winner!!!"
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    } else {
         //Тоглогчийн ээлжийг солино
    switchToNextPlayer();
    } 
    //Дэлгэц дээрхи оноог өөрчилнө
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    
    //Тоглогчийн ээлжийг солино
    switchToNextPlayer();
});

//Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг
function switchToNextPlayer() {
    //Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;

    //Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    //Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").
    classList.toggle("active");
    //Шоог түр алга болгоно
    diceDom.style.display = "none";
}

//New Game буюу Шинэ тоглоом эхлүүлэх товчний эвент листенэр
document.querySelector(".btn-new").addEventListener("click", initGame);

function initGame() {
    //Тоглоом эхэллээ гэдэг төлөвь оруулна.
    isGameOver = false;
    //Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0,хоёр дугаар тоглогчийг 1 гэж тэмдэглэе
activePlayer = 0;

//Тоглогчдын оноог хадгалах хувьсагч хэрэгтэй
scores = [0, 0];

//Тоглогчийн ээлжин дээр цуглуулж байгаа оноог хадгалах хувьсагч хэрэгтэй
roundScore = 0;
//Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө
var diceNumber = Math.floor(Math.random()*6) + 1;



//Программ эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";
//Тоглогчдын нэрийг буцааж гаргах
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");
diceDom.style.display = "none";
}
