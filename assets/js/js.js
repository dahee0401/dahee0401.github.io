//사이트 부드럽게하기
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)


//a태그 클릭시 부드럽게 이동
function getSamePageAnchor (link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if(elem) {
    if(e) e.preventDefault();
    gsap.to(window, {scrollTo: elem});
  }
}

// If a link's href is within the current page, scroll to it instead
document.querySelectorAll('a[href]').forEach(a => {
  a.addEventListener('click', e => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);



// 마우스
// 마우스 커스텀
const customCursor = document.querySelector(".curser-wrap");
$(document).mousemove(function(e){
    gsap.to(customCursor,{
        x: e.clientX,
        y: e.clientY,
        xPercent:-50,
        yPercent:-50,
        duration:0.1,
        opacity: 1,
    });
})

//마우스 a태그 호버시
const customCursor2 = document.querySelector(".curser-wrap .cursor");
$('body a,body button').hover(function(){
    gsap.to(customCursor2,0.1,{ scale:0.3 });
},function(){
     gsap.to(customCursor2,0.1,{ scale:1 });
})

//마우스 이벤트
const mouseTl = gsap.timeline({
  paused:true,
})

mouseTl
.to('.curser-wrap i',0.1,{ opacity: 1},"a")
.to('.curser-wrap .learn-more',0.1,{ opacity: 1},"a")

$('.mouse-event').hover(function(){
    mouseTl.play()
},function(){
    mouseTl.reverse()
})



//header
const showProducer = gsap.to(".group-producer", { 
  duration: 0.8,
  opacity: 1,
})

ScrollTrigger.create({
    start: "top top",
    onUpdate: (self) => {
        self.direction === -1 ? showProducer.play() : showProducer.reverse()
    }
});



//실시간 시간
//한국
const koreaTarget = document.getElementById("koTime");

function getkoreaTime() {
  const koreaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
        koreaTarget.innerText = koreaTime;
}

getkoreaTime();
setInterval(getkoreaTime, 1000); // 1초마다 실행


//뉴욕
const newYorkTarget = document.getElementById("nyTime");

function getNewYorkTime() {
  const newYorkTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
        newYorkTarget.innerText = newYorkTime;
}

getNewYorkTime();
setInterval(getNewYorkTime, 1000); // 1초마다 실행



// open-menu
const openMenuTl = gsap.timeline({
  paused:true,
})
openMenuTl
.to('.open-menu',.8,{transform: 'translateY(0%)',ease: 'back'},)

$('.open').click(function(){

  if($(this).hasClass('on')){
    openMenuTl.reverse()
  }else{
      openMenuTl.play()
  }
  $(this).toggleClass('on')

})



//sc-intro
gsap.from('.sc-intro .group-text .word .char', { yPercent:110, duration: 0.3, stagger: 0.03,ease: "power1" })



// sc-mainproject
// group-item _1
const inTroTl = gsap.timeline({
  scrollTrigger: {
      trigger: '.sc-mainproject',
      start:"-10% 50%",
      end:"0% 50%",
      // markers:true,
      scrub: 0,
  },
})
inTroTl
.to('.sc-mainproject h2',{ width:'100%'},"n")
.to('.sc-mainproject ._1',{ width:'100%'},"n")
.from('.sc-mainproject',{ yPercent:1},"n")

//group-tiem //hori
const horiList = document.querySelectorAll(".pin");
const introductionpageTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc-mainproject",
        scrub: 0,
        start: "0 0",
        end: "100% 100%",
        // markers:true,
    }
});

introductionpageTl
.to('.sc-mainproject ._2',{ transform: 'translateY(0)'},"a+=0.1")
.to('.sc-mainproject ._2',{ width:'100%'},"a")
.to('.sc-mainproject ._1 .img-wrap',{opacity:0},"a+=0.1")
.to('.pagenation_wrap li',{xPercent:-100},"a")

.to('.sc-mainproject ._3',{ transform: 'translateY(0)'},"b")
.to('.sc-mainproject ._3',{ width:'100%'},"b")
.to('.sc-mainproject ._1 .img-wrap',{opacity:0},"b-=0.1")
.to('.pagenation_wrap li',{xPercent:-200},"b")

.to('.sc-mainproject ._4',{ transform: 'translateY(0)'},"c")
.to('.sc-mainproject ._4',{ width:'100%'},"c")
.to('.sc-mainproject ._3 .img-wrap',{opacity:0},"c-=0.1")
.to('.pagenation_wrap li',{xPercent:-300},"c")

//섹션 끝
gsap.to('.sc-mainproject ._6 .img-wrap',{
  scrollTrigger:{
      trigger:'.sc-mainproject',
      start:"100% 100%",
      end:"103% 100%",
      scrub:0,
  },
  opacity:0.6
})



// //sc-project
$('.sc-javascript .item-img').each(function(i,el){
  //공통클레스로 반복문 돌리기
      $(el).mousemove(function(e){
          w = $(this).width();  //넓이값
          h = $(this).height(); //높이값
          xVal = e.offsetX - w/2; //중심값잡아주기
          yVal = e.offsetY - h/2; //중심값잡아주기
      
          gsap.to($(this).find('img'), {
            x:xVal/2,
            y:yVal/2
          });
      })  
  })


//sc-sideproject
//이미지 밝기 조절

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

    mm.add("(min-width: 767px)", () => {
      gsap.utils.toArray('.sc-sideproject .img').forEach(item => {

        decorationTl=gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "0 70%",
                end: "200% 70%",
                // markers: true,
                scrub: 0,
            },
        })
        decorationTl
        .to(item,{opacity:1})
        .to(item,{opacity:0})
        // .to('.sc-sideproject .img-inner',{yPercent:-5},"a")
      
      });

      gsap.set('.img-event',{yPercent:-5,})
      gsap.utils.toArray('.img-event').forEach(items => {
            gsap.to(items, {
              yPercent:5,
              scrollTrigger: {
              trigger: items,
              start:"0% 50%",
              end:"100% 50%",
              //  markers:true,
              scrub: 0,
          },
        
        })
      
})

});






