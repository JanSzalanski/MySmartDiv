const kropki = [...document.querySelectorAll('.kropka')];
const texty = [...document.querySelectorAll('.parag')];


const root = document.documentElement; 

let currentText = 0;
let indexLeft = 0;
let ratioTrsnform = 0;
let ratio;


function countRatio() {
    ratioTrsnform = 100 / texty.length;
    let zaokroglon = Math.round(ratioTrsnform * 10) / 10;
    return zaokroglon;
}

const setIndex = () => {
    root.style.setProperty("--index", `${texty.length}`);
  
};



setIndex();

function RemoveActive ()  {

    const activeKropka = kropki.findIndex(kropka => kropka.classList.contains('active'));

    kropki[activeKropka].classList.remove('active');

}

const RemoveVisible = () => {

    const visibleText = texty.findIndex(text => text.classList.contains('visible'));
    texty[visibleText].classList.remove('visible');

}


const RemoveMoveClasses = () => {

   texty.forEach(text => {

    text.classList.remove('moveLeft');
    text.classList.remove('moveLeftDelay');
    text.classList.remove('moveRight');
    text.classList.remove('moveRightDelay');
    
   });
    
}

const AddLeft = (a,b) => {

   
    let newProcent = countRatio() * indexLeft * a * b;
    root.style.setProperty("--left",`${newProcent}%`) 
     
 }

var wywołanie = function() {
    
    if(Math.abs(manual - currentText) > 1){
      
       manualNav(manual - 1);
    };
    return;
}


var  manualNav = function(manual) {

    console.log("funkcja manual " +indeksKropki);

        if (manual === currentText){  // prymitywne zabezpieczenie przed wywowałniem funkcji na tym samym buttonie ...
            return;
        }
   
    const setRatio = () => {    //to niby ustala wspolczynik przez ktory mnoze przesuniecie animacji w css a uzaleznia od przekzaznego manual ktory dla pierwszej kropki ma 0! stad zerowy ruch 
   
        ratio = manual - currentText;
        ratio = Math.abs(ratio);
       
     }; 

     setRatio(); 

    if(currentText < 0){
        currentText = 0
    } else if (currentText > texty.length) {
        currentText = texty.length;
    }
    if(indexLeft < 0){
        indexLeft = 0
    } else if (indexLeft > texty.length) {
        indexLeft = texty.length;
    }
       
    let znak = -1;

    RemoveActive();             // usuwa klase active z przycisku bierzacego
    RemoveVisible();            // usuwa klase visible z tekstu bierzacego
    RemoveMoveClasses();        // usuwanie klas odpowiedzialnych za ruch umieszczenie funkcji na końcu tej funkcji spowoduje że ostatecznie nie będzie widoczny ruch bo klasa dodana w kilka ms później zostanie zabrana...
    
    kropki[manual].classList.add('active'); //nadanie zgodnie zgodnie z numerem przycisku active na kropce
    texty[manual].classList.add('visible');//nadanie zgodnie zgodnie z numerem przycisku informacji o widocznosci pragrapu


    if(manual > currentText) {
        texty[manual].classList.add('moveLeftDelay');
       
        currentText++;
        indexLeft++;
 
      
        texty.forEach ((text,i) => {
            if (i !== manual)
            {
            text.classList.add('moveLeft') //nadanie klasy moveleft dla wszystkich paragrapow poza wjezdzajacym
            }
        });

    }

    else if(manual < currentText) {
        texty[manual].classList.add('moveRightDelay');
        
        currentText--;
        indexLeft--;

        texty.forEach ((text,i) => {
            if (i !== manual)
            {
            text.classList.add('moveRight') //nadanie klasy moveleft dla wszystkich paragrapow poza wjezdzajacym
            }
        });
        
    }
    
    setTimeout(() => {  //usuwanie wszystkich klas odpowiedzialnych za animacje po czasie wykonania animacji

        RemoveMoveClasses();

     }, 1000);

    setTimeout(() => {
       
        AddLeft(znak, ratio);

    }, 1001);


}
let indeksKropki = 0;



kropki.forEach(function(kropka,i){
    kropka.addEventListener("click", () => {
        manualNav(i)
        currentText = i;
    });

});


   





