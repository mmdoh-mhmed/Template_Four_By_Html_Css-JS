// Start setting box
let gear = document.querySelector(".setting-box .fa-gear");
let settingBox = document.querySelector(".setting-box");
let liColors = document.querySelectorAll(".setting-box .colors li");
let optionShowBullets
let selectBackground = document.querySelectorAll(
  ".setting-box .select-background li"
);
let counter;
let spansBoolean = document.querySelectorAll(".setting-box .background span");
let spansShowBullets = document.querySelectorAll(".setting-box .showBullets span");
let imgs = [
  "../imgs/2-landing.webp",
  "../imgs/3-landing.webp",
  "../imgs/4-landing.webp",
  "../imgs/5-landing.webp",
  "../imgs/6-landing.webp",
  "../imgs/1-landing.jpg",
];
let landing = document.querySelector("div.landing");

gear.onclick = () => {
  gear.classList.toggle("fa-spin");
  if (settingBox.style.left == "0px") {
    settingBox.style.left = "-200px";
  } else {
    settingBox.style.left = "0px";
  }
};

liColors.forEach((e) => {
  e.onclick = () => {
    liColors.forEach((e) => e.classList.remove("active"));
    e.classList.add("active");
    window.localStorage.color = e.getAttribute("data-color");
    document.querySelector(':root').style.setProperty('--main-color',e.getAttribute("data-color")
    );
  };
});

if (window.localStorage.color != null) {
  document.querySelector(':root').style.setProperty('--main-color',window.localStorage.color);
  document
    .querySelector(`[data-color='${window.localStorage.color}']`)
    .classList.add("active");
} else {
  document.styleSheets[2].rules[0].style.setProperty("--main-color", "#ff9800");
  document.querySelector(`[data-color='#ff9800']`).classList.add("active");
}

spansBoolean.forEach((e) => {
  e.onclick = (span) => {
    handleActive(spansBoolean,e)
    optionBackground = span.target.dataset.background;
    console.log(span.target.dataset.background);
    window.localStorage.booleanBackground = span.target.dataset.background;
    if (optionBackground == "true") {
      rotation();
    } else {
      clearInterval(counter);
    }
  };
});

selectBackground.forEach((e) => e.classList.remove("active"));

if (window.localStorage.booleanBackground != null) {
  optionBackground = window.localStorage.booleanBackground;
  spansBoolean.forEach((e) => e.classList.remove("active"));
  document
    .querySelector(
      `[data-background = '${window.localStorage.booleanBackground}']`
    )
    .classList.add("active");
  if (
    window.localStorage.choiceImage != null &&
    window.localStorage.booleanBackground == "false"
  ) {
    landing.style.backgroundImage = `url(${
      imgs[window.localStorage.choiceImage - 1]
    })`;
    document
      .querySelector(`[data-choice = '${window.localStorage.choiceImage}']`)
      .classList.add("active");
  }
} else {
  optionBackground = "true";
}

selectBackground.forEach((e) => {
  e.onclick = () => {
    handleActive(selectBackground,e)
    let choice = e.getAttribute("data-choice");
    window.localStorage.booleanBackground = "false";
    clearInterval(counter);
    landing.style.backgroundImage = `url(${imgs[choice - 1]})`;
    window.localStorage.choiceImage = choice;
  };
});

spansShowBullets.forEach((e) => {
  e.onclick = (span) => {
    handleActive(spansShowBullets,e)
    optionShowBullets = span.target.dataset.show;
    window.localStorage.booleanshowBullets = span.target.dataset.show;
    if (optionShowBullets != "true") {
      document.querySelector('.bullets').style.display = 'none'
    } else {
      document.querySelector('.bullets').style.display = 'block'
    }
  };
});

if(window.localStorage.booleanshowBullets != null){
  spansShowBullets.forEach((e) => e.classList.remove("active"));
  document
  document.querySelector(`[data-show = '${window.localStorage.booleanshowBullets}']`).classList.add('active')
  if(window.localStorage.booleanshowBullets == 'false') {
    document.querySelector('.bullets').style.display = 'none'
  }else {
    document.querySelector('.bullets').style.display = 'block'
  }
}
// End setting box

// Start Bullets
let bullets = document.querySelectorAll('.bullets .bullet')
let bulletsSection = document.querySelectorAll('.bullets .word')
bullets.forEach( e => {
  e.onclick = ()=> {
    document.querySelector(`.${e.getAttribute('data-section')}`).scrollIntoView({
      behavior: 'smooth'
    })
  }
} )
// Wnd Bullets

// Start Landing
let toggle = document.querySelector(".landing .container .toggle");
let a = document.querySelectorAll('.landing ul a')
let ul_in_landing = document.querySelector(".landing .container ul");
toggle.onclick = function () {
  if (ul_in_landing.style.display == "flex") {
    ul_in_landing.style.display = "none";
    toggle.style.color = "#fff";
  } else {
    ul_in_landing.style.display = "flex";
    toggle.style.color = "#ff9800";
  }
};





a.forEach( (e) => {
  e.onclick = () => {
    handleActive(a,e)
  }

} )

let i = 0;
function rotation() {
  if (optionBackground == "true") {
    counter = setInterval(() => {
      if (i == imgs.length) {
        i = 0;
      }
      landing.style.backgroundImage = `url(${imgs[i]})`;
      i++;
    }, 3000);
  }
}
rotation();

let close_btn = document.querySelector(".landing .close-btn");
let search_overlay = document.querySelector(".landing .search_overlay");
close_btn.onclick = function () {
  search_overlay.style.display = "none";
};
let search_icon = document.querySelector(".landing .search_icon");
search_icon.onclick = function () {
  search_overlay.style.display = "block";
};
// End Landing

// Start Skills
let skills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = skills.offsetTop;
  let skillsOuterHeight = skills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScroll = this.scrollY;
  if (windowScroll >= skillsOffsetTop + skillsOuterHeight - windowHeight - 100) {
    let spanProgress = document.querySelectorAll('.skills .progress span')
    spanProgress.forEach( (e) => {
      e.style.width = e.dataset.progress
    } )
  }
};
// End Skills

// Start Gallery
let gallery = document.querySelector('.gallery')
let imgsGallery = document.querySelectorAll('.gallery .container img')

imgsGallery.forEach( (e) => {
  e.title = e.alt
} )

imgsGallery.forEach( (img) => {
  img.onclick = function () {
    let galleryOverlay = document.createElement('div')
    let imgBox = document.createElement('div')
    let imgOverlay = document.createElement('img')
    let alttext = document.createElement('h3')
    let closeBtn = document.createElement('h1')
    
    galleryOverlay.className = 'overlay'
    alttext.className = 'alt'
    imgBox.className = 'imgbox'
    closeBtn.className = 'closeGallery'
    
    imgOverlay.src = img.src
    alttext.innerHTML = img.alt
    galleryOverlay.style.display = 'block'
    closeBtn.innerHTML = 'X'

    gallery.prepend(galleryOverlay)
    galleryOverlay.prepend(imgBox)
    imgBox.prepend(imgOverlay)
    imgBox.prepend(alttext)
    imgBox.prepend(closeBtn)
  }
} )

document.addEventListener('click',(e) => {
  if(e.target.className === 'closeGallery') {
    document.querySelector('.gallery .overlay').style.display = 'none'
  }
})
// End Gallery


function handleActive (parent,child) {
  // e.onclick = () => {
    // a.forEach( (ele) => ele.classList.remove('active') )
    // e.classList.add('active')
  // }
    parent.forEach((e)=>{e.classList.remove('active')})
    child.classList.add('active')
}

document.querySelector('.setting-box button').onclick = function () {
  window.localStorage.clear()
  window.location.reload()
}

settingBox.onclick = function (e) {
  e.stopPropagation()
}
ul_in_landing.onclick = function (e) {
  e.stopPropagation()
}
document.addEventListener('click',(e)=>{
  if(e.target !== toggle  && e.target !== ul_in_landing){
    if (ul_in_landing.style.display == "flex") {
      ul_in_landing.style.display = "none"
      toggle.style.color = "#fff";
    }
    else if (e.target !== settingBox ) {
      if (settingBox.style.left == "0px"){
        settingBox.style.left = "-200px"
      }
    }
  }
})