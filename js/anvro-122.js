// console.warn = console.error = () => {}; 
// Suppresses Three.js warnings. Remove to debug

AFRAME.registerComponent('table-wait', {
    init: function () {
        var tablename = this.el.id;
        var tableitems = sceneEl.querySelectorAll('.'+tablename+'obj');
      this.el.addEventListener('body-loaded', () => { // Wait for model to load.
        setTimeout(function(){
        if (AFRAME.utils.device.checkHeadsetConnected() === true) {
            for (let each of tableitems) {
                each.removeAttribute('static-body');
                each.setAttribute('dynamic-body', {shape: 'box', mass: 3});
        }}
    }, 200);});
}});


AFRAME.registerComponent('device-set', { // Device-specific settings
    init: function() {
        var sceneEl = document.querySelector('a-scene');
        var tablestand = sceneEl.querySelectorAll('.table');
        var standup = sceneEl.querySelectorAll('.standup');
        var grabbable = sceneEl.querySelectorAll('.grabbable');
        var rig = document.querySelector('#rig');
        var camera = document.querySelector('#camera');
        var state = "stand";
        if (AFRAME.utils.device.isMobile() === true) { // Smartphone Mode
            sceneEl.setAttribute("vr-mode-ui", "enabled", "false");
            rig.setAttribute("movement-controls", "speed", 0.15);
            document.querySelector('#GL-SP').object3D.visible = true;
            document.querySelector('#SMH-SP').object3D.visible = true;
            for (let each of tablestand) {
                each.object3D.position.y += 0.25;
            }
            for (let each of grabbable) {
                each.removeAttribute('dynamic-body');
                each.removeAttribute('grabbable');
                each.setAttribute('static-body', {shape: 'box'});
                each.object3D.position.y += 0.245;
            }
            for (let each of standup) {
                each.setAttribute('rotation', {z: 90});
                each.object3D.position.y += 0.2;
            }
        } else if (AFRAME.utils.device.checkHeadsetConnected() === true) { // VR Mode
            console.log('VR detected');
            document.querySelector('#GL-VR').object3D.visible = true;
            document.querySelector('#SMH-VR').object3D.visible = true;
            // rig.removeAttribute('movement-controls'); 
        } else if (AFRAME.utils.device.checkHeadsetConnected() === false) { // PC Mode
            console.log('PC detected');
            document.querySelector('#GL-PC1').object3D.visible = true;
            document.querySelector('#SMH-PC1').object3D.visible = true;
            rig.setAttribute("movement-controls", "speed", 0.15);
            for (let each of grabbable) {
                each.removeAttribute('dynamic-body');
                each.removeAttribute('grabbable');
                each.setAttribute('static-body', {shape: 'box'});
                each.object3D.position.y +=0.25;
            }
            for (let each of tablestand) {
                each.object3D.position.y += 0.25;
            }
            for (let each of standup) { // Stands up small objects
                each.removeAttribute('dynamic-body');
                each.removeAttribute('grabbable');
                each.setAttribute('static-body');
                each.setAttribute('rotation', {z: 90});
                each.object3D.position.y += 0.15;
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
var floorplanzone = sceneEl.querySelectorAll(".floorplan-zone");
var scale1 = sceneEl.querySelectorAll(".scale-zone-1");
var scale2 = sceneEl.querySelectorAll(".scale-zone-2");
var scale3 = sceneEl.querySelectorAll(".scale-zone-3");
var czone = sceneEl.querySelectorAll(".center-zone");
var gzone = sceneEl.querySelectorAll(".grab-zone");
var bzone = sceneEl.querySelectorAll(".burial-zone");
var chdivzone = sceneEl.querySelectorAll(".c-h-div-zone");
var hzone = sceneEl.querySelectorAll(".hominin-zone");
var gzoneobjs = sceneEl.querySelectorAll(".grab-obj-zone");
var czoneobjs = sceneEl.querySelectorAll(".center-obj-zone");
var grabcheck = 0;
var centercheck = 0;
var scalecheck1 = 0;
var scalecheck2 = 0;
var scalecheck3 = 0;
var burialcheck = 0;
var chdivcheck1 = 0;
var chdivcheck2 = 0;
var chdivcheck3 = 0;
var hominincheck = 0;
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
            each.object3D.visible = toggle; // Works with player position. Show ungrabbed object if it and player are close to table, hide if player is far from table
         } else {
            each.object3D.visible = true; // Keep object visible if it has been carried
}}
}
var lightswitch = function() { // Light switch logic to light the right area
    var el1 = document.getElementById("shadowlight1");
    var el2 = document.getElementById("shadowlight2");
    if (scalecheck2 == 1 || scalecheck3 == 1){
        el1.object3D.position.set(-13, 4, -2.5);
        console.log("scale lights");
    } else if (scalecheck1 == 1) {
        console.log("main/scale lights");
        el1.object3D.position.set(-13, 4, -2.5);
        el2.object3D.position.set(-1, 4, 4);
    } else if (grabcheck == 1 || centercheck == 1) {
        console.log("main lights");
        el1.object3D.position.set(-13, 4, -2.5);
        el2.object3D.position.set(-1, 4, 4);
    } else if (burialcheck == 1) {
        console.log("burial lights");
        el1.object3D.position.set(-13, 4, -2.5);
        el2.object3D.position.set(-12.5, 4, -14);
    } else if (hominincheck == 1) {
        console.log("hominin lights");
        el1.object3D.position.set(-1.7, 10, -20.5);
        el2.object3D.position.set(-1, 4, 4);
} 
}

var mapwarp = function(warpmapx1, warpmapy1, warpmapz1, warprotx1, warproty1, warpmapx2, warpmapy2, warpmapz2, warprotx2, warproty2) { // This moves the maps to the right places relative to visitor
    var warp1 = document.getElementById("warp-map1");
    var warp2 = document.getElementById("warp-map2");
    warp1.object3D.position.set(warpmapx1, warpmapy1, warpmapz1);
    warp1.object3D.rotation.set(warprotx1, warproty1, 0);
    warp2.object3D.position.set(warpmapx2, warpmapy2, warpmapz2);
    warp2.object3D.rotation.set(warprotx2, warproty2, 0);
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
if (each.id == "just-c-h-divider-1") { // Turn off Human Evolution Hall when user is inside the Centerpiece half of the divider area
    console.log("just-c-h-divider 1 entered");
    chdivcheck1++;
}
 if (each.id == "just-c-h-divider-2") { // Turn off everything but the divider area
    console.log("just-c-h-divider 2 entered");
    chdivcheck2++;
}
if (each.id == "just-c-h-divider-3") { // Turn off Centerpiece area when user is inside the Human Evolution half of the divider area
    console.log("just-c-h-divider 3 entered");
    chdivcheck3++;
}
if (each.id == "just-hominin") { // Turn off everything but the Human Evolution Hall and divider area
    console.log("just-hominin entered");
    hominincheck++;
 }
}
if (grabcheck == 1 && centercheck == 0) {
    console.log("grab on");
    visiswitch(floorplanzone, true);
    visiswitch(bzone, false);
    visiswitch(czone, false);
    visiswitch(czoneobjs, true);
    visiswitch(gzone, true);
    visiswitch(gzoneobjs, true);
    visiswitch(scale1, false);
    visiswitch(scale2, false);
    visiswitch(scale3, false);
    visiswitch(chdivzone, false);
    visiswitch(hzone, false);
    lightswitch();
    mapwarp(7.9, 1.4, 0, 0, 1.5708, -0.7, 1, 0, -0.785, 0.524);
} else if (grabcheck == 1 && centercheck == 1) {
    console.log("grab and center on");
    visiswitch(floorplanzone, true);
    visiswitch(bzone, false);
    visiswitch(czone, true);
    visiswitch(czoneobjs, true);
    visiswitch(gzone, true);
    visiswitch(gzoneobjs, true);
    visiswitch(scale1, false);
    visiswitch(scale2, false);
    visiswitch(scale3, false);
    visiswitch(chdivzone, true);
    visiswitch(hzone, false);
    lightswitch();
    mapwarp(7.9, 1.4, 0, 0, 1.5708, -0.7, 1, 0, -0.785, 0.524);
} else {
console.log("grab off");
    visidistanceswitch(gzoneobjs, false);
}

if (centercheck == 1 && grabcheck == 0) {
    console.log("center on");
    visiswitch(floorplanzone, true);
    visiswitch(czone, true);
    visiswitch(czoneobjs, true);
    visiswitch(gzone, true);
    visiswitch(gzoneobjs, true);
    visiswitch(scale1, true);
    visiswitch(scale2, false);
    visiswitch(scale3, false);
    visiswitch(chdivzone, true);
    visiswitch(hzone, false);
    lightswitch();
    mapwarp(7.9, 1.4, 0, 0, 1.5708, -0.7, 1, 0, -0.785, 0.524);
} else {
console.log("center off");
}

if (scalecheck1 == 1) {
    console.log("scale1 on");
    visiswitch(floorplanzone, true);
    visiswitch(czone, true);
    visiswitch(czoneobjs, true);
    visiswitch(gzone, false);
    visiswitch(gzoneobjs, false);
    visiswitch(scale1, true);
    visiswitch(scale2, true);
    visiswitch(scale3, false);
    visiswitch(chdivzone, true);
    visiswitch(hzone, false);
    lightswitch();
    mapwarp(-9.8, 1.4, 1.75, 0, -1.5708, -0.7, 1, 0, -0.785, 0.524);
} else {
console.log("scale1 off");
}

if (scalecheck2 == 1) {
    console.log("scale2 on");
    visiswitch(floorplanzone, true);
    visiswitch(czone, false);
    visidistanceswitch(czoneobjs, false);
    visiswitch(scale1, true);
    visiswitch(scale2, true);
    visiswitch(scale3, true);
    visiswitch(chdivzone, true);
    visiswitch(hzone, false);
    mapwarp(-9.8, 1.4, 1.75, 0, -1.5708, -18.5, 1.4, -7.5, 0, 0);
} else {
console.log("scale2 off");
}

if (scalecheck3 == 1) {
    console.log("scale3 on");
    visiswitch(floorplanzone, true);
    visiswitch(czone, false);
    visiswitch(czoneobjs, false);
    visiswitch(gzone, false);
    visiswitch(gzoneobjs, false);
    visiswitch(scale1, false);
    visiswitch(scale2, true);
    visiswitch(scale3, true);
    visiswitch(chdivzone, false);
    visiswitch(hzone, false);
    lightswitch();
    mapwarp(-9.8, 1.4, 1.75, 0, -1.5708, -18.5, 1.4, -7.5, 0, 0);
} else {
console.log("scale3 off");
}

if (burialcheck == 1) {
    console.log("burial on");
    visiswitch(floorplanzone, true);
    visiswitch(bzone, true);
    visiswitch(scale1, false);
    visiswitch(scale2, false);
    visiswitch(scale3, true);
    visiswitch(chdivzone, false);
    visiswitch(hzone, false);
    lightswitch();
    mapwarp(-16.45, 1.4, -19.54, 0, 0, -18.5, 1.4, -7.5, 0, 0);
} else {
console.log("burial off");
    visiswitch(bzone, false);
}

if (chdivcheck1 == 1) {
    console.log("chdivider1 on");
    visiswitch(floorplanzone, true);
    visiswitch(bzone, false);
    visiswitch(czone, true);
    visiswitch(scale2, false); // The order of scale 2 and scale 1 keeps the rhesus monkey visible.
    visiswitch(scale1, true);
    visiswitch(scale3, false);
    visiswitch(chdivzone, true);
    visiswitch(hzone, false);
    lightswitch();
    mapwarp(-9.65, 1.4, -12.79, 0, 1.5708, 2.248, 6.263, -22.782, -0.785, -0.40);
} else {
console.log("chdivider1 off");
}
if (chdivcheck2 == 1) {
    console.log("chdivider2 on");
    visiswitch(floorplanzone, false);
    visiswitch(bzone, false);
    visiswitch(czone, false);
    visiswitch(scale1, false);
    visiswitch(scale2, false);
    visiswitch(scale3, false);
    visiswitch(chdivzone, true);
    visiswitch(hzone, false);
} else {
console.log("chdivider2 off");
}
if (chdivcheck3 == 1) {
    console.log("chdivider3 on");
    visiswitch(floorplanzone, false);
    visiswitch(bzone, false);
    visiswitch(czone, false);
    visiswitch(scale1, false);
    visiswitch(scale2, false);
    visiswitch(scale3, false);
    visiswitch(hzone, true);
    lightswitch();
} else {
console.log("chdivider3 off");
}
if (hominincheck == 1) {
    console.log("hominin on");
    visiswitch(floorplanzone, false);
    visiswitch(bzone, false);
    visiswitch(czone, false);
    visiswitch(czoneobjs, false);
    visiswitch(gzone, false);
    visiswitch(gzoneobjs, false);
    visiswitch(scale1, false);
    visiswitch(scale2, false);
    visiswitch(scale3, false);
    visiswitch(chdivzone, true);
    visiswitch(hzone, true);
    lightswitch();
    mapwarp(-9.65, 1.4, -12.79, 0, 1.5708, 2.57, 6.29, -21.71, -0.785, -1.97);
} else {
console.log("hominin off");
}
centercheck = 0;
grabcheck = 0;
scalecheck1 = 0;
scalecheck2 = 0;
scalecheck3 = 0;
burialcheck = 0;
chdivcheck1 = 0;
chdivcheck2 = 0;
chdivcheck3 = 0;
hominincheck = 0;
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
grabpanel("plesiadapisbutt","#stand14-tit");
grabpanel("h-lucy-butt","#h-lucy-tit");
grabpanel("h-turkana-butt","#h-turkana-tit");
grabpanel("h-flores-butt","#h-flores-tit");
grabpanel("h-neanderthal-butt","#h-neanderthal-tit");
grabpanel("h-sapiens-butt","#h-sapiens-tit");
grabpanel("h-ardi-butt","#h-ardi-tit");
grabpanel("proboscisbutt","#stand15-tit");
grabpanel("galagobutt","#stand16-tit");
grabpanel("capuchinbutt","#stand17-tit");
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
            if (counter > 11) { // Value is total panels minus one
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
                document.getElementById(grabholo).setAttribute("gltf-model", grabmodel);
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
grabtrig("naledi-leti-grab","naledi-leti-tit",".bone-text", "holobone", "holoboneproj", "models/naledi-letiskull.glb", undefined, undefined, "0 1.2 0");
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
        let absarea = Math.abs(area);
        if (poss.y <= 0.1 && absarea < 5) {
             console.log('antidrop engage on '+each.id);
             each.object3D.position.set(0, 1.8, 0);
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
    transition = document.querySelector("#transition");
 
    var transitionclose = function(warplocx, warplocy, warplocz) {
        transition.dispatchEvent(new CustomEvent("transitionclose"));
        setTimeout(function(){warpwarp(warplocx, warplocy, warplocz);}, 700); // value has to match animation speed, I guess?!
    };

    var warpwarp = function(warplocx, warplocy, warplocz) {
        rig.object3D.position.set(warplocx, warplocy, warplocz);
        if (AFRAME.utils.device.checkHeadsetConnected() === false) { // PC and mobile mode
            rig.components['movement-controls'].updateNavLocation();
        }
        setTimeout(function(){transitionopen();}, 700)
    };
    
    var transitionopen = function() {
        transition.dispatchEvent(new CustomEvent("transitionopen"));
    };

    var warpfun = function(warpbutt, warplocx, warplocy, warplocz) { // Figures out which button was hit then sets teleportation coordinates
        document.getElementById(warpbutt).addEventListener("grab-end", function(evt) {
            transitionclose(warplocx, warplocy, warplocz);
    }
   )};
    warpfun("centerwarpbutt1", 0, 0, 1);
    warpfun("grabwarpbutt1", 9.33, 0, -0.5);
    warpfun("primatewarpbutt1", -13, 0, 1);
    warpfun("burialwarpbutt1", -14, 0, -17.7);
    warpfun("centerwarpbutt2", 0, 0, 1);
    warpfun("grabwarpbutt2", 9.33, 0, -0.5);
    warpfun("primatewarpbutt2", -13, 0, 1);
    warpfun("burialwarpbutt2", -14, 0, -17.7);
    warpfun("homininwarpbutta1", -8, 0, -13.4);
    warpfun("homininwarpbuttb1", 1.9, 5.3, -22);
    warpfun("homininwarpbutta2", -8, 0, -13.4);
    warpfun("homininwarpbuttb2", 1.9, 5.3, -22);
    }
    })