const frame = document.querySelector("section"); 
const lists = frame.querySelectorAll("article"); 
const audio = frame.querySelectorAll("audio"); 
const prev = document.querySelector(".btnPrev"); 
const next = document.querySelector(".btnNext"); 
const deg = 45; 
let i = 0; //초기값 0 
let num = 0; 
let active = 0; 
const len = lists.length -1;  

console.log(lists); 

//article의 갯수만큼 반복을 돌면서 코드 실행 
for(let el of lists){
    //article의 자식인 .pic을 찾아서 변수저장 
    let pic = el.querySelector(".pic"); 

    //pic에 백그라운드 이미지 대입 처리 
    pic.style.backgroundImage = `url(img/member${i+1}.jpg)`;    
    //article 배치 
    el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`; 
    //초기값 0부터 시작하여 1씩 증가 
    i++;

    //article에서 play, pause, load버튼을 찾아서 변수저장 
    let play = el.querySelector(".play"); 
    let pause = el.querySelector(".pause"); 
    let load = el.querySelector(".load"); 

    //play버튼 클릭시 
    play.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on"); 
        if(isActive){
            //클릭한 버튼이 속한 아티클에서 pic을 찾아 활성화 
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on"); 
            //클릭한 버튼이 속한 article에서 audio를 찾아서 재생 
            e.currentTarget.closest("article").querySelector("audio").play(); 
        }
        
    }); 

    //pause 버튼 클릭시 
    pause.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on"); 
        if(isActive){
            e.currentTarget.closest("article").querySelector(".pic").classList.remove("on"); 
            e.currentTarget.closest("article").querySelector("audio").pause(); 
        }
        
    }); 

    //load버튼 클릭시 
    load.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on"); 
        if(isActive){
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on"); 
            e.currentTarget.closest("article").querySelector("audio").load(); 
            e.currentTarget.closest("article").querySelector("audio").play(); 
        }
        
    })

}

//next 버튼을 클릭했을 때 
next.addEventListener("click", ()=>{
    //오디오 초기화 함수 호출 
    initMusic(); 

    //num값을 1씩 감소시키면서 frame을 45도씩 감소 
    num--; 
    frame.style.transform = `rotate(${deg * num}deg)`;  

    //활성화 article 순번 
    (active == len) ? active = 0 : active++; 
     //활성화 함수 호출 
     activation(active, lists); 
});

prev.addEventListener("click", ()=>{
    initMusic(); 

    num++; 
    frame.style.transform = `rotate(${deg * num}deg)`;      

    (active == 0) ? active = len : active--; 
   //활성화 함수 호출 
    activation(active, lists); 
});

//모든 오디오 요소를 반복하면서 재생중지하고 pic요소 애니메이션 중지하는 초기화 함수 정의 
function initMusic(){
    for(let el of audio){
        el.pause(); 
        el.load(); 
        el.closest("article").querySelector(".pic").classList.remove("on");
    }
}

//활성화 함수 정의 
function activation(index, lists){
    //모든 article 비활성화 
    for(let el of lists){
        el.classList.remove("on"); 
    }
    //해당 순번의 article만 활성화 
    lists[index].classList.add("on"); 
}