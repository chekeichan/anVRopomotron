AFRAME.registerComponent('device-set', {
        init: function() {
            var sceneEl = document.querySelector('a-scene');
            var tablestand = sceneEl.querySelectorAll('.table');
            var standup = sceneEl.querySelectorAll('.standup');
            var rig = document.querySelector('#rig');
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
            } else if (AFRAME.utils.device.checkHeadsetConnected() === true) { // VR Mode
                document.querySelector('#GL-VR').object3D.visible = true;
                document.querySelector('#SMH-VR').object3D.visible = true;
                rig.setAttribute("movement-controls", "speed", 0.10);
            } else if (AFRAME.utils.device.checkHeadsetConnected() === false) { // PC Mode
                document.querySelector('#GL-PC').object3D.visible = true;
                document.querySelector('#SMH-PC').object3D.visible = true;
                rig.setAttribute("movement-controls", "speed", 0.15);
                for (let each of tablestand) {
                    each.setAttribute('animation', {property: 'position.y', to: 0.25, dur: 5000, delay: 50});
                }
                for (let each of standup) {
                    each.removeAttribute('dynamic-body');
                    each.removeAttribute('grabbable');
                    each.setAttribute('static-body');
                    each.setAttribute('rotation', {z: 90});
                    each.dispatchEvent(new CustomEvent("standtrigger"));
                }
            }
        }
})
    
AFRAME.registerComponent("plane-hit", { // Manual occlusion zones
init: function() {
sceneEl = document.querySelector('a-scene');
var el = this.el;
var scale1 = sceneEl.querySelectorAll(".scale-zone");
var scale2 = sceneEl.querySelectorAll(".scale-zone-2");
var czone = sceneEl.querySelectorAll(".center-zone");
var gzone = sceneEl.querySelectorAll(".grab-zone");
var bzone = sceneEl.querySelectorAll(".burial-zone");
var mlightzone = sceneEl.querySelectorAll(".mainlight");
var blightzone = sceneEl.querySelectorAll(".buriallight");
var gzoneobjs = sceneEl.querySelectorAll(".grab-obj-zone");
var czoneobjs = sceneEl.querySelectorAll(".center-obj-zone");
var grabcheck = 0;
var centercheck = 0;
var scalecheck = 0;
var burialcheck = 0;
var visiswitch = function(zone, toggle) {
     for (let each of zone) {
        each.object3D.visible = toggle;
    }
}
var visidistanceswitch = function(zone, toggle) {
    for (let each of zone) {
            let poss = each.getAttribute('position.x');
             if (poss <= 2) {
                 each.object3D.visible = toggle; 
                 }
        } 
}
var lightswitch = function() { // Light switch logic to light the right area
		if (grabcheck == 1 || centercheck == 1 || scalecheck == 1) { 
		console.log("main lights on");
		visiswitch(mlightzone, true);
		visiswitch(blightzone, false);
	} else {
	console.log("burial lights on");
		visiswitch(mlightzone, false);
		visiswitch(blightzone, true);
}
}

var zonechecker = function () {
var list = el.components['aabb-collider'].intersectedEls;
for (let each of list) {
    console.log(list);
    if (each.id == "just-grab") { // Turn off Scale Model Hall and Centerpiece or not when user is inside Grab Lab
       console.log("just-grab entered");
       grabcheck++;
    }  
    if (each.id == "just-center") { // Turn off parts of Scale Model Hall and Grab Lab when user is inside Centerpiece area
       console.log("just-center entered");
       centercheck++;
    }
    if (each.id == "just-scale") { // Turn off parts of Grab Lab when user is inside Scale Model Hall area
       console.log("just-scale entered");
       scalecheck++;
    }
	if (each.id == "just-burial") { // Turn off parts of Burial Chamber when user is inside Scale Model Hall area
       console.log("just-burial entered");
       burialcheck++;
    }
 }
	if (grabcheck == 1) {
		console.log("grab on");
		visiswitch(gzone, true);
		visiswitch(gzoneobjs, true);
		visiswitch(scale2, false);
		lightswitch();
		grabcheck = 0;
	} else {
	console.log("grab off");
		visiswitch(gzone, false);
		visidistanceswitch(gzoneobjs, false);
}
	if (centercheck == 1) {
		console.log("center on");
		visiswitch(czone, true);
		visiswitch(czoneobjs, true);
		lightswitch();
		centercheck = 0;
	} else {
	console.log("center off");
		visiswitch(czone, false);
		visidistanceswitch(czoneobjs, false);
}
	if (scalecheck == 1) {
		console.log("scale on");
		visiswitch(scale1, true);
		visiswitch(scale2, true);
		lightswitch();
		scalecheck = 0;
	} else {
	console.log("scale off");
		visiswitch(scale1, false);
}
	if (burialcheck == 1) {
		console.log("burial on");
		visiswitch(bzone, true);
		visiswitch(scale2, false);
		lightswitch();
		burialcheck = 0;
	} else {
	console.log("burial off");
		visiswitch(bzone, false);
}
}


el.addEventListener("hitstart", function(evt) {
zonechecker();
}) // Hitstart end
       
el.addEventListener("hitend", function(evt) {
zonechecker();
 // Hitend end     

})
}})

// Controller Teleport Button Listeners
AFRAME.registerComponent("buttons", {
	init: function() {
	var el = this.el;
	var binder = function(butt, emits) {
	    el.addEventListener(butt, function (e) {
                    el.emit(emits);
                });
        }
    binder("xbuttondown", "teleportstart");
    binder("xbuttonup", "teleportend");
    binder("abuttondown", "teleportstart");
    binder("abuttonup", "teleportend");
    binder("bbuttondown", "teleportstart");
    binder("bbuttonup", "teleportend");
    binder("ybuttondown", "teleportstart");
    binder("ybuttonup", "teleportend");	   
  }
})

// Scale Model Hall and Burial Chamber Toggle Buttons
AFRAME.registerComponent("grab-panels", {
	init: function() {
var grabpanel = function(grabbutt, grabset) {
document.getElementById(grabbutt).addEventListener("grab-start", function(evt) {
      var cent = document.querySelector(grabset);
      cent.object3D.visible = !cent.getAttribute("visible");
       })  
       }
grabpanel("centerbutt","#centerpiece-tit");
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
		var generichidelist = document.getElementsByClassName("generichide");
        el.addEventListener("grab-start", function(evt) { // The following is run if button is clicked
        for (let each of burialslist) {
                    each.object3D.visible = false; // Hide everything
            }
            counter++;
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
				document.getElementById("burialname").setAttribute("text", "value", "Captain Gabriel Archer\nJamestown Colony\nVirginia, USA (1600s)");
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
				document.getElementById("burialname").setAttribute("text", "value", "Knight of Calatrava\nCalatrava la Nueva\nAldea del Rey, Spain (1200s)");
			 } else if (counter > 2) { // Set back to zero past Calatrava
                counter = 0;
				for (let each of generichidelist) {
                    each.object3D.visible = false;    
				}
				for (let each of calatravalist) {
                    each.object3D.visible = false;     
				}
				for (let each of calatravahidelist) {
                    each.object3D.position.y -= 3;    
				}
				document.getElementById("burialname").setAttribute("text", "value", " ");
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
grabtrig("sahelanthropus-grab","sahel-tit",".bone-text", "holobone", "holoboneproj", "models/sahel.glb", undefined, undefined, "0 1.2 0");
grabtrig("platyops-grab","platyops-tit",".bone-text", "holobone", "holoboneproj", "models/platyops.glb", undefined, undefined, "0 1.2 0");
grabtrig("aethiopicus-grab","aethiopicus-tit",".bone-text", "holobone", "holoboneproj", "models/aethiopicus.glb", undefined, undefined, "0 1.2 0");

// Toggle Homo Skulls
grabtrig("habilis-grab","habilis-tit",".bone-text", "holobone", "holoboneproj", "models/habilis.glb", undefined, undefined, "0 1.2 0");
grabtrig("turkana-grab","turkana-tit",".bone-text", "holobone", "holoboneproj", "models/turkana.glb", undefined, undefined, "0 1.2 0");
grabtrig("atapuerca-grab","atapuerca-tit",".bone-text", "holobone", "holoboneproj", "models/atapuerca.glb", undefined, undefined, undefined);
grabtrig("nean-grab","nean-tit",".bone-text", "holobone", "holoboneproj", "models/nean.glb", undefined, undefined, "0 1.2 0");
grabtrig("vlca1-grab","vlca1-tit",".bone-text", "holobone", "holoboneproj", "models/vLCA1.glb", undefined, undefined, "0 1.2 0");

// Toggle Modern Prosimian Skulls
grabtrig("potto-grab","potto-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/potto.glb", undefined, "10 10 10", undefined);
grabtrig("indri-grab","indri-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/indri.glb", undefined, "8 8 8", undefined);
grabtrig("howler-grab","howler-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/howlerskull.glb", undefined, "7 7 7", undefined);
grabtrig("baboon-grab","baboon-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/baboonskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("mandrill-grab","mandrill-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/mandrillskull.glb", undefined, undefined, "0 1.2 0");
grabtrig("snub-grab","snub-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/snub.glb", undefined, "7 7 7", "0 1.2 0");

// Toggle Modern Hominoid Skulls
grabtrig("gibbon-grab","gibbon-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/gibbonskull.glb", undefined, "7 7 7", "0 1.2 0");
grabtrig("gorilla-m-grab","gorilla-m-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/gorillaskull-m.glb", undefined, "4 4 4", undefined);
grabtrig("gorilla-f-grab","gorilla-f-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/gorillaskull-f.glb", undefined, "4 4 4", undefined);
grabtrig("chimp-grab","chimp-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/chimp.glb", undefined, undefined, undefined);
grabtrig("mhs-grab","mhs-tit",".bone-text-2", "holobone2", "holoboneproj2", "models/mhs.glb", undefined, undefined, undefined);

// Toggle Artifacts 1
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
    console.log("up detected");
	document.getElementById("jamesburialset").setAttribute('animation', {property: 'position.y', to: 0.8, dur: 3000});
	document.getElementById("holocalatrava").setAttribute('animation', {property: 'position.y', to: 0.5, dur: 3000});
	document.getElementById("calatravaburialset").setAttribute('animation', {property: 'position.y', to: 0.8, dur: 3000});
    state = "down";
	console.log(state);
} else {
    console.log("down detected");
	document.getElementById("jamesburialset").setAttribute('animation', {property: 'position.y', to: 1.3, dur: 3000});
	document.getElementById("holocalatrava").setAttribute('animation', {property: 'position.y', to: 1, dur: 3000});
	document.getElementById("calatravaburialset").setAttribute('animation', {property: 'position.y', to: 1.3, dur: 3000});
    state = "up";
	console.log(state);
         }
     }) 
}

// Set Button Behaviors
heightswitch("jamesbuttpos");
heightswitch("calatravabuttpos");
}
})