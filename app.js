//Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0,хоёр дугаар тоглогчийг 1 гэж тэмдэглэе
var activePlayer = 0;

//Тоглогчдын оноог хадгалах хувьсагч хэрэгтэй
var scores = [0, 0];

//Тоглогчийн ээлжин дээр цуглуулж байгаа оноог хадгалах хувьсагч хэрэгтэй
var roundScore = 0;
//Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө
var diceNumber = Math.floor(Math.random()*6) + 1;



//Программ эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";
var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";
//Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
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

//Шинэ тоглоом эхлүүлэх товчний эвент листенэр
document.querySelector(".btn-new").addEventListener("click", function () {
    
});
