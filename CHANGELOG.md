# AnVRopomotron Changelog
## 1.2.2 (next)
It's summer so it's time to make models non-stop.
-   Ardi the Ardipithecus ramidus makes her way down to the Human Evolution Hall! This important discovery gives a clear image of what hominin evolution was like pre-Lucy. I've never seen Ardi and Lucy lined up so making the model was illuminating for me. I didn't know that Ardi was taller and that her arms were so long. The reduction in arm length in Lucy is very stark now, though her arms are still proportionately longer than our own.
-   Proboscis monkeys nose-in to the Asia section of Modern Primates! I just couldn't resist these special looking monkeys with the males and their bulbous flabby noses and females with sharp upturned ones. I modeled a male and female to show the sexual dimorphism in faces, limb proportions, and size. I had a hard time posing the male because they are typically seated upright while the monkey was modeled from the mandrill on four legs. Since the underlying rig is for a dog, sitting up caused a lot of visual problems that would take too long to fix. I avoided the issue by finding a vertical-yet-not-sitting pose for the male climbing up a tree that was based on a photograph online. The female is also posed from photograph relaxing on the same tree. Not to harp on the failures of this model, but I also tried leaf generation using the built-in Sapling Gen add-on, but I couldn't get satisfactory results this time. 
-   The Senegal galago sneaks its way to the Africa section of Modern Primates! This model was also very challenging. I tried to adapt the slow loris model but only the head remained in the final product. I had to completely remake the body and took the arms and legs of the tarsier (but with the feet of the loris!). I Frankensteined it all together into the galago. I could not find any references for a neutral pose, which is what I first model before applying an animation rig. There just aren't any good photos or illustrations of a galago that is not sitting or jumping, etc. Instead of that method of modeling, I went old-school and modeled the galago straight into its sitting pose with no rig. Due to the model's small size, I also took some shortcuts. For example, the arms and legs are not actually attached to the body!
-   The aye-aye got a slight refresh. The original baked lighting mimicked a nighttime scene but in hindsight that made no sense so now it is lit as the other primates are. While I was rebaking I noticed some bad UV arrangement on the tree branch so I fixed that too.
-   It took me a year but I realized that the rhesus monkey is in the Africa section when it should be in Asia. Problem is that there are published assignments that depend on the rhesus monkey's position. My Alexander the Great solution is to keep it there and add a sign implying every other model is grouped by region but the rhesus is not.
-   Occlusion logic tweaked so rhesus monkey is visible from the Divider Hall.
-   Human Evolution Hall got some flavor with images accompanying each model. The pictures are of the site or general region of each find. 
-   Divider Hall got a some flavor with a good image showing how we view human evolution. 
-   Tweaks to asset loading.
-   New version; new control scheme. I managed to cobble together working components to make the left hand teleport and the right hand turn left and right. Sorry smooth-movers, I just couldn't make it work with what is out there to use. 
-   Shadow-producing lights now follow the principle of the maps in the previous update: there are two that will (hopefully) seamlessly light where the viewer is by moving around based on the occlusin planes being touched.


## 1.2.1 (5/23/2022)
-   A few hotfixes and tweaks that made it to live AnVRopomotron ahead of the next big update.
-   Human Evolution Hall is brighter. This was the original concept but the hominin models used sharp lighting that implied a darker room so I adjusted the room bake to match. It didn't make sense for a dark room to have such vibrant colors so I aimed to fix the lighting across the board. I redid the lighting for each hominin model, using a 360 panorama hdri of the hall for matching lighting. The hominin and hall models were then rebaked with the new light.
-   Rebaking also fixed the divider hallway bake that had lighting issues on the Human Evolution side.
-   Human Evolution Hall has a new sign stating that the presentation of hominins is not complete.
-   Occlusion tweaking so the divider hallway is visible while exiting stage 2 of the Modern Primate Hall.
-   Tweaking of asset load priorities so the divider hallway loads in sooner since it is visible from the starting position.
-   Teleportation movement disabled due to unpredictable interactions with Quest controllers.

## 1.2 (3/24/2022)
-   Welcome to a new Hall that addresses the big 'missing link' in this museum of biological anthropology. Human evolution is an especially difficult subject to portray in a way that informs but does not mislead. As with drawing, rendering the human form is a special challenge even compared to other primates. After two years of working 3D modeling and WebXR, I think I can do this topic justice. This version is the first of a growing set of exhibits as the other halls also experience.
   -   The Human Evolution Hall has its own model separate from the rest of the museum. The twisty divider hallway is visible from both sides and when the visitor is inside, moving down one end will reveal that part of the museum. There are three occlusion planes inside to hide and show each end appropriately. The divider model actually incorporates walls and ceilings from the adjoining Halls that would be visible from inside. This was done in Blender cutting and snapping vertices to precisely match each section.
   -   When in the Human Evolution Hall, the entire rest of the old museum despawns to save resources.
   -   The exhibit hall is pretty cool! Unlike everything before it, this exhibit goes vertical on a spirally extended family tree of hominins. The staircase was made in Blender following tutorials on using the array modifier around a point. The projecting platforms are done manually following a set routine of extrusions and scales. The time labels on the steps are shadow stencils like with the signage in other parts of the museum (Blender text hovering just over the surface to cast a shadow when baking).
   -   The flying maps make their way to the new Hall with extensions to the old code. The map image includes the new hall and a note on where the Credits are found. The maps got updated with the new Hall and two new spots to teleport: ground level and at the top of the spiral staircase. A [line of code from Stackoverflow](https://stackoverflow.com/questions/57058442/setting-camera-position-at-runtime-collides-with-navmesh) fixed an issue with the height not sticking. 
   -   The shadow-producing light also moves with the user as they move through the divider hallway.
   -   The stands for the maps, seen in the Centerpiece Hall and Human Evolution Hall, are now baked in to their respective floor models to reduce draw calls in A-Frame.
   -   The four hominins have been worked on since 2020 from a base humanoid figure to each of the specific individuals. I modeled each one by one to a rigged and posed draft before wrapping them up with baking textures at the end of 2021 and the start of 2022 for Lucy. Some notes on their making:
        -   The baking actually used a subdivided model as the source of shading and highlights, with those details painted onto a texture map that the actual model shares. There is a [Youtube tutorial](https://youtu.be/9Fr3bK15zUw) of this process on the Neanderthal. The process seems pretty powerful with the ability to fake detail convincingly. Some care has to be taken on especially small UV islands, such as around the eyes and nose. Separating and scaling those up ironed out the visual issues.
        -   The forms are based on an general interpretation of how much soft tissue corresponds to the thickness of bones in humans and apes. Up-to-date research was done to see what professionals with hands-on experience thought, though I did not follow every one of those interpretations.
        -   The colors are made to be artificial, in no way reflecting what they looked like in real life. The reasons are that it would be impossible to know for sure, and would involve more guesswork than I'm comfortable with. I also tried some realistic tones and the models crossed right into the uncanny valley. 
        -   For the same reasons, no hair or fur is present. 
        -   Poses for everyone but Lucy are based on photographs of modern people who live in the respective region of each fossil. 
        -   Lucy, the last of the four models, uses a few techniques not seen in the others. The switch to Blender 3.0 resulted in a better Rigify mod that handles eyes in a more intuitive way. Baking textures also started out from a 4096px image and downscaled to 1024 to blur edges. Lucy also has a color-based Easter egg to reflect her name's origin.
        -   To reduce draw calls, the hominin statues, stairs, and surrounding building are all one model.
-   Raising Grab Lab tables lost their animations. It was causing problems with launching objects at light speed on load. Tables and objects now snap up into place for non-VR devices.
-   All of the walls, floors, and ceilings got a new bake. Baking goes from 4096 but to 2048, and then smoothed by AI again. Just enough of the texture comes through.
-   Updated A-Frame to 1.3.0. This version opens meshoptimized files by default, but unfortunately basis textures are still out of reach. As a trade-off to upgrading, I removed the basis images from earlier, returning to natively readable formats. The custom component to read meshoptimized and basis files was removed.
-   JPG/PNG compressed using [squoosh.app](www.squoosh.app) on some of the largest images and texture files. The highlight is the Calatrava Castle model, which dropped from 9.5MB to 3.7MB due to the texture compression. 
-   What else is neat is that the whole file size has dropped with this new update, even though the museum gained a large new space with new models! We saved around 4MB.
-   Warp tweaked again to chain functions and wait for each animation to finish.
-   Background physics handling changed to prevent object explosion on load. Grabbable objects are naturally static objects. Being in VR switches objects on after their respective table loads to hold them. Working on this change was a harrowing few hours before the version release. A maddening explosion of objects was actually not caused by switching modes as I had thought, but was actually due to the new navmesh being multiple floors, which made it take on a much larger boundary box than intended. Removing physics properties from the navmesh was the final fix.
-   HTML streamlined using A-Frame mixins more effectively for many text boxes.

## 1.1.9b (12/28/2021)
-   Oculus controls keep flip flopping. Attempts to fix this issue:  
   -   Updated A-Frame to 1.2. I didn't do this earlier because the update broke the navmesh and grabbing. To fix that: 
      -   Used a tip to load the deprecated BufferGeometry
      -   Used another tip to load a fixed aframe-extras 
      -   Now teleporting is set to right hand and movement is set to left hand
      - Changed the wall instructions to match the new setup
   -   While I was tinkering: 
      -   Warp animation tweaked to remove the startup wait

## 1.1.9 (11/28/2021)
-   Plesiadapis claws its way to the Scale Model Hall! A relative of primates, the plesiadapis looks like a large squirrel. As the oldest organism in the Scale Model Hall, it takes its place at the start of the row of prehistoric life and as the attractor to that part of the museum since the gibbon was moved back into a more appropriate location with the modern primates. 
-   The latest exciting discovery by Lee Berger and his team is in the VR Grab Lab. The reconstruction of Leti's cranium features an intact midbrow and adult teeth in development. The VR ready model was made in stages. The original 10 million polygon (!) model was reduced to 2 million for later normal map baking. A copy was then taken down to 42,000 for vertex coloring based on published photos of the real replica. Lastly, another copy was taken down to 6,400 polygons, which is near the limit before the object outline became distorted. Details were then baked to this smallest model for huge rendering and file size savings.
-   With the new floorplan, now is the time to work on strategically placed mini maps to warp the user to different exhibits. To reduce draw calls, maps will surreptitiously move through exhibits to be near you. The Centerpiece map at the start is mostly static since it is viewable from a lot of angles but it will move to the Scale Model Hall if you go deep in to the exhibit. The other map flits between the the exhibits more freely, starting in the Grab Lab but going where needed. Grab a carrot to go quickly to another exhibit.
-   The warp comes with an effect to ease VR sickness. It is a ring primitive just off camera that is timed to shrink its inner ring until everything is obscured, move the camera to the new location, and expand the ring out of view again. 
-   Tweaks of the infrastructure to fine tune it to the new floorplan.
    - The movement of the single dynamic light following you is more subtle. 
    - Occlusion tweaks to be more hidden, especially the rhesus monkey.
    - WebXR Award trophy ground shadows fixed to match model rotation.

## 1.1.8 (08/11/2021)
-   The aye-aye creeps its way into the Scale Model Hall! This lemur was the last primate up for voting but not the least since it has some amazing anatomy. Modeling the aye-aye turned out to be quite challenging due to a lack of good references for a black-furred nocturnal animal that lives only in Madagascar. Most online footage is based on one individual from the Duke Lemur Center who then went to the Cincinnati Zoo. The base model was just the previous slow loris model. As usual, it's not business as usual since a new technique was used: hair simulation.  Aye-ayes have almost porcupine-like white straggly strands of fur on their backs. Instead of leaving them out or painting them onto the back directly, I used Blender's hair and physics sims to give an array of procedural strands that were then converted to a mesh. It was fun using these tools, which included a comb tool to direct the fur in an intuitive way. The aye-aye is posed using its traits to hunt for grubs in wood.
-   Remodel of the Scale Model Hall and Burial Chamber exhibits. Upgrades include:
    -   The Scale Model Hall space has been expanded to give the current selection room to breathe and to make room for more. The primates are now organized by geographic location instead of by multiplying willy by nilly. Baked-in labels make it clear where you are.
    -   I have doubled the textures of the floorplan into two 2048px textures. One has all of the baked text labels and the other has everything else. How was baking text accomplished? The text are Blender text objects that hover 0.01m over the wall. Light baking simply bakes the text-shaped shadows into the texture. I first used text models but that made the model size grow exponentially. 
    -   The entryway to the Modern Primates part of the Scale Model Hall got an archway and extended wall for better occlusion handling. 
    -   The Burial Chamber entrance got another turn and a narrow doorway into the exhibit for better occlusion handling. Info that was projected on the back wall are now split to each mini wall.
    -   The Burial Chamber also got some soft blue lighting.
    -   Floorplan model size slightly trimmed by removing walls and edges that are never seen. I got very familiar with snapping in Blender so I no longer need the infrastructure to keep things aligned. 
    -   Occlusion zones updated to account for the new spaces. Standing in each zone will usually keep on any adjoining zones but render invisible everything else. 
    -   Dynamic lighting model for hands and info buttons got a small tweak. Before, lights flicked on and off as you moved through the museum to keep things lit around you. Now, there is only one light but it moves to follow you based on the occlusion zones. 
-   Text that is not dynamic got baked in other parts of the museum too so some text objects/draw calls got trimmed from the html. Draw calls have dropped by a handful in general and initial loading feels faster.
-   VR hand control issues have reappeared with controls ignoring left thumbstick and all piling into right thumbstick. Current solution is to swap the walking and teleporting hands.
-   Rewriting of the Open Education Resource assignments to match the new locations.
-   Ground has been broken on the next big exhibit: Human Evolution! This offshoot of Prehistoric Primates is very much under construction but if you look behind the barrier....

## 1.1.7 (06/14/2021)
-   The Kayan slow loris adorbs its way into the Scale Model Hall and into your heart. I went with this species because I'm friends with one of its discoverers, Rachel Munds. Unlike the mandrills, I had a wealth of realistic poses to choose from. I settled on an upside-down hanging pose because just look at it. This model has a few improvements. I used a new version of my basic quadruped mesh that now has marked seams for UV unwrapping. This leaves the UV positions left less to chance and can now follow the contours of the shape more precisely. It works! The UV map is more organized and the consolidation of UV islands means that it's a little easier on rendering. 
-   I have a modern computer so I can finally do something I've put off: rebake the textures of the museum walls, floor, and ceiling. Since the gorillas and mouse lemur refresh, the lights and shadows of the building have not kept up with the models. With my old iMac a bake of the building texture took two overnight sessions so I put if off for months. With my new PC it now takes... 8 minutes! I also found a way to denoise the texture after baking using the Composition mode in Blender. I used to manually blur the texture in Affinity Photo. The new result looks much better and now there are cool spotlights and shadows to make the recent additions fit the environment better. Check out the angel wings on the trophy!

## 1.1.6 (04/29/2021)
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
