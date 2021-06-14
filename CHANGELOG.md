# AnVRopomotron Changelog


## 1.1.X (next next)
-   What if there were strategically placed mini maps to telport the user to different exhibits? I now have a button that takes me from the start to the Burial Chamber. Great for developing! It's invisible in the official release. Click the tip of the p in the big AnVRopomotron title behind you at start.
-   The next promised model is the aye-aye.

## 1.1.7 (next)
-   The Kayan slow loris adorbs its way into the Scale Model Hall and into your heart. I went with this species because I'm friends with one of its discoverers, Rachel Munds. Unlike the mandrills, I had a wealth of realistic poses to choose from. I settled on an upside-down hanging pose because just look at it. This model has a few improvements. I used a new version of my basic quadruped mesh that now has marked seens for UV unwrapping. This leaves the UV positions left less to chance and can now follow the contours of the shape more precisely. It works! The UV map is more organized and the consolidation of UV islands means that it's a little easier on rendering. 
-   I have a modern computer so I can finally do something I've put off: rebake the textures of the museum walls, floor, and ceiling. Since the gorillas and mouse lemur refresh, the lights and shadows of the building have not kept up with the models. With my old iMac a bake of the building texture took two overnight sessions so I put if off for months. With my new PC it now takes... 8 minutes! I also found a way to denoise the texture after baking using the Composition mode in Blender. I used to manually blur the texture in Affinity Photo. The new result looks much better and now there are cool spotlights and shadows to make the recent additions fit the environment better. Check out the angel wings on the trophy!

## 1.1.6 (next)
-   Male and female mandrills take center stage in the Scale Model Hall! After some plainer primates it's time for some primary colors. The mandrill couple shows the extreme sexual dimorphism. While the male mandrill looks fierce, he is depicted starting some grooming on the female, maybe leading to more? This is the first model to use a new base quadruped template based on the old Proconsul. Modeling was fast working off that frame. The Rigify rig is now refined with opposable toes as well as fingers, though these models do not really use that feature. Another new element to the mandrills is the use of blended vertex colors on the rumps. I preferred clearly delineated colors before but the complex shades of the mandrill butts was the perfect place to use some subtle shades. This is also the point where I ran out of creativity in propping up primates to a more visible height and just put them on a box. 
-   Megaladapis is the latest to get the special edition treatment. It now has more realistic eyes and everything got rotated for a clear view.
-   A new A-frame component now waits for artifact and skull tables to load before placing objects upon them. This should remove reloading weirdness. 
-   PC controls are reverted to swiping to look instead of the first person shooter mouselook. I preferred mouselook for its sheer speed and natural feel for someone who navigated a lot of fluid 3D environments with various weaponry in hand. The implementation takes the mouse away from other uses, though. Swiping is more familiar for WebVR and interfaces like Google Street View. If you want that mouselook, it's just an 'm' key away. The wall instructions even change to reflect the mode you're in. 

## 1.1.5 (3/15/2021)
-   AnVRopomotron won Education Experience of the Year at the inaugural WebXR Awards! What a huge honor. My prize is a custom trophy model with an NFT of authenticity (will NFTs be a thing? Who knows?). I've put up a replica trophy in the museum, between the starting foyer and the Scale Model Hall. Making the replica was an adventure in baking textures to capture the real time shine in a static image. I don't even know how the text transferred because it was on its own shape in the original model and in the replica it is just there on the main structure. I'm not going to question it and just take the result. Some parts would bake and others wouldn't and when I tweaked the settings it was the other way around. I eventually merged the working parts in a graphics editor. The twist in the column was an accident: I wanted to move the bottom face up but twisted it instead. It looked intriguing so I worked on that. Behold the trophy's shiny glory and thanks to everyone involved with the Awards!
-   It's a chimpanzee fest in the museum!
    -   The main room gets a chimpanzee statue scanned from Austria that was posted to Sketchfab. The piece really captures the scope of the museum and the details are wonderful. 
    -   A male and female common chimpanzee strategize their way into the Scale Model Hall! I had planned chimpanzees for my first model but chimps are very hard to render (male gorilla became my first successful model). I figure it's time to take the challenge on now. Chimp behavior is multi-faceted so I tried to capture the variety of chimp actions. The male is posed in mid-display, which is when a chimp flips out to intimidate and gain status. The female is modeled using a rock to crack a palm nut. Some modeling innovations may make it to older works and will definitely be standard in the future. The eyeballs are now separate models instead of connected to the face. This really helps in changing the gaze without a lot of hassle (my modeling is more for statues rather than animated figures and I have always had eyes face forward so I hadn't taken this step before). Three separate materials were used to get different baked effects: low specularity for fur, medium for skin, and high for wet tissue like eyes and mouth. Behind the scenes I applied a modified Rigify rig for 'easier' posing. It added two weeks to the modeling process to learn Rigify enough but the next model would only take an hour to get to the same result so it really is easier now. I still set the pose and made manual tweaks to fix the geometry. 
-   Transcript for the visually impaired or other uses is now available at tinyurl.com/anvrotext. I took the HTML file and removed the code to get just the text from around the museum. Then I added descriptions to all exhibits. This brings it up to standard for educational accesibility. 
-   Experimental first person shooter controls on desktop, using fps-look-controls. A reticle almost straight from the A-Frame tutorial is there for aiming. I like this more familiar control system instead of mouse dragging.
-   On desktop, pressing c now crouches to 1 meter. Get some low views on those ground level primates.
-   Archicebus in the Grab Lab got a makeover. I was young and inexperienced making the original model and decimated the whole thing to squeeze polygons out. The tail suffered the most. My new goal is to have nice simple meshes so Archicebus got some curves back and a new tail. It has a more typical mammal coloration with a light belly and a dark tail tuft just for a little realistic flair. I also rigified this with a cat model for quick limb and tail posing.
-   Grab Lab got the "Mrs. Ples" Austrlopithecus africanus cranium. It itself is an artifact being based on a replica from the mid 20th century.
-   Grab Lab also got the "Neo" Homo naledi skull, one of the newest discoveries of our messy family tree.
-   I removed the green wall photo borders in the Scale Model Hall. This saves a draw call for each one and the look is now consistent with wall photos in the other exhibits. To be honest, without dedicated border controls, setting them up was a pain.
-   Fixed bug with grabbed artifacts going invisible when crossing zones. There was an occlusion class that inadvertently applied to all child objects within.
-   Fixed info box weirdness in the Calatrava and Paris burials. 
-   Various little bug fixes that were actually hotfixed into the previous version. They include a misaligned Grab Lab sign, using the wrong Homo erectus model in the Grab Lab, and an array of typos.

## 1.1.4 (1/19/2021)
-   Upgraded to A-Frame 1.1.0
-   Upgraded A-Frame Extras. The motion controls are now confidently on the left hand. Before, they were on whichever hand loaded first. My instructions on VR movement had to be vague to account for that! Now left thumbstick is the one for walking. Instructions on the wall updated.
-   Switched from aframe-teleport-controls to aframe-blink-controls by Jure Triglav. Now the right stick is used for teleportation, with two added bonuses. One is that pushing forward then swiveling the stick to the side rotates the orientation upon landing. The other bonus is that left and right movements on the stick now rotate the view by 45 degrees. Chair VR is now a whole lot better with this alternate way to turn.
-   Room model height was set to 5cm. It is now at baseline with the navmesh for more accurate scaling.
-   An amazing new addition to the Burial Chamber has appeared on Sketchfab. Location: Paris, France. Welcome to a 'deadend' in the famous Catacombs! See bones upon bones stacked in walls as arranged by workers in the 1800s. The side illustrations are also neat. One is another wall of skulls. The other is a cartoon from the time. There is also an easter egg somewhere.
-   Using gltfpack to compress models and textures. Burial Chamber except Paris got the full compression and Basis Universal treatment. Everything else just got compressed to keep the smooth textures. Models folder went from 79MB to 57MB. Everything from version to version went from 87 to 70MB, especially impressive with 6MB of new models.
-   I had expert help to get compressed models working. But what about the large images, like the maps in the Burial Chamber? While I'm not skilled enough to change how images work, it was within my abilities to turn the images into textured glb files and then compress that with gltfpack. 50% savings!
-   Grab Lab table labels are now aligned with table surface and will move up in PC mode too.
-   New invisible floor block will keep objects from phasing through the floor.
-   Woops, mandrill info in Grab Lab was a copy/paste of the baboons'. Mandrill has its own fascinating information now. 

## 1.1.3 (12/1/2020)
-   A female eastern lowland gorilla joins the male and mouse lemur display. The male was the first model I made and the difference is stark. I took the polygons of the female and manually adjusted it to the male's proportions. Male was also reposed to a slight walk.
-   Mouse lemur model got slight polygon cleaning to be up to current standards.
-   New Grab Lab skulls: rhesus macaque and squirrel monkey.
-   New Grab Lab artifact: Lomekwian hammerstone, one of the oldest known stone tools. I've been looking for a Creative Commons model of this for a while! Thanks, University of Central Florida.
-   Slight tweak to code involving carrying objects out of Grab Lab.

## 1.1.2 (10/7/2020)
-   Something changed with A-Frame from 0.9x to 1.0.4 where now if I rotate a model, its collision box will now move along with it. This allows me to rotate the credits button behind the Centerpiece and make it just be an orb sticking out of the wall instead of the full i-shape. 
-   A new burial for the Burial Chamber. Thanks to Global Digital Heritage I can present a burial found in a Spanish castle. Unlike Gabriel Archer, the exact biographical details are sparse but there are a lot of cool features with the grave and the site. They also scanned the castle so that is also in the room as a small model.
-   Burial Chamber fixtures updated to accommodate the new burial. Now the room will start out bare and you can cycle through the burials with a button at the back of the room. Javascript flipper based on the credits and the panels that show up on touch were repurposed here to selectively show and hide different parts of the room. Fun A-Frame fact: if you set an entity to be invisible, its hit box is still there and can be interacted with. This is useful in a lot of cases but not here as there would be invisible buttons from the unselected burial. My solution is to move the unselected burial and buttons three meters underground and out of the way. When a burial is selected it is both made visible and moved up into the room. Why make it invisible too? To reduce rendering time! The burial lifting and lowering function was also rewritten to accomodate different buttons having the same ability. Touching any lift button now moves both the visible and hidden burials. The rewriting also allows for different elevations for different models. 
-    The previously Burial Chamber blank wall now has a map that shows the location of the burial and a changing text box with the name and site. 
-    Occulsion logic improved. One change is to lighting when entering and exiting the Burial Chamber. This is very subtle now but may be important for future expansions. The other change is to keep grabbed objects visible in VR if the user takes it away from the Grab Lab. It was supposed to do this already but something broke or it never worked in the first place.
-    Removed normal maps for burial models and changed shader to be flat (unaffected by light sources). This beat endlessly tweaking the lights to get the desired result per burial.
-    Grabbable objects phased through the floor if you dropped them. The navmesh that the user abides by is now also a static object for objects to land on. Also:
-    Anti-Drop Protection for grabbable objects. The site will check every few seconds using a tick function if any object has moved below a certain height. If so, it resets the position back to the center of its respective table. If the object has been moved a few meters away, the object is left on the ground since it'd be more convenient to just manually pick it up instead of walking back to the table to get it again.
-    Your VR hands are now a blue that is complimentary to interaction orange.

## 1.1.1 (08/31/2020)

-   Proconsul walks on a big branch into the scene! I took the rhesus monkey and conformed it to Proconsul proportions. It was probably a bit easier than making it from scratch. Challenges: the rhesus polygons were rough with some ugly shapes around. They especially held back re-posing since the polygons were connected to each other awkwardly. Improvements: ear and eye details enhanced from the earlier appearance. Proconsul-specific challenges: There are a lot of opinions on how to classify proconsulids, including changing names for fossil specimens up to the genus level. I went with a larger Proconsul, *P. nyanzae*, and kept the Proconsul name due to my taxonomic lumping tendencies. Another challenge is that Proconsul is kind of plain? It is a notable prehistoric primate so that's why it's here. It is always presented walking on four legs on a tree branch because that's what its traits are adapted for. A later change to the model was to add a little interest by giving the model a slightly twisted mid-step pose. I used other quadrupeds, especially baboons and mandrills for the pose reference.
-   The New Guinea human femur dagger I promised a while ago is now in the Grab Lab. It was a quick conversion from the original model using just normal maps. Thanks to Dartmouth College and Morphosource for making it available.
-   The Grab Lab tables now have a border of "interaction orange" for UI consistency.
-   Jamestown church picture replaced with another that showed the grave site better.
-   Re-render of the rooms to include Proconsul shadows. I also learned how to de-noise the baked texture in Blender so the shadows and highlights are a little more crisp with a little pixelation at the edges.
-   Woops, the first credits page, the one with my name and stuff, was invisible because the text wrapping was accidentally set to zero. It's back with new info on the Creative Commons and open source nature of the models and code.

## 1.1 (07/06/2020)

-   More tarsier! Poses 2 and 3 show stages of a leap and pose 4 shows the result of a successful pounce. Tarsier 1 also updated with a longer tail.
-   A small new wing has opened up in the Scale Model Hall, called the Burial Chamber. Learn about Jamestown and one of its founders, Captain Gabriel Archer. View a life size model of his grave.
-   Remodeling the building as a single model in Blender using [Archimesh](https://docs.blender.org/manual/en/latest/addons/add_mesh/archimesh.html) instead of as many separate walls and planes in A-Frame. The benefit should be faster loading paired with more impressive looks since the building is drawn using one instruction (draw call) for the whole thing instead of a separate instruction for each individual wall. Also the Blender model has light fixtures in the ceiling so I can bake the shadows they cast to texture and present them in VR without a performance loss. In fact even with the new room this version has a 1/3rd performance gain.
-   Moved scale models around to open up the room. The same space now has a lot more empty areas for future models.
-   Rewrote how occluding zones are processed for efficiency.
-   Unrelated to the above, I rewrote a new version of the old way of occluding zones. I tried to go extra fancy with complicated zones made in Blender that covered as much ground as possible. Aaand... it doesn't work. For example, I had a U-shaped zone but being in the empty part in the center between the arms didn't register as leaving it. Why???? Well it turned out my collisions are based on AABB colliders, you know, [Axis-Aligned Bounding **Boxes**](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection). The complex zones were being treated as rectangles instead of the shapes I gave them. No getting around that but I can work with this limitation now that I know it's there. I made box zones as before, but rearranged the room so there are more walls blocking lines of sight for better zones. This works!
-   It turns out I never fully optimized the centerpiece model so it was being drawn with 9 draw calls. I tweaked the model so now it is drawn with 2 draw calls and the file lost another megabyte.
-   Redid Height Chart as a texture to drop draw calls from around 30 to 1. Rearranged heights and added the tall *Australopithecus afarensis* Chewie.
-   Moved text around to look nice.

## 1.0.5 (04/29/2020)

-   The Philippine tarsier has clung to the Scale Model Hall! This is one of my favorite primates and a representative of one of the big primate lineages. The tarsier is modeled in 'classic pose,' holding onto a vertical branch, but this view hides some of their amazing traits. More poses to follow.
-   Info button model looks more like the letter i. For info.
-   Male mandrill skull in the Grab Lab.
-   Hippo ivory harpoon model fixed: normal map depths were too shallow.
-   Fixed bug introduced in 1.0.4 where stone tools could be picked up with the mouse in web browsers. No... VR only! The reason is that browser grabbing is awkward and I don't want to push a subpar experience. But:
-   Holoprojectors in the Grab Lab. I figure I should help out browser users, who are 99% of my viewership. Clicking an object now shows a rotating scaled up model to really get into their details. VR users can do too that but can still just move an object closer to their face.
-   Since photos worked so well in the Scale Model Hall, a photo will appear when most objects are grabbed in the Grab Lab as well. Fossils do not have photos. Still trying to find good ones.
-   Little tweaks to text layouts around the place.

## 1.0.4 (03/12/20)

-   Updated A-Frame to 1.0.4 coincidentally. New features include better looking and smaller hands for VR grabbing.
-   Adding more objects to the Grab Lab:
-   It's Christmas in Spring as The Smithsonian Institution has released over 2000 3D models for public use. There's a lot of primate bones. The following are making their way to the Grab Lab.
    -   Gorilla skulls, male and female
    -   Gibbon, female
    -   New baboon skull, male
-   Other sources of models yield:
    -   Another Egyptian baboon figure
    -   Clovis point
-   I've learned much about converting models for VR. I've gone back and made the Moundville pot both smaller in file size and better looking.
-   To accommodate the models, the Grab Lab space got expanded. Artifacts will be the starter items viewable from the entry point. The rest of the tables will be behind a wall because...
-   I have made my own version of 'occlusion culling,' a Javascript function to shorten render time by selectively not drawing parts of the scene that are not visible. Three.js already does culling by angle, so things behind the viewer are not drawn. I add on a manually-set culling by barrier, so things behind a wall from the viewer will not be drawn. I made this by putting down invisible planes (2D shapes, not Wonder Woman's aircraft) on the ground that detect user collisions. Stepping on certain planes triggers a Javascript function to hide models that cannot be seen from that position. For example, stepping on a plane behind the wall in the Scale Model Hall makes all of the VR Grab Lab and entryway models disappear. The number of triangles drawn drops from 90,000 to 30,000. Of course, leaving the plane makes everything come back using more Javascript.
-   I'm getting better at Javascript. Tuning up old functions and reducing redundancy has shrunk the code from 26k to 8k (!!).
-   Also Javascript magic: stone tools are now rotated and hovering over the table for better visibility on non-VR devices.
-   Oh I made the ceiling blue as a lark but it looks fine so it's here now.

## 1.0.3 (2/24/20) - What didn't get changed

-   Megaladapis (koala lemur) has slowly climbed into the room! This extinct lemur was one of many species of enlarged primates found in Madagascar before the island was settled by humans. The model appearance is based on scientific research interpreting traits from skeletal finds. Focus was on the head, feet, and tail. The common name refers to their similar adaptations to the distant marsupial, just larger.
-   Added teleport movement with VR controller buttons thanks to [Fernando Serrano's component](https://github.com/fernandojsg/aframe-teleport-controls) and Takashi Yoshinaga's [button-reading Javascript](https://github.com/TakashiYoshinaga/Oculus-Quest-Interaction-Sample). Fun fact, the color of the teleport effect and the info orbs is "[Keeley](https://keithcchan.com/comics/keeley-comic-hero-extraordinaire) orange."
-   Custom wall instructions by device: allows for larger text more visible from starting position
-   Grab Lab tables also rise for desktop browser
-   Redid textures for all scale models. Use of the [UVPackmaster2](https://gumroad.com/l/uvpackmaster2) Blender add-on and a way to make models unlit with node setup (i.e. not affected by room light) improved model appearance and reduced file sizes. The centerpiece went from ~10 to ~4 MB since the new method allowed a smaller texture file to have equal quality as before. The drop in size means that it loads more quickly instead of popping in place long after everything else is there. I passed the file size savings to the rhesus monkey and orangutan, where I bumped up the texture size to reduce jaggies.
-   The gorilla is now colored correctly as an eastern lowland gorilla instead of a western lowland gorilla.
-   Mouse lemur has a new perch that matches the branches and vines motif of other models.
-   Orangutan model got a few new belly polygons to be slightly less boxy.
-   Notharctus now has grooming claws on the second toe of each foot.
-   Perimeter walls are also now using fake light technology (flat shading) to simulate different levels of shading without needing light calculations.
-   Scale Model Hall modern primate info buttons now also put Creative Commons photographs of the species on the wall. A 200k jpeg looks amazing blown up in VR!
-   Walking speed is slower on VR to reduce nausea but increased on web browsers for more zip.
-   Credits behind centerpiece now act as pages flippable by touching the nearby orb. Font size increased.

## 1.0.2 (01/29/20)

-   Added howler monkey model to Scale Model Hall.
-   Expanded Scale Model Hall space so you can walk around most models.
-   Moved gorilla+mouse lemur and rhesus monkey models behind Height Chart.
-   Fixed bug where reloading site on smartphones would ballistically launch objects as the tables are raised. The solution was to have the table rise with a slow animation instead of instantaneously jump into place, which you can see if you look to the right from the start.
-   Kept working on touchy controls. Limiting GrabStart- and GrabEndButtons in the Super Hands schema the same way I did in 1.0.1 for the objects seems to make all controls require a full press as intended. I don't know what I just wrote either.

## 1.0.1 (1/14/20)

-   Removed triggerstart and pistolstart as ways to grab objects, and triggerend and pistolend as ways to release objects. This means that it will take a full button press or grip to activate objects.
-   Added instruction on Grab Lab wall to grab with one button at a time.
-   Added version number under big name text.

1.0.0 (1/13/20)

-   Public release. Hooray!
