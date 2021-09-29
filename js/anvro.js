console.warn = console.error = () => {}; // Suppresses Three.js warnings. Remove to debug

AFRAME.registerComponent('table-wait', {
    init: function () {
        var tablename = this.el.id;
        var tableitems = sceneEl.querySelectorAll('.'+tablename+'obj');
      this.el.addEventListener('model-loaded', () => { // Wait for model to load.
        for (let each of tableitems) {
            if (each.classList.contains('standup') == false) { // PC small objects have their own standup animation
                each.removeAttribute('static-body');
                each.setAttribute('dynamic-body', {shape: 'box', mass: 1});
        }}
        });
}});

// PC Look Preference Switcher
AFRAME.registerComponent("look-switch", {
    init: function() {
        var sceneEl = this.el.sceneEl;
        var canvasEl = sceneEl.canvas;
        var camera = document.querySelector('#camera');
        var PCmode = 0;
        window.addEventListener("keydown", function(e){ // Mouselook toggle
            if(e.keyCode === 77 && PCmode == 0) { // Swipe to FPS
                camera.setAttribute('look-controls', {enabled: false});
                camera.setAttribute('fps-look-controls', 'userHeight', 0);
                document.querySelector('#SMH-PC1').object3D.visible = false;
                document.querySelector('#SMH-PC2').object3D.visible = true;
                document.querySelector('#GL-PC1').object3D.visible = false;
                document.querySelector('#GL-PC2').object3D.visible = true;
                document.querySelector('#crosshair').object3D.visible = true;
                PCmode = 1;
            } else if (e.keyCode === 77 && PCmode == 1) { // FPS to swipe
                camera.removeAttribute('fps-look-controls');
                camera.setAttribute('look-controls', {enabled: true});
                canvasEl.onclick = null; // Removes FPS components taking mouse on click
                document.exitPointerLock();
                document.querySelector('#SMH-PC1').object3D.visible = true;
                document.querySelector('#SMH-PC2').object3D.visible = false;
                document.querySelector('#GL-PC1').object3D.visible = true;
                document.querySelector('#GL-PC2').object3D.visible = false;

                document.querySelector('#crosshair').object3D.visible = false;
                PCmode = 0;
    
            }
        });
    }
    })

AFRAME.registerComponent('device-set', { // Device-specific settings
    init: function() {
        var sceneEl = document.querySelector('a-scene');
        var tablestand = sceneEl.querySelectorAll('.table');
        var standup = sceneEl.querySelectorAll('.standup');
        var rig = document.querySelector('#rig');
        var camera = document.querySelector('#camera');
        var state = "stand";
        if (AFRAME.utils.device.isMobile() === true) { // Smartphone Mode
            sceneEl.setAttribute("vr-mode-ui", "enabled", "false");
            rig.setAttribute("movement-controls", "speed", 0.15);
            document.querySelector('#GL-SP').object3D.visible = true;
            document.querySelector('#SMH-SP').object3D.visible = true;
            for (let each of tablestand) {
                each.setAttribute('animation', {property: 'position.y', to: 0.3, dur: 5000});
            }
            for (let each of standup) {
                each.removeAttribute('dynamic-body');
                each.removeAttribute('grabbable');
                each.setAttribute('static-body');
                each.setAttribute('rotation', {z: 90});
                each.dispatchEvent(new CustomEvent("standtrigger"));
            }
        } else if (AFRAME.utils.device.checkHeadsetConnected() === true) { // VR Modes
            document.querySelector('#GL-VR').object3D.visible = true;
            document.querySelector('#SMH-VR').object3D.visible = true;
            rig.setAttribute("movement-controls", "speed", 0.10); // VR movement is slower than other modes for non barfing
        } else if (AFRAME.utils.device.checkHeadsetConnected() === false) { // PC Mode
            document.querySelector('#GL-PC1').object3D.visible = true;
            document.querySelector('#SMH-PC1').object3D.visible = true;
            rig.setAttribute("movement-controls", "speed", 0.15);
            for (let each of tablestand) {
                let poss = each.getAttribute('position');
                each.setAttribute('animation', {property: 'position.y', to: poss.y + 0.25, dur: 5000, delay: 50});
            }
            for (let each of standup) { // Stands up small objects
                each.removeAttribute('dynamic-body');
                each.removeAttribute('grabbable');
                each.setAttribute('static-body');
                each.setAttribute('rotation', {z: 90});
                each.dispatchEvent(new CustomEvent("standtrigger"));
            }
            window.addEventListener("keydown", function(e){ // Crouch key for PC
                if(e.keyCode === 67 && state == "stand") { 
                    camera.setAttribute('position', {y: 1.0});
                    state = "crouch";
                } else if (e.keyCode === 67 && state == "crouch") {
                    camera.setAttribute('position', {y: 1.6});
                    state ="stand";
        
                }
            });
    }
}})

AFRAME.registerComponent("plane-hit", { // Manual occlusion zones
init: function() {
sceneEl = document.querySelector('a-scene');
var el = this.el;
var scale1 = sceneEl.querySelectorAll(".scale-zone-1");
var scale2 = sceneEl.querySelectorAll(".scale-zone-2");
var scale3 = sceneEl.querySelectorAll(".scale-zone-3");
var czone = sceneEl.querySelectorAll(".center-zone");
var gzone = sceneEl.querySelectorAll(".grab-zone");
var bzone = sceneEl.querySelectorAll(".burial-zone");
var gzoneobjs = sceneEl.querySelectorAll(".grab-obj-zone");
var czoneobjs = sceneEl.querySelectorAll(".center-obj-zone");
var grabcheck = 0;
var centercheck = 0;
var scalecheck1 = 0;
var scalecheck2 = 0;
var scalecheck3 = 0;
var burialcheck = 0;
var visiswitch = function(zone, toggle) {
    for (let each of zone) {
       each.object3D.visible = toggle;
   }
   }
var visidistanceswitch = function(zone, toggle) {
for (let each of zone) {
        let poss = each.getAttribute('position');
        let area = (poss.x + 1) * (poss.z + 1);
        let absarea = Math.abs(area)
         if (each.is('grabbed') == false && absarea <= 3) { // See if object has moved under 2 meters in coordinates
            each.object3D.visible = toggle; // Hide object if close to table
         } else {
            each.object3D.visible = true; // Keep object visible if it has been carried
}}
}
var lightswitch = function() { // Light switch logic to light the right area
    var el = sceneEl.querySelectorAll(".shadowlight");
    if (grabcheck == 1 || centercheck == 1 || scalecheck1 == 1 ) {
    console.log("main lights");
    document.querySelector('#shadowlight').object3D.position.set(-1, 8, 4);
} else if (burialcheck == 1) {
    console.log("burial lights");
    document.querySelector('#shadowlight').object3D.position.set(-12.5, 8, -14);
} else {
    document.querySelector('#shadowlight').object3D.position.set(-15.7, 8, -1.67);
    console.log("scale lights");
}
}


var zonechecker = function () {
var list = el.components['aabb-collider'].intersectedEls;
for (let each of list) {
if (each.id == "just-grab") { // Turn off Scale Model Hall and Centerpiece or not when user is inside Grab Lab
   console.log("just-grab entered");
   grabcheck++;
}  
if (each.id == "just-center") { // Turn off parts of Scale Model Hall and Grab Lab when user is inside Centerpiece area
   console.log("just-center entered");
   centercheck++;
}
if (each.id == "just-scale1") { // Turn off parts of Grab Lab when user is inside Scale Model Hall area
   console.log("just-scale1 entered");
    scalecheck1++;
}
if (each.id == "just-scale2") { // Turn off parts of Grab Lab when user is inside Scale Model Hall area
    console.log("just-scale2 entered");
    scalecheck2++;
 }
 if (each.id == "just-scale3") { // Turn off parts of Grab Lab when user is inside Scale Model Hall area
    console.log("just-scale3 entered");
    scalecheck3++;
 }
if (each.id == "just-burial") { // Turn off parts of Burial Chamber when user is inside Scale Model Hall area
   console.log("just-burial entered");
   burialcheck++;
}
}
if (grabcheck == 1) {
    console.log("grab on");
    visiswitch(czone, false);
    visiswitch(gzone, true);
    visiswitch(gzoneobjs, true);
    visiswitch(scale1, false);
    visiswitch(scale2, false);
    lightswitch();
} else {
console.log("grab off");
    visidistanceswitch(gzoneobjs, false);
}
if (centercheck == 1) {
    console.log("center on");
    visiswitch(czone, true);
    visiswitch(czoneobjs, true);
    visiswitch(gzone, true);
    visiswitch(scale1, true);
    visiswitch(scale2, false);
    visiswitch(scale3, false);
    lightswitch();
} else {
console.log("center off");
    
}
if (scalecheck1 == 1) {
    console.log("scale1 on");
    visiswitch(czone, true);
    visiswitch(czoneobjs, true);
    visiswitch(scale1, true);
    visiswitch(scale2, true);
    visiswitch(scale3, false);
    lightswitch();
} else {
console.log("scale1 off");
}

if (scalecheck2 == 1) {
    console.log("scale2 on");
    visiswitch(czone, false);
    visidistanceswitch(czoneobjs, false);
    visiswitch(scale1, true);
    visiswitch(scale2, true);
    visiswitch(scale3, true);
} else {
console.log("scale2 off");
}

if (scalecheck3 == 1) {
    console.log("scale3 on");
    visiswitch(scale1, false);
    visiswitch(scale2, true);
    visiswitch(scale3, true);
    lightswitch();
} else {
console.log("scale3 off");
}

if (burialcheck == 1) {
    console.log("burial on");
    visiswitch(bzone, true);
    visiswitch(scale1, false);
    visiswitch(scale2, false);
    visiswitch(scale3, true);
    lightswitch();
} else {
console.log("burial off");
    visiswitch(bzone, false);
}
centercheck = 0;
grabcheck = 0;
scalecheck1 = 0;
scalecheck2 = 0;
scalecheck3 = 0;
burialcheck = 0;
}

el.addEventListener("hitstart", function(evt) {
zonechecker();
}) // Hitstart end
   
el.addEventListener("hitend", function(evt) {
zonechecker();
// Hitend end     

})
}})

// Orb Toggle Buttons
AFRAME.registerComponent("grab-panels", {
init: function() {
var grabpanel = function(grabbutt, grabset, grabinfo) {
document.getElementById(grabbutt).addEventListener("grab-start", function(evt) {
  var cent = document.querySelector(grabset);
  var info = document.querySelector(grabinfo);
  cent.object3D.visible = !cent.getAttribute("visible");
})};
grabpanel("centerbutt","#centerpiece-tit");
grabpanel("chimpstatuebutt","#chimpstatue-tit");
grabpanel("parisbuttinfo","#paris-tit");
grabpanel("gorillabutt","#stand1-tit");
grabpanel("rhesusbutt","#stand2-tit");
grabpanel("gibbonbutt","#stand3-tit");
grabpanel("orangbutt","#stand4-tit");
grabpanel("notharctusbutt","#stand5-tit");
grabpanel("howlerbutt","#stand6-tit");
grabpanel("megaladapisbutt","#stand7-tit");
grabpanel("tarsierbutt","#stand8-tit");
grabpanel("proconsulbutt","#stand9-tit");
grabpanel("jamesbuttinfo","#james-tit");
grabpanel("calatravabuttinfo","#calatrava-tit");
grabpanel("chimpsbutt","#stand10-tit");
grabpanel("mandrillsbutt","#stand11-tit");
grabpanel("lorisbutt","#stand12-tit");
grabpanel("aye-ayebutt","#stand13-tit");
}
})

// Credits Flipper
AFRAME.registerComponent("togg-cred", {
    init: function() {
        var el = this.el;
      var counter = 0;  
        var creditslist = document.getElementsByClassName("credits");
        el.addEventListener("grab-start", function(evt) {
        for (let each of creditslist) {
                    each.setAttribute("visible", false);     
            }
            counter++;
            if (counter > 8) { // Value is total panels minus one
                counter = 0;
             }
            creditslist[counter].setAttribute("visible", true);
        })
    }}
)

// Burial Flipper
AFRAME.registerComponent("togg-burial", {
init: function() {
    var el = this.el;
    var counter = 0;  
    var burialslist = document.getElementsByClassName("burial");
    var jamestownlist = document.getElementsByClassName("jamestown");
    var jameshidelist = document.getElementsByClassName("jameshide");
    var calatravalist = document.getElementsByClassName("calatrava");
    var calatravahidelist = document.getElementsByClassName("calatravahide");
    var parislist = document.getElementsByClassName("paris");
    var parishidelist = document.getElementsByClassName("parishide");
    var generichidelist = document.getElementsByClassName("generichide");
    var sitetitle = document.getElementById("Generic-Site");
    el.addEventListener("grab-start", function(evt) { // The following is run if button is clicked
    for (let each of burialslist) {
                each.object3D.visible = false; // Hide everything
        }
        counter++; // Move the counter up and set the result
        if (counter == 1) { // Jamestown On
            for (let each of generichidelist) {
                each.object3D.visible = true;     
            }
            for (let each of jamestownlist) {
                each.object3D.visible = true;    
            }
            for (let each of jameshidelist) {
                each.object3D.position.y += 3;    
            }
            document.getElementById("burialname").setAttribute("value", "Captain Gabriel Archer\nJamestown Colony\nVirginia, USA (1600s)");
         } else if (counter == 2) { // Calatrava On
            for (let each of jamestownlist) {
                each.object3D.visible = false;    
            }
            for (let each of jameshidelist) {
                each.object3D.position.y -= 3;    
            }
            for (let each of calatravalist) {
                each.object3D.visible = true;    
            }
            for (let each of calatravahidelist) {
                each.object3D.position.y += 3;    
            }
            document.getElementById("burialname").setAttribute("value", "Knight of Calatrava\nCalatrava la Nueva\nAldea del Rey, Spain (1200s)");
        } else if (counter == 3) { // Paris On
            for (let each of calatravalist) {
                each.object3D.visible = false;    
            }
            for (let each of calatravahidelist) {
                each.object3D.position.y -= 3;    
            }
            for (let each of parislist) {
                each.object3D.visible = true;    
            }
            for (let each of parishidelist) {
                each.object3D.position.y += 3;    
            }
            sitetitle.object3D.position.z -= 4;    
            document.getElementById("burialname").setAttribute("value", "18th Century Parisians\nCatacombs\nParis, France (1800s)");
         } else if (counter > 3) { // Set back to zero past Paris
            counter = 0;
            for (let each of generichidelist) {
                each.object3D.visible = false;    
            }
            for (let each of parislist) {
                each.object3D.visible = false;     
            }
            for (let each of parishidelist) {
                each.object3D.position.y -= 3;    
            }
            sitetitle.object3D.position.z += 4;   
            document.getElementById("burialname").setAttribute("value", "Choose Burial");
         }
    })
}}
)

// VR Grab Lab Grabbing Function
AFRAME.registerComponent("item-grab", {
       init: function() {
sceneEl = document.querySelector('a-scene');
var grabtrig = function(grabitem, grabinfo, grabtable, grabholo, grabproj, grabmodel, grabrotate = "0 0 0", grabscale = "5 5 5", grabposition = "0 1 0") {
document.getElementById(grabitem).addEventListener("grab-start", function(evt) {
  if (document.getElementById(grabinfo).getAttribute('visible') == true) {
                for (let each of sceneEl.querySelectorAll(grabtable)) { // Turn off everything
                    each.object3D.visible = false; 
                }
                document.getElementById(grabproj).object3D.visible = false; 
                document.getElementById(grabholo).object3D.visible = false; 
            } else {
                for (let each of sceneEl.querySelectorAll(grabtable)) {
                    each.object3D.visible = false; 
                }
                document.getElementById(grabproj).object3D.visible = true;   
                document.getElementById(grabinfo).object3D.visible = true;   
                document.getElementById(grabholo).object3D.visible = true;   
                document.getElementById(grabholo).setAttribute("full-gltf-model", grabmodel);
                document.getElementById(grabholo).setAttribute("rotation", grabrotate);
                document.getElementById(grabholo).setAttribute("scale", grabscale);
                document.getElementById(grabholo).setAttribute("position", grabposition);
            }
        }) 
   }


// Toggle Early Primate Skulls
grabtrig("proconsul-grab","proconsul-tit",".bone-text", "holobone", "holoboneproj", "models/proconsulskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("archicebus-grab","archicebus-tit",".bone-text", "holobone", "holoboneproj", "models/archicebus.glb", undefined, undefined, "0 1.2 0");
grabtrig("sahelanthropus-grab","sahel-tit",".bone-text", "holobone", "holoboneproj", "models/sahelskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("platyops-grab","platyops-tit",".bone-text", "holobone", "holoboneproj", "models/platyopsskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("aethiopicus-grab","aethiopicus-tit",".bone-text", "holobone", "holoboneproj", "models/aethiopicusskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("africanus-grab","africanus-tit",".bone-text", "holobone", "holoboneproj", "models/africanusskull.glb", undefined, undefined, "0 1.2 0");

// Toggle Homo Skulls
grabtrig("habilis-grab","habilis-tit",".bone-text", "holobone", "holoboneproj", "models/habilisskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("turkana-grab","turkana-tit",".bone-text", "holobone", "holoboneproj", "models/turkanaskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("atapuerca-grab","atapuerca-tit",".bone-text", "holobone", "holoboneproj", "models/atapuercaskull.glb", undefined, undefined, undefined);
grabtrig("naledi-grab","naledi-tit",".bone-text", "holobone", "holoboneproj", "models/nalediskull.glb", undefined, undefined, undefined);
grabtrig("nean-grab","nean-tit",".bone-text", "holobone", "holoboneproj", "models/neanskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("vlca1-grab","vlca1-tit",".bone-text", "holobone", "holoboneproj", "models/vLCA1skull.glb", undefined, undefined, "0 1.2 0");

// Toggle Modern Prosimian Skulls
grabtrig("potto-grab","potto-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/pottoskull.glb", undefined, "10 10 10", "0 1.3 0");
grabtrig("indri-grab","indri-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/indriskull.glb", undefined, "8 8 8", "0 1.3 0");
grabtrig("howler-grab","howler-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/howlerskull.glb", undefined, "7 7 7", "0 1.3 0");
grabtrig("squirrelmonkey-grab","squirrelmonkey-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/squirrelmonkeyskull.glb", undefined, "10 10 10", "0 1.3 0");
grabtrig("baboon-grab","baboon-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/baboonskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("rhesus-grab","rhesus-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/rhesusskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("mandrill-grab","mandrill-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/mandrillskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("snub-grab","snub-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/snubskull.glb", undefined, "7 7 7", "0 1.3 0");

// Toggle Modern Hominoid Skulls
grabtrig("gibbon-grab","gibbon-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/gibbonskull.glb", undefined, "7 7 7", "0 1.2 0");
grabtrig("gorilla-m-grab","gorilla-m-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/gorillaskull-m.glb", undefined, "4 4 4", undefined);
grabtrig("gorilla-f-grab","gorilla-f-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/gorillaskull-f.glb", undefined, "4 4 4", undefined);
grabtrig("chimp-grab","chimp-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/chimpskull.glb", undefined, undefined, undefined);
grabtrig("mhs-grab","mhs-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/mhsskull.glb", undefined, undefined, undefined);

// Toggle Artifacts
grabtrig("lomek-grab","lomek-tit",".art-text","holoartifact", "holoartproj", "models/lomekwian.glb", "0 0 90", "7 7 7", "0.18 1.3 0");
grabtrig("acheul-grab","acheul-tit",".art-text","holoartifact", "holoartproj", "models/acheul.glb", "0 0 90", "7 7 7", "0.18 1.3 0");
grabtrig("mousterian-grab","mousterian-tit",".art-text","holoartifact", "holoartproj", "models/mousterian.glb", "0 0 90", "9 9 9", "0 1.5 0");
grabtrig("clovis-grab","clovis-tit",".art-text","holoartifact", "holoartproj", "models/clovis.glb", "0 0 90", "12 12 12", "0 1.4 0");
grabtrig("harpoon-grab","harpoon-tit",".art-text","holoartifact", "holoartproj", "models/harpoon.glb", "0 0 90", "7 7 7", "0 1.4 0");
grabtrig("moundville-grab","moundville-tit",".art-text","holoartifact", "holoartproj", "models/moundville.glb", undefined, "6 6 6", undefined);
grabtrig("dagger-grab","dagger-tit",".art-text","holoartifact", "holoartproj", "models/dagger.glb", "0 0 90", undefined, "0 1.5 0");
grabtrig("venus-grab","venus-tit",".art-text","holoartifact", "holoartproj", "models/venus.glb", undefined, "8 8 8", "0 0.9 0");
grabtrig("nasca-grab","nasca-tit",".art-text","holoartifact", "holoartproj", "models/nasca.glb", undefined, "6 6 6", "0 0.9 0");
grabtrig("canopic-grab","canopic-tit",".art-text","holoartifact", "holoartproj", "models/canopic.glb", undefined, "6 6 6", "0 1 0");
grabtrig("baboon-blue-grab","baboon-blue-tit",".art-text","holoartifact", "holoartproj", "models/baboon-blue.glb", undefined, "7 7 7", "0 0.9 -0.1");
}
})

// Raise and Lower Burial
AFRAME.registerComponent("burial-grab", {
init: function() {
var state = "down";
var heightswitch = function(button) {
document.getElementById(button).addEventListener("grab-start", function(evt) {
if (state == "up") {
document.getElementById("jamesburialset").setAttribute('animation', {property: 'position.y', to: 0.8, dur: 3000});
document.getElementById("holocalatrava").setAttribute('animation', {property: 'position.y', to: 0.5, dur: 3000});
document.getElementById("calatravaburialset").setAttribute('animation', {property: 'position.y', to: 0.8, dur: 3000});
state = "down";
} else {
document.getElementById("jamesburialset").setAttribute('animation', {property: 'position.y', to: 1.3, dur: 3000});
document.getElementById("holocalatrava").setAttribute('animation', {property: 'position.y', to: 1, dur: 3000});
document.getElementById("calatravaburialset").setAttribute('animation', {property: 'position.y', to: 1.3, dur: 3000});
state = "up";
     }
 }) 
}
heightswitch("jamesbuttpos"); // Set Button Behaviors
heightswitch("calatravabuttpos");
}
})

// Anti-Drop Protection
AFRAME.registerComponent("anti-drop", {
init: function() {
sceneEl = document.querySelector('a-scene');
this.grabbablelist = sceneEl.getElementsByClassName("grabbable");
this.tick = AFRAME.utils.throttleTick(this.tick, 3000, this);
},
dropcheck: function() {
for (let each of this.grabbablelist) {
        let poss = each.getAttribute('position');
        let area = (poss.x + 1) * (poss.z + 1);
        let absarea = Math.abs(area)
        if (poss.y <= 0.1 && absarea <= 5) {
             each.object3D.position.set(0, 1.4, 0);
             each.components['dynamic-body'].syncToPhysics(); // This makes the position official
         }}
},
tick: function (t, dt) { // Tick function magic
this.dropcheck();
},

})

AFRAME.registerComponent("warp", {
    init: function() {
    rig = document.querySelector("#rig");
    var warpfun = function(warpbutt, warplocx, warplocy, warplocz) {
    document.getElementById(warpbutt).addEventListener("grab-end", function(evt) {
      rig.object3D.position.set(warplocx, warplocy, warplocz);
    })};
    warpfun("centerwarpbutt", 0, 0, 1);
    warpfun("grabwarpbutt", 9.33, 0, -0.5);
    warpfun("primatewarpbutt", -13, 0, 1);
    warpfun("burialwarpbutt", -14, 0, -17.7);
    }
    })