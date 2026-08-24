// ==UserScript==
// @name         Gaurev Command Palette for ChatGPT
// @namespace    https://chatgpt.com/gaurev-command-palette
// @version      2.3.0
// @description  Neon-green Creative Studio command center with universal owned/shared Project Registry and instant global command search.
// @author       Gaurev
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @inject-into  content
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_info
// @downloadURL  https://raw.githubusercontent.com/gaurevkohli1/gaurev-command-palette/main/gaurev-command-palette.user.js
// @updateURL    https://raw.githubusercontent.com/gaurevkohli1/gaurev-command-palette/main/gaurev-command-palette.user.js
// @homepageURL  https://github.com/gaurevkohli1/gaurev-command-palette
// ==/UserScript==

(() => {
  'use strict';

  const COMMANDS = [{"name":"/EDIT-ME","category":"★ Master Bundles","description":"Change wardrobe/world while locking Gaurev’s identity and maximizing realism.","expansion":"Activates: /gaurev-lock, /face-zero-drift, /body-zero-drift, /change-everything-except-me, /photo-real-max, /no-ai-look","tags":["bundle","favorite","smart-expand"]},{"name":"/FASHION-ME","category":"★ Master Bundles","description":"Gaurev luxury fashion editorial preset with identity lock and realistic materials.","expansion":"Activates: /gaurev-lock, /quiet-luxury, /gq-mode, /photo-real-max, /real-skin, /real-materials","tags":["bundle","favorite","smart-expand"]},{"name":"/BILLIONAIRE-ME","category":"★ Master Bundles","description":"Tasteful ultra-high-net-worth visual world with quiet luxury and realism.","expansion":"Activates: /gaurev-lock, /billionaire-mode, /quiet-luxury, /photo-real-max, /no-ai-look, /real-light","tags":["bundle","favorite","smart-expand"]},{"name":"/MOVIE-ME","category":"★ Master Bundles","description":"Hollywood production-still / movie-key-art preset using Gaurev as the locked character.","expansion":"Activates: /gaurev-lock, /production-still, /movie-poster, /real-light, /real-physics, /photo-real-max","tags":["bundle","favorite","smart-expand"]},{"name":"/POSTER-MAX","category":"★ Master Bundles","description":"Maximum poster/key-art quality with typography, logo and Instagram readability safeguards.","expansion":"Activates: /blockbuster-keyart, /text-perfect, /logo-exact, /instagram-poster, /photo-real-max, /no-ai-look","tags":["bundle","favorite","smart-expand"]},{"name":"/IMAGE-MAX","category":"★ Master Bundles","description":"Maximum reference fidelity, physical realism, materials, lighting and anti-AI cleanup.","expansion":"Activates: /reference-exact, /photo-real-max, /no-ai-look, /real-skin, /real-materials, /real-light, /real-physics","tags":["bundle","favorite","smart-expand"]},{"name":"/STORYBOARD-MAX","category":"★ Master Bundles","description":"Full Gaurev storyboard pipeline with hero/end frames and image/video prompt outputs.","expansion":"Activates: /storyboard-gaurev, /storyboard-10, /storyboard-image-prompts, /storyboard-video-prompts, /hero-frame, /end-frame-lock","tags":["bundle","favorite","smart-expand"]},{"name":"/SEEDANCE-MAX","category":"★ Master Bundles","description":"Full Seedance 2.5 directing stack for reference fidelity, continuity, motion, camera and audio.","expansion":"Activates: /seedance-director, /seedance-reference-lock, /seedance-continuity, /seedance-real-motion, /seedance-camera-real, /audio-real","tags":["bundle","favorite","smart-expand"]},{"name":"/REEL-MAX","category":"★ Master Bundles","description":"20-second vertical social reel preset with strong first 3 seconds and fast pacing.","expansion":"Activates: /seedance-20, /seedance-916, /viral-first-3, /seedance-fast-cut, /audio-real","tags":["bundle","favorite","smart-expand"]},{"name":"/UGC-MAX","category":"★ Master Bundles","description":"Authentic smartphone UGC preset: natural performance, jump cuts and real audio.","expansion":"Activates: /raw-phone-video, /creator-ugc, /no-ad-acting, /jumpcut, /viral-first-3, /audio-real","tags":["bundle","favorite","smart-expand"]},{"name":"/PRODUCT-MAX","category":"★ Master Bundles","description":"Strict product fidelity plus premium commercial presentation and hero frame.","expansion":"Activates: /product-zero-drift, /reference-exact, /real-materials, /product-lux, /product-hero-frame","tags":["bundle","favorite","smart-expand"]},{"name":"/JEWELLERY-MAX","category":"★ Master Bundles","description":"Strict jewellery geometry/stone lock plus macro luxury advertising treatment.","expansion":"Activates: /jewellery-zero-drift, /product-macro, /real-skin, /real-materials, /product-lux, /product-hero-frame","tags":["bundle","favorite","smart-expand"]},{"name":"/SUPERCAR-MAX","category":"★ Master Bundles","description":"Gaurev + premium supercar editorial with vehicle fidelity and realistic physics.","expansion":"Activates: /gaurev-lock, /supercar-editorial, /car-lock, /real-materials, /real-physics, /photo-real-max, /cinematic-world","tags":["bundle","favorite","smart-expand"]},{"name":"/FIGHTERJET-MAX","category":"★ Master Bundles","description":"Gaurev + advanced fighter-jet cinematic world with scale and physical realism.","expansion":"Activates: /gaurev-lock, /fighter-jet, /machine-scale, /cinematic-world, /production-still, /real-physics, /photo-real-max","tags":["bundle","favorite","smart-expand"]},{"name":"/SOCIAL-MAX","category":"★ Master Bundles","description":"Social-first creative optimized for attention, captioning, hierarchy and mobile.","expansion":"Activates: /social-optimize, /viral-first-3, /caption-full, /brand-clean, /instagram-poster","tags":["bundle","favorite","smart-expand"]},{"name":"/CAMPAIGN-MAX","category":"★ Master Bundles","description":"Ideate, select and develop a complete premium branded campaign direction.","expansion":"Activates: /ideas-no-generic, /pick-one, /brand-optimize, /social-optimize, /storyboard-video-prompts, /final-pass","tags":["bundle","favorite","smart-expand"]},{"name":"/WEBSITE-MAX","category":"★ Master Bundles","description":"Awwwards-style premium website redesign with motion, mobile and conversion thinking.","expansion":"Activates: /website-redesign, /website-premium, /awwwards, /hero-wow, /site-motion, /site-mobile-first, /site-conversion","tags":["bundle","favorite","smart-expand"]},{"name":"/PROMPT-MAX-GK","category":"★ Master Bundles","description":"Gaurev’s full prompt diagnosis/rebuild/locking/finalization workflow.","expansion":"Activates: /prompt-deep-analyze, /prompt-rebuild, /prompt-locks, /prompt-reference, /prompt-negative, /ideas-no-generic, /prompt-copy","tags":["bundle","favorite","smart-expand"]},{"name":"/IDEAS-MAX","category":"★ Master Bundles","description":"Generate non-generic ideas, narrow to the strongest three, then select one.","expansion":"Activates: /ideas-no-generic, /ideas-10-cinematic, /best-3, /pick-one","tags":["bundle","favorite","smart-expand"]},{"name":"/CHARACTER-SHEET","category":"★ Master Bundles","description":"Identity-preserved character-sheet workflow using reference images as authority.","expansion":"Activates: /gaurev-lock, /multi-ref-lock, /reference-exact, /photo-real-max, /real-skin, /real-materials","tags":["bundle","favorite","smart-expand"]},{"name":"/CREATIVE-STUDIO-MAX","category":"★ Master Bundles","description":"Full brand-aware creative-studio workflow: art direction, fresh variation, social execution and final QA.","expansion":"Activates: /creative, /artdirect, /brandstyle, /variation, /social, /final-pass","tags":["bundle","favorite","smart-expand","studio-manual"]},{"name":"/PRODUCT-AD-MAX","category":"★ Master Bundles","description":"Maximum product-ad fidelity plus hero composition, material realism and text/product safeguards.","expansion":"Activates: /productad, /producthero, /reference-exact, /product-zero-drift, /real-materials, /text-perfect","tags":["bundle","favorite","smart-expand","studio-manual"]},{"name":"/CAMPAIGN-LAUNCH-MAX","category":"★ Master Bundles","description":"End-to-end launch campaign system across social, carousel and Reel cover with brand consistency.","expansion":"Activates: /launch, /artdirect, /social, /carousel, /reelcover, /brandstyle","tags":["bundle","favorite","smart-expand","studio-manual"]},{"name":"/SOCIAL-CREATIVE-MAX","category":"★ Master Bundles","description":"Finished graphic-designed social creative with type-led hierarchy, brand system and separate-output discipline.","expansion":"Activates: /creative, /social, /typeled, /brandstyle, /text-perfect, /one-by-one","tags":["bundle","favorite","smart-expand","studio-manual"]},{"name":"/VIDEO-STUDIO-MAX","category":"★ Master Bundles","description":"Complete product/video directing stack with camera, transitions, continuity, physics and audio.","expansion":"Activates: /video, /productvideo, /camera, /transition, /video-product-lock, /continuity-max, /audio-real","tags":["bundle","favorite","smart-expand","studio-manual"]},{"name":"/UGC-VIDEO-MAX","category":"★ Master Bundles","description":"Authentic Indian/global UGC video stack with smartphone realism, natural performance and audio.","expansion":"Activates: /ugcvideo, /ugc-indian, /raw-phone-video, /no-ad-acting, /audio-real, /viral-first-3","tags":["bundle","favorite","smart-expand","studio-manual"]},{"name":"/BRAND-SYSTEM-MAX","category":"★ Master Bundles","description":"Brand-system extension across palette, typography, layout and social execution.","expansion":"Activates: /brandstyle, /palette, /typography, /layout, /social, /final-pass","tags":["bundle","favorite","smart-expand","studio-manual"]},{"name":"/gaurev-lock","category":"Character & Identity","description":"Use uploaded Gaurev references as absolute identity authority.","expansion":"Use uploaded Gaurev references as absolute identity authority.","tags":[]},{"name":"/face-zero-drift","category":"Character & Identity","description":"Maximum facial preservation; no beautification, reshaping or identity reinterpretation.","expansion":"Maximum facial preservation; no beautification, reshaping or identity reinterpretation.","tags":[]},{"name":"/body-zero-drift","category":"Character & Identity","description":"Preserve exact body build, proportions, shoulder width and height impression.","expansion":"Preserve exact body build, proportions, shoulder width and height impression.","tags":[]},{"name":"/identity-priority","category":"Character & Identity","description":"When creative instructions conflict with likeness, identity always wins.","expansion":"When creative instructions conflict with likeness, identity always wins.","tags":[]},{"name":"/multi-ref-lock","category":"Character & Identity","description":"Use multiple uploaded images together to reconstruct one consistent identity.","expansion":"Use multiple uploaded images together to reconstruct one consistent identity.","tags":[]},{"name":"/couple-lock","category":"Character & Identity","description":"Preserve two main characters independently without face or wardrobe blending.","expansion":"Preserve two main characters independently without face or wardrobe blending.","tags":[]},{"name":"/group-lock","category":"Character & Identity","description":"Maintain multiple main characters independently in group scenes.","expansion":"Maintain multiple main characters independently in group scenes.","tags":[]},{"name":"/change-everything-except-me","category":"Character & Identity","description":"Change wardrobe, world, props and lighting while preserving the person exactly.","expansion":"Change wardrobe, world, props and lighting while preserving the person exactly.","tags":[]},{"name":"/characterlock","category":"Character & Identity","description":"Treat supplied character references as the master identity source.","expansion":"Treat supplied character references as the master identity source.","tags":[]},{"name":"/identity-max","category":"Character & Identity","description":"Activate maximum face, body, age, hair, beard and skin identity preservation.","expansion":"Activate maximum face, body, age, hair, beard and skin identity preservation.","tags":[]},{"name":"/face-lock","category":"Character & Identity","description":"Preserve the face strictly while allowing non-facial changes.","expansion":"Preserve the face strictly while allowing non-facial changes.","tags":[]},{"name":"/physique-lock","category":"Character & Identity","description":"Preserve physique, muscularity and body proportions.","expansion":"Preserve physique, muscularity and body proportions.","tags":[]},{"name":"/age-lock","category":"Character & Identity","description":"Prevent unintended aging or de-aging.","expansion":"Prevent unintended aging or de-aging.","tags":[]},{"name":"/hair-lock","category":"Character & Identity","description":"Preserve hairstyle, hairline, density, texture and colour.","expansion":"Preserve hairstyle, hairline, density, texture and colour.","tags":[]},{"name":"/beard-lock","category":"Character & Identity","description":"Preserve beard shape, density, length and colour.","expansion":"Preserve beard shape, density, length and colour.","tags":[]},{"name":"/skin-lock","category":"Character & Identity","description":"Preserve natural complexion and skin tone.","expansion":"Preserve natural complexion and skin tone.","tags":[]},{"name":"/multi-character-lock","category":"Character & Identity","description":"Maintain multiple named/reference identities independently.","expansion":"Maintain multiple named/reference identities independently.","tags":[]},{"name":"/upgrade-clothes","category":"Image Editing","description":"Replace current clothing with a more premium wardrobe while preserving identity.","expansion":"Replace current clothing with a more premium wardrobe while preserving identity.","tags":[]},{"name":"/upgrade-world","category":"Image Editing","description":"Improve surroundings dramatically without changing the subject.","expansion":"Improve surroundings dramatically without changing the subject.","tags":[]},{"name":"/upgrade-both","category":"Image Editing","description":"Upgrade clothing and surroundings while locking identity.","expansion":"Upgrade clothing and surroundings while locking identity.","tags":[]},{"name":"/same-shot-edit","category":"Image Editing","description":"Lock camera, framing, subject position and perspective; edit only requested elements.","expansion":"Lock camera, framing, subject position and perspective; edit only requested elements.","tags":[]},{"name":"/background-only","category":"Image Editing","description":"Change only the background/environment.","expansion":"Change only the background/environment.","tags":[]},{"name":"/clothes-only","category":"Image Editing","description":"Change only wardrobe.","expansion":"Change only wardrobe.","tags":[]},{"name":"/remove-only","category":"Image Editing","description":"Remove only the requested object/text/logo and keep everything else unchanged.","expansion":"Remove only the requested object/text/logo and keep everything else unchanged.","tags":[]},{"name":"/replace-only","category":"Image Editing","description":"Replace exactly one specified element while locking everything else.","expansion":"Replace exactly one specified element while locking everything else.","tags":[]},{"name":"/composition-lock","category":"Image Editing","description":"Do not crop, reposition, zoom, rotate or alter composition.","expansion":"Do not crop, reposition, zoom, rotate or alter composition.","tags":[]},{"name":"/reference-exact","category":"Image Editing","description":"Treat attached image as an exact authoritative visual reference.","expansion":"Treat attached image as an exact authoritative visual reference.","tags":[]},{"name":"/wardrobe","category":"Image Editing","description":"Change clothing while preserving identity.","expansion":"Change clothing while preserving identity.","tags":[]},{"name":"/wardrobe-luxury","category":"Image Editing","description":"Upgrade wardrobe to premium designer / quiet-luxury styling.","expansion":"Upgrade wardrobe to premium designer / quiet-luxury styling.","tags":[]},{"name":"/wardrobe-corporate","category":"Image Editing","description":"Executive, founder or CEO wardrobe.","expansion":"Executive, founder or CEO wardrobe.","tags":[]},{"name":"/wardrobe-casual","category":"Image Editing","description":"Premium casual or smart-casual wardrobe.","expansion":"Premium casual or smart-casual wardrobe.","tags":[]},{"name":"/wardrobe-wedding","category":"Image Editing","description":"High-end Indian wedding or ceremonial styling.","expansion":"High-end Indian wedding or ceremonial styling.","tags":[]},{"name":"/wardrobe-street","category":"Image Editing","description":"Luxury streetwear/editorial styling.","expansion":"Luxury streetwear/editorial styling.","tags":[]},{"name":"/wardrobe-fitness","category":"Image Editing","description":"Premium athletic/bodybuilding styling.","expansion":"Premium athletic/bodybuilding styling.","tags":[]},{"name":"/location","category":"Image Editing","description":"Change the location while preserving subject identity.","expansion":"Change the location while preserving subject identity.","tags":[]},{"name":"/location-upgrade","category":"Image Editing","description":"Replace ordinary surroundings with richer premium surroundings.","expansion":"Replace ordinary surroundings with richer premium surroundings.","tags":[]},{"name":"/no-ai-look","category":"Realism","description":"Remove waxy skin, fake HDR, synthetic reflections, perfect symmetry and other AI-looking traits.","expansion":"Remove waxy skin, fake HDR, synthetic reflections, perfect symmetry and other AI-looking traits.","tags":[]},{"name":"/photo-real-max","category":"Realism","description":"Make the output look like an actual photograph captured on location.","expansion":"Make the output look like an actual photograph captured on location.","tags":[]},{"name":"/production-still","category":"Realism","description":"Use genuine film-production still logic: practical light, imperfect capture and believable interaction.","expansion":"Use genuine film-production still logic: practical light, imperfect capture and believable interaction.","tags":[]},{"name":"/raw-camera","category":"Realism","description":"Favor believable camera capture over polished synthetic beauty.","expansion":"Favor believable camera capture over polished synthetic beauty.","tags":[]},{"name":"/real-skin","category":"Realism","description":"Prioritize pores, microtexture, tonal variation and natural skin response.","expansion":"Prioritize pores, microtexture, tonal variation and natural skin response.","tags":[]},{"name":"/real-materials","category":"Realism","description":"Increase fidelity of fabric, leather, glass, metal, jewellery, carbon fibre and paint.","expansion":"Increase fidelity of fabric, leather, glass, metal, jewellery, carbon fibre and paint.","tags":[]},{"name":"/real-light","category":"Realism","description":"Require physically plausible, motivated light sources.","expansion":"Require physically plausible, motivated light sources.","tags":[]},{"name":"/real-physics","category":"Realism","description":"Require believable weight, gravity, contact, cloth, shadows and reflections.","expansion":"Require believable weight, gravity, contact, cloth, shadows and reflections.","tags":[]},{"name":"/reality-max","category":"Realism","description":"Maximum human-first photorealism.","expansion":"Maximum human-first photorealism.","tags":[]},{"name":"/anti-ai","category":"Realism","description":"Actively remove common synthetic-image characteristics.","expansion":"Actively remove common synthetic-image characteristics.","tags":[]},{"name":"/stills-archive","category":"Realism","description":"Use production-still / unit-photography realism language.","expansion":"Use production-still / unit-photography realism language.","tags":[]},{"name":"/editorial-realism","category":"Realism","description":"High-fashion editorial photography without CGI polish.","expansion":"High-fashion editorial photography without CGI polish.","tags":[]},{"name":"/commercial-realism","category":"Realism","description":"Premium advertising realism with physically believable capture.","expansion":"Premium advertising realism with physically believable capture.","tags":[]},{"name":"/skin-realism","category":"Realism","description":"Maximum believable skin texture and microdetail.","expansion":"Maximum believable skin texture and microdetail.","tags":[]},{"name":"/material-realism","category":"Realism","description":"Maximum material and surface fidelity.","expansion":"Maximum material and surface fidelity.","tags":[]},{"name":"/quiet-luxury","category":"Luxury & Fashion","description":"Understated Italian-style luxury: tailoring, linen, cashmere, refined accessories and no loud logos.","expansion":"Understated Italian-style luxury: tailoring, linen, cashmere, refined accessories and no loud logos.","tags":[]},{"name":"/billionaire-mode","category":"Luxury & Fashion","description":"Tasteful ultra-high-net-worth world: private aviation, rare cars, yachts and exclusive properties.","expansion":"Tasteful ultra-high-net-worth world: private aviation, rare cars, yachts and exclusive properties.","tags":[]},{"name":"/ceo-mode","category":"Luxury & Fashion","description":"Premium founder/CEO editorial styling.","expansion":"Premium founder/CEO editorial styling.","tags":[]},{"name":"/gq-mode","category":"Luxury & Fashion","description":"Men’s luxury fashion editorial treatment.","expansion":"Men’s luxury fashion editorial treatment.","tags":[]},{"name":"/vogue-india","category":"Luxury & Fashion","description":"Premium Indian fashion/editorial aesthetic.","expansion":"Premium Indian fashion/editorial aesthetic.","tags":[]},{"name":"/wedding-lux","category":"Luxury & Fashion","description":"Luxury Indian wedding editorial mode.","expansion":"Luxury Indian wedding editorial mode.","tags":[]},{"name":"/monaco-mode","category":"Luxury & Fashion","description":"European Riviera / Monaco luxury environment.","expansion":"European Riviera / Monaco luxury environment.","tags":[]},{"name":"/private-villa","category":"Luxury & Fashion","description":"Exclusive private villa lifestyle environment.","expansion":"Exclusive private villa lifestyle environment.","tags":[]},{"name":"/private-beach","category":"Luxury & Fashion","description":"Exclusive private-beach editorial environment.","expansion":"Exclusive private-beach editorial environment.","tags":[]},{"name":"/private-aviation","category":"Luxury & Fashion","description":"Premium private jet, FBO or aviation environment.","expansion":"Premium private jet, FBO or aviation environment.","tags":[]},{"name":"/luxury-world","category":"Luxury & Fashion","description":"Elite villas, penthouses, supercars, private terminals, yachts and luxury hotels.","expansion":"Elite villas, penthouses, supercars, private terminals, yachts and luxury hotels.","tags":[]},{"name":"/corporate-world","category":"Luxury & Fashion","description":"Premium office, boardroom, HQ and executive-lounge environment.","expansion":"Premium office, boardroom, HQ and executive-lounge environment.","tags":[]},{"name":"/cinematic-world","category":"Luxury & Fashion","description":"Transform environment into a large-scale movie-quality set.","expansion":"Transform environment into a large-scale movie-quality set.","tags":[]},{"name":"/india-luxury","category":"Luxury & Fashion","description":"Premium Indian architecture, hospitality, business or lifestyle world.","expansion":"Premium Indian architecture, hospitality, business or lifestyle world.","tags":[]},{"name":"/destination-mode","category":"Luxury & Fashion","description":"Build around an iconic destination without sacrificing subject prominence.","expansion":"Build around an iconic destination without sacrificing subject prominence.","tags":[]},{"name":"/hypercar","category":"Supercars & Machines","description":"Introduce an extreme high-performance luxury vehicle as a major visual element.","expansion":"Introduce an extreme high-performance luxury vehicle as a major visual element.","tags":[]},{"name":"/supercar-editorial","category":"Supercars & Machines","description":"Treat vehicle and character as a premium automotive fashion campaign.","expansion":"Treat vehicle and character as a premium automotive fashion campaign.","tags":[]},{"name":"/car-lock","category":"Supercars & Machines","description":"Preserve exact car model, body, paint, wheels, lights and proportions.","expansion":"Preserve exact car model, body, paint, wheels, lights and proportions.","tags":[]},{"name":"/plate-lock","category":"Supercars & Machines","description":"Never alter the specified vehicle registration / number plate.","expansion":"Never alter the specified vehicle registration / number plate.","tags":[]},{"name":"/fighter-jet","category":"Supercars & Machines","description":"Create a high-end aerospace / advanced fighter-jet visual world.","expansion":"Create a high-end aerospace / advanced fighter-jet visual world.","tags":[]},{"name":"/machine-scale","category":"Supercars & Machines","description":"Emphasize scale and physical presence of advanced machinery.","expansion":"Emphasize scale and physical presence of advanced machinery.","tags":[]},{"name":"/movie-poster","category":"Posters & Key Art","description":"Hollywood theatrical poster treatment.","expansion":"Hollywood theatrical poster treatment.","tags":[]},{"name":"/netflix-poster","category":"Posters & Key Art","description":"High-click streaming thumbnail / poster hybrid.","expansion":"High-click streaming thumbnail / poster hybrid.","tags":[]},{"name":"/blockbuster-keyart","category":"Posters & Key Art","description":"Large-scale studio campaign key art.","expansion":"Large-scale studio campaign key art.","tags":[]},{"name":"/minimal-lux-poster","category":"Posters & Key Art","description":"Minimal, expensive-looking poster hierarchy.","expansion":"Minimal, expensive-looking poster hierarchy.","tags":[]},{"name":"/bright-poster","category":"Posters & Key Art","description":"Avoid dark/muddy design; favor ivory, daylight, warm neutrals and open space.","expansion":"Avoid dark/muddy design; favor ivory, daylight, warm neutrals and open space.","tags":[]},{"name":"/text-perfect","category":"Posters & Key Art","description":"Treat visible text as mission-critical: correct spelling and clean typography.","expansion":"Treat visible text as mission-critical: correct spelling and clean typography.","tags":[]},{"name":"/logo-exact","category":"Posters & Key Art","description":"Use supplied logo exactly; no redraw, recolour, distortion or retyping.","expansion":"Use supplied logo exactly; no redraw, recolour, distortion or retyping.","tags":[]},{"name":"/instagram-poster","category":"Posters & Key Art","description":"Optimize key art for mobile Instagram viewing.","expansion":"Optimize key art for mobile Instagram viewing.","tags":[]},{"name":"/poster-pro","category":"Posters & Key Art","description":"Hollywood-grade key art/poster composition.","expansion":"Hollywood-grade key art/poster composition.","tags":[]},{"name":"/text-safe","category":"Posters & Key Art","description":"Prioritize correct typography and avoid unnecessary generated text.","expansion":"Prioritize correct typography and avoid unnecessary generated text.","tags":[]},{"name":"/social-image","category":"Posters & Key Art","description":"Optimize framing, subject scale and negative space for social media.","expansion":"Optimize framing, subject scale and negative space for social media.","tags":[]},{"name":"/not-dark","category":"Posters & Key Art","description":"Explicitly reject predominantly dark visual themes.","expansion":"Explicitly reject predominantly dark visual themes.","tags":[]},{"name":"/premium-light","category":"Posters & Key Art","description":"Bright premium palette with ivory, warm white, beige and refined contrast.","expansion":"Bright premium palette with ivory, warm white, beige and refined contrast.","tags":[]},{"name":"/design-new","category":"Posters & Key Art","description":"Use reference only for quality/mood; create a genuinely new composition.","expansion":"Use reference only for quality/mood; create a genuinely new composition.","tags":[]},{"name":"/five-different","category":"Posters & Key Art","description":"Generate five structurally different concepts, not superficial variants.","expansion":"Generate five structurally different concepts, not superficial variants.","tags":[]},{"name":"/one-by-one","category":"Posters & Key Art","description":"Treat each requested creative as a separate deliverable, never a collage.","expansion":"Treat each requested creative as a separate deliverable, never a collage.","tags":[]},{"name":"/brand-clean","category":"Posters & Key Art","description":"Reduce clutter and strengthen hierarchy.","expansion":"Reduce clutter and strengthen hierarchy.","tags":[]},{"name":"/storyboard-gaurev","category":"Storyboards","description":"Create a cinematic storyboard with Gaurev as the locked primary character.","expansion":"Create a cinematic storyboard with Gaurev as the locked primary character.","tags":[]},{"name":"/storyboard-8","category":"Storyboards","description":"Output eight connected storyboard shots.","expansion":"Output eight connected storyboard shots.","tags":[]},{"name":"/storyboard-10","category":"Storyboards","description":"Output ten connected storyboard shots.","expansion":"Output ten connected storyboard shots.","tags":[]},{"name":"/storyboard-image-prompts","category":"Storyboards","description":"Generate a standalone image prompt for every storyboard panel.","expansion":"Generate a standalone image prompt for every storyboard panel.","tags":[]},{"name":"/storyboard-video-prompts","category":"Storyboards","description":"Generate a corresponding AI-video prompt for each storyboard section.","expansion":"Generate a corresponding AI-video prompt for each storyboard section.","tags":[]},{"name":"/hero-frame","category":"Storyboards","description":"Design the strongest iconic frame in the sequence.","expansion":"Design the strongest iconic frame in the sequence.","tags":[]},{"name":"/opening-frame","category":"Storyboards","description":"Design an irresistible opening frame.","expansion":"Design an irresistible opening frame.","tags":[]},{"name":"/end-frame-lock","category":"Storyboards","description":"Define and preserve the exact final video frame.","expansion":"Define and preserve the exact final video frame.","tags":[]},{"name":"/storyboard","category":"Storyboards","description":"Create a visual shot-by-shot storyboard.","expansion":"Create a visual shot-by-shot storyboard.","tags":[]},{"name":"/storyboard-pro","category":"Storyboards","description":"Detailed cinematic storyboard with camera, movement and continuity.","expansion":"Detailed cinematic storyboard with camera, movement and continuity.","tags":[]},{"name":"/shotlist","category":"Storyboards","description":"Output a production-style shot list.","expansion":"Output a production-style shot list.","tags":[]},{"name":"/scene-build","category":"Storyboards","description":"Expand one idea into a richer cinematic scene.","expansion":"Expand one idea into a richer cinematic scene.","tags":[]},{"name":"/seedance-director","category":"Seedance & Video","description":"Apply full Seedance 2.5 scene direction: subject, action, location, progression, camera, continuity, ending and sound.","expansion":"Apply full Seedance 2.5 scene direction: subject, action, location, progression, camera, continuity, ending and sound.","tags":[]},{"name":"/seedance-20","category":"Seedance & Video","description":"Optimize scene structure and pacing for 20 seconds.","expansion":"Optimize scene structure and pacing for 20 seconds.","tags":[]},{"name":"/seedance-15","category":"Seedance & Video","description":"Optimize scene structure and pacing for 15 seconds.","expansion":"Optimize scene structure and pacing for 15 seconds.","tags":[]},{"name":"/seedance-916","category":"Seedance & Video","description":"Optimize composition and action for vertical 9:16.","expansion":"Optimize composition and action for vertical 9:16.","tags":[]},{"name":"/seedance-reference-lock","category":"Seedance & Video","description":"Make visual references override generative creativity.","expansion":"Make visual references override generative creativity.","tags":[]},{"name":"/seedance-continuity","category":"Seedance & Video","description":"Maximum cross-shot character, wardrobe, prop and world consistency.","expansion":"Maximum cross-shot character, wardrobe, prop and world consistency.","tags":[]},{"name":"/seedance-real-motion","category":"Seedance & Video","description":"Remove floaty/rubbery AI motion and enforce believable movement.","expansion":"Remove floaty/rubbery AI motion and enforce believable movement.","tags":[]},{"name":"/seedance-camera-real","category":"Seedance & Video","description":"Use physically achievable camera movement.","expansion":"Use physically achievable camera movement.","tags":[]},{"name":"/seedance-fast-cut","category":"Seedance & Video","description":"Use rapid social-media cuts around every 1–2 seconds.","expansion":"Use rapid social-media cuts around every 1–2 seconds.","tags":[]},{"name":"/seedance-lux","category":"Seedance & Video","description":"Premium luxury/fashion film treatment optimized for Seedance.","expansion":"Premium luxury/fashion film treatment optimized for Seedance.","tags":[]},{"name":"/video-characterlock","category":"Seedance & Video","description":"Maintain the same character throughout every frame and shot.","expansion":"Maintain the same character throughout every frame and shot.","tags":[]},{"name":"/video-face-lock","category":"Seedance & Video","description":"Prevent facial drift during motion, camera changes and expressions.","expansion":"Prevent facial drift during motion, camera changes and expressions.","tags":[]},{"name":"/video-body-lock","category":"Seedance & Video","description":"Prevent physique changes between shots.","expansion":"Prevent physique changes between shots.","tags":[]},{"name":"/video-wardrobe-lock","category":"Seedance & Video","description":"Keep wardrobe consistent throughout a sequence.","expansion":"Keep wardrobe consistent throughout a sequence.","tags":[]},{"name":"/video-product-lock","category":"Seedance & Video","description":"Prevent product shape, label, packaging or colour drift.","expansion":"Prevent product shape, label, packaging or colour drift.","tags":[]},{"name":"/continuity-max","category":"Seedance & Video","description":"Maximum continuity for characters, props, lighting and environment.","expansion":"Maximum continuity for characters, props, lighting and environment.","tags":[]},{"name":"/multi-character-video","category":"Seedance & Video","description":"Maintain independent identities for multiple characters throughout a video.","expansion":"Maintain independent identities for multiple characters throughout a video.","tags":[]},{"name":"/reference-first","category":"Seedance & Video","description":"Give uploaded visual references priority over descriptive text.","expansion":"Give uploaded visual references priority over descriptive text.","tags":[]},{"name":"/seedance","category":"Seedance & Video","description":"Production-ready Seedance video prompt","expansion":"Write a direct-use Seedance prompt with duration, ratio, reference/identity/product locks, scene progression, shot timing, camera movement, lighting, physical motion, transition logic, audio if relevant, final-frame state and explicit failure prevention against drift/morphing.","tags":["smart-expand","studio-manual"]},{"name":"/seedance25","category":"Seedance & Video","description":"Optimize specifically for Seedance 2.5.","expansion":"Optimize specifically for Seedance 2.5.","tags":[]},{"name":"/higgsfield","category":"Seedance & Video","description":"Optimize video prompt for Higgsfield workflows.","expansion":"Optimize video prompt for Higgsfield workflows.","tags":[]},{"name":"/minimax","category":"Seedance & Video","description":"Optimize video prompt for Minimax/Hailuo workflows.","expansion":"Optimize video prompt for Minimax/Hailuo workflows.","tags":[]},{"name":"/video-universal","category":"Seedance & Video","description":"Create a model-neutral AI-video prompt.","expansion":"Create a model-neutral AI-video prompt.","tags":[]},{"name":"/single-shot","category":"Seedance & Video","description":"Design the sequence as one shot only.","expansion":"Design the sequence as one shot only.","tags":[]},{"name":"/continuous-shot","category":"Seedance & Video","description":"Create one uninterrupted cinematic take.","expansion":"Create one uninterrupted cinematic take.","tags":[]},{"name":"/multi-shot","category":"Seedance & Video","description":"Create a structured multi-shot sequence.","expansion":"Create a structured multi-shot sequence.","tags":[]},{"name":"/micro-shots","category":"Seedance & Video","description":"Use short 1–3 second high-impact shots.","expansion":"Use short 1–3 second high-impact shots.","tags":[]},{"name":"/camera-cinematic","category":"Seedance & Video","description":"Use motivated theatrical camera movement.","expansion":"Use motivated theatrical camera movement.","tags":[]},{"name":"/camera-handheld","category":"Seedance & Video","description":"Use natural documentary handheld behavior.","expansion":"Use natural documentary handheld behavior.","tags":[]},{"name":"/camera-gimbal","category":"Seedance & Video","description":"Use smooth stabilized tracking.","expansion":"Use smooth stabilized tracking.","tags":[]},{"name":"/camera-dolly","category":"Seedance & Video","description":"Use physical dolly movement with believable parallax.","expansion":"Use physical dolly movement with believable parallax.","tags":[]},{"name":"/camera-orbit","category":"Seedance & Video","description":"Controlled orbit around the subject.","expansion":"Controlled orbit around the subject.","tags":[]},{"name":"/camera-crane","category":"Seedance & Video","description":"Use crane/jib-style cinematic movement.","expansion":"Use crane/jib-style cinematic movement.","tags":[]},{"name":"/camera-drone","category":"Seedance & Video","description":"Use realistic aerial/drone movement.","expansion":"Use realistic aerial/drone movement.","tags":[]},{"name":"/camera-pov","category":"Seedance & Video","description":"Use first-person or subject-perspective framing.","expansion":"Use first-person or subject-perspective framing.","tags":[]},{"name":"/camera-macro","category":"Seedance & Video","description":"Use extreme close product/detail cinematography.","expansion":"Use extreme close product/detail cinematography.","tags":[]},{"name":"/camera-transition","category":"Seedance & Video","description":"Design intentional motion/object/light transitions.","expansion":"Design intentional motion/object/light transitions.","tags":[]},{"name":"/motion-real","category":"Seedance & Video","description":"Prioritize believable movement, inertia, cloth and interaction.","expansion":"Prioritize believable movement, inertia, cloth and interaction.","tags":[]},{"name":"/motion-subtle","category":"Seedance & Video","description":"Use restrained motion to reduce AI instability.","expansion":"Use restrained motion to reduce AI instability.","tags":[]},{"name":"/performance-natural","category":"Seedance & Video","description":"Natural expressions, eye movement, breathing and body language.","expansion":"Natural expressions, eye movement, breathing and body language.","tags":[]},{"name":"/action-mode","category":"Seedance & Video","description":"High-energy action choreography with physical logic.","expansion":"High-energy action choreography with physical logic.","tags":[]},{"name":"/slow-motion","category":"Seedance & Video","description":"Use cinematic slow motion only where justified.","expansion":"Use cinematic slow motion only where justified.","tags":[]},{"name":"/luxury-film","category":"Seedance & Video","description":"Premium fashion/lifestyle brand-film treatment.","expansion":"Premium fashion/lifestyle brand-film treatment.","tags":[]},{"name":"/product-film","category":"Seedance & Video","description":"Product-focused cinematic advertisement.","expansion":"Product-focused cinematic advertisement.","tags":[]},{"name":"/trailer-mode","category":"Seedance & Video","description":"Build footage like a theatrical trailer.","expansion":"Build footage like a theatrical trailer.","tags":[]},{"name":"/raw-phone-video","category":"UGC & Reels","description":"Make footage look like genuine smartphone video, not advertising cinematography.","expansion":"Make footage look like genuine smartphone video, not advertising cinematography.","tags":[]},{"name":"/home-video","category":"UGC & Reels","description":"Authentic personal-memory footage with imperfect framing and spontaneous reactions.","expansion":"Authentic personal-memory footage with imperfect framing and spontaneous reactions.","tags":[]},{"name":"/roadtrip-ugc","category":"UGC & Reels","description":"Premium-but-authentic road-trip montage style.","expansion":"Premium-but-authentic road-trip montage style.","tags":[]},{"name":"/creator-ugc","category":"UGC & Reels","description":"Natural creator speaking-to-camera ad.","expansion":"Natural creator speaking-to-camera ad.","tags":[]},{"name":"/no-ad-acting","category":"UGC & Reels","description":"Prevent exaggerated commercial performance.","expansion":"Prevent exaggerated commercial performance.","tags":[]},{"name":"/jumpcut","category":"UGC & Reels","description":"Use realistic jump-cut social editing.","expansion":"Use realistic jump-cut social editing.","tags":[]},{"name":"/viral-first-3","category":"UGC & Reels","description":"Optimize the first three seconds to stop scrolling.","expansion":"Optimize the first three seconds to stop scrolling.","tags":[]},{"name":"/reel-20","category":"UGC & Reels","description":"Create a complete 20-second Reel concept.","expansion":"Create a complete 20-second Reel concept.","tags":[]},{"name":"/reel-15","category":"UGC & Reels","description":"Create a complete 15-second Reel concept.","expansion":"Create a complete 15-second Reel concept.","tags":[]},{"name":"/ugc-indian","category":"UGC & Reels","description":"Indian creator UGC","expansion":"Use a believable modern Indian setting and natural Indian English or Hinglish. Keep dialogue conversational rather than translated, gestures understated, phone movement authentic and product interaction real; adapt regional cues only when supplied.","tags":["smart-expand","studio-manual"]},{"name":"/reel","category":"UGC & Reels","description":"Optimize for vertical Instagram/Reels viewing.","expansion":"Optimize for vertical Instagram/Reels viewing.","tags":[]},{"name":"/ugc","category":"Environment","description":"Natural creator-style visual","expansion":"Use authentic smartphone framing, believable setting, natural light, imperfect but intentional composition and real product interaction. Add only the minimum commercial polish needed; avoid staged influencer acting.","tags":["smart-expand","studio-manual"]},{"name":"/ugc-pro","category":"UGC & Reels","description":"High-conversion UGC while preserving believable authenticity.","expansion":"High-conversion UGC while preserving believable authenticity.","tags":[]},{"name":"/vo-indian-female","category":"Voice & Audio","description":"Natural Indian female voice.","expansion":"Natural Indian female voice.","tags":[]},{"name":"/vo-north-indian-female","category":"Voice & Audio","description":"Soft North Indian female voice.","expansion":"Soft North Indian female voice.","tags":[]},{"name":"/vo-north-indian-male","category":"Voice & Audio","description":"Premium North Indian male voice.","expansion":"Premium North Indian male voice.","tags":[]},{"name":"/vo-hinglish-natural","category":"Voice & Audio","description":"Natural conversational Hinglish, never translation-like.","expansion":"Natural conversational Hinglish, never translation-like.","tags":[]},{"name":"/vo-short","category":"Voice & Audio","description":"Keep voiceover comfortably within the video duration.","expansion":"Keep voiceover comfortably within the video duration.","tags":[]},{"name":"/soft-piano","category":"Voice & Audio","description":"Use understated luxury instrumental piano.","expansion":"Use understated luxury instrumental piano.","tags":[]},{"name":"/audio-real","category":"Voice & Audio","description":"Prioritize environmental sound and believable Foley.","expansion":"Prioritize environmental sound and believable Foley.","tags":[]},{"name":"/music-under-vo","category":"Voice & Audio","description":"Keep music secondary to speech.","expansion":"Keep music secondary to speech.","tags":[]},{"name":"/audio-native","category":"Voice & Audio","description":"Plan dialogue, environmental sound and effects as native audio.","expansion":"Plan dialogue, environmental sound and effects as native audio.","tags":[]},{"name":"/voiceover","category":"Voice & Audio","description":"Add structured voiceover direction.","expansion":"Add structured voiceover direction.","tags":[]},{"name":"/vo-indian-english","category":"Voice & Audio","description":"Natural Indian-English voiceover.","expansion":"Natural Indian-English voiceover.","tags":[]},{"name":"/vo-hinglish","category":"Voice & Audio","description":"Conversational Hindi-English voiceover.","expansion":"Conversational Hindi-English voiceover.","tags":[]},{"name":"/music-soft-piano","category":"Voice & Audio","description":"Soft instrumental piano under dialogue/VO.","expansion":"Soft instrumental piano under dialogue/VO.","tags":[]},{"name":"/sound-design-pro","category":"Voice & Audio","description":"Cinematic ambience, impacts, Foley and audio hierarchy.","expansion":"Cinematic ambience, impacts, Foley and audio hierarchy.","tags":[]},{"name":"/product-zero-drift","category":"Products & Jewellery","description":"Absolutely no changes to product appearance.","expansion":"Absolutely no changes to product appearance.","tags":[]},{"name":"/jewellery-zero-drift","category":"Products & Jewellery","description":"Lock stone count/placement, metal, shape, setting, chain and proportions.","expansion":"Lock stone count/placement, metal, shape, setting, chain and proportions.","tags":[]},{"name":"/packaging-zero-drift","category":"Products & Jewellery","description":"Preserve packaging exactly.","expansion":"Preserve packaging exactly.","tags":[]},{"name":"/product-macro","category":"Products & Jewellery","description":"Premium close-up product photography/video.","expansion":"Premium close-up product photography/video.","tags":[]},{"name":"/product-lux","category":"Products & Jewellery","description":"International luxury advertising treatment.","expansion":"International luxury advertising treatment.","tags":[]},{"name":"/product-social","category":"Products & Jewellery","description":"Convert product into a social-first campaign.","expansion":"Convert product into a social-first campaign.","tags":[]},{"name":"/product-hero-frame","category":"Products & Jewellery","description":"Create a premium final product hero/packshot frame.","expansion":"Create a premium final product hero/packshot frame.","tags":[]},{"name":"/product-ugc","category":"Products & Jewellery","description":"Blend strict product fidelity with authentic UGC.","expansion":"Blend strict product fidelity with authentic UGC.","tags":[]},{"name":"/product-lock","category":"Products & Jewellery","description":"Preserve product shape, packaging, logo, colours and distinguishing details.","expansion":"Preserve product shape, packaging, logo, colours and distinguishing details.","tags":[]},{"name":"/product-hero","category":"Products & Jewellery","description":"Create a premium hero advertisement around the product.","expansion":"Create a premium hero advertisement around the product.","tags":[]},{"name":"/caption-full","category":"Social Content","description":"Return caption, CTA, hashtags and searchable keywords.","expansion":"Return caption, CTA, hashtags and searchable keywords.","tags":[]},{"name":"/caption-premium","category":"Social Content","description":"Write sophisticated, non-generic brand copy.","expansion":"Write sophisticated, non-generic brand copy.","tags":[]},{"name":"/caption-reach","category":"Social Content","description":"Prioritize discoverability and engagement without spammy language.","expansion":"Prioritize discoverability and engagement without spammy language.","tags":[]},{"name":"/carousel-7","category":"Social Content","description":"Create a seven-slide Instagram carousel.","expansion":"Create a seven-slide Instagram carousel.","tags":[]},{"name":"/carousel-9","category":"Social Content","description":"Create a nine-slide carousel.","expansion":"Create a nine-slide carousel.","tags":[]},{"name":"/grid-9","category":"Social Content","description":"Create a connected 3×3 Instagram grid campaign.","expansion":"Create a connected 3×3 Instagram grid campaign.","tags":[]},{"name":"/launch-grid","category":"Social Content","description":"Develop a visual launch sequence for a new brand/product.","expansion":"Develop a visual launch sequence for a new brand/product.","tags":[]},{"name":"/opening-soon","category":"Social Content","description":"Create an opening-soon campaign system.","expansion":"Create an opening-soon campaign system.","tags":[]},{"name":"/rebrand-announcement","category":"Social Content","description":"Create content explaining a business now operates under a new name.","expansion":"Create content explaining a business now operates under a new name.","tags":[]},{"name":"/offer-creative","category":"Social Content","description":"Create premium promotional/offer creative.","expansion":"Create premium promotional/offer creative.","tags":[]},{"name":"/caption","category":"Social Content","description":"Generate a social caption.","expansion":"Generate a social caption.","tags":[]},{"name":"/hashtags","category":"Social Content","description":"Generate relevant hashtags.","expansion":"Generate relevant hashtags.","tags":[]},{"name":"/keywords","category":"Social Content","description":"Generate searchable keywords.","expansion":"Generate searchable keywords.","tags":[]},{"name":"/full-social","category":"Social Content","description":"Generate caption, CTA, hashtags and keywords.","expansion":"Generate caption, CTA, hashtags and keywords.","tags":[]},{"name":"/social-optimize","category":"Social Content","description":"Adapt creative for social attention and format.","expansion":"Adapt creative for social attention and format.","tags":[]},{"name":"/brand-optimize","category":"Social Content","description":"Align output to brand identity, audience and commercial objective.","expansion":"Align output to brand identity, audience and commercial objective.","tags":[]},{"name":"/prompt-deep-analyze","category":"Prompt Engineering","description":"Perform expert diagnosis before rewriting.","expansion":"Perform expert diagnosis before rewriting.","tags":[]},{"name":"/prompt-rebuild","category":"Prompt Engineering","description":"Reconstruct prompt architecture from scratch while preserving intent.","expansion":"Reconstruct prompt architecture from scratch while preserving intent.","tags":[]},{"name":"/prompt-realism","category":"Prompt Engineering","description":"Optimize prompt specifically for photographic realism.","expansion":"Optimize prompt specifically for photographic realism.","tags":[]},{"name":"/prompt-seedance","category":"Prompt Engineering","description":"Optimize specifically for Seedance 2.5.","expansion":"Optimize specifically for Seedance 2.5.","tags":[]},{"name":"/prompt-image","category":"Prompt Engineering","description":"Optimize specifically for still-image generation.","expansion":"Optimize specifically for still-image generation.","tags":[]},{"name":"/prompt-reference","category":"Prompt Engineering","description":"Strengthen reference-image adherence.","expansion":"Strengthen reference-image adherence.","tags":[]},{"name":"/prompt-locks","category":"Prompt Engineering","description":"Automatically add critical identity/product/continuity locks.","expansion":"Automatically add critical identity/product/continuity locks.","tags":[]},{"name":"/prompt-negative","category":"Prompt Engineering","description":"Add intelligent failure prevention, not a generic negative dump.","expansion":"Add intelligent failure prevention, not a generic negative dump.","tags":[]},{"name":"/prompt-under-7500","category":"Prompt Engineering","description":"Keep final prompt under 7,500 characters while preserving critical rules.","expansion":"Keep final prompt under 7,500 characters while preserving critical rules.","tags":[]},{"name":"/prompt-copy","category":"Prompt Engineering","description":"Return only the finalized copy-ready prompt.","expansion":"Return only the finalized copy-ready prompt.","tags":[]},{"name":"/prompt","category":"Prompt Engineering","description":"Turn an idea into a usable AI prompt.","expansion":"Turn an idea into a usable AI prompt.","tags":[]},{"name":"/prompt-pro","category":"Prompt Engineering","description":"Create a professional structured prompt with strong constraints.","expansion":"Create a professional structured prompt with strong constraints.","tags":[]},{"name":"/prompt-architect","category":"Prompt Engineering","description":"Apply objective, context, constraints, structure, edge cases and output specification.","expansion":"Apply objective, context, constraints, structure, edge cases and output specification.","tags":[]},{"name":"/upgrade-prompt","category":"Prompt Engineering","description":"Improve an existing prompt without changing its core idea.","expansion":"Improve an existing prompt without changing its core idea.","tags":[]},{"name":"/rewrite-prompt","category":"Prompt Engineering","description":"Rebuild a weak prompt into a cleaner, stronger version.","expansion":"Rebuild a weak prompt into a cleaner, stronger version.","tags":[]},{"name":"/10x","category":"Prompt Engineering","description":"Aggressively increase quality, specificity and execution power.","expansion":"Aggressively increase quality, specificity and execution power.","tags":[]},{"name":"/100x","category":"Prompt Engineering","description":"Deep rebuild for high-value prompts.","expansion":"Deep rebuild for high-value prompts.","tags":[]},{"name":"/meta-prompt","category":"Prompt Engineering","description":"Create a reusable prompt that generates prompts/workflows.","expansion":"Create a reusable prompt that generates prompts/workflows.","tags":[]},{"name":"/analyze-prompt","category":"Prompt Engineering","description":"Explain strengths, weaknesses, risks and improvements.","expansion":"Explain strengths, weaknesses, risks and improvements.","tags":[]},{"name":"/score-prompt","category":"Prompt Engineering","description":"Score clarity, specificity, control, creativity and reliability.","expansion":"Score clarity, specificity, control, creativity and reliability.","tags":[]},{"name":"/debug-prompt","category":"Prompt Engineering","description":"Find why a prompt produces unwanted results.","expansion":"Find why a prompt produces unwanted results.","tags":[]},{"name":"/prompt-audit","category":"Prompt Engineering","description":"Perform consistency and contradiction checks.","expansion":"Perform consistency and contradiction checks.","tags":[]},{"name":"/remove-conflicts","category":"Prompt Engineering","description":"Resolve competing or contradictory instructions.","expansion":"Resolve competing or contradictory instructions.","tags":[]},{"name":"/remove-bloat","category":"Prompt Engineering","description":"Eliminate redundant wording and repeated rules.","expansion":"Eliminate redundant wording and repeated rules.","tags":[]},{"name":"/find-gaps","category":"Prompt Engineering","description":"Identify missing instructions that materially improve output.","expansion":"Identify missing instructions that materially improve output.","tags":[]},{"name":"/hyper-detail","category":"Prompt Engineering","description":"Add high-value specificity where it improves generation.","expansion":"Add high-value specificity where it improves generation.","tags":[]},{"name":"/precision","category":"Prompt Engineering","description":"Reduce ambiguity and make requirements explicit.","expansion":"Reduce ambiguity and make requirements explicit.","tags":[]},{"name":"/constraint-lock","category":"Prompt Engineering","description":"Turn critical requirements into non-negotiable constraints.","expansion":"Turn critical requirements into non-negotiable constraints.","tags":[]},{"name":"/negative-lock","category":"Prompt Engineering","description":"Add explicit failure-prevention rules.","expansion":"Add explicit failure-prevention rules.","tags":[]},{"name":"/priority-stack","category":"Prompt Engineering","description":"Rank instructions by importance.","expansion":"Rank instructions by importance.","tags":[]},{"name":"/reference-lock","category":"Prompt Engineering","description":"Make attached references authoritative.","expansion":"Make attached references authoritative.","tags":[]},{"name":"/consistency-lock","category":"Prompt Engineering","description":"Add persistent character/product/terminology continuity rules.","expansion":"Add persistent character/product/terminology continuity rules.","tags":[]},{"name":"/simplify","category":"Prompt Engineering","description":"Reduce complexity without losing required instructions.","expansion":"Reduce complexity without losing required instructions.","tags":[]},{"name":"/compact","category":"Prompt Engineering","description":"Produce a shorter token-efficient prompt.","expansion":"Produce a shorter token-efficient prompt.","tags":[]},{"name":"/ultra-compact","category":"Prompt Engineering","description":"Create the shortest functional version possible.","expansion":"Create the shortest functional version possible.","tags":[]},{"name":"/expand","category":"Prompt Engineering","description":"Turn a simple concept into a comprehensive production prompt.","expansion":"Turn a simple concept into a comprehensive production prompt.","tags":[]},{"name":"/structured","category":"Prompt Engineering","description":"Organize prompt into logical sections.","expansion":"Organize prompt into logical sections.","tags":[]},{"name":"/markdown-prompt","category":"Prompt Engineering","description":"Format the final prompt cleanly in Markdown.","expansion":"Format the final prompt cleanly in Markdown.","tags":[]},{"name":"/copy-ready","category":"Prompt Engineering","description":"Return an immediately reusable prompt with no unnecessary commentary.","expansion":"Return an immediately reusable prompt with no unnecessary commentary.","tags":[]},{"name":"/template","category":"Prompt Engineering","description":"Turn a successful prompt into a reusable variable-driven template.","expansion":"Turn a successful prompt into a reusable variable-driven template.","tags":[]},{"name":"/model-optimize","category":"Prompt Engineering","description":"Adapt prompt structure for the target model.","expansion":"Adapt prompt structure for the target model.","tags":[]},{"name":"/image-optimize","category":"Prompt Engineering","description":"Optimize/generalize for still-image generation.","expansion":"Optimize/generalize for still-image generation.","tags":[]},{"name":"/video-optimize","category":"Prompt Engineering","description":"Optimize/generalize for AI video generation.","expansion":"Optimize/generalize for AI video generation.","tags":[]},{"name":"/final-pass","category":"Prompt Engineering","description":"Perform final polish before execution.","expansion":"Perform final polish before execution.","tags":[]},{"name":"/execute","category":"Prompt Engineering","description":"Stop revising and execute the finalized prompt.","expansion":"Stop revising and execute the finalized prompt.","tags":[]},{"name":"/ideas-10-cinematic","category":"Ideas","description":"Generate ten genuinely distinct cinematic concepts.","expansion":"Generate ten genuinely distinct cinematic concepts.","tags":[]},{"name":"/ideas-10-luxury","category":"Ideas","description":"Generate ten premium luxury campaign directions.","expansion":"Generate ten premium luxury campaign directions.","tags":[]},{"name":"/ideas-10-comedy","category":"Ideas","description":"Generate ten short-form comedy concepts.","expansion":"Generate ten short-form comedy concepts.","tags":[]},{"name":"/ideas-10-supercar","category":"Ideas","description":"Generate ten completely different supercar scenarios.","expansion":"Generate ten completely different supercar scenarios.","tags":[]},{"name":"/ideas-10-airforce","category":"Ideas","description":"Generate ten advanced fighter-jet/aerospace scenarios.","expansion":"Generate ten advanced fighter-jet/aerospace scenarios.","tags":[]},{"name":"/ideas-10-fashion","category":"Ideas","description":"Generate ten fashion editorial scenes.","expansion":"Generate ten fashion editorial scenes.","tags":[]},{"name":"/ideas-10-ugc","category":"Ideas","description":"Generate ten social-first UGC concepts.","expansion":"Generate ten social-first UGC concepts.","tags":[]},{"name":"/ideas-no-generic","category":"Ideas","description":"Reject obvious concepts and actively search for unusual approaches.","expansion":"Reject obvious concepts and actively search for unusual approaches.","tags":[]},{"name":"/best-3","category":"Ideas","description":"Identify the three strongest ideas from a larger set.","expansion":"Identify the three strongest ideas from a larger set.","tags":[]},{"name":"/pick-one","category":"Ideas","description":"Choose the strongest direction yourself instead of asking the user.","expansion":"Choose the strongest direction yourself instead of asking the user.","tags":[]},{"name":"/3-ideas","category":"Ideas","description":"Generate three strong distinct approaches.","expansion":"Generate three strong distinct approaches.","tags":[]},{"name":"/5-ideas","category":"Ideas","description":"Generate five strong distinct approaches.","expansion":"Generate five strong distinct approaches.","tags":[]},{"name":"/10-ideas","category":"Ideas","description":"Generate ten high-quality concepts.","expansion":"Generate ten high-quality concepts.","tags":[]},{"name":"/20-ideas","category":"Ideas","description":"Generate twenty diverse concepts.","expansion":"Generate twenty diverse concepts.","tags":[]},{"name":"/wildcard","category":"Ideas","description":"Introduce one unexpected creative direction.","expansion":"Introduce one unexpected creative direction.","tags":[]},{"name":"/unique","category":"Ideas","description":"Actively avoid obvious and frequently used concepts.","expansion":"Actively avoid obvious and frequently used concepts.","tags":[]},{"name":"/viral-angle","category":"Ideas","description":"Prioritize curiosity, emotion, attention and shareability.","expansion":"Prioritize curiosity, emotion, attention and shareability.","tags":[]},{"name":"/premium-angle","category":"Ideas","description":"Push the concept toward luxury and high perceived production value.","expansion":"Push the concept toward luxury and high perceived production value.","tags":[]},{"name":"/rank","category":"Ideas","description":"Rank generated ideas from strongest to weakest.","expansion":"Rank generated ideas from strongest to weakest.","tags":[]},{"name":"/best-option","category":"Ideas","description":"Select and develop the strongest option.","expansion":"Select and develop the strongest option.","tags":[]},{"name":"/combine-best","category":"Ideas","description":"Merge the best aspects of several concepts.","expansion":"Merge the best aspects of several concepts.","tags":[]},{"name":"/variation","category":"Creative Studio","description":"Genuinely fresh variation, not a recolor","expansion":"Preserve the core product/brief but change at least six major creative decisions: layout/grid, product scale/placement, camera/crop, background system, graphic language, typography, color blocking, depth, props or story. Reject recolor-only or minor-prop variations.","tags":["smart-expand","studio-manual"]},{"name":"/v2","category":"Ideas","description":"Create a meaningfully improved second version.","expansion":"Create a meaningfully improved second version.","tags":[]},{"name":"/awwwards","category":"Website","description":"Push web direction toward award-level interactive digital experiences.","expansion":"Push web direction toward award-level interactive digital experiences.","tags":[]},{"name":"/website-redesign","category":"Website","description":"Rethink structure, UX, hierarchy and visual language—not just colours.","expansion":"Rethink structure, UX, hierarchy and visual language—not just colours.","tags":[]},{"name":"/website-premium","category":"Website","description":"Upgrade site into a polished international-brand experience.","expansion":"Upgrade site into a polished international-brand experience.","tags":[]},{"name":"/hero-wow","category":"Website","description":"Create a high-impact homepage hero.","expansion":"Create a high-impact homepage hero.","tags":[]},{"name":"/site-motion","category":"Website","description":"Design meaningful scroll interactions, transitions and microinteractions.","expansion":"Design meaningful scroll interactions, transitions and microinteractions.","tags":[]},{"name":"/site-copy","category":"Website","description":"Create premium website messaging.","expansion":"Create premium website messaging.","tags":[]},{"name":"/site-mobile-first","category":"Website","description":"Consider mobile experience from the beginning.","expansion":"Consider mobile experience from the beginning.","tags":[]},{"name":"/site-conversion","category":"Website","description":"Optimize hierarchy and CTAs for business outcomes.","expansion":"Optimize hierarchy and CTAs for business outcomes.","tags":[]},{"name":"/website","category":"Website","description":"Create website structure, concept or copy.","expansion":"Create website structure, concept or copy.","tags":[]},{"name":"/landing-page","category":"Website","description":"Create a landing-page concept.","expansion":"Create a landing-page concept.","tags":[]},{"name":"/hero-section","category":"Website","description":"Create a hero-section concept.","expansion":"Create a hero-section concept.","tags":[]},{"name":"/awwwards-mode","category":"Website","description":"Push toward premium award-level digital design thinking.","expansion":"Push toward premium award-level digital design thinking.","tags":[]},{"name":"/brand-copy","category":"Website","description":"Generate premium website or brand copy.","expansion":"Generate premium website or brand copy.","tags":[]},{"name":"/ar-916","category":"Parameters","description":"Set aspect ratio to vertical 9:16.","expansion":"Set aspect ratio to vertical 9:16.","tags":[]},{"name":"/ar-45","category":"Parameters","description":"Set aspect ratio to vertical 4:5.","expansion":"Set aspect ratio to vertical 4:5.","tags":[]},{"name":"/ar-11","category":"Parameters","description":"Set aspect ratio to square 1:1.","expansion":"Set aspect ratio to square 1:1.","tags":[]},{"name":"/ar-169","category":"Parameters","description":"Set aspect ratio to horizontal 16:9.","expansion":"Set aspect ratio to horizontal 16:9.","tags":[]},{"name":"/ar-219","category":"Parameters","description":"Set aspect ratio to cinematic 21:9.","expansion":"Set aspect ratio to cinematic 21:9.","tags":[]},{"name":"/duration-10","category":"Parameters","description":"Set video duration to 10 seconds.","expansion":"Set video duration to 10 seconds.","tags":[]},{"name":"/duration-15","category":"Parameters","description":"Set video duration to 15 seconds.","expansion":"Set video duration to 15 seconds.","tags":[]},{"name":"/duration-20","category":"Parameters","description":"Set video duration to 20 seconds.","expansion":"Set video duration to 20 seconds.","tags":[]},{"name":"/duration-30","category":"Parameters","description":"Set video duration to 30 seconds.","expansion":"Set video duration to 30 seconds.","tags":[]},{"name":"/shots-3","category":"Parameters","description":"Use 3 shots.","expansion":"Use 3 shots.","tags":[]},{"name":"/shots-5","category":"Parameters","description":"Use 5 shots.","expansion":"Use 5 shots.","tags":[]},{"name":"/shots-8","category":"Parameters","description":"Use 8 shots.","expansion":"Use 8 shots.","tags":[]},{"name":"/shots-10","category":"Parameters","description":"Use 10 shots.","expansion":"Use 10 shots.","tags":[]},{"name":"/vertical","category":"Parameters","description":"Use vertical orientation.","expansion":"Use vertical orientation.","tags":[]},{"name":"/horizontal","category":"Parameters","description":"Use horizontal orientation.","expansion":"Use horizontal orientation.","tags":[]},{"name":"/quality-max","category":"Parameters","description":"Prioritize maximum output quality.","expansion":"Prioritize maximum output quality.","tags":[]},{"name":"/creative","category":"Creative Studio","description":"Fresh standalone social creative","expansion":"Choose a fresh brand-fit campaign direction automatically. Deliver a finished publish-ready designed creative, not a plain photograph. Rotate layout, product scale, camera/crop, background system, graphic language, typography, depth and visual story; avoid recent formulas and preserve supplied assets exactly.","tags":["studio-manual","smart-expand"]},{"name":"/surprise","category":"Creative Studio","description":"Unexpected but brand-valid art direction","expansion":"Choose the strongest unexpected commercial direction yourself without asking for options. It must remain on-brand, production-usable, fact-safe and materially different from recent work; surprise through concept and art direction, never through random AI weirdness.","tags":["studio-manual","smart-expand"]},{"name":"/trend","category":"Creative Studio","description":"Current trend-led creative direction","expansion":"Use current high-end visual/design language only where it improves the brief. Synthesize an original brand-fit result rather than copying a trend/reference; keep hierarchy, product fidelity, typography and commercial clarity stronger than the trend itself.","tags":["studio-manual","smart-expand"]},{"name":"/redesign","category":"Creative Studio","description":"Rebuild an existing design with new art direction","expansion":"Treat the supplied design as content/reference, not a layout template. Rebuild composition, hierarchy, typography, graphic system, image treatment and art direction from first principles while preserving mandatory copy, facts, logos and product identity.","tags":["studio-manual","smart-expand"]},{"name":"/artdirect","category":"Creative Studio","description":"Complete art-direction system before execution","expansion":"Define one decisive campaign idea and visual metaphor, then specify layout logic, color roles, typography behavior, imagery/CGI style, camera, lighting, materials, graphic devices, depth, motion cues and a do-not-use list. Make the direction executable rather than mood-only.","tags":["studio-manual","smart-expand"]},{"name":"/productad","category":"Products & Jewellery","description":"Professional performance-focused product advertisement","expansion":"Create a campaign-quality product ad with one clear idea, unmistakable hero, strong hierarchy and visible graphic-design system. Preserve packaging, label, logo, shape, cap, colors and proportions exactly; use supplied claims only and avoid generic packshot layouts.","tags":["studio-manual","smart-expand"]},{"name":"/producthero","category":"Products & Jewellery","description":"Premium hero product composition","expansion":"Make the exact product the dominant focal point through scale, crop, depth, lighting and controlled negative space. Finish as a designed advertisement with typography/graphics, not a catalogue packshot; keep label readability and geometry intact.","tags":["studio-manual","smart-expand"]},{"name":"/cgi","category":"Products & Jewellery","description":"High-end CGI social creative","expansion":"Build a physically believable 3D world around the exact product with premium materials, reflections, shadows and scale. Add a deliberate social-ad graphic system; avoid default pedestal/smoke/random-splash formulas and any deformation of packaging.","tags":["studio-manual","smart-expand"]},{"name":"/studio","category":"Products & Jewellery","description":"Premium commercial studio product direction","expansion":"Use controlled commercial lighting, realistic materials, crisp edge separation and intentional camera/lens logic. If the deliverable is social, convert the studio plate into a finished designed post using hierarchy and graphic devices rather than stopping at photography.","tags":["studio-manual","smart-expand"]},{"name":"/macro","category":"Products & Jewellery","description":"Extreme macro product/material storytelling","expansion":"Use extreme close detail to reveal texture, material, ingredient or product craft while keeping the product recognizable. Pair macro detail with a clear campaign story, useful hierarchy and a hero/brand anchor; never fabricate unseen detail.","tags":["studio-manual","smart-expand"]},{"name":"/floating","category":"Products & Jewellery","description":"Dynamic floating product composition","expansion":"Create believable spatial choreography with controlled depth, contact logic, cast shadows and consistent gravity. Every floating element must support the brand/product story; avoid random object scatter, impossible balance and weightless AI motion.","tags":["studio-manual","smart-expand"]},{"name":"/splash","category":"Products & Jewellery","description":"Liquid, powder, energy or ingredient splash scene","expansion":"Use splash/motion only when category-appropriate and story-relevant. Simulate believable viscosity, particle behavior, lighting and occlusion; make the splash a compositional device, not decoration, and keep the product/label clean and unchanged.","tags":["studio-manual","smart-expand"]},{"name":"/ingredients","category":"Products & Jewellery","description":"Ingredient-led product storytelling","expansion":"Build the concept only from supplied/verified ingredients or flavour cues. Use them as an integrated visual language—scale, crop, pattern, motion, typography or callouts—not random props; never invent ingredients or benefits.","tags":["studio-manual","smart-expand"]},{"name":"/benefits","category":"Products & Jewellery","description":"Factual benefit-led visual communication","expansion":"Translate only supplied/verified benefits into a clean hierarchy using chips, icons, diagrams, proof moments or concise copy. Prioritize one primary benefit and supporting facts; never invent claims, certifications, performance promises or medical outcomes.","tags":["studio-manual","smart-expand"]},{"name":"/features","category":"Products & Jewellery","description":"Feature-led product communication","expansion":"Communicate supplied features with strong hierarchy and visual proof where possible. Keep copy concise, separate primary from secondary features, preserve packaging, and avoid dense feature-dump layouts or unsupported technical language.","tags":["studio-manual","smart-expand"]},{"name":"/exploded","category":"Products & Jewellery","description":"Premium exploded-component visualization","expansion":"Create a clean exploded assembly with accurate spacing, alignment, component order and technical hierarchy. Show only known/supplied components, retain exterior product identity and add labels/callouts only when verified; never invent hidden parts.","tags":["studio-manual","smart-expand"]},{"name":"/cutaway","category":"Products & Jewellery","description":"Clean internal cutaway visualization","expansion":"Reveal internal structure only from known/supplied information. Keep the exterior geometry accurate, sectioning clear and materials believable; use restrained technical labeling and never fabricate internal construction.","tags":["studio-manual","smart-expand"]},{"name":"/xray","category":"Products & Jewellery","description":"Technical X-ray/internal visualization","expansion":"Create a premium X-ray/transparent technical view from known information only. Maintain accurate exterior geometry, readable internal relationships and disciplined information design; no invented components or sci-fi decoration unless requested.","tags":["studio-manual","smart-expand"]},{"name":"/comparison","category":"Products & Jewellery","description":"Factual side-by-side product comparison","expansion":"Compare only explicitly requested products using supplied/verified criteria. Use aligned columns, matched scale, neutral hierarchy and factual labels; do not imply unsupported superiority, invent scores or hide disadvantages.","tags":["studio-manual","smart-expand"]},{"name":"/versus","category":"Products & Jewellery","description":"Bold head-to-head campaign visual","expansion":"Create a strong VS composition with clear opposing zones and controlled contrast. Preserve both products accurately, communicate only factual differences and avoid fabricated claims, fake rankings or misleading scale.","tags":["studio-manual","smart-expand"]},{"name":"/launch","category":"Social Content","description":"New product or brand launch campaign","expansion":"Build a launch idea around a strong reveal/hook, brand-native visual system and unmistakable hero. Define what is revealed when, create campaign consistency across assets and avoid generic 'coming soon' clichés unless requested.","tags":["studio-manual","smart-expand"]},{"name":"/comingsoon","category":"Social Content","description":"Premium coming-soon teaser","expansion":"Build anticipation by revealing only the minimum useful information through crop, silhouette, texture, type, material or partial product cues. Keep the teaser specific to the brand and message; avoid automatic dark-mystery styling.","tags":["studio-manual","smart-expand"]},{"name":"/teaser","category":"Social Content","description":"Curiosity-first campaign creative","expansion":"Lead with one curiosity gap and controlled concealment while keeping the message understandable. Use selective information, crop, silhouette, typography or material detail; preserve brand recognition and provide a clear next-step/expectation.","tags":["studio-manual","smart-expand"]},{"name":"/offer","category":"Social Content","description":"Premium promotional offer creative","expansion":"Make the exact supplied offer, price, discount, date and terms immediately clear without cheap sale-ad clutter. Use premium hierarchy, one dominant offer message, concise support copy and only verified terms; never invent discounts or urgency.","tags":["studio-manual","smart-expand"]},{"name":"/bundle","category":"Social Content","description":"Cohesive multi-product bundle creative","expansion":"Multi-product composition is explicitly allowed. Present the requested products as one coherent offer with balanced scale, accurate packaging and clear bundle hierarchy; show only supplied pricing/terms and avoid merging product identities.","tags":["studio-manual","smart-expand"]},{"name":"/seasonal","category":"Social Content","description":"Season-led brand campaign","expansion":"Use the season as a strategic art-direction input—light, materials, behavior, palette, context and typography—not a stock decoration pack. Keep the campaign native to the brand and avoid generic seasonal clip-art.","tags":["studio-manual","smart-expand"]},{"name":"/festival","category":"Social Content","description":"Festival campaign adapted to the brand","expansion":"Translate the festival into the brand's own visual language with culturally accurate details. Use symbols/patterns only when relevant, keep the core product/message dominant and avoid generic festive wallpaper or invented cultural claims.","tags":["studio-manual","smart-expand"]},{"name":"/fakeooh","category":"Print & OOH","description":"Believable fake-OOH oversized product illusion","expansion":"Integrate an oversized/impossible-scale exact product into a plausible real-world setting. Match perspective, lighting, reflections, shadows, environmental interaction and camera viewpoint; add campaign framing/headline and avoid obvious compositing errors.","tags":["studio-manual","smart-expand"]},{"name":"/billboard","category":"Print & OOH","description":"Outdoor billboard campaign layout","expansion":"Design for distance readability: one idea, one dominant visual, minimal copy, strong contrast and safe margins. Respect exact billboard dimensions/ratio, preserve logos/products and avoid small social-media-style details that fail outdoors.","tags":["studio-manual","smart-expand"]},{"name":"/premium","category":"Visual Styles","description":"Premium commercial","expansion":"Use polished commercial art direction, precise spacing, confident hierarchy, controlled materials and excellent craft. Premium must be brand-fit and can be bright, playful or technical; do not default to black/gold luxury.","tags":["studio-manual","smart-expand"]},{"name":"/luxury","category":"Visual Styles","description":"Editorial luxury","expansion":"Use restrained high-end editorial composition, artful negative space, sophisticated materials and typography. Avoid fake-gold clutter, generic perfume clichés, excessive glow and empty 'expensive' styling.","tags":["studio-manual","smart-expand"]},{"name":"/minimal","category":"Visual Styles","description":"Disciplined minimal design","expansion":"Reduce to the essential message using a rigorous grid, negative space and one or two strong gestures. Minimal must still show intentional art direction, hierarchy and brand identity—not emptiness.","tags":["studio-manual","smart-expand"]},{"name":"/bold","category":"Visual Styles","description":"Bold assertive campaign","expansion":"Use decisive scale, typography, contrast, crop and composition while preserving readability. Channel energy through structure, not clutter; keep one dominant hierarchy and brand-appropriate color.","tags":["studio-manual","smart-expand"]},{"name":"/cinematic","category":"Visual Styles","description":"Cinematic commercial art direction","expansion":"Use motivated film lighting, depth, lens perspective, atmosphere and narrative framing. Keep product/subject readable and brand-specific; do not turn every brief into a dark movie still.","tags":["studio-manual","smart-expand"]},{"name":"/editorial","category":"Visual Styles","description":"Magazine/editorial advertising","expansion":"Use editorial grid, crop, type hierarchy, labels, captions, frames and image sequencing with publication-level spacing. Keep it commercially clear and brand-specific, not a generic fashion template.","tags":["studio-manual","smart-expand"]},{"name":"/brutalist","category":"Visual Styles","description":"Contemporary neo-brutalist system","expansion":"Use oversized type, hard blocks, rules, raw contrast, deliberate tension and asymmetric structure. Maintain legibility, brand intent and a controlled grid so the result feels designed rather than chaotic.","tags":["studio-manual","smart-expand"]},{"name":"/surreal","category":"Visual Styles","description":"Reality-bending commercial concept","expansion":"Create one clear visual metaphor that bends reality but follows internal logic. Preserve exact product/identity, believable light and perspective, and avoid random AI weirdness, melting geometry or unrelated surreal props.","tags":["studio-manual","smart-expand"]},{"name":"/tactile","category":"Visual Styles","description":"Material-rich tactile treatment","expansion":"Choose one or two tactile materials—paper, fabric, clay, foam, metal, ice or brand-relevant surfaces—and make texture, shadow and physical contact central. Avoid piling unrelated materials together.","tags":["studio-manual","smart-expand"]},{"name":"/glass","category":"Visual Styles","description":"Glass/chrome reflective system","expansion":"Use glass, chrome and translucency as a deliberate optical/material language with plausible refraction, reflection and highlights. Keep product edges readable and avoid repetitive mirror-room clichés.","tags":["studio-manual","smart-expand"]},{"name":"/organic","category":"Visual Styles","description":"Organic natural-form system","expansion":"Use brand-relevant natural shapes, textures and movement with believable material behavior. Organic does not automatically mean beige wellness; retain category energy and campaign structure.","tags":["studio-manual","smart-expand"]},{"name":"/retro","category":"Visual Styles","description":"Modern retro-tech system","expansion":"Blend selective period cues—type, geometry, halftone, interface or palette—with contemporary polish and brand logic. Avoid costume-like nostalgia or mixing incompatible decades.","tags":["studio-manual","smart-expand"]},{"name":"/typeled","category":"Visual Styles","description":"Typography-led campaign","expansion":"Make typography a primary visual object through scale, crop, repetition, masks, extrusion, perspective or product integration. Keep wording short, spelling exact and reading order unmistakable.","tags":["studio-manual","smart-expand"]},{"name":"/monochrome","category":"Visual Styles","description":"Monochrome campaign system","expansion":"Use one dominant hue or near-monochrome palette; create contrast through light, tone, texture, scale and typography. Maintain product identity and enough separation for accessibility/readability.","tags":["studio-manual","smart-expand"]},{"name":"/bright","category":"Visual Styles","description":"Bright high-energy commercial","expansion":"Use crisp bright lighting, clean backgrounds, vivid brand color, energetic scale and polished commercial finish. Avoid flat white catalogue emptiness; retain depth, graphics and a strong focal idea.","tags":["studio-manual","smart-expand"]},{"name":"/dark","category":"Visual Styles","description":"Controlled dark-premium direction","expansion":"Use selective highlights, deep tones, texture and high contrast while keeping the product/subject readable. Avoid muddy black-on-black, crushed labels and automatic cyberpunk/neon treatment.","tags":["studio-manual","smart-expand"]},{"name":"/white","category":"Visual Styles","description":"White premium editorial/ecommerce","expansion":"Use bright white/near-white space, disciplined shadows, crisp edge separation, refined typography and structured hierarchy. Avoid sterile catalogue emptiness and preserve dimensionality.","tags":["studio-manual","smart-expand"]},{"name":"/gym","category":"Environment","description":"Authentic premium gym environment","expansion":"Use a credible performance setting only when category-appropriate. Integrate equipment, sweat, motion, surfaces and motivated lighting purposefully; avoid stock dumbbells as decoration and keep product/subject hierarchy clear.","tags":["studio-manual","smart-expand"]},{"name":"/nature","category":"Environment","description":"Specific natural-environment concept","expansion":"Choose a specific phenomenon/location/material ecosystem that supports the product story. Use realistic light, scale and environmental interaction; avoid generic leaves, rocks and 'wellness' props.","tags":["studio-manual","smart-expand"]},{"name":"/industrial","category":"Environment","description":"Industrial/engineered environment","expansion":"Use steel, concrete, machinery, fabrication or factory systems to communicate strength/process where relevant. Preserve believable perspective, scale, safety logic and lighting; avoid random sci-fi machinery.","tags":["studio-manual","smart-expand"]},{"name":"/architecture","category":"Environment","description":"Architectural-scale campaign world","expansion":"Use architecture, spatial design and monumental scale as the concept. Maintain realistic perspective, human/product scale and structural plausibility while ensuring the hero remains dominant.","tags":["studio-manual","smart-expand"]},{"name":"/tech","category":"Environment","description":"Advanced technology environment","expansion":"Use clean advanced-tech visual language, interfaces, data/system motifs or engineered spaces appropriate to the brand. Avoid random neon cyberpunk, fake UI clutter and unreadable futuristic text.","tags":["studio-manual","smart-expand"]},{"name":"/lifestyle","category":"Environment","description":"Believable real-world lifestyle campaign","expansion":"Place product/subject in a genuine moment with authentic human behavior, props and location logic. For social output, add intentional hierarchy/graphics so it remains a designed campaign rather than a lifestyle photo.","tags":["studio-manual","smart-expand"]},{"name":"/social","category":"Social Content","description":"Instagram-ready standalone social creative","expansion":"Create one finished 1080x1350 4:5 feed creative by default unless platform/brief overrides. Use obvious hierarchy and a graphic-design system; if multiple posts are requested, output each as a separate standalone asset.","tags":["studio-manual","smart-expand"]},{"name":"/story","category":"Social Content","description":"Instagram Story 9:16 creative","expansion":"Create a 9:16 mobile-first Story with safe-zone-aware hierarchy, large readable type and a fast visual hook. One frame per output unless a sequence is requested; keep tappable/edge areas clear.","tags":["studio-manual","smart-expand"]},{"name":"/reelcover","category":"Social Content","description":"High-impact vertical Reel cover","expansion":"Create a 9:16 cover with one clear hook, strong subject/product scale and concise text that survives profile/grid cropping. Protect faces/logos/key text from crop zones and avoid tiny details.","tags":["studio-manual","smart-expand"]},{"name":"/carousel","category":"Social Content","description":"Multi-slide carousel system with separate slides","expansion":"Plan a coherent narrative and visual system, then produce every slide as a separate standalone 4:5 asset unless another ratio is specified. Never output a contact sheet, collage, grid or combined preview.","tags":["studio-manual","smart-expand"]},{"name":"/thumbnail","category":"Social Content","description":"High-click video thumbnail","expansion":"Design for instant comprehension at small size: one focal subject/product, high contrast, concise hook and controlled supporting elements. Use 16:9 for YouTube or the requested vertical ratio for Reels/Shorts.","tags":["studio-manual","smart-expand"]},{"name":"/linkedin-carousel","category":"Social Content","description":"Research-led LinkedIn profile/company carousel","expansion":"Research the public LinkedIn profile/company and reliable public sources. Default 7–9 separate 1080x1350 4:5 slides with a profile-specific hook, verified narrative, concise authority signals and cohesive editorial design; never invent facts or make a 3x3 sheet.","tags":["studio-manual","smart-expand"]},{"name":"/infographic","category":"Info & Diagrams","description":"Clear visual information design","expansion":"Turn supplied facts into a visual hierarchy using concise labels, icons, charts, callouts or modular blocks. Select the simplest truthful visual form, show units/sources when supplied and never invent data.","tags":["studio-manual","smart-expand"]},{"name":"/diagram","category":"Info & Diagrams","description":"Concept/system diagram","expansion":"Explain the supplied concept with clear nodes, relationships, labels and directional logic. Prioritize comprehension, consistent notation and meaningful grouping over decoration; do not add unsupported system components.","tags":["studio-manual","smart-expand"]},{"name":"/flowchart","category":"Info & Diagrams","description":"Step-by-step process flow","expansion":"Create a logically ordered flow with explicit start/end states, decision points, connectors and branch labels. Use only supplied/verified steps and keep directionality unambiguous.","tags":["studio-manual","smart-expand"]},{"name":"/roadmap","category":"Info & Diagrams","description":"Timeline/roadmap visualization","expansion":"Create a readable sequence of phases, milestones, dependencies and hierarchy from supplied information. Distinguish confirmed vs proposed items where relevant; never invent dates, commitments or outcomes.","tags":["studio-manual","smart-expand"]},{"name":"/dashboard","category":"Info & Diagrams","description":"KPI/data dashboard visual","expansion":"Design a clean dashboard from supplied metrics using appropriate chart types, units, labels and priority hierarchy. Never fabricate values; surface anomalies/comparisons only when supported by data.","tags":["studio-manual","smart-expand"]},{"name":"/poster","category":"Print & OOH","description":"Campaign poster","expansion":"Create a campaign poster with strong distance hierarchy, one dominant idea and print-aware spacing. Use exact dimensions/bleed when supplied; otherwise state the assumed size and preserve all required text/brand assets.","tags":["studio-manual","smart-expand"]},{"name":"/standee","category":"Print & OOH","description":"Print-ready standee direction","expansion":"Design a tall standee with safe margins, top-to-bottom reading order, distance-readable headline/product and print-ready proportions. Respect exact dimensions, bleed and supplied contact details.","tags":["studio-manual","smart-expand"]},{"name":"/flyer","category":"Print & OOH","description":"Promotional flyer","expansion":"Create a clear information hierarchy with strong headline, benefit/offer structure, CTA and print-safe spacing. Use supplied contact/pricing/details only and avoid clutter or tiny unreadable copy.","tags":["studio-manual","smart-expand"]},{"name":"/brochure","category":"Print & OOH","description":"Brochure/page-system art direction","expansion":"Plan pages with a consistent grid, typography, image rhythm and section hierarchy. Keep each page independently readable, preserve supplied facts, and maintain continuity across spreads without overcrowding.","tags":["studio-manual","smart-expand"]},{"name":"/packaging","category":"Brand Systems","description":"Packaging design concept","expansion":"Develop packaging within supplied dieline/shape, material, regulatory and mandatory-copy constraints. Preserve legally required information and hierarchy; improve shelf impact, navigation and brand distinctiveness without inventing claims.","tags":["studio-manual","smart-expand"]},{"name":"/label","category":"Brand Systems","description":"Product label design/redesign","expansion":"Redesign the label while preserving exact mandatory copy, claims, certifications, barcode/technical zones and dimensions supplied. Improve hierarchy, legibility and brand system; never alter factual or legal text.","tags":["studio-manual","smart-expand"]},{"name":"/mockup","category":"Brand Systems","description":"Photorealistic branded mockup","expansion":"Apply supplied artwork/branding accurately to a believable object/environment with correct perspective, curvature, material, print finish, reflections, scale and lighting. No logo distortion or invented packaging changes.","tags":["studio-manual","smart-expand"]},{"name":"/brandstyle","category":"Brand Systems","description":"Extend current brand identity into a campaign system","expansion":"Extract the brand's actual visual codes—color, type, spacing, shapes, image behavior, tone and recurring motifs—then extend them into a flexible campaign system. Do not replace the brand with a generic premium template.","tags":["studio-manual","smart-expand"]},{"name":"/moodboard","category":"Brand Systems","description":"Focused production-useful moodboard direction","expansion":"Define a tight direction for color, typography, imagery, materials, lighting, composition, motion and reference qualities. Curate for one executable concept rather than a broad aesthetic dump.","tags":["studio-manual","smart-expand"]},{"name":"/palette","category":"Brand Systems","description":"Brand-fit campaign color system","expansion":"Create primary, secondary, support, background and accent color roles with contrast logic and usage proportions. Preserve mandatory brand colors and ensure readability across light/dark and digital/print contexts.","tags":["studio-manual","smart-expand"]},{"name":"/typography","category":"Brand Systems","description":"Complete typography hierarchy/system","expansion":"Define headline, subhead, body, caption, label and utility behavior with scale, weight, case, tracking, line-height, alignment and spacing rules. Keep the system brand-specific and usable across formats.","tags":["studio-manual","smart-expand"]},{"name":"/layout","category":"Utility & Layout","description":"Recompose layout and hierarchy","expansion":"Keep required content/assets but rebuild grid, spacing, alignment, crop, grouping and reading order for a materially stronger composition. Do not simply nudge existing elements; protect safe areas and focal hierarchy.","tags":["studio-manual","smart-expand"]},{"name":"/clean","category":"Utility & Layout","description":"Clean up and simplify","expansion":"Remove nonessential elements, redundant copy treatments and visual noise while preserving mandatory content. Strengthen spacing, alignment, contrast and focal priority; simplify without making the design generic.","tags":["studio-manual","smart-expand"]},{"name":"/resize","category":"Utility & Layout","description":"Intelligent aspect-ratio adaptation","expansion":"Recompose for the new ratio instead of stretching or center-cropping. Re-evaluate crop, product/face scale, type breaks, safe zones, negative space and CTA placement while preserving all critical content.","tags":["studio-manual","smart-expand"]},{"name":"/video","category":"Seedance & Video","description":"Fresh complete AI video concept","expansion":"Default 15s, 9:16 unless overridden. Build a coherent beginning-middle-end shot flow with a first-second hook, physically plausible camera/motion, continuity locks, purposeful transitions, varied shot scale and a strong hero ending; avoid random morphing and repeated shots.","tags":["studio-manual","smart-expand"]},{"name":"/productvideo","category":"Seedance & Video","description":"Premium cinematic product advertising video","expansion":"Use uploaded product references as absolute geometry/packaging authority in every frame. Default 15s, 9:16, 6–10 distinct shots mixing macro, interaction, motion and hero angles with realistic physics and a clean final packshot; no label drift or deformation.","tags":["studio-manual","smart-expand"]},{"name":"/cgivideo","category":"Seedance & Video","description":"High-end CGI product animation","expansion":"Create physically believable 3D materials, reflections, shadows, atmosphere and camera choreography around the exact product. Default 15s, 9:16, 6–8 purposeful shots; avoid generic pedestal/smoke/splash formulas, impossible morphs and packaging changes.","tags":["studio-manual","smart-expand"]},{"name":"/cinematicvideo","category":"Seedance & Video","description":"Feature-film-style commercial video","expansion":"Use motivated film lighting, lens/depth logic, atmosphere, realistic camera movement and visual storytelling. Default 15s, 9:16 unless specified; maintain identity/product/wardrobe/world continuity and make every shot advance the narrative.","tags":["studio-manual","smart-expand"]},{"name":"/reelvideo","category":"Seedance & Video","description":"Fast premium Instagram Reel concept","expansion":"Default 15s, 9:16 with an immediate hook, 7–10 short coherent shots, varied framing, natural handheld/gimbal movement, motivated transitions and a satisfying hero end. Fast does not mean random; avoid effect spam.","tags":["studio-manual","smart-expand"]},{"name":"/productreveal","category":"Seedance & Video","description":"Controlled premium product reveal","expansion":"Build anticipation through progressive light, crop, motion, environment or material interaction, revealing more information shot by shot. Preserve exact product shape/label and finish on a stable readable hero frame; default 8–12s, 9:16.","tags":["studio-manual","smart-expand"]},{"name":"/unboxing","category":"Seedance & Video","description":"Authentic unboxing video","expansion":"Show believable hands, package handling, opening sequence, first reveal, tactile details, natural reaction and final product shot. Default 15–20s, 9:16; use smartphone realism, natural timing and no impossible hand/product geometry.","tags":["studio-manual","smart-expand"]},{"name":"/testimonial","category":"Seedance & Video","description":"Natural creator testimonial video","expansion":"Structure hook → credible personal context → one supported benefit/story → proof/demo → natural recommendation. Default 15–30s, 9:16; use realistic pauses, gestures and product interaction and never invent claims or testimonials.","tags":["studio-manual","smart-expand"]},{"name":"/broll","category":"Seedance & Video","description":"Premium B-roll shot sequence","expansion":"Provide 8–12 genuinely distinct wide, medium, close, macro, detail, movement, environment, interaction and hero shots. Specify practical camera movement/lens intent and avoid duplicate angles or impossible drone/gimbal behavior.","tags":["studio-manual","smart-expand"]},{"name":"/motion","category":"Seedance & Video","description":"Subtle believable product motion","expansion":"Keep geometry/label stable while using restrained push-ins, slides, arcs, parallax, rack-focus-like depth or gentle gimbal moves. Avoid exaggerated spinning, floating, warping or deformation unless explicitly requested.","tags":["studio-manual","smart-expand"]},{"name":"/kling","category":"Seedance & Video","description":"Production-ready Kling video prompt","expansion":"Specify exact subject/product locks, action timeline, camera, environment, lighting, motion speed and continuity. Add explicit prevention for warping, label/logo changes, duplicate objects, extra limbs, unstable frames and impossible transformations.","tags":["studio-manual","smart-expand"]},{"name":"/runway","category":"Seedance & Video","description":"Production-ready Runway video prompt","expansion":"Specify what is fixed, what moves, how the camera moves, environment, lighting, speed, continuity and end state in concrete terms. Avoid vague cinematic adjectives and transformations that violate identity/product geometry.","tags":["studio-manual","smart-expand"]},{"name":"/ugcvideo","category":"UGC & Reels","description":"Natural creator-style UGC video","expansion":"Default 15–30s, 9:16. Use genuine smartphone behavior, natural light, conversational speech, believable gestures and product handling, simple hook/problem/demo/reaction flow and minimal polish; default to globally neutral English if no market is specified.","tags":["studio-manual","smart-expand"]},{"name":"/ugc-american","category":"UGC & Reels","description":"US creator UGC","expansion":"Use a believable US setting, natural American English, casual delivery, realistic smartphone framing and authentic product interaction. Avoid exaggerated influencer energy, fake slang and unsupported claims.","tags":["studio-manual","smart-expand"]},{"name":"/ugc-british","category":"UGC & Reels","description":"UK creator UGC","expansion":"Use a believable UK lifestyle setting, natural British English, understated delivery, realistic phone-camera movement and genuine interaction. Avoid forced stereotypes or over-performed influencer behavior.","tags":["studio-manual","smart-expand"]},{"name":"/ugc-australian","category":"UGC & Reels","description":"Australian creator UGC","expansion":"Use a believable Australian context, natural Australian English, casual pacing, authentic phone behavior and realistic product interaction. Keep local cues subtle unless the brief calls for them.","tags":["studio-manual","smart-expand"]},{"name":"/ugc-middleeast","category":"UGC & Reels","description":"Middle East/Gulf creator UGC","expansion":"Use a contemporary Gulf/Middle East setting and culturally appropriate styling. Default to natural English unless Arabic is requested; keep gestures, setting, product use and smartphone behavior authentic rather than stereotyped.","tags":["studio-manual","smart-expand"]},{"name":"/ugc-european","category":"UGC & Reels","description":"European-market creator UGC","expansion":"Use a believable contemporary European setting with conversational creator delivery. Default to neutral English unless a specific country/language is requested; keep visual and cultural cues plausible and non-stereotyped.","tags":["studio-manual","smart-expand"]},{"name":"/ugc-latam","category":"UGC & Reels","description":"Latin American-market creator UGC","expansion":"Use a believable Latin American setting and authentic creator performance. Default to English unless Spanish/Portuguese is requested; keep expressions, pacing, phone movement and product interaction natural.","tags":["studio-manual","smart-expand"]},{"name":"/ugc-global","category":"UGC & Reels","description":"Region-neutral international UGC","expansion":"Use a modern universally relatable setting, neutral English and natural smartphone behavior. Avoid location-specific slang/stereotypes unless requested; optimize for authenticity across markets.","tags":["studio-manual","smart-expand"]},{"name":"/camera","category":"Camera & Motion","description":"Practical camera-motion options","expansion":"Generate 8 physically achievable options: subtle push-in, pull-out, lateral slide each direction, slow arc, low-angle rise, top-down drift and gentle handheld/gimbal. Keep subject/product stable unless motion is requested; describe speed and framing intent.","tags":["studio-manual","smart-expand"]},{"name":"/transition","category":"Camera & Motion","description":"Motivated premium transition ideas","expansion":"Generate 8 transitions driven by camera/scene logic—match cut, foreground wipe, whip pan, light pass, focus shift, speed ramp, object occlusion or environmental continuity. Avoid random morphs, glitch spam and transitions that break geometry.","tags":["studio-manual","smart-expand"]},{"name":"/slowmotion","category":"Camera & Motion","description":"Premium high-frame-rate slow-motion shot","expansion":"Use believable high-frame-rate motion with realistic inertia and physically plausible particles/liquid/fabric/hair when relevant. Keep camera movement restrained, lighting controlled and product/face geometry stable without warping.","tags":["studio-manual","smart-expand"]}];
  const BUNDLES = {"/EDIT-ME":["/gaurev-lock","/face-zero-drift","/body-zero-drift","/change-everything-except-me","/photo-real-max","/no-ai-look"],"/FASHION-ME":["/gaurev-lock","/quiet-luxury","/gq-mode","/photo-real-max","/real-skin","/real-materials"],"/BILLIONAIRE-ME":["/gaurev-lock","/billionaire-mode","/quiet-luxury","/photo-real-max","/no-ai-look","/real-light"],"/MOVIE-ME":["/gaurev-lock","/production-still","/movie-poster","/real-light","/real-physics","/photo-real-max"],"/POSTER-MAX":["/blockbuster-keyart","/text-perfect","/logo-exact","/instagram-poster","/photo-real-max","/no-ai-look"],"/IMAGE-MAX":["/reference-exact","/photo-real-max","/no-ai-look","/real-skin","/real-materials","/real-light","/real-physics"],"/STORYBOARD-MAX":["/storyboard-gaurev","/storyboard-10","/storyboard-image-prompts","/storyboard-video-prompts","/hero-frame","/end-frame-lock"],"/SEEDANCE-MAX":["/seedance-director","/seedance-reference-lock","/seedance-continuity","/seedance-real-motion","/seedance-camera-real","/audio-real"],"/REEL-MAX":["/seedance-20","/seedance-916","/viral-first-3","/seedance-fast-cut","/audio-real"],"/UGC-MAX":["/raw-phone-video","/creator-ugc","/no-ad-acting","/jumpcut","/viral-first-3","/audio-real"],"/PRODUCT-MAX":["/product-zero-drift","/reference-exact","/real-materials","/product-lux","/product-hero-frame"],"/JEWELLERY-MAX":["/jewellery-zero-drift","/product-macro","/real-skin","/real-materials","/product-lux","/product-hero-frame"],"/SUPERCAR-MAX":["/gaurev-lock","/supercar-editorial","/car-lock","/real-materials","/real-physics","/photo-real-max","/cinematic-world"],"/FIGHTERJET-MAX":["/gaurev-lock","/fighter-jet","/machine-scale","/cinematic-world","/production-still","/real-physics","/photo-real-max"],"/SOCIAL-MAX":["/social-optimize","/viral-first-3","/caption-full","/brand-clean","/instagram-poster"],"/CAMPAIGN-MAX":["/ideas-no-generic","/pick-one","/brand-optimize","/social-optimize","/storyboard-video-prompts","/final-pass"],"/WEBSITE-MAX":["/website-redesign","/website-premium","/awwwards","/hero-wow","/site-motion","/site-mobile-first","/site-conversion"],"/PROMPT-MAX-GK":["/prompt-deep-analyze","/prompt-rebuild","/prompt-locks","/prompt-reference","/prompt-negative","/ideas-no-generic","/prompt-copy"],"/IDEAS-MAX":["/ideas-no-generic","/ideas-10-cinematic","/best-3","/pick-one"],"/CHARACTER-SHEET":["/gaurev-lock","/multi-ref-lock","/reference-exact","/photo-real-max","/real-skin","/real-materials"],"/CREATIVE-STUDIO-MAX":["/creative","/artdirect","/brandstyle","/variation","/social","/final-pass"],"/PRODUCT-AD-MAX":["/productad","/producthero","/reference-exact","/product-zero-drift","/real-materials","/text-perfect"],"/CAMPAIGN-LAUNCH-MAX":["/launch","/artdirect","/social","/carousel","/reelcover","/brandstyle"],"/SOCIAL-CREATIVE-MAX":["/creative","/social","/typeled","/brandstyle","/text-perfect","/one-by-one"],"/VIDEO-STUDIO-MAX":["/video","/productvideo","/camera","/transition","/video-product-lock","/continuity-max","/audio-real"],"/UGC-VIDEO-MAX":["/ugcvideo","/ugc-indian","/raw-phone-video","/no-ad-acting","/audio-real","/viral-first-3"],"/BRAND-SYSTEM-MAX":["/brandstyle","/palette","/typography","/layout","/social","/final-pass"]};
  const DEFAULT_FAVORITES = ["/EDIT-ME","/IMAGE-MAX","/FASHION-ME","/BILLIONAIRE-ME","/POSTER-MAX","/STORYBOARD-MAX","/SEEDANCE-MAX","/REEL-MAX","/UGC-MAX","/PRODUCT-MAX","/JEWELLERY-MAX","/PROMPT-MAX-GK","/CREATIVE-STUDIO-MAX","/PRODUCT-AD-MAX","/VIDEO-STUDIO-MAX","/SOCIAL-CREATIVE-MAX"];
  const CATEGORY_ORDER = ["★ Master Bundles","Creative Studio","Character & Identity","Image Editing","Realism","Visual Styles","Luxury & Fashion","Environment","Supercars & Machines","Products & Jewellery","Posters & Key Art","Print & OOH","Storyboards","Seedance & Video","Camera & Motion","UGC & Reels","Voice & Audio","Social Content","Info & Diagrams","Brand Systems","Utility & Layout","Prompt Engineering","Ideas","Website","Parameters"];
  const CATEGORY_META = {"★ Master Bundles":["⚡","Bundles","Your fastest all-in-one workflow presets"],"Character & Identity":["👤","Character","Identity, face, body and reference locking"],"Image Editing":["🖼️","Image","Wardrobe, background and exact image edits"],"Realism":["📷","Realism","Photorealism, skin, materials, lighting and physics"],"Luxury & Fashion":["✨","Luxury","Fashion, billionaire, villa, beach and private aviation"],"Supercars & Machines":["🏎️","Machines","Supercars, number plates and fighter jets"],"Posters & Key Art":["🎨","Posters","Movie posters, key art, logos and typography"],"Storyboards":["🎞️","Storyboard","Storyboard, shot lists and hero frames"],"Seedance & Video":["🎬","Video","AI video concepts, product films, Seedance, Kling and Runway"],"UGC & Reels":["📱","UGC","Creator UGC, regional market variants, reels and authentic phone video"],"Voice & Audio":["🎙️","Audio","Voiceover, music, ambience and sound design"],"Products & Jewellery":["💎","Product","Product advertising, CGI, technical views, comparisons and jewellery"],"Social Content":["📣","Social","Social creatives, launches, offers, carousels, covers and campaigns"],"Prompt Engineering":["🧠","Prompt","Prompt analysis, optimization and rebuilding"],"Ideas":["💡","Ideas","Idea generation, ranking and selection"],"Website":["🌐","Website","Website redesign, hero, motion and conversion"],"Parameters":["⚙️","Parameters","Aspect ratio, duration, shots and orientation"],"Creative Studio":["🎯","Studio","Fresh creative direction, art direction, redesign and anti-repeat"],"Visual Styles":["🎛️","Styles","Premium, luxury, bold, editorial, tactile, retro and more"],"Environment":["🌍","Worlds","Gym, nature, industrial, architecture, tech, lifestyle and UGC"],"Print & OOH":["🖨️","Print & OOH","Poster, billboard, standee, flyer, brochure and fake OOH"],"Camera & Motion":["🎥","Camera","Practical camera movement, transitions and slow motion"],"Info & Diagrams":["📊","Info","Infographics, diagrams, flowcharts, roadmaps and dashboards"],"Brand Systems":["🧬","Brand","Packaging, labels, brand style, moodboard, palette and type"],"Utility & Layout":["🧩","Utility","Layout, cleanup and intelligent resizing"]};
  const CATEGORY_ACCENTS = {"★ Master Bundles":["#7c3aed","#2563eb","rgba(124,58,237,.18)","rgba(37,99,235,.10)"],"Creative Studio":["#db2777","#7c3aed","rgba(219,39,119,.17)","rgba(124,58,237,.10)"],"Character & Identity":["#2563eb","#06b6d4","rgba(37,99,235,.16)","rgba(6,182,212,.10)"],"Image Editing":["#0ea5e9","#2563eb","rgba(14,165,233,.16)","rgba(37,99,235,.09)"],"Realism":["#059669","#0ea5e9","rgba(5,150,105,.15)","rgba(14,165,233,.09)"],"Visual Styles":["#9333ea","#ec4899","rgba(147,51,234,.16)","rgba(236,72,153,.09)"],"Luxury & Fashion":["#a16207","#d97706","rgba(161,98,7,.15)","rgba(217,119,6,.09)"],"Environment":["#16a34a","#0d9488","rgba(22,163,74,.15)","rgba(13,148,136,.09)"],"Supercars & Machines":["#dc2626","#ea580c","rgba(220,38,38,.15)","rgba(234,88,12,.09)"],"Products & Jewellery":["#0891b2","#7c3aed","rgba(8,145,178,.15)","rgba(124,58,237,.09)"],"Posters & Key Art":["#e11d48","#9333ea","rgba(225,29,72,.15)","rgba(147,51,234,.09)"],"Print & OOH":["#ea580c","#ca8a04","rgba(234,88,12,.15)","rgba(202,138,4,.09)"],"Storyboards":["#4f46e5","#7c3aed","rgba(79,70,229,.16)","rgba(124,58,237,.09)"],"Seedance & Video":["#7c3aed","#2563eb","rgba(124,58,237,.17)","rgba(37,99,235,.10)"],"Camera & Motion":["#0284c7","#4f46e5","rgba(2,132,199,.16)","rgba(79,70,229,.09)"],"UGC & Reels":["#db2777","#ea580c","rgba(219,39,119,.15)","rgba(234,88,12,.09)"],"Voice & Audio":["#8b5cf6","#ec4899","rgba(139,92,246,.15)","rgba(236,72,153,.09)"],"Social Content":["#e11d48","#f59e0b","rgba(225,29,72,.15)","rgba(245,158,11,.09)"],"Info & Diagrams":["#0f766e","#2563eb","rgba(15,118,110,.15)","rgba(37,99,235,.09)"],"Brand Systems":["#be185d","#7c3aed","rgba(190,24,93,.15)","rgba(124,58,237,.09)"],"Utility & Layout":["#475569","#2563eb","rgba(71,85,105,.15)","rgba(37,99,235,.08)"],"Prompt Engineering":["#7c3aed","#0ea5e9","rgba(124,58,237,.16)","rgba(14,165,233,.09)"],"Ideas":["#d97706","#db2777","rgba(217,119,6,.15)","rgba(219,39,119,.09)"],"Website":["#0d9488","#2563eb","rgba(13,148,136,.15)","rgba(37,99,235,.09)"],"Parameters":["#64748b","#475569","rgba(100,116,139,.15)","rgba(71,85,105,.09)"]};
  const HUBS = {
    Creatives: ["Creative Studio","Products & Jewellery","Social Content","Visual Styles","Environment","Print & OOH","Posters & Key Art"],
    Videos: ["Seedance & Video","Storyboards","Voice & Audio"],
    UGC: ["UGC & Reels","Voice & Audio","Social Content"],
    Camera: ["Camera & Motion","Storyboards"],
    Brand: ["Brand Systems","Utility & Layout","Info & Diagrams","Prompt Engineering"],
    All: CATEGORY_ORDER.slice(),
  };
  const HUB_META = {
    Creatives:["✦","Creatives"], Videos:["▣","Videos"], UGC:["♙","UGC"], Camera:["◉","Camera"], Brand:["◇","Brand"], All:["⊞","All"]
  };
  const QUICK_FILTERS = [
    {label:"Creative", icon:"✦", terms:["/creative","/surprise","/variation","/redesign","/artdirect"]},
    {label:"Carousel", icon:"▤", terms:["/carousel","/carousel-7","/carousel-9"]},
    {label:"LinkedIn", icon:"in", terms:["/linkedin-carousel"]},
    {label:"CGI", icon:"⬡", terms:["/cgi","/cgivideo"]},
    {label:"Video", icon:"▶", terms:["/video","/productvideo","/reelvideo","/cinematicvideo","/seedance","/kling","/runway"]},
  ];

  const CREATIVE_STUDIO_RUNTIME = "Priority: current user brief/files > active project/brand > selected command > defaults. For social feed default to 1080x1350 4:5 unless overridden, and deliver a finished graphic-designed creative rather than a plain photo/CGI plate; use at least three intentional design devices when appropriate. Multiple requested assets/slides/posts must be separate standalone outputs—never collage/contact sheet—unless collage is explicitly requested. Treat multiple angles of the same product as one reference set; preserve exact product/packaging/logo/label/geometry unless redesign is explicitly requested. If quantity is unspecified for product social creatives, default to two genuinely different concepts per product. Never invent claims, prices, nutrition facts, certifications, features, statistics, achievements, ingredients or profile facts. Fresh variations must change at least six major art-direction decisions and avoid repeated default templates. Brand fit overrides generic premium styling. Beverage work should default to playful flavour-led graphic energy, not supplement/spa styling. For video/UGC enforce continuity, realistic physics/camera/hands, no label/face/product morphing, and market-authentic performance.";
  const ART_DIRECTION_FAMILIES = ["Typography-led campaign poster","Editorial product poster","Graphic sports-performance ad","Playful beverage campaign","Minimal premium poster","Maximalist social ad","Modular Swiss-inspired layout","Kinetic diagonal poster","Ingredient infographic-poster hybrid","CGI-plus-graphic campaign","Fake OOH social poster","Editorial lifestyle ad","Abstract geometry poster","Macro-detail campaign","Monochrome branded poster","Retro-modern ad system","Technical performance poster","Culture-led poster","Fashion-editorial product ad","Bold ecommerce-social hybrid"];
  const KNOWN_BRAND_PROFILES = {"uji":{"name":"Uji","category":"Beverage","tone":"Playful, fresh, youthful, vibrant","visual":"Flavour-led, dynamic, bright premium, expressive typography, custom shapes/stickers, energetic product scale","avoid":"Static bottle + fruit, spa/wellness styling, supplement-ad language, generic luxury poster, random fruit plate"},"ans performance":{"name":"ANS Performance","category":"Sports nutrition","tone":"Bold, strong, performance-driven, premium, authoritative","visual":"High-energy athletic commercial, powerful clean CGI, performance graphics, disciplined hierarchy","avoid":"Cute beverage styling, weak pastels, spa/wellness, generic fruit-ad language"},"halt":{"name":"Halt Nutrition","category":"Nutrition / supplements","tone":"Clean, premium, modern, credible, confident","visual":"Bright commercial, modern wellness, polished ecommerce, refined CGI, clean editorial","avoid":"Childish styling, cheap sale clutter, random playful props, repeated dark backgrounds"},"joker nutrition":{"name":"Joker Nutrition","category":"Sports nutrition","tone":"Bold, edgy, high-impact, rebellious, energetic","visual":"Dark premium, aggressive graphic system, dramatic contrast, performance energy","avoid":"Soft wellness, cute beverage look, catalogue setup, gentle pastels, generic luxury serif poster"},"ace vitals":{"name":"Ace Vitals","category":"Sports nutrition","tone":"Clean, energetic, premium, modern","visual":"White premium, fresh commercial, performance-focused, ingredient-led","avoid":"Muddy dark styling, cheap gym poster, crowded text, repeated pedestal scenes"},"muscle mantra":{"name":"Muscle Mantra","category":"Sports nutrition","tone":"Strong, energetic, credible, bold","visual":"Performance commercial, bold product hero, gym energy, premium supplement","avoid":"Spa styling, cute treatment, perfume-ad language"},"bodybuilding india":{"name":"Bodybuilding India","category":"Retail / bodybuilding","tone":"Credible, strong, professional, community-driven","visual":"Bright premium, retail authority, performance, event-ready","avoid":"Soft lifestyle-only imagery, cute illustration, muddy design"},"chawla bakers":{"name":"Chawla Bakers","category":"Bakery / food","tone":"Warm, delicious, friendly, premium local","visual":"Appetite-led, warm editorial, fresh bakery, celebratory","avoid":"Supplement-style ad, cold technical CGI, bottle-poster compositions"},"rasa":{"name":"Rasa","category":"Restaurant / hospitality","tone":"Inviting, appetizing, premium, warm, cultural","visual":"Food-first hospitality editorial, rich culinary imagery, modern Indian design","avoid":"Supplement ads, clinical layouts, packshot treatment, inaccessible dark food"},"pashtun":{"name":"Pashtun","category":"Restaurant / hospitality","tone":"Bold, social, flavourful, warm, premium casual","visual":"Food/drink lifestyle, rich atmosphere, social dining, modern restaurant","avoid":"Ecommerce clinical look, supplement CGI language, object-on-pedestal"},"ekyam":{"name":"Ekyam","category":"Enterprise technology / AI","tone":"Modern, intelligent, clear, premium, technical","visual":"3D system visuals, clean enterprise design, minimal info design, soft-blue technology","avoid":"Consumer-product advertising, food styling, random cyberpunk, overloaded dashboards"},"acestar":{"name":"ACESTAR","category":"Sports nutrition","tone":"Premium, strong, technical, confident","visual":"Metallic gold, black premium, structured performance design","avoid":"Cute styling, soft pastel wellness, random colorful props"},"techairevolution":{"name":"TechAIrevolution","category":"AI / creative technology","tone":"Futuristic, intelligent, premium, confident, creator-led","visual":"Clean advanced-AI editorial, bold information hierarchy, high-end digital systems, modern motion/3D accents","avoid":"Generic neon cyberpunk, fake dashboards, unreadable AI text, cliché robot imagery"},"top1consultancy":{"name":"Top1Consultancy","category":"Consultancy / marketing","tone":"Strategic, authoritative, modern, commercially sharp","visual":"Premium business editorial, strong proof-led hierarchy, founder/authority content, clear conversion structure","avoid":"Cheap agency templates, unsupported business claims, excessive futuristic decoration"},"skillboat immigration":{"name":"Skillboat Immigration","category":"Immigration / education services","tone":"Trustworthy, clear, professional, reassuring","visual":"Clean international education/travel editorial, structured information, human credibility, bright premium layouts","avoid":"Guaranteed-visa claims, fake approvals, cluttered travel clichés, misleading urgency"},"klevvrtech":{"name":"Klevvrtech","category":"Technology / IT services","tone":"Modern, capable, intelligent, enterprise-ready","visual":"Clean systems thinking, premium product/technology editorial, structured diagrams, subtle advanced-tech cues","avoid":"Random cyberpunk, fake code/screens, overloaded futuristic UI"},"zarriya":{"name":"Zarriya","category":"Jewellery / luxury","tone":"Elegant, refined, premium Indian, emotionally rich","visual":"Luxury jewellery editorial, precise macro detail, warm premium materials, sophisticated Indian fashion cues","avoid":"Jewellery geometry drift, fake stones, gaudy gold clutter, generic wedding-template styling"},"totbelly":{"name":"Totbelly","category":"Food / home kitchen","tone":"Warm, appetizing, friendly, contemporary","visual":"Food-first editorial, fresh ingredients, authentic serving moments, bright appetite-led social design","avoid":"Supplement-style layouts, cold technical CGI, generic pedestal product shots"},"offbeat store":{"name":"Offbeat Store","category":"Fashion / apparel retail","tone":"Youthful, expressive, premium-casual, distinctive","visual":"Fashion editorial, graphic streetwear systems, bold crop/type, social-first styling","avoid":"Generic ecommerce grids, luxury-perfume clichés, weak catalogue presentation"},"skillboat learning":{"name":"Skillboat Learning","category":"Education / learning","tone":"Clear, encouraging, credible, modern","visual":"Clean educational editorial, modular information design, human learning moments, accessible hierarchy","avoid":"Childish school clip-art, fake credentials, cluttered text-heavy layouts"}};

  // Universal Project Registry: seeded aliases improve naming, while the runtime learns
  // every owned OR shared ChatGPT Project that appears in the sidebar/current DOM.
  // A seed never declares that the user is inside a project; it only improves matching
  // after ChatGPT exposes a project link/name.
  const PROJECT_NAME_SEEDS = [
    {name:"Misc (Metrics Mule)", aliases:["misc metrics mule","metrics mule"]},
    {name:"Gaurev Kohli — LinkedIn Authority Engine", aliases:["gaurev kohli linkedin authority engine","linkedin authority engine"]},
    {name:"TechAIrevolution", aliases:["techairevolution","tech ai revolution"]},
    {name:"Klevvrtech", aliases:["klevvrtech","klevvr tech"]},
    {name:"Top1Consultancy", aliases:["top1consultancy","top 1 consultancy"]},
    {name:"Skillboat Immigration", aliases:["skillboat immigration"]},
    {name:"Skillboat Learning", aliases:["skillboat learning"]},
    {name:"Muscle Mantra", aliases:["muscle mantra"]},
    {name:"ANS Performance India", aliases:["ans performance india","ans performance"]},
    {name:"Bodybuilding India", aliases:["bodybuilding india","body building india","bbi"]},
    {name:"TechAIrevolution Creative Studio", aliases:["techairevolution creative studio"]},
    {name:"Zarriya", aliases:["zarriya"]},
    {name:"Uji", aliases:["uji","uji foods"]},
    {name:"Halt Nutrition", aliases:["halt nutrition","halt"]},
    {name:"Joker Nutrition", aliases:["joker nutrition"]},
    {name:"Ace Vitals", aliases:["ace vitals"]},
    {name:"ACESTAR", aliases:["acestar"]},
    {name:"Chawla Bakers", aliases:["chawla bakers","chawla baker's"]},
    {name:"Rasa", aliases:["rasa"]},
    {name:"Pashtun", aliases:["pashtun","restaurant pashtun"]},
    {name:"Ekyam", aliases:["ekyam"]},
    {name:"Totbelly", aliases:["totbelly"]},
    {name:"Offbeat Store", aliases:["offbeat store"]},
    {name:"DealOut", aliases:["dealout","deal out"]}
  ];



  const DEFAULTS = {
    enabled: true,
    favorites: DEFAULT_FAVORITES,
    maxResults: 22,
    showDescriptions: true,
    tabStacks: true,
    projectAware: true,
    projectContextInjection: true,
    smartCommandInstructions: true,
    creativeStudioRuntime: true,
    projectOverrides: {},
    projectRegistry: {},
  };

  let settings = Object.assign({}, DEFAULTS, GM_getValue('gk_settings', {}));
  let paletteOpen = false;
  let selectedIndex = 0;
  let currentEditable = null;
  let currentFragment = null;
  let visibleItems = [];
  let recent = [];
  let mode = 'commands'; // commands | search
  let activeCategory = null;
  let activeHub = 'Creatives';
  let activeQuickFilter = null;
  let paletteSearchQuery = '';
  let host, shadow, listEl, hintEl, crumbEl, titleEl, sideEl, hubEl, quickEl, brandChipEl, projectLineEl, footerVersionEl, syncButtonEl, searchBarEl, searchInputEl, searchClearEl, searchCountEl;
  let projectBadgeHost, projectBadgeShadow, projectBadgeButton;
  let activeProject = { inProject:false, id:null, name:null, source:'none', shared:false };
  let lastProjectSignature = '';
  let lastRegistryScan = 0;

  function save() { GM_setValue('gk_settings', settings); }

  function cleanProjectName(value) {
    if (!value) return null;
    let s = String(value).replace(/\s+/g, ' ').trim();
    s = s.replace(/^project\s*[:\-–—]\s*/i, '').trim();
    s = s.replace(/\s+(?:shared with you|shared project)$/i, '').trim();
    if (s.length < 2 || s.length > 120) return null;
    const blocked = new Set([
      'project','projects','chatgpt','new chat','temporary chat','search chats',
      'share','shared','shared with you','settings','close','open sidebar','more','rename','delete'
    ]);
    if (blocked.has(s.toLowerCase())) return null;
    return s;
  }

  function normalizeProjectName(value) {
    return String(value || '')
      .toLowerCase()
      .normalize?.('NFKD')
      ?.replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9]+/g,' ')
      .trim() || '';
  }

  function seededProjectName(value) {
    const raw = cleanProjectName(value);
    if (!raw) return null;
    const q = normalizeProjectName(raw);
    for (const seed of PROJECT_NAME_SEEDS) {
      const names = [seed.name, ...(seed.aliases || [])].map(normalizeProjectName).filter(Boolean);
      if (names.some(alias => q === alias || (alias.length >= 5 && q.includes(alias)))) return seed.name;
    }
    return raw;
  }

  function projectIdentityFromUrl(url = location.href) {
    let parsed;
    try { parsed = new URL(url, location.origin); } catch { return {id:null,key:null,isProject:false}; }
    const path = parsed.pathname;
    let id = path.match(/(g-p-[A-Za-z0-9_-]+)/)?.[1] || null;
    if (!id) {
      for (const key of ['project','projectId','project_id','gizmo','gizmoId','gizmo_id']) {
        const v = parsed.searchParams.get(key);
        if (v && (/^g-p-/i.test(v) || key.startsWith('project'))) { id = v; break; }
      }
    }
    if (!id) {
      const m = path.match(/\/(?:projects?|project)\/([^/?#]+)/i);
      if (m && m[1] && !/^(?:new|create|shared|settings)$/i.test(m[1])) id = decodeURIComponent(m[1]);
    }
    const isProject = Boolean(id || /\/(?:projects?|project)\//i.test(path));
    return { id, key:id ? `project:${id}` : (isProject ? `route:${path}` : null), isProject };
  }

  function getProjectIdFromUrl() {
    return projectIdentityFromUrl().id;
  }

  function getProjectOverrideKey(projectId) {
    return projectId ? `project:${projectId}` : `path:${location.pathname.split('/').slice(0,6).join('/')}`;
  }

  function isSharedProjectElement(el) {
    let node = el;
    for (let i=0; node && i<4; i++, node=node.parentElement) {
      const meta = [node.getAttribute?.('aria-label'), node.getAttribute?.('title'), node.getAttribute?.('data-testid')]
        .filter(Boolean).join(' ');
      if (/shared(?:\s+with\s+you)?/i.test(meta)) return true;
    }
    return false;
  }

  function registryEntryForId(projectId) {
    if (!projectId) return null;
    const registry = settings.projectRegistry || {};
    return registry[`project:${projectId}`] || null;
  }

  function rememberProject({id, name, href, shared=false, source='dom'} = {}) {
    name = seededProjectName(name);
    if (!id || !name) return false;
    settings.projectRegistry = settings.projectRegistry || {};
    const key = `project:${id}`;
    const prev = settings.projectRegistry[key] || {};
    const aliases = new Set([...(prev.aliases || []), name]);
    const next = {
      id,
      name: prev.name || name,
      aliases:[...aliases].slice(-12),
      shared:Boolean(prev.shared || shared),
      href: href || prev.href || '',
      source,
      firstSeen: prev.firstSeen || Date.now(),
      lastSeen: Date.now(),
    };
    const materiallyChanged = !prev.id || prev.name !== next.name || prev.shared !== next.shared || prev.href !== next.href || JSON.stringify(prev.aliases || []) !== JSON.stringify(next.aliases);
    settings.projectRegistry[key] = next;
    if (materiallyChanged) save();
    return materiallyChanged;
  }

  function scanProjectRegistryFromDom(force=false) {
    const now = Date.now();
    if (!force && now - lastRegistryScan < 1500) return Object.values(settings.projectRegistry || {});
    lastRegistryScan = now;
    settings.projectRegistry = settings.projectRegistry || {};

    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      const info = projectIdentityFromUrl(href);
      if (!info.id || !info.isProject) return;
      const values = [link.textContent, link.getAttribute('aria-label'), link.getAttribute('title')];
      const name = values.map(cleanProjectName).find(Boolean);
      if (!name) return;
      rememberProject({id:info.id, name, href, shared:isSharedProjectElement(link), source:'sidebar'});
    });
    return Object.values(settings.projectRegistry || {});
  }

  function projectCandidatesForId(projectId) {
    const out=[];
    if (projectId) {
      document.querySelectorAll(`a[href*="${CSS.escape(projectId)}"], button[aria-controls*="${CSS.escape(projectId)}"]`).forEach(el=>out.push(el));
    }
    document.querySelectorAll([
      'a[aria-current="page"][href*="g-p-"]',
      'a[data-active="true"][href*="g-p-"]',
      'a[aria-current="page"][href*="/project"]',
      'a[data-active="true"][href*="/project"]',
      'header a[href*="g-p-"]',
      'nav a[href*="g-p-"]',
      'aside a[href*="g-p-"]'
    ].join(',')).forEach(el=>out.push(el));
    return [...new Set(out)];
  }

  function detectActiveProject() {
    scanProjectRegistryFromDom(false);
    let info = projectIdentityFromUrl();
    let projectId = info.id;

    if (!projectId) {
      const activeProjectLink = document.querySelector(
        'a[aria-current="page"][href*="g-p-"], a[data-active="true"][href*="g-p-"], a[aria-current="page"][href*="/project"]'
      );
      if (activeProjectLink?.getAttribute('href')) {
        const parsed = projectIdentityFromUrl(activeProjectLink.getAttribute('href'));
        if (parsed.id) { projectId = parsed.id; info = parsed; }
      }
    }

    const looksLikeProject = Boolean(
      projectId || info.isProject || /\/(?:projects?|project)\//i.test(location.pathname) ||
      document.querySelector('a[aria-current="page"][href*="g-p-"], a[aria-current="page"][href*="/project"]')
    );

    const candidates = projectCandidatesForId(projectId);
    let best = null;
    let bestScore = -1;
    let bestShared = false;

    for (const el of candidates) {
      const href = el.getAttribute?.('href') || '';
      if (projectId && href) {
        const linked = projectIdentityFromUrl(href);
        if (linked.id && linked.id !== projectId) continue;
      }

      const rect = el.getBoundingClientRect?.();
      const visible = rect ? (rect.width > 0 && rect.height > 0) : true;
      const values = [el.textContent, el.getAttribute?.('aria-label'), el.getAttribute?.('title')];

      for (const value of values) {
        const name = cleanProjectName(value);
        if (!name) continue;
        let score = 0;
        if (visible) score += 20;
        if (el.getAttribute?.('aria-current') === 'page') score += 40;
        if (el.getAttribute?.('data-active') === 'true') score += 25;
        if (/g-p-|\/project/i.test(href)) score += 15;
        if (projectId && href.includes(projectId)) score += 30;
        if (name.length <= 60) score += 5;
        if (score > bestScore) {
          best = seededProjectName(name);
          bestScore = score;
          bestShared = isSharedProjectElement(el);
        }
      }
    }

    if (best) {
      if (projectId) rememberProject({id:projectId,name:best,href:location.href,shared:bestShared,source:'active-dom'});
      return { inProject:true, id:projectId, name:best, source:'dom', shared:bestShared };
    }

    const remembered = registryEntryForId(projectId);
    if (remembered?.name) {
      return { inProject:true, id:projectId, name:remembered.name, source:'registry', shared:Boolean(remembered.shared) };
    }

    // Last-resort current-page heading/name detection. This also learns shared projects
    // opened directly by a URL before they are pinned/rendered in the sidebar.
    if (looksLikeProject) {
      const pageCandidates = [
        '[data-testid="project-name"]','[data-testid="project-title"]',
        'header h1','header h2','main h1','[aria-label^="Project:"]'
      ];
      for (const selector of pageCandidates) {
        const el = document.querySelector(selector);
        const name = cleanProjectName(el?.textContent || el?.getAttribute?.('aria-label') || el?.getAttribute?.('title'));
        if (name) {
          const canonical = seededProjectName(name);
          if (projectId) rememberProject({id:projectId,name:canonical,href:location.href,shared:isSharedProjectElement(el),source:'page'});
          return { inProject:true,id:projectId,name:canonical,source:'page',shared:isSharedProjectElement(el) };
        }
      }
    }

    // Manual override is deliberately the final fallback. Automatic URL/DOM/header/registry
    // evidence always wins so renamed/shared projects self-correct without stale overrides.
    if (looksLikeProject) {
      const overrideKey = getProjectOverrideKey(projectId);
      const override = cleanProjectName(settings.projectOverrides?.[overrideKey]);
      if (override) {
        if (projectId) rememberProject({id:projectId,name:override,href:location.href,source:'manual-fallback'});
        return { inProject:true, id:projectId, name:override, source:'manual', shared:Boolean(registryEntryForId(projectId)?.shared) };
      }
    }

    return { inProject:looksLikeProject, id:projectId, name:null, source:looksLikeProject?'unresolved':'none', shared:false };
  }

  function projectSignature(p) {
    return `${p.inProject}|${p.id || ''}|${p.name || ''}|${p.source || ''}|${p.shared?'shared':'owned-or-unknown'}`;
  }

  function ensureProjectBadge() {
    if (projectBadgeHost) return;

    projectBadgeHost = document.createElement('div');
    projectBadgeHost.id = 'gk-project-context-badge';
    projectBadgeHost.style.cssText = 'all:initial;position:fixed;right:16px;bottom:16px;z-index:2147483646;';
    document.documentElement.appendChild(projectBadgeHost);

    projectBadgeShadow = projectBadgeHost.attachShadow({mode:'open'});
    projectBadgeShadow.innerHTML = `
      <style>
        *{box-sizing:border-box}
        button{
          appearance:none;border:1px solid rgba(128,128,128,.28);border-radius:999px;
          padding:10px 14px;background:rgba(255,255,255,.94);color:#202124;
          box-shadow:0 7px 24px rgba(0,0,0,.16);backdrop-filter:blur(14px);
          font:750 12.5px/1.25 ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          cursor:pointer;max-width:min(360px,calc(100vw - 32px));white-space:nowrap;
          overflow:hidden;text-overflow:ellipsis
        }
        button.ok{border-color:rgba(22,163,74,.35)}
        button.warn{border-color:rgba(217,119,6,.45)}
        button.generic{opacity:.64;font-weight:650}
        button:hover{transform:translateY(-1px);box-shadow:0 9px 28px rgba(0,0,0,.20)}
        @media(prefers-color-scheme:dark){
          button{background:rgba(30,30,32,.94);color:#f4f4f5}
        }
      </style>
      <button type="button" title="Click to confirm or override the active ChatGPT Project"></button>
    `;
    projectBadgeButton = projectBadgeShadow.querySelector('button');
    projectBadgeButton.addEventListener('click', () => {
      setProjectOverrideInteractively();
    });
  }

  function updateProjectBadge() {
    ensureProjectBadge();
    const p = activeProject;

    if (p.inProject && p.name) {
      projectBadgeButton.className = 'ok';
      projectBadgeButton.textContent = `✓ ${p.shared?'Shared Project':'Project'}: ${p.name}`;
    } else if (p.inProject) {
      projectBadgeButton.className = 'warn';
      projectBadgeButton.textContent = '! Project name not detected';
    } else {
      projectBadgeButton.className = 'generic';
      projectBadgeButton.textContent = '• Generic chat';
    }
  }

  function refreshProjectContext(force=false) {
    const next = detectActiveProject();
    const sig = projectSignature(next);
    if (force || sig !== lastProjectSignature) {
      activeProject = next;
      lastProjectSignature = sig;
      updateProjectBadge();
      if (paletteOpen) render();
    }
    return activeProject;
  }

  function setProjectOverrideInteractively() {
    const p = refreshProjectContext(true);
    const key = getProjectOverrideKey(p.id);
    const current = p.name || '';

    const value = prompt(
      'Confirm active ChatGPT Project name.\n\nLeave blank to clear the manual override and return to automatic detection.',
      current
    );

    if (value === null) return false;

    const cleaned = cleanProjectName(value);
    settings.projectOverrides = settings.projectOverrides || {};

    if (cleaned) settings.projectOverrides[key] = cleaned;
    else delete settings.projectOverrides[key];

    save();
    refreshProjectContext(true);
    return Boolean(cleaned || activeProject.name);
  }

  function projectDirectiveFor(root) {
    const p = refreshProjectContext();
    if (!settings.projectAware || !settings.projectContextInjection || !p.inProject || !p.name) return '';

    const existing = getText(root);
    if (/\[PROJECT CONTEXT:/i.test(existing)) return '';

    return `\n[PROJECT CONTEXT: ${p.name}${p.shared?' | Shared Project':''} | Treat this active ChatGPT Project's instructions, files, references, prior decisions and existing conversation context as authoritative. Apply the command specifically to this project; do not answer generically or ask me to repeat information already available in the project.]`;
  }


  function categoryAccent(category) {
    return CATEGORY_ACCENTS[category] || CATEGORY_ACCENTS["★ Master Bundles"];
  }

  function brandProfileForProject(projectName) {
    const q = normalizeProjectName(projectName);
    if (!q) return null;
    for (const [alias, profile] of Object.entries(KNOWN_BRAND_PROFILES)) {
      const a = normalizeProjectName(alias);
      if (q.includes(a) || a.includes(q)) return profile;
    }
    return null;
  }

  function brandDirectiveFor(root) {
    const p = refreshProjectContext();
    if (!p?.name) return '';
    const profile = brandProfileForProject(p.name);
    if (!profile) return '';
    const existing = getText(root);
    if (/\[BRAND PROFILE:/i.test(existing)) return '';
    return `\n[BRAND PROFILE: ${profile.name} | Category: ${profile.category}. Tone: ${profile.tone}. Preferred: ${profile.visual}. Strictly avoid: ${profile.avoid}. Current uploaded product/brief overrides this stored profile if they conflict.]`;
  }

  function commandDirectiveFor(command, root) {
    if (!settings.smartCommandInstructions || !command) return '';
    const tags = new Set(command.tags || []);
    const shouldExpand = tags.has('smart-expand') || tags.has('bundle');
    if (!shouldExpand) return '';
    const existing = getText(root);
    const chunks = [];

    if (!existing.includes(`[COMMAND MODE: ${command.name}`)) {
      chunks.push(`\n[COMMAND MODE: ${command.name} | ${command.expansion || command.description || 'Execute the selected command precisely.'}]`);
    }

    if (settings.creativeStudioRuntime && tags.has('studio-manual') && !/\[CREATIVE STUDIO RUNTIME:/i.test(existing)) {
      chunks.push(`\n[CREATIVE STUDIO RUNTIME: ${CREATIVE_STUDIO_RUNTIME}]`);
    }

    if (settings.creativeStudioRuntime && ['/creative','/surprise','/variation','/redesign','/artdirect','/CREATIVE-STUDIO-MAX','/SOCIAL-CREATIVE-MAX'].includes(command.name) && !/\[ANTI-REPEAT ROTATION:/i.test(existing)) {
      chunks.push(`\n[ANTI-REPEAT ROTATION: Rotate intelligently among these structural families when brand-appropriate: ${ART_DIRECTION_FAMILIES.join('; ')}. Never mechanically reuse the last campaign structure.]`);
    }
    return chunks.join('');
  }

  function isEditable(el) {
    if (!el || !(el instanceof Element)) return null;
    if (el.matches('textarea, input[type="text"], input:not([type])')) return el;
    return el.closest('[contenteditable="true"], [contenteditable="plaintext-only"]');
  }

  function getText(root) {
    if (!root) return '';
    if (root.tagName === 'TEXTAREA' || root.tagName === 'INPUT') return root.value || '';
    return root.innerText ?? root.textContent ?? '';
  }

  function getCaretOffset(root) {
    if (root.tagName === 'TEXTAREA' || root.tagName === 'INPUT') {
      return root.selectionStart ?? root.value.length;
    }
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return getText(root).length;
    const range = sel.getRangeAt(0);
    if (!root.contains(range.endContainer)) return getText(root).length;
    const pre = range.cloneRange();
    pre.selectNodeContents(root);
    pre.setEnd(range.endContainer, range.endOffset);
    return pre.toString().length;
  }

  function getFragment(root) {
    const text = getText(root);
    const caret = getCaretOffset(root);
    const before = text.slice(0, caret);
    const m = before.match(/(?:^|\s)(\/[^\s]*)$/);
    if (!m) return null;
    const token = m[1];
    return { token, query: token.slice(1), start: caret - token.length, end: caret };
  }

  function findPoint(root, offset) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let pos = 0, node;
    while ((node = walker.nextNode())) {
      const len = node.nodeValue.length;
      if (offset <= pos + len) return { node, offset: Math.max(0, offset - pos) };
      pos += len;
    }
    return { node: root, offset: root.childNodes.length };
  }

  function replaceText(root, start, end, replacement) {
    if (root.tagName === 'TEXTAREA' || root.tagName === 'INPUT') {
      const value = root.value || '';
      const next = value.slice(0, start) + replacement + value.slice(end);
      const proto = root.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      setter ? setter.call(root, next) : (root.value = next);
      const cursor = start + replacement.length;
      root.setSelectionRange(cursor, cursor);
      root.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: replacement }));
      return;
    }

    root.focus();
    const sp = findPoint(root, start), ep = findPoint(root, end);
    const range = document.createRange();
    try {
      range.setStart(sp.node, sp.offset);
      range.setEnd(ep.node, ep.offset);
    } catch {
      range.selectNodeContents(root); range.collapse(false);
    }
    const sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(range);

    let ok = false;
    try { ok = document.execCommand('insertText', false, replacement); } catch {}
    if (!ok) {
      range.deleteContents();
      const node = document.createTextNode(replacement);
      range.insertNode(node);
      range.setStartAfter(node); range.collapse(true);
      sel.removeAllRanges(); sel.addRange(range);
      root.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: replacement }));
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
    })[ch]);
  }

  function categoryCounts() {
    const counts = {};
    COMMANDS.forEach(c => counts[c.category] = (counts[c.category] || 0) + 1);
    return counts;
  }

  function normalizeSearchQuery(q) {
    return String(q || '').toLowerCase().trim().replace(/^\/+/, '').replace(/\s+/g, ' ');
  }

  function score(c, rawQuery) {
    const q = normalizeSearchQuery(rawQuery);
    if (!q) return 0;
    const name = String(c.name || '').toLowerCase();
    const bare = name.replace(/^\//, '');
    const desc = String(c.description || '').toLowerCase();
    const cat = String(c.category || '').toLowerCase();
    const expansion = String(c.expansion || '').toLowerCase();
    const tags = (c.tags || []).join(' ').toLowerCase();
    const words = q.split(' ').filter(Boolean);
    let s = 0;
    if (bare === q) s += 420;
    if (bare.startsWith(q)) s += 300;
    if (bare.includes(q)) s += 190;
    if (desc.includes(q)) s += 90;
    if (cat.includes(q)) s += 70;
    if (tags.includes(q)) s += 55;
    if (expansion.includes(q)) s += 45;
    if (words.length > 1) {
      const hay = `${bare} ${desc} ${cat} ${tags} ${expansion}`;
      const matched = words.filter(w => hay.includes(w)).length;
      s += matched * 45;
      if (matched === words.length) s += 90;
    }
    if ((settings.favorites || []).includes(c.name)) s += 12;
    let qi = 0;
    for (const ch of bare) {
      if (ch === q[qi]) qi++;
      if (qi === q.length) { s += 38; break; }
    }
    return s;
  }

  function searchCommandMatches(q) {
    if (!normalizeSearchQuery(q)) return [];
    return COMMANDS.map(c => ({ c, s: score(c, q) }))
      .filter(x => x.s > 0)
      .sort((a,b) => b.s - a.s || a.c.name.localeCompare(b.c.name));
  }

  function searchCommands(q) {
    return searchCommandMatches(q)
      .slice(0, 100)
      .map(x => ({ type:'command', command:x.c }));
  }

  function categoryItems() {
    const counts = categoryCounts();
    const items = [];
    const favCount = (settings.favorites || []).length;
    items.push({
      type:'category',
      category:'__favorites__',
      icon:'★',
      label:'Favorites',
      description:'Your most-used commands',
      count:favCount
    });

    CATEGORY_ORDER.forEach(cat => {
      const meta = CATEGORY_META[cat] || ['•', cat, ''];
      items.push({
        type:'category',
        category:cat,
        icon:meta[0],
        label:meta[1],
        description:meta[2],
        count:counts[cat] || 0
      });
    });
    return items;
  }

  function commandsForCategory(cat) {
    let list;
    if (cat === '__favorites__') {
      const favSet = new Set(settings.favorites || []);
      list = COMMANDS.filter(c => favSet.has(c.name));
    } else {
      list = COMMANDS.filter(c => c.category === cat);
    }
    return list
      .sort((a,b) => {
        const af = (settings.favorites || []).includes(a.name) ? 1 : 0;
        const bf = (settings.favorites || []).includes(b.name) ? 1 : 0;
        return bf-af || a.name.localeCompare(b.name);
      })
      .map(c => ({type:'command', command:c}));
  }

  function ensurePalette() {
    if (host) return;
    host = document.createElement('div');
    host.id = 'gk-vm-command-palette';
    host.style.cssText = 'all:initial;position:fixed;z-index:2147483647;display:none;';
    document.documentElement.appendChild(host);

    shadow = host.attachShadow({mode:'open'});
    shadow.innerHTML = `
      <style>
        :host{all:initial;--neon:#9cff00;--neon2:#62ff00;--neonSoft:rgba(156,255,0,.11);--neonMid:rgba(156,255,0,.22);--panel:#090d0e;--panel2:#0d1214;--card:#101517;--card2:#12191b;--line:rgba(202,255,218,.10);--text:#f6f8f5;--muted:#98a29d}
        *{box-sizing:border-box}
        .panel{width:min(1080px,calc(100vw - 28px));height:min(720px,82vh);min-height:520px;overflow:hidden;border:1px solid rgba(156,255,0,.18);border-radius:22px;background:linear-gradient(145deg,rgba(8,13,14,.992),rgba(5,9,10,.995));color:var(--text);box-shadow:0 30px 100px rgba(0,0,0,.58),0 0 0 1px rgba(255,255,255,.025) inset,0 0 52px rgba(113,255,0,.045);backdrop-filter:blur(26px);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:flex;flex-direction:column}
        .head{padding:18px 22px 12px;border-bottom:1px solid var(--line);background:radial-gradient(circle at 12% 0%,rgba(134,255,0,.08),transparent 30%)}
        .topline{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
        .identity{display:flex;gap:13px;align-items:flex-start;min-width:0}
        .logo{width:42px;height:42px;border:1px solid rgba(156,255,0,.65);border-radius:13px;display:grid;place-items:center;color:var(--neon);background:linear-gradient(145deg,rgba(156,255,0,.15),rgba(156,255,0,.025));box-shadow:0 0 22px rgba(156,255,0,.12);font-size:21px;font-weight:900;flex:0 0 auto}
        .title{font-size:20px;line-height:1.05;font-weight:900;letter-spacing:-.02em;color:#fff}
        .subline{margin-top:6px;font-size:11.5px;color:#9da7a2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.subline b{color:var(--neon);font-weight:800}.dot{color:var(--neon);padding:0 6px}
        .project-line{margin-top:9px;font-size:12px;font-weight:780;color:#c7d0cb;display:flex;align-items:center;gap:7px}.project-line .led{width:7px;height:7px;border-radius:50%;background:var(--neon);box-shadow:0 0 12px var(--neon)}.project-line strong{color:var(--neon)}
        .brand-chip{all:unset;box-sizing:border-box;cursor:pointer;white-space:nowrap;padding:9px 13px;border-radius:999px;border:1px solid rgba(156,255,0,.38);background:linear-gradient(180deg,rgba(156,255,0,.13),rgba(156,255,0,.045));color:#ddffba;font-size:11.5px;font-weight:850;box-shadow:0 0 20px rgba(156,255,0,.06);transition:.14s ease}.brand-chip:hover{border-color:var(--neon);box-shadow:0 0 26px rgba(156,255,0,.16);transform:translateY(-1px)}
        .hubbar{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:9px;padding:12px 18px;border-bottom:1px solid var(--line)}
        .hub{all:unset;box-sizing:border-box;cursor:pointer;min-height:48px;border:1px solid rgba(255,255,255,.07);border-radius:13px;background:linear-gradient(180deg,#111719,#0d1214);display:flex;align-items:center;justify-content:center;gap:8px;color:#aab2ae;font-size:12px;font-weight:820;transition:.14s ease}.hub .hi{font-size:15px;opacity:.85}.hub:hover{border-color:rgba(156,255,0,.28);color:#eaffd6}.hub.sel{color:white;border-color:rgba(156,255,0,.78);background:linear-gradient(180deg,rgba(135,255,0,.24),rgba(69,126,0,.16));box-shadow:0 0 0 1px rgba(156,255,0,.18) inset,0 0 23px rgba(156,255,0,.15)}.hub.sel .hi{color:var(--neon);filter:drop-shadow(0 0 7px rgba(156,255,0,.6))}
        .quickbar{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;padding:9px 18px 11px;border-bottom:1px solid var(--line)}
        .quick{all:unset;box-sizing:border-box;cursor:pointer;height:34px;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:#101517;color:#a6afaa;display:flex;align-items:center;justify-content:center;gap:7px;font-size:10.5px;font-weight:720;transition:.13s ease}.quick:hover{border-color:rgba(156,255,0,.28);color:#eaffd6}.quick.sel{border-color:rgba(156,255,0,.62);color:#fff;background:rgba(156,255,0,.10);box-shadow:0 0 16px rgba(156,255,0,.08)}.quick .qi{color:var(--neon);font-weight:900}
        .searchwrap{display:flex;align-items:center;gap:10px;padding:10px 18px 11px;border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(8,13,14,.74),rgba(8,12,13,.92))}
        .searchbox{min-width:0;flex:1;height:44px;display:grid;grid-template-columns:34px minmax(0,1fr) auto auto;align-items:center;gap:8px;padding:0 10px;border:1px solid rgba(156,255,0,.20);border-radius:13px;background:linear-gradient(180deg,rgba(15,22,20,.96),rgba(10,16,15,.97));box-shadow:0 0 0 1px rgba(255,255,255,.018) inset;transition:border-color .14s ease,box-shadow .14s ease,background .14s ease}
        .searchbox:focus-within{border-color:rgba(156,255,0,.78);background:linear-gradient(180deg,rgba(19,29,23,.98),rgba(10,18,14,.98));box-shadow:0 0 0 2px rgba(156,255,0,.08),0 0 26px rgba(156,255,0,.11)}
        .searchicon{display:grid;place-items:center;color:var(--neon);font-size:17px;filter:drop-shadow(0 0 7px rgba(156,255,0,.34))}
        .searchinput{all:unset;box-sizing:border-box;width:100%;min-width:0;color:#f8fff3;font-size:13px;font-weight:690;letter-spacing:.002em;caret-color:var(--neon)}.searchinput::placeholder{color:#68736c;font-weight:610}
        .searchscope{white-space:nowrap;padding:5px 7px;border:1px solid rgba(156,255,0,.13);border-radius:7px;background:rgba(156,255,0,.045);color:#7f9184;font:800 8.5px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em}
        .searchcount{white-space:nowrap;min-width:64px;text-align:right;color:#87928b;font:800 9.5px ui-monospace,SFMono-Regular,Menlo,monospace}.searchcount.hit{color:#bfff78}
        .searchclear{all:unset;box-sizing:border-box;display:none;cursor:pointer;width:25px;height:25px;border-radius:7px;place-items:center;color:#8e9992;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);font-size:14px;font-weight:900}.searchclear.show{display:grid}.searchclear:hover{color:#fff;border-color:rgba(156,255,0,.35);background:rgba(156,255,0,.08)}
        .workspace{display:grid;grid-template-columns:210px minmax(0,1fr);gap:0;min-height:0;flex:1}
        .sidebar{border-right:1px solid var(--line);background:linear-gradient(180deg,rgba(13,18,20,.78),rgba(7,11,12,.7));padding:11px 9px;overflow:auto}
        .side{all:unset;box-sizing:border-box;width:100%;cursor:pointer;display:grid;grid-template-columns:26px 1fr auto;align-items:center;gap:7px;padding:9px 10px;margin-bottom:5px;border:1px solid transparent;border-radius:10px;color:#a5ada9;font-size:11px;transition:.13s ease;position:relative}.side:hover{background:rgba(255,255,255,.035);color:#e6ece8}.side.sel{background:linear-gradient(90deg,rgba(156,255,0,.16),rgba(156,255,0,.04));color:#fff;border-color:rgba(156,255,0,.32);box-shadow:0 0 18px rgba(156,255,0,.055)}.side.sel:before{content:"";position:absolute;left:0;top:7px;bottom:7px;width:3px;border-radius:0 4px 4px 0;background:var(--neon);box-shadow:0 0 10px rgba(156,255,0,.7)}.side .si{font-size:15px;text-align:center;color:#909b95}.side.sel .si{color:var(--neon)}.side .sl{font-weight:740;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.side .sc{font-size:9px;color:#657069}
        .content{display:flex;flex-direction:column;min-width:0;min-height:0;background:radial-gradient(circle at 90% 0%,rgba(156,255,0,.025),transparent 32%)}
        .contenthead{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 14px 7px;border-bottom:1px solid rgba(255,255,255,.035);min-height:38px}.crumb{font-size:10.5px;color:#77817c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.crumb strong{color:#bdc7c1}.hint{font:10px ui-monospace,SFMono-Regular,Menlo,monospace;color:#69736e;white-space:nowrap}
        .list{overflow:auto;padding:8px 11px 12px;min-height:0;scrollbar-color:rgba(156,255,0,.55) rgba(255,255,255,.035);scrollbar-width:thin}.list::-webkit-scrollbar{width:8px}.list::-webkit-scrollbar-track{background:rgba(255,255,255,.025);border-radius:99px}.list::-webkit-scrollbar-thumb{background:linear-gradient(var(--neon),#5d9700);border-radius:99px}
        .row{display:grid;grid-template-columns:42px minmax(155px,230px) minmax(0,1fr) 24px;gap:10px;align-items:center;padding:9px 10px;margin:2px 0;border:1px solid rgba(255,255,255,.055);border-radius:13px;background:linear-gradient(180deg,rgba(18,24,26,.90),rgba(12,17,19,.91));cursor:pointer;transition:.13s ease;position:relative;overflow:hidden}.row:hover{border-color:rgba(156,255,0,.24);background:linear-gradient(180deg,rgba(22,30,27,.96),rgba(13,19,17,.96));transform:translateX(1px)}.row.sel{border-color:rgba(156,255,0,.80);background:linear-gradient(90deg,rgba(68,117,7,.38),rgba(15,27,18,.96) 42%,rgba(13,18,20,.96));box-shadow:0 0 0 1px rgba(156,255,0,.12) inset,0 0 25px rgba(156,255,0,.13)}.row.sel:before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:4px;border-radius:0 5px 5px 0;background:var(--neon);box-shadow:0 0 12px var(--neon)}
        .ricon{width:34px;height:34px;border-radius:10px;border:1px solid rgba(156,255,0,.15);display:grid;place-items:center;color:#8edb16;background:rgba(156,255,0,.035);font-size:15px;font-weight:900}.row.sel .ricon{color:var(--neon);border-color:rgba(156,255,0,.48);background:rgba(156,255,0,.09);box-shadow:0 0 14px rgba(156,255,0,.10)}
        .cmd{font:850 12.5px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#9dff00;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fav{color:#dfff56;margin-right:5px}.bundle{color:#b5ff4e}.copy{min-width:0}.name{font-size:13.5px;font-weight:850;color:#f5f7f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.desc{font-size:10.7px;color:#8c9690;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.arrow{color:#657069;font-size:20px;text-align:center}.row.sel .arrow{color:var(--neon)}
        .empty{padding:42px 18px;text-align:center;color:#7f8983;font-size:12px}.empty b{display:block;color:#d7ded9;font-size:14px;margin-bottom:5px}
        .footer{height:44px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 15px;background:rgba(7,11,12,.87);flex:0 0 auto}.version{font:10px ui-monospace,SFMono-Regular,Menlo,monospace;color:#6e7872}.keys{display:flex;gap:10px;color:#626c66;font-size:9.5px}.keys kbd{font:inherit;color:#9ba49f;border:1px solid rgba(255,255,255,.11);border-radius:5px;padding:2px 5px;background:rgba(255,255,255,.025)}.sync{all:unset;box-sizing:border-box;cursor:pointer;padding:7px 12px;border-radius:10px;border:1px solid rgba(156,255,0,.52);background:linear-gradient(180deg,rgba(156,255,0,.18),rgba(156,255,0,.06));color:#f3ffe7;font-size:10.5px;font-weight:850;box-shadow:0 0 18px rgba(156,255,0,.08);transition:.13s ease}.sync:hover{border-color:var(--neon);box-shadow:0 0 24px rgba(156,255,0,.19)}
        @media(max-width:820px){.panel{width:calc(100vw - 16px);height:min(760px,88vh)}.workspace{grid-template-columns:158px minmax(0,1fr)}.row{grid-template-columns:36px minmax(120px,180px) minmax(0,1fr) 18px}.sidebar{padding:9px 6px}.hubbar{gap:5px;padding-left:9px;padding-right:9px}.quickbar{padding-left:9px;padding-right:9px}.hub{font-size:10px}.head{padding-left:14px;padding-right:14px}.title{font-size:17px}}
        @media(max-width:620px){.panel{height:90vh}.workspace{grid-template-columns:1fr}.sidebar{display:flex;border-right:0;border-bottom:1px solid var(--line);overflow:auto;padding:7px;gap:5px;min-height:48px}.side{width:auto;min-width:max-content;margin:0;grid-template-columns:18px 1fr;padding:7px 9px}.side .sc{display:none}.content{min-height:0}.hubbar{grid-template-columns:repeat(3,1fr)}.quickbar{grid-template-columns:repeat(5,minmax(72px,1fr));overflow:auto}.searchwrap{padding:8px}.searchbox{grid-template-columns:30px minmax(0,1fr) auto;height:42px}.searchscope{display:none}.searchcount{font-size:8.5px;min-width:54px}.row{grid-template-columns:34px minmax(120px,1fr) 18px}.copy{grid-column:2/3}.cmd{font-size:11.5px}.name{font-size:12px}.desc{font-size:10px}.arrow{grid-column:3}.keys{display:none}.brand-chip{font-size:10px}.subline{display:none}}
      </style>
      <div class="panel">
        <div class="head">
          <div class="topline">
            <div class="identity"><div class="logo">⚡</div><div><div class="title">Gaurev Command Palette</div><div class="subline">Right dock <span class="dot">•</span> Project aware <span class="dot">•</span> Smart commands <span class="dot">•</span> Live context</div><div class="project-line"></div></div></div>
            <button class="brand-chip" type="button"></button>
          </div>
        </div>
        <div class="hubbar"></div>
        <div class="quickbar"></div>
        <div class="searchwrap"><div class="searchbox"><span class="searchicon">⌕</span><input class="searchinput" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Find any command" placeholder="Find any command — try seedance, product, carousel, identity…"><span class="searchscope">ALL COMMANDS</span><span class="searchcount">⌘K / Ctrl K</span><button class="searchclear" type="button" aria-label="Clear search">×</button></div></div>
        <div class="workspace">
          <div class="sidebar"></div>
          <div class="content"><div class="contenthead"><div class="crumb"></div><div class="hint"></div></div><div class="list"></div></div>
        </div>
        <div class="footer"><div class="version"></div><div class="keys"><span><kbd>⌘K</kbd> find</span><span><kbd>↑↓</kbd> navigate</span><span><kbd>Enter</kbd> insert</span><span><kbd>Tab</kbd> stack</span><span><kbd>←</kbd> clear filter</span><span><kbd>Esc</kbd> close</span></div><button class="sync" type="button">⚡ Sync context</button></div>
      </div>`;
    listEl = shadow.querySelector('.list');
    hintEl = shadow.querySelector('.hint');
    crumbEl = shadow.querySelector('.crumb');
    titleEl = shadow.querySelector('.title');
    sideEl = shadow.querySelector('.sidebar');
    hubEl = shadow.querySelector('.hubbar');
    quickEl = shadow.querySelector('.quickbar');
    searchBarEl = shadow.querySelector('.searchbox');
    searchInputEl = shadow.querySelector('.searchinput');
    searchClearEl = shadow.querySelector('.searchclear');
    searchCountEl = shadow.querySelector('.searchcount');
    brandChipEl = shadow.querySelector('.brand-chip');
    projectLineEl = shadow.querySelector('.project-line');
    footerVersionEl = shadow.querySelector('.version');
    syncButtonEl = shadow.querySelector('.sync');

    function clearPaletteSearch(keepFocus=false) {
      paletteSearchQuery='';
      mode='commands';
      selectedIndex=0;
      if (searchInputEl) searchInputEl.value='';
      render();
      if (keepFocus) setTimeout(()=>searchInputEl?.focus(),0);
    }

    searchBarEl?.addEventListener('mousedown',e=>e.stopPropagation());
    searchInputEl?.addEventListener('click',e=>e.stopPropagation());
    searchInputEl?.addEventListener('input',e=>{
      e.stopPropagation();
      paletteSearchQuery=e.target.value;
      mode=normalizeSearchQuery(paletteSearchQuery)?'search':'commands';
      activeCategory=null;
      activeQuickFilter=null;
      selectedIndex=0;
      render();
    });
    searchInputEl?.addEventListener('keydown',e=>{
      e.stopPropagation();
      if ((e.metaKey||e.ctrlKey) && ['k','f'].includes(e.key.toLowerCase())) { e.preventDefault(); searchInputEl.select(); return; }
      if (e.key==='ArrowDown') { e.preventDefault(); selectedIndex=(selectedIndex+1)%Math.max(1,visibleItems.length); updateSelection(); }
      else if (e.key==='ArrowUp') { e.preventDefault(); selectedIndex=(selectedIndex-1+Math.max(1,visibleItems.length))%Math.max(1,visibleItems.length); updateSelection(); }
      else if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); activateItem(selectedIndex,false); }
      else if (e.key==='Tab') { e.preventDefault(); activateItem(selectedIndex,true); }
      else if (e.key==='Escape') { e.preventDefault(); if(normalizeSearchQuery(paletteSearchQuery)) clearPaletteSearch(true); else closePalette(); }
    });
    searchClearEl?.addEventListener('mousedown',e=>{e.preventDefault();e.stopPropagation();clearPaletteSearch(true);});

    brandChipEl.addEventListener('click',()=>setProjectOverrideInteractively());
    syncButtonEl.addEventListener('click',()=>{
      refreshProjectContext(true);
      render();
      const old = syncButtonEl.textContent;
      syncButtonEl.textContent = '✓ Context synced';
      setTimeout(()=>{ if(syncButtonEl) syncButtonEl.textContent = old; },900);
    });
  }

  function position(editable) {
    const r = editable.getBoundingClientRect();
    const w = Math.min(1080, window.innerWidth - 28);
    const h = Math.min(720, window.innerHeight * .82);
    const left = Math.max(8, Math.round((window.innerWidth - w) / 2));
    let top = r.top - h - 12;
    if (top < 10) top = Math.max(10, Math.round((window.innerHeight - h) / 2));
    host.style.left = `${left}px`;
    host.style.top = `${top}px`;
  }

  function currentHubCategories() {
    return (HUBS[activeHub] || HUBS.All).filter(cat => CATEGORY_ORDER.includes(cat));
  }

  function commandIcon(command) {
    const n = String(command?.name || '');
    if (/linkedin/i.test(n)) return 'in';
    if (/video|seedance|kling|runway|reel/i.test(n)) return '▶';
    if (/cgi|product|pack|label|mockup/i.test(n)) return '⬡';
    if (/camera|motion|transition/i.test(n)) return '◉';
    if (/creative|surprise|variation|artdirect|trend/i.test(n)) return '✦';
    if (/carousel|story|social/i.test(n)) return '▤';
    if (/brand|palette|typography/i.test(n)) return '◇';
    return '⌘';
  }

  function hubCommandItems() {
    const cats = new Set(currentHubCategories());
    let list = COMMANDS.filter(c => activeHub === 'All' || cats.has(c.category));
    if (activeCategory) list = list.filter(c => c.category === activeCategory);
    if (activeQuickFilter) {
      const terms = new Set(activeQuickFilter.terms);
      list = list.filter(c => terms.has(c.name) || activeQuickFilter.terms.some(t => c.name.startsWith(t + '-')));
    }
    const fav = new Set(settings.favorites || []);
    return list.sort((a,b)=>{
      const af=fav.has(a.name)?1:0,bf=fav.has(b.name)?1:0;
      const am=(a.tags||[]).includes('studio-manual')?1:0,bm=(b.tags||[]).includes('studio-manual')?1:0;
      return bf-af || bm-am || a.name.localeCompare(b.name);
    }).map(c=>({type:'command',command:c}));
  }

  function renderHubBar() {
    hubEl.innerHTML='';
    Object.keys(HUBS).forEach(hubName=>{
      const meta=HUB_META[hubName]||['•',hubName];
      const b=document.createElement('button');
      b.type='button'; b.className='hub'+(activeHub===hubName?' sel':'');
      b.innerHTML=`<span class="hi">${meta[0]}</span><span>${escapeHtml(meta[1])}</span>`;
      b.addEventListener('mousedown',e=>{e.preventDefault();activeHub=hubName;activeCategory=null;activeQuickFilter=null;paletteSearchQuery='';mode='commands';selectedIndex=0;render();});
      hubEl.appendChild(b);
    });
  }

  function renderQuickBar() {
    quickEl.innerHTML='';
    QUICK_FILTERS.forEach(q=>{
      const b=document.createElement('button'); b.type='button';
      const on=activeQuickFilter?.label===q.label;
      b.className='quick'+(on?' sel':'');
      b.innerHTML=`<span class="qi">${escapeHtml(q.icon)}</span><span>${escapeHtml(q.label)}</span>`;
      b.addEventListener('mousedown',e=>{e.preventDefault();activeQuickFilter=on?null:q;activeCategory=null;paletteSearchQuery='';mode='commands';selectedIndex=0;render();});
      quickEl.appendChild(b);
    });
  }

  function renderSidebar() {
    sideEl.innerHTML='';
    const cats=currentHubCategories();
    const counts=categoryCounts();
    const entries=[{cat:null,icon:'⊞',label:'All',count:cats.reduce((s,c)=>s+(counts[c]||0),0)}].concat(cats.map(cat=>({cat,icon:(CATEGORY_META[cat]||['•'])[0],label:(CATEGORY_META[cat]||['',cat])[1],count:counts[cat]||0})));
    entries.forEach(item=>{
      const b=document.createElement('button');b.type='button';
      const on=activeCategory===item.cat;
      b.className='side'+(on?' sel':'');
      b.innerHTML=`<span class="si">${escapeHtml(item.icon)}</span><span class="sl">${escapeHtml(item.label)}</span><span class="sc">${item.count}</span>`;
      b.addEventListener('mousedown',e=>{e.preventDefault();activeCategory=item.cat;activeQuickFilter=null;paletteSearchQuery='';mode='commands';selectedIndex=0;render();});
      sideEl.appendChild(b);
    });
  }

  function renderStatus() {
    const p=refreshProjectContext();
    const profile=brandProfileForProject(p?.name);
    const brand=profile?.name || (p?.name || 'Generic');
    brandChipEl.textContent=`Brand → ${brand} ⌄`;
    if(p?.inProject && p?.name){
      const registryCount=Object.keys(settings.projectRegistry||{}).length;
      projectLineEl.innerHTML=`<span class="led"></span><span><strong>${p.shared?'Shared Project':'Brand/Project'}: ${escapeHtml(brand)}</strong> <span class="dot">•</span> AUTO PROJECT <span class="dot">•</span> ${registryCount} learned</span>`;
    }else if(p?.inProject){
      projectLineEl.innerHTML=`<span class="led"></span><span><strong>Project detected</strong> <span class="dot">•</span> name unresolved</span>`;
    }else{
      projectLineEl.innerHTML=`<span class="led"></span><span><strong>Generic chat</strong> <span class="dot">•</span> Project-aware ready</span>`;
    }
    const version=GM_info?.script?.version||'2.3.0';
    footerVersionEl.textContent=`Script ${version}  •  ${COMMANDS.length} commands  •  ${CATEGORY_ORDER.length} sections`;
  }

  function render() {
    ensurePalette();
    renderStatus();
    renderHubBar();
    renderQuickBar();
    renderSidebar();
    listEl.innerHTML='';

    const searchQ=paletteSearchQuery || currentFragment?.query || '';
    if (searchInputEl && searchInputEl.value !== paletteSearchQuery) searchInputEl.value=paletteSearchQuery;
    const totalSearchMatches=normalizeSearchQuery(searchQ)?searchCommandMatches(searchQ).length:0;
    searchClearEl?.classList.toggle('show',!!normalizeSearchQuery(searchQ));
    if (searchCountEl) {
      searchCountEl.textContent=normalizeSearchQuery(searchQ)?`${totalSearchMatches} found`:'⌘K / Ctrl K';
      searchCountEl.classList.toggle('hit',totalSearchMatches>0);
    }

    if(mode==='search' && normalizeSearchQuery(searchQ)){
      visibleItems=searchCommands(searchQ);
      crumbEl.innerHTML=`<strong>Global Search</strong>  ›  ${escapeHtml(searchQ)}`;
      hintEl.textContent=totalSearchMatches>visibleItems.length?`${visibleItems.length} of ${totalSearchMatches} matches`:`${totalSearchMatches} matches`;
    }else{
      visibleItems=hubCommandItems();
      const trail=[activeHub];
      if(activeCategory) trail.push(CATEGORY_META[activeCategory]?.[1]||activeCategory);
      if(activeQuickFilter) trail.push(activeQuickFilter.label);
      crumbEl.innerHTML=trail.map((x,i)=>i===trail.length-1?`<strong>${escapeHtml(x)}</strong>`:escapeHtml(x)).join('  ›  ');
      hintEl.textContent=`${visibleItems.length} commands`;
    }

    selectedIndex=Math.min(selectedIndex,Math.max(0,visibleItems.length-1));
    if(!visibleItems.length){
      listEl.innerHTML='<div class="empty"><b>No matching commands</b>Try a command name, category, description, tag, or workflow keyword.</div>';
      return;
    }
    visibleItems.forEach((item,i)=>{
      const c=item.command;
      const row=document.createElement('div');
      const isBundle=c.category==='★ Master Bundles';
      const isFav=(settings.favorites||[]).includes(c.name);
      row.className='row'+(i===selectedIndex?' sel':'');
      row.innerHTML=`<div class="ricon">${escapeHtml(commandIcon(c))}</div><div class="cmd ${isBundle?'bundle':''}">${isFav?'<span class="fav">★</span>':''}${escapeHtml(c.name)}</div><div class="copy"><div class="name">${escapeHtml((c.description||c.name).split(/[.;]/)[0])}</div><div class="desc">${settings.showDescriptions?escapeHtml(c.description||''):''}</div></div><div class="arrow">›</div>`;
      row.addEventListener('mouseenter',()=>{selectedIndex=i;updateSelection()});
      row.addEventListener('mousedown',e=>{e.preventDefault();activateItem(i,false)});
      listEl.appendChild(row);
    });
  }

  function updateSelection() {
    const nodes=[...listEl.querySelectorAll('.row')];
    nodes.forEach((n,i)=>n.classList.toggle('sel',i===selectedIndex));
    nodes[selectedIndex]?.scrollIntoView({block:'nearest'});
  }

  function openPalette(editable, fragment) {
    if(!settings.enabled) return;
    refreshProjectContext();
    ensurePalette();
    currentEditable=editable;
    currentFragment=fragment;
    host.style.display='block';
    paletteOpen=true;
    selectedIndex=0;
    paletteSearchQuery=fragment.query||'';
    if(fragment.query){mode='search';activeCategory=null;activeQuickFilter=null;}
    else{mode='commands';}
    render();
    position(editable);
  }

  function closePalette() {
    if(!host) return;
    host.style.display='none';
    paletteOpen=false;
    currentEditable=null;
    currentFragment=null;
    activeCategory=null;
    activeQuickFilter=null;
    paletteSearchQuery='';
    mode='commands';
  }

  function activateItem(index, stack) {
    const item = visibleItems[index];
    if (!item) return;

    if (item.type === 'category') {
      activeCategory = item.category;
      mode = 'commands';
      activeQuickFilter = null;
      selectedIndex = 0;
      render();
      return;
    }

    const c = item.command;
    if (!c || !currentEditable || !currentFragment) return;

    let p = refreshProjectContext(true);
    if (settings.projectAware && p.inProject && !p.name) {
      const confirmed = setProjectOverrideInteractively();
      p = refreshProjectContext(true);
      if (!confirmed || !p.name) {
        alert('Project detected, but its name is unresolved. Command insertion was paused so it does not run with generic context.');
        return;
      }
    }

    const projectDirective = projectDirectiveFor(currentEditable);
    const brandDirective = brandDirectiveFor(currentEditable);
    const commandDirective = commandDirectiveFor(c, currentEditable);
    const suffix = stack && settings.tabStacks ? '\n/' : ' ';
    replaceText(
      currentEditable,
      currentFragment.start,
      currentFragment.end,
      c.name + projectDirective + brandDirective + commandDirective + suffix
    );
    recent = [c.name,...recent.filter(x=>x!==c.name)].slice(0,8);

    if (stack && settings.tabStacks) {
      setTimeout(()=>{
        const frag = getFragment(currentEditable);
        if (frag) openPalette(currentEditable,frag);
      },0);
    } else closePalette();
  }

  function goBack() {
    if (mode === 'search') {
      mode='commands';
      paletteSearchQuery='';
      selectedIndex=0;
      if (currentFragment) currentFragment.query='';
      render();
      return;
    }
    if (activeQuickFilter) { activeQuickFilter=null; selectedIndex=0; render(); return; }
    if (activeCategory) { activeCategory=null; selectedIndex=0; render(); return; }
    if (activeHub !== 'Creatives') { activeHub='Creatives'; selectedIndex=0; render(); }
  }

  document.addEventListener('input',e=>{
    if (!settings.enabled) return;
    const editable=isEditable(e.target);
    if (!editable) return closePalette();
    const frag=getFragment(editable);
    if (frag) openPalette(editable,frag);
    else if (paletteOpen) closePalette();
  },true);

  document.addEventListener('keydown',e=>{
    if (!paletteOpen) return;

    if ((e.metaKey||e.ctrlKey) && ['k','f'].includes(e.key.toLowerCase())) {
      e.preventDefault();e.stopPropagation();
      searchInputEl?.focus();
      searchInputEl?.select();
      return;
    }

    if (e.key==='ArrowDown') {
      e.preventDefault();e.stopPropagation();
      selectedIndex=(selectedIndex+1)%Math.max(1,visibleItems.length);
      updateSelection();
    } else if (e.key==='ArrowUp') {
      e.preventDefault();e.stopPropagation();
      selectedIndex=(selectedIndex-1+Math.max(1,visibleItems.length))%Math.max(1,visibleItems.length);
      updateSelection();
    } else if (e.key==='ArrowLeft' && (mode==='commands' || mode==='search')) {
      e.preventDefault();e.stopPropagation();goBack();
    } else if (e.key==='Enter' && !e.shiftKey) {
      e.preventDefault();e.stopPropagation();activateItem(selectedIndex,false);
    } else if (e.key==='Tab') {
      e.preventDefault();e.stopPropagation();
      if (mode==='categories') activateItem(selectedIndex,false);
      else activateItem(selectedIndex,true);
    } else if (e.key==='Escape') {
      e.preventDefault();e.stopPropagation();closePalette();
    }
  },true);

  document.addEventListener('click',e=>{
    if (!paletteOpen) return;
    const path=e.composedPath?.()||[];
    if (host && path.includes(host)) return;
    if (!isEditable(e.target)) closePalette();
  },true);

  window.addEventListener('resize',()=>{if(paletteOpen&&currentEditable)position(currentEditable)});

  GM_registerMenuCommand(settings.enabled?'Disable command palette':'Enable command palette',()=>{
    settings.enabled=!settings.enabled;save();location.reload();
  });
  GM_registerMenuCommand(settings.showDescriptions?'Hide command descriptions':'Show command descriptions',()=>{
    settings.showDescriptions=!settings.showDescriptions;save();location.reload();
  });
  GM_registerMenuCommand('Reset favorite commands',()=>{
    settings.favorites=[...DEFAULT_FAVORITES];save();alert('Favorites reset.');
  });
  GM_registerMenuCommand('Copy master bundle definitions',()=>{
    const text=Object.entries(BUNDLES).map(([name,stack])=>`${name} => ${stack.join(', ')}`).join('\n');
    GM_setClipboard(text);alert('Master bundle definitions copied.');
  });
  GM_registerMenuCommand(settings.projectAware?'Disable Project-Aware Mode':'Enable Project-Aware Mode',()=>{
    settings.projectAware=!settings.projectAware;save();location.reload();
  });
  GM_registerMenuCommand('Confirm / override active Project',()=>{
    setProjectOverrideInteractively();
  });
  GM_registerMenuCommand('Rescan Projects (owned + shared)',()=>{
    const before=Object.keys(settings.projectRegistry||{}).length;
    const rows=scanProjectRegistryFromDom(true);
    refreshProjectContext(true);
    const after=Object.keys(settings.projectRegistry||{}).length;
    alert(`Project Registry scan complete.\nLearned projects: ${after}\nNew this scan: ${Math.max(0,after-before)}\nShared projects are included whenever ChatGPT exposes them in the sidebar/current page.`);
  });
  GM_registerMenuCommand('Show learned Project Registry',()=>{
    const rows=Object.values(settings.projectRegistry||{}).sort((a,b)=>(a.name||'').localeCompare(b.name||''));
    const text=rows.length ? rows.map((r,i)=>`${i+1}. ${r.name}${r.shared?' [shared]':''}\n   ${r.id}`).join('\n') : 'No project IDs learned yet. Open/visit Projects and the registry will learn them automatically.';
    alert(`Gaurev Project Registry (${rows.length})\n\n${text.slice(0,7000)}`);
  });
  GM_registerMenuCommand('Show Project status',()=>{
    const p=refreshProjectContext(true);
    alert(
      `Project-Aware Mode: ${settings.projectAware?'ON':'OFF'}\n` +
      `In ChatGPT Project: ${p.inProject?'YES':'NO'}\n` +
      `Project: ${p.name||'Not detected'}\n` +
      `Detection: ${p.source}`
    );
  });
  GM_registerMenuCommand(settings.smartCommandInstructions?'Disable smart command instructions':'Enable smart command instructions',()=>{
    settings.smartCommandInstructions=!settings.smartCommandInstructions;save();location.reload();
  });
  GM_registerMenuCommand(settings.creativeStudioRuntime?'Disable Creative Studio runtime':'Enable Creative Studio runtime',()=>{
    settings.creativeStudioRuntime=!settings.creativeStudioRuntime;save();location.reload();
  });
  GM_registerMenuCommand('Show installed version',()=>{
    const version=GM_info?.script?.version||'unknown';
    const p=refreshProjectContext(true);
    alert(
      `Gaurev Command Palette\nVersion: ${version}\nCommands: ${COMMANDS.length}\n` +
      `UI: Creative Studio OS + Project-Aware + Smart Instructions\nProject: ${p.name|| (p.inProject?'Not detected':'Generic chat')}`
    );
  });

  scanProjectRegistryFromDom(true);
  refreshProjectContext(true);
  setInterval(()=>{ scanProjectRegistryFromDom(false); refreshProjectContext(false); },1200);
})();