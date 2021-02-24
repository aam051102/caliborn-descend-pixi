// Preloader
const preloader_dom = document.querySelector("#preloader");
const logoMask_dom = document.querySelector("#logo-mask");
const logo_dom = preloader_dom.querySelector("#logo");
const loaderText_dom = preloader_dom.querySelector("p");

PIXI.Loader.shared.onProgress.add((e) => {
    loaderText_dom.textContent = Math.floor(e.progress) + "%";
    logoMask_dom.style.height = loaderText_dom.textContent;
});

PIXI.Loader.shared.onComplete.add((e) => {
    loaderText_dom.textContent = "Click to play.";

    preloader_dom.addEventListener("click", () => {
        preloader_dom.classList.add("transition");
        logo_dom.classList.add("transition");
        
        MainLoop.start();
        setTimeout(() => {
            preloader_dom.remove();
            scene.instance.play();
        }, 1200);
    })
});

// Replace main loop to update when tab is blurred
PIXI.Ticker.shared.autoStart = false;
//PIXI.Ticker.shared.minFPS = 1;
PIXI.Ticker.shared.stop();

MainLoop.setUpdate((delta) => {
    PIXI.Ticker.shared.update();
})

// Load scene
var scene = new PIXI.animate.Scene({
    width: 650,
    height: 450,
    view: document.getElementById("stage"),
    backgroundColor: 0xffffff,
    antialias: true
});

scene.load(lib.S_Caliborn_Descend_PixiAnimate);

scene.view.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    
    if(scene.instance.currentFrame == 438 && scene.instance.paused) {
        scene.instance.play();
    }
});