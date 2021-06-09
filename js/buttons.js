const menu = document.querySelector('.menu');
const para = [...document.querySelectorAll('.parag')];
const DCbtn = document.createDocumentFragment();

for ( var i = 0; i < para.length ;i++) {
    var btn = document.createElement("button");
    if(i==0) {
        btn.classList.add('active');
    }
    btn.classList.add('kropka');
    DCbtn.appendChild(btn);
}

menu.appendChild(DCbtn);