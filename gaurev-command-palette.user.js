// ==UserScript==
// @name         Gaurev Command Palette for ChatGPT
// @namespace    https://chatgpt.com/gaurev-command-palette
// @version      1.1.2
// @description  Hierarchical slash-command palette for ChatGPT with Gaurev's creative workflow bundles.
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

  const COMMANDS = [{"name": "/EDIT-ME", "category": "★ Master Bundles", "description": "Change wardrobe/world while locking Gaurev’s identity and maximizing realism.", "expansion": "Activates: /gaurev-lock, /face-zero-drift, /body-zero-drift, /change-everything-except-me, /photo-real-max, /no-ai-look", "tags": ["bundle", "favorite"]}, {"name": "/FASHION-ME", "category": "★ Master Bundles", "description": "Gaurev luxury fashion editorial preset with identity lock and realistic materials.", "expansion": "Activates: /gaurev-lock, /quiet-luxury, /gq-mode, /photo-real-max, /real-skin, /real-materials", "tags": ["bundle", "favorite"]}, {"name": "/BILLIONAIRE-ME", "category": "★ Master Bundles", "description": "Tasteful ultra-high-net-worth visual world with quiet luxury and realism.", "expansion": "Activates: /gaurev-lock, /billionaire-mode, /quiet-luxury, /photo-real-max, /no-ai-look, /real-light", "tags": ["bundle", "favorite"]}, {"name": "/MOVIE-ME", "category": "★ Master Bundles", "description": "Hollywood production-still / movie-key-art preset using Gaurev as the locked character.", "expansion": "Activates: /gaurev-lock, /production-still, /movie-poster, /real-light, /real-physics, /photo-real-max", "tags": ["bundle", "favorite"]}, {"name": "/POSTER-MAX", "category": "★ Master Bundles", "description": "Maximum poster/key-art quality with typography, logo and Instagram readability safeguards.", "expansion": "Activates: /blockbuster-keyart, /text-perfect, /logo-exact, /instagram-poster, /photo-real-max, /no-ai-look", "tags": ["bundle", "favorite"]}, {"name": "/IMAGE-MAX", "category": "★ Master Bundles", "description": "Maximum reference fidelity, physical realism, materials, lighting and anti-AI cleanup.", "expansion": "Activates: /reference-exact, /photo-real-max, /no-ai-look, /real-skin, /real-materials, /real-light, /real-physics", "tags": ["bundle", "favorite"]}, {"name": "/STORYBOARD-MAX", "category": "★ Master Bundles", "description": "Full Gaurev storyboard pipeline with hero/end frames and image/video prompt outputs.", "expansion": "Activates: /storyboard-gaurev, /storyboard-10, /storyboard-image-prompts, /storyboard-video-prompts, /hero-frame, /end-frame-lock", "tags": ["bundle", "favorite"]}, {"name": "/SEEDANCE-MAX", "category": "★ Master Bundles", "description": "Full Seedance 2.5 directing stack for reference fidelity, continuity, motion, camera and audio.", "expansion": "Activates: /seedance-director, /seedance-reference-lock, /seedance-continuity, /seedance-real-motion, /seedance-camera-real, /audio-real", "tags": ["bundle", "favorite"]}, {"name": "/REEL-MAX", "category": "★ Master Bundles", "description": "20-second vertical social reel preset with strong first 3 seconds and fast pacing.", "expansion": "Activates: /seedance-20, /seedance-916, /viral-first-3, /seedance-fast-cut, /audio-real", "tags": ["bundle", "favorite"]}, {"name": "/UGC-MAX", "category": "★ Master Bundles", "description": "Authentic smartphone UGC preset: natural performance, jump cuts and real audio.", "expansion": "Activates: /raw-phone-video, /creator-ugc, /no-ad-acting, /jumpcut, /viral-first-3, /audio-real", "tags": ["bundle", "favorite"]}, {"name": "/PRODUCT-MAX", "category": "★ Master Bundles", "description": "Strict product fidelity plus premium commercial presentation and hero frame.", "expansion": "Activates: /product-zero-drift, /reference-exact, /real-materials, /product-lux, /product-hero-frame", "tags": ["bundle", "favorite"]}, {"name": "/JEWELLERY-MAX", "category": "★ Master Bundles", "description": "Strict jewellery geometry/stone lock plus macro luxury advertising treatment.", "expansion": "Activates: /jewellery-zero-drift, /product-macro, /real-skin, /real-materials, /product-lux, /product-hero-frame", "tags": ["bundle", "favorite"]}, {"name": "/SUPERCAR-MAX", "category": "★ Master Bundles", "description": "Gaurev + premium supercar editorial with vehicle fidelity and realistic physics.", "expansion": "Activates: /gaurev-lock, /supercar-editorial, /car-lock, /real-materials, /real-physics, /photo-real-max, /cinematic-world", "tags": ["bundle", "favorite"]}, {"name": "/FIGHTERJET-MAX", "category": "★ Master Bundles", "description": "Gaurev + advanced fighter-jet cinematic world with scale and physical realism.", "expansion": "Activates: /gaurev-lock, /fighter-jet, /machine-scale, /cinematic-world, /production-still, /real-physics, /photo-real-max", "tags": ["bundle", "favorite"]}, {"name": "/SOCIAL-MAX", "category": "★ Master Bundles", "description": "Social-first creative optimized for attention, captioning, hierarchy and mobile.", "expansion": "Activates: /social-optimize, /viral-first-3, /caption-full, /brand-clean, /instagram-poster", "tags": ["bundle", "favorite"]}, {"name": "/CAMPAIGN-MAX", "category": "★ Master Bundles", "description": "Ideate, select and develop a complete premium branded campaign direction.", "expansion": "Activates: /ideas-no-generic, /pick-one, /brand-optimize, /social-optimize, /storyboard-video-prompts, /final-pass", "tags": ["bundle", "favorite"]}, {"name": "/WEBSITE-MAX", "category": "★ Master Bundles", "description": "Awwwards-style premium website redesign with motion, mobile and conversion thinking.", "expansion": "Activates: /website-redesign, /website-premium, /awwwards, /hero-wow, /site-motion, /site-mobile-first, /site-conversion", "tags": ["bundle", "favorite"]}, {"name": "/PROMPT-MAX-GK", "category": "★ Master Bundles", "description": "Gaurev’s full prompt diagnosis/rebuild/locking/finalization workflow.", "expansion": "Activates: /prompt-deep-analyze, /prompt-rebuild, /prompt-locks, /prompt-reference, /prompt-negative, /ideas-no-generic, /prompt-copy", "tags": ["bundle", "favorite"]}, {"name": "/IDEAS-MAX", "category": "★ Master Bundles", "description": "Generate non-generic ideas, narrow to the strongest three, then select one.", "expansion": "Activates: /ideas-no-generic, /ideas-10-cinematic, /best-3, /pick-one", "tags": ["bundle", "favorite"]}, {"name": "/CHARACTER-SHEET", "category": "★ Master Bundles", "description": "Identity-preserved character-sheet workflow using reference images as authority.", "expansion": "Activates: /gaurev-lock, /multi-ref-lock, /reference-exact, /photo-real-max, /real-skin, /real-materials", "tags": ["bundle", "favorite"]}, {"name": "/gaurev-lock", "category": "Character & Identity", "description": "Use uploaded Gaurev references as absolute identity authority.", "expansion": "Use uploaded Gaurev references as absolute identity authority.", "tags": []}, {"name": "/face-zero-drift", "category": "Character & Identity", "description": "Maximum facial preservation; no beautification, reshaping or identity reinterpretation.", "expansion": "Maximum facial preservation; no beautification, reshaping or identity reinterpretation.", "tags": []}, {"name": "/body-zero-drift", "category": "Character & Identity", "description": "Preserve exact body build, proportions, shoulder width and height impression.", "expansion": "Preserve exact body build, proportions, shoulder width and height impression.", "tags": []}, {"name": "/identity-priority", "category": "Character & Identity", "description": "When creative instructions conflict with likeness, identity always wins.", "expansion": "When creative instructions conflict with likeness, identity always wins.", "tags": []}, {"name": "/multi-ref-lock", "category": "Character & Identity", "description": "Use multiple uploaded images together to reconstruct one consistent identity.", "expansion": "Use multiple uploaded images together to reconstruct one consistent identity.", "tags": []}, {"name": "/couple-lock", "category": "Character & Identity", "description": "Preserve two main characters independently without face or wardrobe blending.", "expansion": "Preserve two main characters independently without face or wardrobe blending.", "tags": []}, {"name": "/group-lock", "category": "Character & Identity", "description": "Maintain multiple main characters independently in group scenes.", "expansion": "Maintain multiple main characters independently in group scenes.", "tags": []}, {"name": "/change-everything-except-me", "category": "Character & Identity", "description": "Change wardrobe, world, props and lighting while preserving the person exactly.", "expansion": "Change wardrobe, world, props and lighting while preserving the person exactly.", "tags": []}, {"name": "/characterlock", "category": "Character & Identity", "description": "Treat supplied character references as the master identity source.", "expansion": "Treat supplied character references as the master identity source.", "tags": []}, {"name": "/identity-max", "category": "Character & Identity", "description": "Activate maximum face, body, age, hair, beard and skin identity preservation.", "expansion": "Activate maximum face, body, age, hair, beard and skin identity preservation.", "tags": []}, {"name": "/face-lock", "category": "Character & Identity", "description": "Preserve the face strictly while allowing non-facial changes.", "expansion": "Preserve the face strictly while allowing non-facial changes.", "tags": []}, {"name": "/physique-lock", "category": "Character & Identity", "description": "Preserve physique, muscularity and body proportions.", "expansion": "Preserve physique, muscularity and body proportions.", "tags": []}, {"name": "/age-lock", "category": "Character & Identity", "description": "Prevent unintended aging or de-aging.", "expansion": "Prevent unintended aging or de-aging.", "tags": []}, {"name": "/hair-lock", "category": "Character & Identity", "description": "Preserve hairstyle, hairline, density, texture and colour.", "expansion": "Preserve hairstyle, hairline, density, texture and colour.", "tags": []}, {"name": "/beard-lock", "category": "Character & Identity", "description": "Preserve beard shape, density, length and colour.", "expansion": "Preserve beard shape, density, length and colour.", "tags": []}, {"name": "/skin-lock", "category": "Character & Identity", "description": "Preserve natural complexion and skin tone.", "expansion": "Preserve natural complexion and skin tone.", "tags": []}, {"name": "/multi-character-lock", "category": "Character & Identity", "description": "Maintain multiple named/reference identities independently.", "expansion": "Maintain multiple named/reference identities independently.", "tags": []}, {"name": "/upgrade-clothes", "category": "Image Editing", "description": "Replace current clothing with a more premium wardrobe while preserving identity.", "expansion": "Replace current clothing with a more premium wardrobe while preserving identity.", "tags": []}, {"name": "/upgrade-world", "category": "Image Editing", "description": "Improve surroundings dramatically without changing the subject.", "expansion": "Improve surroundings dramatically without changing the subject.", "tags": []}, {"name": "/upgrade-both", "category": "Image Editing", "description": "Upgrade clothing and surroundings while locking identity.", "expansion": "Upgrade clothing and surroundings while locking identity.", "tags": []}, {"name": "/same-shot-edit", "category": "Image Editing", "description": "Lock camera, framing, subject position and perspective; edit only requested elements.", "expansion": "Lock camera, framing, subject position and perspective; edit only requested elements.", "tags": []}, {"name": "/background-only", "category": "Image Editing", "description": "Change only the background/environment.", "expansion": "Change only the background/environment.", "tags": []}, {"name": "/clothes-only", "category": "Image Editing", "description": "Change only wardrobe.", "expansion": "Change only wardrobe.", "tags": []}, {"name": "/remove-only", "category": "Image Editing", "description": "Remove only the requested object/text/logo and keep everything else unchanged.", "expansion": "Remove only the requested object/text/logo and keep everything else unchanged.", "tags": []}, {"name": "/replace-only", "category": "Image Editing", "description": "Replace exactly one specified element while locking everything else.", "expansion": "Replace exactly one specified element while locking everything else.", "tags": []}, {"name": "/composition-lock", "category": "Image Editing", "description": "Do not crop, reposition, zoom, rotate or alter composition.", "expansion": "Do not crop, reposition, zoom, rotate or alter composition.", "tags": []}, {"name": "/reference-exact", "category": "Image Editing", "description": "Treat attached image as an exact authoritative visual reference.", "expansion": "Treat attached image as an exact authoritative visual reference.", "tags": []}, {"name": "/wardrobe", "category": "Image Editing", "description": "Change clothing while preserving identity.", "expansion": "Change clothing while preserving identity.", "tags": []}, {"name": "/wardrobe-luxury", "category": "Image Editing", "description": "Upgrade wardrobe to premium designer / quiet-luxury styling.", "expansion": "Upgrade wardrobe to premium designer / quiet-luxury styling.", "tags": []}, {"name": "/wardrobe-corporate", "category": "Image Editing", "description": "Executive, founder or CEO wardrobe.", "expansion": "Executive, founder or CEO wardrobe.", "tags": []}, {"name": "/wardrobe-casual", "category": "Image Editing", "description": "Premium casual or smart-casual wardrobe.", "expansion": "Premium casual or smart-casual wardrobe.", "tags": []}, {"name": "/wardrobe-wedding", "category": "Image Editing", "description": "High-end Indian wedding or ceremonial styling.", "expansion": "High-end Indian wedding or ceremonial styling.", "tags": []}, {"name": "/wardrobe-street", "category": "Image Editing", "description": "Luxury streetwear/editorial styling.", "expansion": "Luxury streetwear/editorial styling.", "tags": []}, {"name": "/wardrobe-fitness", "category": "Image Editing", "description": "Premium athletic/bodybuilding styling.", "expansion": "Premium athletic/bodybuilding styling.", "tags": []}, {"name": "/location", "category": "Image Editing", "description": "Change the location while preserving subject identity.", "expansion": "Change the location while preserving subject identity.", "tags": []}, {"name": "/location-upgrade", "category": "Image Editing", "description": "Replace ordinary surroundings with richer premium surroundings.", "expansion": "Replace ordinary surroundings with richer premium surroundings.", "tags": []}, {"name": "/no-ai-look", "category": "Realism", "description": "Remove waxy skin, fake HDR, synthetic reflections, perfect symmetry and other AI-looking traits.", "expansion": "Remove waxy skin, fake HDR, synthetic reflections, perfect symmetry and other AI-looking traits.", "tags": []}, {"name": "/photo-real-max", "category": "Realism", "description": "Make the output look like an actual photograph captured on location.", "expansion": "Make the output look like an actual photograph captured on location.", "tags": []}, {"name": "/production-still", "category": "Realism", "description": "Use genuine film-production still logic: practical light, imperfect capture and believable interaction.", "expansion": "Use genuine film-production still logic: practical light, imperfect capture and believable interaction.", "tags": []}, {"name": "/raw-camera", "category": "Realism", "description": "Favor believable camera capture over polished synthetic beauty.", "expansion": "Favor believable camera capture over polished synthetic beauty.", "tags": []}, {"name": "/real-skin", "category": "Realism", "description": "Prioritize pores, microtexture, tonal variation and natural skin response.", "expansion": "Prioritize pores, microtexture, tonal variation and natural skin response.", "tags": []}, {"name": "/real-materials", "category": "Realism", "description": "Increase fidelity of fabric, leather, glass, metal, jewellery, carbon fibre and paint.", "expansion": "Increase fidelity of fabric, leather, glass, metal, jewellery, carbon fibre and paint.", "tags": []}, {"name": "/real-light", "category": "Realism", "description": "Require physically plausible, motivated light sources.", "expansion": "Require physically plausible, motivated light sources.", "tags": []}, {"name": "/real-physics", "category": "Realism", "description": "Require believable weight, gravity, contact, cloth, shadows and reflections.", "expansion": "Require believable weight, gravity, contact, cloth, shadows and reflections.", "tags": []}, {"name": "/reality-max", "category": "Realism", "description": "Maximum human-first photorealism.", "expansion": "Maximum human-first photorealism.", "tags": []}, {"name": "/anti-ai", "category": "Realism", "description": "Actively remove common synthetic-image characteristics.", "expansion": "Actively remove common synthetic-image characteristics.", "tags": []}, {"name": "/stills-archive", "category": "Realism", "description": "Use production-still / unit-photography realism language.", "expansion": "Use production-still / unit-photography realism language.", "tags": []}, {"name": "/editorial-realism", "category": "Realism", "description": "High-fashion editorial photography without CGI polish.", "expansion": "High-fashion editorial photography without CGI polish.", "tags": []}, {"name": "/commercial-realism", "category": "Realism", "description": "Premium advertising realism with physically believable capture.", "expansion": "Premium advertising realism with physically believable capture.", "tags": []}, {"name": "/skin-realism", "category": "Realism", "description": "Maximum believable skin texture and microdetail.", "expansion": "Maximum believable skin texture and microdetail.", "tags": []}, {"name": "/material-realism", "category": "Realism", "description": "Maximum material and surface fidelity.", "expansion": "Maximum material and surface fidelity.", "tags": []}, {"name": "/quiet-luxury", "category": "Luxury & Fashion", "description": "Understated Italian-style luxury: tailoring, linen, cashmere, refined accessories and no loud logos.", "expansion": "Understated Italian-style luxury: tailoring, linen, cashmere, refined accessories and no loud logos.", "tags": []}, {"name": "/billionaire-mode", "category": "Luxury & Fashion", "description": "Tasteful ultra-high-net-worth world: private aviation, rare cars, yachts and exclusive properties.", "expansion": "Tasteful ultra-high-net-worth world: private aviation, rare cars, yachts and exclusive properties.", "tags": []}, {"name": "/ceo-mode", "category": "Luxury & Fashion", "description": "Premium founder/CEO editorial styling.", "expansion": "Premium founder/CEO editorial styling.", "tags": []}, {"name": "/gq-mode", "category": "Luxury & Fashion", "description": "Men’s luxury fashion editorial treatment.", "expansion": "Men’s luxury fashion editorial treatment.", "tags": []}, {"name": "/vogue-india", "category": "Luxury & Fashion", "description": "Premium Indian fashion/editorial aesthetic.", "expansion": "Premium Indian fashion/editorial aesthetic.", "tags": []}, {"name": "/wedding-lux", "category": "Luxury & Fashion", "description": "Luxury Indian wedding editorial mode.", "expansion": "Luxury Indian wedding editorial mode.", "tags": []}, {"name": "/monaco-mode", "category": "Luxury & Fashion", "description": "European Riviera / Monaco luxury environment.", "expansion": "European Riviera / Monaco luxury environment.", "tags": []}, {"name": "/private-villa", "category": "Luxury & Fashion", "description": "Exclusive private villa lifestyle environment.", "expansion": "Exclusive private villa lifestyle environment.", "tags": []}, {"name": "/private-beach", "category": "Luxury & Fashion", "description": "Exclusive private-beach editorial environment.", "expansion": "Exclusive private-beach editorial environment.", "tags": []}, {"name": "/private-aviation", "category": "Luxury & Fashion", "description": "Premium private jet, FBO or aviation environment.", "expansion": "Premium private jet, FBO or aviation environment.", "tags": []}, {"name": "/luxury-world", "category": "Luxury & Fashion", "description": "Elite villas, penthouses, supercars, private terminals, yachts and luxury hotels.", "expansion": "Elite villas, penthouses, supercars, private terminals, yachts and luxury hotels.", "tags": []}, {"name": "/corporate-world", "category": "Luxury & Fashion", "description": "Premium office, boardroom, HQ and executive-lounge environment.", "expansion": "Premium office, boardroom, HQ and executive-lounge environment.", "tags": []}, {"name": "/cinematic-world", "category": "Luxury & Fashion", "description": "Transform environment into a large-scale movie-quality set.", "expansion": "Transform environment into a large-scale movie-quality set.", "tags": []}, {"name": "/india-luxury", "category": "Luxury & Fashion", "description": "Premium Indian architecture, hospitality, business or lifestyle world.", "expansion": "Premium Indian architecture, hospitality, business or lifestyle world.", "tags": []}, {"name": "/destination-mode", "category": "Luxury & Fashion", "description": "Build around an iconic destination without sacrificing subject prominence.", "expansion": "Build around an iconic destination without sacrificing subject prominence.", "tags": []}, {"name": "/hypercar", "category": "Supercars & Machines", "description": "Introduce an extreme high-performance luxury vehicle as a major visual element.", "expansion": "Introduce an extreme high-performance luxury vehicle as a major visual element.", "tags": []}, {"name": "/supercar-editorial", "category": "Supercars & Machines", "description": "Treat vehicle and character as a premium automotive fashion campaign.", "expansion": "Treat vehicle and character as a premium automotive fashion campaign.", "tags": []}, {"name": "/car-lock", "category": "Supercars & Machines", "description": "Preserve exact car model, body, paint, wheels, lights and proportions.", "expansion": "Preserve exact car model, body, paint, wheels, lights and proportions.", "tags": []}, {"name": "/plate-lock", "category": "Supercars & Machines", "description": "Never alter the specified vehicle registration / number plate.", "expansion": "Never alter the specified vehicle registration / number plate.", "tags": []}, {"name": "/fighter-jet", "category": "Supercars & Machines", "description": "Create a high-end aerospace / advanced fighter-jet visual world.", "expansion": "Create a high-end aerospace / advanced fighter-jet visual world.", "tags": []}, {"name": "/machine-scale", "category": "Supercars & Machines", "description": "Emphasize scale and physical presence of advanced machinery.", "expansion": "Emphasize scale and physical presence of advanced machinery.", "tags": []}, {"name": "/movie-poster", "category": "Posters & Key Art", "description": "Hollywood theatrical poster treatment.", "expansion": "Hollywood theatrical poster treatment.", "tags": []}, {"name": "/netflix-poster", "category": "Posters & Key Art", "description": "High-click streaming thumbnail / poster hybrid.", "expansion": "High-click streaming thumbnail / poster hybrid.", "tags": []}, {"name": "/blockbuster-keyart", "category": "Posters & Key Art", "description": "Large-scale studio campaign key art.", "expansion": "Large-scale studio campaign key art.", "tags": []}, {"name": "/minimal-lux-poster", "category": "Posters & Key Art", "description": "Minimal, expensive-looking poster hierarchy.", "expansion": "Minimal, expensive-looking poster hierarchy.", "tags": []}, {"name": "/bright-poster", "category": "Posters & Key Art", "description": "Avoid dark/muddy design; favor ivory, daylight, warm neutrals and open space.", "expansion": "Avoid dark/muddy design; favor ivory, daylight, warm neutrals and open space.", "tags": []}, {"name": "/text-perfect", "category": "Posters & Key Art", "description": "Treat visible text as mission-critical: correct spelling and clean typography.", "expansion": "Treat visible text as mission-critical: correct spelling and clean typography.", "tags": []}, {"name": "/logo-exact", "category": "Posters & Key Art", "description": "Use supplied logo exactly; no redraw, recolour, distortion or retyping.", "expansion": "Use supplied logo exactly; no redraw, recolour, distortion or retyping.", "tags": []}, {"name": "/instagram-poster", "category": "Posters & Key Art", "description": "Optimize key art for mobile Instagram viewing.", "expansion": "Optimize key art for mobile Instagram viewing.", "tags": []}, {"name": "/poster-pro", "category": "Posters & Key Art", "description": "Hollywood-grade key art/poster composition.", "expansion": "Hollywood-grade key art/poster composition.", "tags": []}, {"name": "/text-safe", "category": "Posters & Key Art", "description": "Prioritize correct typography and avoid unnecessary generated text.", "expansion": "Prioritize correct typography and avoid unnecessary generated text.", "tags": []}, {"name": "/social-image", "category": "Posters & Key Art", "description": "Optimize framing, subject scale and negative space for social media.", "expansion": "Optimize framing, subject scale and negative space for social media.", "tags": []}, {"name": "/not-dark", "category": "Posters & Key Art", "description": "Explicitly reject predominantly dark visual themes.", "expansion": "Explicitly reject predominantly dark visual themes.", "tags": []}, {"name": "/premium-light", "category": "Posters & Key Art", "description": "Bright premium palette with ivory, warm white, beige and refined contrast.", "expansion": "Bright premium palette with ivory, warm white, beige and refined contrast.", "tags": []}, {"name": "/design-new", "category": "Posters & Key Art", "description": "Use reference only for quality/mood; create a genuinely new composition.", "expansion": "Use reference only for quality/mood; create a genuinely new composition.", "tags": []}, {"name": "/five-different", "category": "Posters & Key Art", "description": "Generate five structurally different concepts, not superficial variants.", "expansion": "Generate five structurally different concepts, not superficial variants.", "tags": []}, {"name": "/one-by-one", "category": "Posters & Key Art", "description": "Treat each requested creative as a separate deliverable, never a collage.", "expansion": "Treat each requested creative as a separate deliverable, never a collage.", "tags": []}, {"name": "/brand-clean", "category": "Posters & Key Art", "description": "Reduce clutter and strengthen hierarchy.", "expansion": "Reduce clutter and strengthen hierarchy.", "tags": []}, {"name": "/storyboard-gaurev", "category": "Storyboards", "description": "Create a cinematic storyboard with Gaurev as the locked primary character.", "expansion": "Create a cinematic storyboard with Gaurev as the locked primary character.", "tags": []}, {"name": "/storyboard-8", "category": "Storyboards", "description": "Output eight connected storyboard shots.", "expansion": "Output eight connected storyboard shots.", "tags": []}, {"name": "/storyboard-10", "category": "Storyboards", "description": "Output ten connected storyboard shots.", "expansion": "Output ten connected storyboard shots.", "tags": []}, {"name": "/storyboard-image-prompts", "category": "Storyboards", "description": "Generate a standalone image prompt for every storyboard panel.", "expansion": "Generate a standalone image prompt for every storyboard panel.", "tags": []}, {"name": "/storyboard-video-prompts", "category": "Storyboards", "description": "Generate a corresponding AI-video prompt for each storyboard section.", "expansion": "Generate a corresponding AI-video prompt for each storyboard section.", "tags": []}, {"name": "/hero-frame", "category": "Storyboards", "description": "Design the strongest iconic frame in the sequence.", "expansion": "Design the strongest iconic frame in the sequence.", "tags": []}, {"name": "/opening-frame", "category": "Storyboards", "description": "Design an irresistible opening frame.", "expansion": "Design an irresistible opening frame.", "tags": []}, {"name": "/end-frame-lock", "category": "Storyboards", "description": "Define and preserve the exact final video frame.", "expansion": "Define and preserve the exact final video frame.", "tags": []}, {"name": "/storyboard", "category": "Storyboards", "description": "Create a visual shot-by-shot storyboard.", "expansion": "Create a visual shot-by-shot storyboard.", "tags": []}, {"name": "/storyboard-pro", "category": "Storyboards", "description": "Detailed cinematic storyboard with camera, movement and continuity.", "expansion": "Detailed cinematic storyboard with camera, movement and continuity.", "tags": []}, {"name": "/shotlist", "category": "Storyboards", "description": "Output a production-style shot list.", "expansion": "Output a production-style shot list.", "tags": []}, {"name": "/scene-build", "category": "Storyboards", "description": "Expand one idea into a richer cinematic scene.", "expansion": "Expand one idea into a richer cinematic scene.", "tags": []}, {"name": "/seedance-director", "category": "Seedance & Video", "description": "Apply full Seedance 2.5 scene direction: subject, action, location, progression, camera, continuity, ending and sound.", "expansion": "Apply full Seedance 2.5 scene direction: subject, action, location, progression, camera, continuity, ending and sound.", "tags": []}, {"name": "/seedance-20", "category": "Seedance & Video", "description": "Optimize scene structure and pacing for 20 seconds.", "expansion": "Optimize scene structure and pacing for 20 seconds.", "tags": []}, {"name": "/seedance-15", "category": "Seedance & Video", "description": "Optimize scene structure and pacing for 15 seconds.", "expansion": "Optimize scene structure and pacing for 15 seconds.", "tags": []}, {"name": "/seedance-916", "category": "Seedance & Video", "description": "Optimize composition and action for vertical 9:16.", "expansion": "Optimize composition and action for vertical 9:16.", "tags": []}, {"name": "/seedance-reference-lock", "category": "Seedance & Video", "description": "Make visual references override generative creativity.", "expansion": "Make visual references override generative creativity.", "tags": []}, {"name": "/seedance-continuity", "category": "Seedance & Video", "description": "Maximum cross-shot character, wardrobe, prop and world consistency.", "expansion": "Maximum cross-shot character, wardrobe, prop and world consistency.", "tags": []}, {"name": "/seedance-real-motion", "category": "Seedance & Video", "description": "Remove floaty/rubbery AI motion and enforce believable movement.", "expansion": "Remove floaty/rubbery AI motion and enforce believable movement.", "tags": []}, {"name": "/seedance-camera-real", "category": "Seedance & Video", "description": "Use physically achievable camera movement.", "expansion": "Use physically achievable camera movement.", "tags": []}, {"name": "/seedance-fast-cut", "category": "Seedance & Video", "description": "Use rapid social-media cuts around every 1–2 seconds.", "expansion": "Use rapid social-media cuts around every 1–2 seconds.", "tags": []}, {"name": "/seedance-lux", "category": "Seedance & Video", "description": "Premium luxury/fashion film treatment optimized for Seedance.", "expansion": "Premium luxury/fashion film treatment optimized for Seedance.", "tags": []}, {"name": "/video-characterlock", "category": "Seedance & Video", "description": "Maintain the same character throughout every frame and shot.", "expansion": "Maintain the same character throughout every frame and shot.", "tags": []}, {"name": "/video-face-lock", "category": "Seedance & Video", "description": "Prevent facial drift during motion, camera changes and expressions.", "expansion": "Prevent facial drift during motion, camera changes and expressions.", "tags": []}, {"name": "/video-body-lock", "category": "Seedance & Video", "description": "Prevent physique changes between shots.", "expansion": "Prevent physique changes between shots.", "tags": []}, {"name": "/video-wardrobe-lock", "category": "Seedance & Video", "description": "Keep wardrobe consistent throughout a sequence.", "expansion": "Keep wardrobe consistent throughout a sequence.", "tags": []}, {"name": "/video-product-lock", "category": "Seedance & Video", "description": "Prevent product shape, label, packaging or colour drift.", "expansion": "Prevent product shape, label, packaging or colour drift.", "tags": []}, {"name": "/continuity-max", "category": "Seedance & Video", "description": "Maximum continuity for characters, props, lighting and environment.", "expansion": "Maximum continuity for characters, props, lighting and environment.", "tags": []}, {"name": "/multi-character-video", "category": "Seedance & Video", "description": "Maintain independent identities for multiple characters throughout a video.", "expansion": "Maintain independent identities for multiple characters throughout a video.", "tags": []}, {"name": "/reference-first", "category": "Seedance & Video", "description": "Give uploaded visual references priority over descriptive text.", "expansion": "Give uploaded visual references priority over descriptive text.", "tags": []}, {"name": "/seedance", "category": "Seedance & Video", "description": "Convert concept into a Seedance-compatible prompt.", "expansion": "Convert concept into a Seedance-compatible prompt.", "tags": []}, {"name": "/seedance25", "category": "Seedance & Video", "description": "Optimize specifically for Seedance 2.5.", "expansion": "Optimize specifically for Seedance 2.5.", "tags": []}, {"name": "/higgsfield", "category": "Seedance & Video", "description": "Optimize video prompt for Higgsfield workflows.", "expansion": "Optimize video prompt for Higgsfield workflows.", "tags": []}, {"name": "/minimax", "category": "Seedance & Video", "description": "Optimize video prompt for Minimax/Hailuo workflows.", "expansion": "Optimize video prompt for Minimax/Hailuo workflows.", "tags": []}, {"name": "/video-universal", "category": "Seedance & Video", "description": "Create a model-neutral AI-video prompt.", "expansion": "Create a model-neutral AI-video prompt.", "tags": []}, {"name": "/single-shot", "category": "Seedance & Video", "description": "Design the sequence as one shot only.", "expansion": "Design the sequence as one shot only.", "tags": []}, {"name": "/continuous-shot", "category": "Seedance & Video", "description": "Create one uninterrupted cinematic take.", "expansion": "Create one uninterrupted cinematic take.", "tags": []}, {"name": "/multi-shot", "category": "Seedance & Video", "description": "Create a structured multi-shot sequence.", "expansion": "Create a structured multi-shot sequence.", "tags": []}, {"name": "/micro-shots", "category": "Seedance & Video", "description": "Use short 1–3 second high-impact shots.", "expansion": "Use short 1–3 second high-impact shots.", "tags": []}, {"name": "/camera-cinematic", "category": "Seedance & Video", "description": "Use motivated theatrical camera movement.", "expansion": "Use motivated theatrical camera movement.", "tags": []}, {"name": "/camera-handheld", "category": "Seedance & Video", "description": "Use natural documentary handheld behavior.", "expansion": "Use natural documentary handheld behavior.", "tags": []}, {"name": "/camera-gimbal", "category": "Seedance & Video", "description": "Use smooth stabilized tracking.", "expansion": "Use smooth stabilized tracking.", "tags": []}, {"name": "/camera-dolly", "category": "Seedance & Video", "description": "Use physical dolly movement with believable parallax.", "expansion": "Use physical dolly movement with believable parallax.", "tags": []}, {"name": "/camera-orbit", "category": "Seedance & Video", "description": "Controlled orbit around the subject.", "expansion": "Controlled orbit around the subject.", "tags": []}, {"name": "/camera-crane", "category": "Seedance & Video", "description": "Use crane/jib-style cinematic movement.", "expansion": "Use crane/jib-style cinematic movement.", "tags": []}, {"name": "/camera-drone", "category": "Seedance & Video", "description": "Use realistic aerial/drone movement.", "expansion": "Use realistic aerial/drone movement.", "tags": []}, {"name": "/camera-pov", "category": "Seedance & Video", "description": "Use first-person or subject-perspective framing.", "expansion": "Use first-person or subject-perspective framing.", "tags": []}, {"name": "/camera-macro", "category": "Seedance & Video", "description": "Use extreme close product/detail cinematography.", "expansion": "Use extreme close product/detail cinematography.", "tags": []}, {"name": "/camera-transition", "category": "Seedance & Video", "description": "Design intentional motion/object/light transitions.", "expansion": "Design intentional motion/object/light transitions.", "tags": []}, {"name": "/motion-real", "category": "Seedance & Video", "description": "Prioritize believable movement, inertia, cloth and interaction.", "expansion": "Prioritize believable movement, inertia, cloth and interaction.", "tags": []}, {"name": "/motion-subtle", "category": "Seedance & Video", "description": "Use restrained motion to reduce AI instability.", "expansion": "Use restrained motion to reduce AI instability.", "tags": []}, {"name": "/performance-natural", "category": "Seedance & Video", "description": "Natural expressions, eye movement, breathing and body language.", "expansion": "Natural expressions, eye movement, breathing and body language.", "tags": []}, {"name": "/action-mode", "category": "Seedance & Video", "description": "High-energy action choreography with physical logic.", "expansion": "High-energy action choreography with physical logic.", "tags": []}, {"name": "/slow-motion", "category": "Seedance & Video", "description": "Use cinematic slow motion only where justified.", "expansion": "Use cinematic slow motion only where justified.", "tags": []}, {"name": "/luxury-film", "category": "Seedance & Video", "description": "Premium fashion/lifestyle brand-film treatment.", "expansion": "Premium fashion/lifestyle brand-film treatment.", "tags": []}, {"name": "/product-film", "category": "Seedance & Video", "description": "Product-focused cinematic advertisement.", "expansion": "Product-focused cinematic advertisement.", "tags": []}, {"name": "/trailer-mode", "category": "Seedance & Video", "description": "Build footage like a theatrical trailer.", "expansion": "Build footage like a theatrical trailer.", "tags": []}, {"name": "/raw-phone-video", "category": "UGC & Reels", "description": "Make footage look like genuine smartphone video, not advertising cinematography.", "expansion": "Make footage look like genuine smartphone video, not advertising cinematography.", "tags": []}, {"name": "/home-video", "category": "UGC & Reels", "description": "Authentic personal-memory footage with imperfect framing and spontaneous reactions.", "expansion": "Authentic personal-memory footage with imperfect framing and spontaneous reactions.", "tags": []}, {"name": "/roadtrip-ugc", "category": "UGC & Reels", "description": "Premium-but-authentic road-trip montage style.", "expansion": "Premium-but-authentic road-trip montage style.", "tags": []}, {"name": "/creator-ugc", "category": "UGC & Reels", "description": "Natural creator speaking-to-camera ad.", "expansion": "Natural creator speaking-to-camera ad.", "tags": []}, {"name": "/no-ad-acting", "category": "UGC & Reels", "description": "Prevent exaggerated commercial performance.", "expansion": "Prevent exaggerated commercial performance.", "tags": []}, {"name": "/jumpcut", "category": "UGC & Reels", "description": "Use realistic jump-cut social editing.", "expansion": "Use realistic jump-cut social editing.", "tags": []}, {"name": "/viral-first-3", "category": "UGC & Reels", "description": "Optimize the first three seconds to stop scrolling.", "expansion": "Optimize the first three seconds to stop scrolling.", "tags": []}, {"name": "/reel-20", "category": "UGC & Reels", "description": "Create a complete 20-second Reel concept.", "expansion": "Create a complete 20-second Reel concept.", "tags": []}, {"name": "/reel-15", "category": "UGC & Reels", "description": "Create a complete 15-second Reel concept.", "expansion": "Create a complete 15-second Reel concept.", "tags": []}, {"name": "/ugc-indian", "category": "UGC & Reels", "description": "Use culturally natural Indian creator behavior, dialogue and environments.", "expansion": "Use culturally natural Indian creator behavior, dialogue and environments.", "tags": []}, {"name": "/reel", "category": "UGC & Reels", "description": "Optimize for vertical Instagram/Reels viewing.", "expansion": "Optimize for vertical Instagram/Reels viewing.", "tags": []}, {"name": "/ugc", "category": "UGC & Reels", "description": "Authentic consumer/creator-generated advertising style.", "expansion": "Authentic consumer/creator-generated advertising style.", "tags": []}, {"name": "/ugc-pro", "category": "UGC & Reels", "description": "High-conversion UGC while preserving believable authenticity.", "expansion": "High-conversion UGC while preserving believable authenticity.", "tags": []}, {"name": "/vo-indian-female", "category": "Voice & Audio", "description": "Natural Indian female voice.", "expansion": "Natural Indian female voice.", "tags": []}, {"name": "/vo-north-indian-female", "category": "Voice & Audio", "description": "Soft North Indian female voice.", "expansion": "Soft North Indian female voice.", "tags": []}, {"name": "/vo-north-indian-male", "category": "Voice & Audio", "description": "Premium North Indian male voice.", "expansion": "Premium North Indian male voice.", "tags": []}, {"name": "/vo-hinglish-natural", "category": "Voice & Audio", "description": "Natural conversational Hinglish, never translation-like.", "expansion": "Natural conversational Hinglish, never translation-like.", "tags": []}, {"name": "/vo-short", "category": "Voice & Audio", "description": "Keep voiceover comfortably within the video duration.", "expansion": "Keep voiceover comfortably within the video duration.", "tags": []}, {"name": "/soft-piano", "category": "Voice & Audio", "description": "Use understated luxury instrumental piano.", "expansion": "Use understated luxury instrumental piano.", "tags": []}, {"name": "/audio-real", "category": "Voice & Audio", "description": "Prioritize environmental sound and believable Foley.", "expansion": "Prioritize environmental sound and believable Foley.", "tags": []}, {"name": "/music-under-vo", "category": "Voice & Audio", "description": "Keep music secondary to speech.", "expansion": "Keep music secondary to speech.", "tags": []}, {"name": "/audio-native", "category": "Voice & Audio", "description": "Plan dialogue, environmental sound and effects as native audio.", "expansion": "Plan dialogue, environmental sound and effects as native audio.", "tags": []}, {"name": "/voiceover", "category": "Voice & Audio", "description": "Add structured voiceover direction.", "expansion": "Add structured voiceover direction.", "tags": []}, {"name": "/vo-indian-english", "category": "Voice & Audio", "description": "Natural Indian-English voiceover.", "expansion": "Natural Indian-English voiceover.", "tags": []}, {"name": "/vo-hinglish", "category": "Voice & Audio", "description": "Conversational Hindi-English voiceover.", "expansion": "Conversational Hindi-English voiceover.", "tags": []}, {"name": "/music-soft-piano", "category": "Voice & Audio", "description": "Soft instrumental piano under dialogue/VO.", "expansion": "Soft instrumental piano under dialogue/VO.", "tags": []}, {"name": "/sound-design-pro", "category": "Voice & Audio", "description": "Cinematic ambience, impacts, Foley and audio hierarchy.", "expansion": "Cinematic ambience, impacts, Foley and audio hierarchy.", "tags": []}, {"name": "/product-zero-drift", "category": "Products & Jewellery", "description": "Absolutely no changes to product appearance.", "expansion": "Absolutely no changes to product appearance.", "tags": []}, {"name": "/jewellery-zero-drift", "category": "Products & Jewellery", "description": "Lock stone count/placement, metal, shape, setting, chain and proportions.", "expansion": "Lock stone count/placement, metal, shape, setting, chain and proportions.", "tags": []}, {"name": "/packaging-zero-drift", "category": "Products & Jewellery", "description": "Preserve packaging exactly.", "expansion": "Preserve packaging exactly.", "tags": []}, {"name": "/product-macro", "category": "Products & Jewellery", "description": "Premium close-up product photography/video.", "expansion": "Premium close-up product photography/video.", "tags": []}, {"name": "/product-lux", "category": "Products & Jewellery", "description": "International luxury advertising treatment.", "expansion": "International luxury advertising treatment.", "tags": []}, {"name": "/product-social", "category": "Products & Jewellery", "description": "Convert product into a social-first campaign.", "expansion": "Convert product into a social-first campaign.", "tags": []}, {"name": "/product-hero-frame", "category": "Products & Jewellery", "description": "Create a premium final product hero/packshot frame.", "expansion": "Create a premium final product hero/packshot frame.", "tags": []}, {"name": "/product-ugc", "category": "Products & Jewellery", "description": "Blend strict product fidelity with authentic UGC.", "expansion": "Blend strict product fidelity with authentic UGC.", "tags": []}, {"name": "/product-lock", "category": "Products & Jewellery", "description": "Preserve product shape, packaging, logo, colours and distinguishing details.", "expansion": "Preserve product shape, packaging, logo, colours and distinguishing details.", "tags": []}, {"name": "/product-hero", "category": "Products & Jewellery", "description": "Create a premium hero advertisement around the product.", "expansion": "Create a premium hero advertisement around the product.", "tags": []}, {"name": "/caption-full", "category": "Social Content", "description": "Return caption, CTA, hashtags and searchable keywords.", "expansion": "Return caption, CTA, hashtags and searchable keywords.", "tags": []}, {"name": "/caption-premium", "category": "Social Content", "description": "Write sophisticated, non-generic brand copy.", "expansion": "Write sophisticated, non-generic brand copy.", "tags": []}, {"name": "/caption-reach", "category": "Social Content", "description": "Prioritize discoverability and engagement without spammy language.", "expansion": "Prioritize discoverability and engagement without spammy language.", "tags": []}, {"name": "/carousel-7", "category": "Social Content", "description": "Create a seven-slide Instagram carousel.", "expansion": "Create a seven-slide Instagram carousel.", "tags": []}, {"name": "/carousel-9", "category": "Social Content", "description": "Create a nine-slide carousel.", "expansion": "Create a nine-slide carousel.", "tags": []}, {"name": "/grid-9", "category": "Social Content", "description": "Create a connected 3×3 Instagram grid campaign.", "expansion": "Create a connected 3×3 Instagram grid campaign.", "tags": []}, {"name": "/launch-grid", "category": "Social Content", "description": "Develop a visual launch sequence for a new brand/product.", "expansion": "Develop a visual launch sequence for a new brand/product.", "tags": []}, {"name": "/opening-soon", "category": "Social Content", "description": "Create an opening-soon campaign system.", "expansion": "Create an opening-soon campaign system.", "tags": []}, {"name": "/rebrand-announcement", "category": "Social Content", "description": "Create content explaining a business now operates under a new name.", "expansion": "Create content explaining a business now operates under a new name.", "tags": []}, {"name": "/offer-creative", "category": "Social Content", "description": "Create premium promotional/offer creative.", "expansion": "Create premium promotional/offer creative.", "tags": []}, {"name": "/caption", "category": "Social Content", "description": "Generate a social caption.", "expansion": "Generate a social caption.", "tags": []}, {"name": "/hashtags", "category": "Social Content", "description": "Generate relevant hashtags.", "expansion": "Generate relevant hashtags.", "tags": []}, {"name": "/keywords", "category": "Social Content", "description": "Generate searchable keywords.", "expansion": "Generate searchable keywords.", "tags": []}, {"name": "/full-social", "category": "Social Content", "description": "Generate caption, CTA, hashtags and keywords.", "expansion": "Generate caption, CTA, hashtags and keywords.", "tags": []}, {"name": "/social-optimize", "category": "Social Content", "description": "Adapt creative for social attention and format.", "expansion": "Adapt creative for social attention and format.", "tags": []}, {"name": "/brand-optimize", "category": "Social Content", "description": "Align output to brand identity, audience and commercial objective.", "expansion": "Align output to brand identity, audience and commercial objective.", "tags": []}, {"name": "/prompt-deep-analyze", "category": "Prompt Engineering", "description": "Perform expert diagnosis before rewriting.", "expansion": "Perform expert diagnosis before rewriting.", "tags": []}, {"name": "/prompt-rebuild", "category": "Prompt Engineering", "description": "Reconstruct prompt architecture from scratch while preserving intent.", "expansion": "Reconstruct prompt architecture from scratch while preserving intent.", "tags": []}, {"name": "/prompt-realism", "category": "Prompt Engineering", "description": "Optimize prompt specifically for photographic realism.", "expansion": "Optimize prompt specifically for photographic realism.", "tags": []}, {"name": "/prompt-seedance", "category": "Prompt Engineering", "description": "Optimize specifically for Seedance 2.5.", "expansion": "Optimize specifically for Seedance 2.5.", "tags": []}, {"name": "/prompt-image", "category": "Prompt Engineering", "description": "Optimize specifically for still-image generation.", "expansion": "Optimize specifically for still-image generation.", "tags": []}, {"name": "/prompt-reference", "category": "Prompt Engineering", "description": "Strengthen reference-image adherence.", "expansion": "Strengthen reference-image adherence.", "tags": []}, {"name": "/prompt-locks", "category": "Prompt Engineering", "description": "Automatically add critical identity/product/continuity locks.", "expansion": "Automatically add critical identity/product/continuity locks.", "tags": []}, {"name": "/prompt-negative", "category": "Prompt Engineering", "description": "Add intelligent failure prevention, not a generic negative dump.", "expansion": "Add intelligent failure prevention, not a generic negative dump.", "tags": []}, {"name": "/prompt-under-7500", "category": "Prompt Engineering", "description": "Keep final prompt under 7,500 characters while preserving critical rules.", "expansion": "Keep final prompt under 7,500 characters while preserving critical rules.", "tags": []}, {"name": "/prompt-copy", "category": "Prompt Engineering", "description": "Return only the finalized copy-ready prompt.", "expansion": "Return only the finalized copy-ready prompt.", "tags": []}, {"name": "/prompt", "category": "Prompt Engineering", "description": "Turn an idea into a usable AI prompt.", "expansion": "Turn an idea into a usable AI prompt.", "tags": []}, {"name": "/prompt-pro", "category": "Prompt Engineering", "description": "Create a professional structured prompt with strong constraints.", "expansion": "Create a professional structured prompt with strong constraints.", "tags": []}, {"name": "/prompt-architect", "category": "Prompt Engineering", "description": "Apply objective, context, constraints, structure, edge cases and output specification.", "expansion": "Apply objective, context, constraints, structure, edge cases and output specification.", "tags": []}, {"name": "/upgrade-prompt", "category": "Prompt Engineering", "description": "Improve an existing prompt without changing its core idea.", "expansion": "Improve an existing prompt without changing its core idea.", "tags": []}, {"name": "/rewrite-prompt", "category": "Prompt Engineering", "description": "Rebuild a weak prompt into a cleaner, stronger version.", "expansion": "Rebuild a weak prompt into a cleaner, stronger version.", "tags": []}, {"name": "/10x", "category": "Prompt Engineering", "description": "Aggressively increase quality, specificity and execution power.", "expansion": "Aggressively increase quality, specificity and execution power.", "tags": []}, {"name": "/100x", "category": "Prompt Engineering", "description": "Deep rebuild for high-value prompts.", "expansion": "Deep rebuild for high-value prompts.", "tags": []}, {"name": "/meta-prompt", "category": "Prompt Engineering", "description": "Create a reusable prompt that generates prompts/workflows.", "expansion": "Create a reusable prompt that generates prompts/workflows.", "tags": []}, {"name": "/analyze-prompt", "category": "Prompt Engineering", "description": "Explain strengths, weaknesses, risks and improvements.", "expansion": "Explain strengths, weaknesses, risks and improvements.", "tags": []}, {"name": "/score-prompt", "category": "Prompt Engineering", "description": "Score clarity, specificity, control, creativity and reliability.", "expansion": "Score clarity, specificity, control, creativity and reliability.", "tags": []}, {"name": "/debug-prompt", "category": "Prompt Engineering", "description": "Find why a prompt produces unwanted results.", "expansion": "Find why a prompt produces unwanted results.", "tags": []}, {"name": "/prompt-audit", "category": "Prompt Engineering", "description": "Perform consistency and contradiction checks.", "expansion": "Perform consistency and contradiction checks.", "tags": []}, {"name": "/remove-conflicts", "category": "Prompt Engineering", "description": "Resolve competing or contradictory instructions.", "expansion": "Resolve competing or contradictory instructions.", "tags": []}, {"name": "/remove-bloat", "category": "Prompt Engineering", "description": "Eliminate redundant wording and repeated rules.", "expansion": "Eliminate redundant wording and repeated rules.", "tags": []}, {"name": "/find-gaps", "category": "Prompt Engineering", "description": "Identify missing instructions that materially improve output.", "expansion": "Identify missing instructions that materially improve output.", "tags": []}, {"name": "/hyper-detail", "category": "Prompt Engineering", "description": "Add high-value specificity where it improves generation.", "expansion": "Add high-value specificity where it improves generation.", "tags": []}, {"name": "/precision", "category": "Prompt Engineering", "description": "Reduce ambiguity and make requirements explicit.", "expansion": "Reduce ambiguity and make requirements explicit.", "tags": []}, {"name": "/constraint-lock", "category": "Prompt Engineering", "description": "Turn critical requirements into non-negotiable constraints.", "expansion": "Turn critical requirements into non-negotiable constraints.", "tags": []}, {"name": "/negative-lock", "category": "Prompt Engineering", "description": "Add explicit failure-prevention rules.", "expansion": "Add explicit failure-prevention rules.", "tags": []}, {"name": "/priority-stack", "category": "Prompt Engineering", "description": "Rank instructions by importance.", "expansion": "Rank instructions by importance.", "tags": []}, {"name": "/reference-lock", "category": "Prompt Engineering", "description": "Make attached references authoritative.", "expansion": "Make attached references authoritative.", "tags": []}, {"name": "/consistency-lock", "category": "Prompt Engineering", "description": "Add persistent character/product/terminology continuity rules.", "expansion": "Add persistent character/product/terminology continuity rules.", "tags": []}, {"name": "/simplify", "category": "Prompt Engineering", "description": "Reduce complexity without losing required instructions.", "expansion": "Reduce complexity without losing required instructions.", "tags": []}, {"name": "/compact", "category": "Prompt Engineering", "description": "Produce a shorter token-efficient prompt.", "expansion": "Produce a shorter token-efficient prompt.", "tags": []}, {"name": "/ultra-compact", "category": "Prompt Engineering", "description": "Create the shortest functional version possible.", "expansion": "Create the shortest functional version possible.", "tags": []}, {"name": "/expand", "category": "Prompt Engineering", "description": "Turn a simple concept into a comprehensive production prompt.", "expansion": "Turn a simple concept into a comprehensive production prompt.", "tags": []}, {"name": "/structured", "category": "Prompt Engineering", "description": "Organize prompt into logical sections.", "expansion": "Organize prompt into logical sections.", "tags": []}, {"name": "/markdown-prompt", "category": "Prompt Engineering", "description": "Format the final prompt cleanly in Markdown.", "expansion": "Format the final prompt cleanly in Markdown.", "tags": []}, {"name": "/copy-ready", "category": "Prompt Engineering", "description": "Return an immediately reusable prompt with no unnecessary commentary.", "expansion": "Return an immediately reusable prompt with no unnecessary commentary.", "tags": []}, {"name": "/template", "category": "Prompt Engineering", "description": "Turn a successful prompt into a reusable variable-driven template.", "expansion": "Turn a successful prompt into a reusable variable-driven template.", "tags": []}, {"name": "/model-optimize", "category": "Prompt Engineering", "description": "Adapt prompt structure for the target model.", "expansion": "Adapt prompt structure for the target model.", "tags": []}, {"name": "/image-optimize", "category": "Prompt Engineering", "description": "Optimize/generalize for still-image generation.", "expansion": "Optimize/generalize for still-image generation.", "tags": []}, {"name": "/video-optimize", "category": "Prompt Engineering", "description": "Optimize/generalize for AI video generation.", "expansion": "Optimize/generalize for AI video generation.", "tags": []}, {"name": "/final-pass", "category": "Prompt Engineering", "description": "Perform final polish before execution.", "expansion": "Perform final polish before execution.", "tags": []}, {"name": "/execute", "category": "Prompt Engineering", "description": "Stop revising and execute the finalized prompt.", "expansion": "Stop revising and execute the finalized prompt.", "tags": []}, {"name": "/ideas-10-cinematic", "category": "Ideas", "description": "Generate ten genuinely distinct cinematic concepts.", "expansion": "Generate ten genuinely distinct cinematic concepts.", "tags": []}, {"name": "/ideas-10-luxury", "category": "Ideas", "description": "Generate ten premium luxury campaign directions.", "expansion": "Generate ten premium luxury campaign directions.", "tags": []}, {"name": "/ideas-10-comedy", "category": "Ideas", "description": "Generate ten short-form comedy concepts.", "expansion": "Generate ten short-form comedy concepts.", "tags": []}, {"name": "/ideas-10-supercar", "category": "Ideas", "description": "Generate ten completely different supercar scenarios.", "expansion": "Generate ten completely different supercar scenarios.", "tags": []}, {"name": "/ideas-10-airforce", "category": "Ideas", "description": "Generate ten advanced fighter-jet/aerospace scenarios.", "expansion": "Generate ten advanced fighter-jet/aerospace scenarios.", "tags": []}, {"name": "/ideas-10-fashion", "category": "Ideas", "description": "Generate ten fashion editorial scenes.", "expansion": "Generate ten fashion editorial scenes.", "tags": []}, {"name": "/ideas-10-ugc", "category": "Ideas", "description": "Generate ten social-first UGC concepts.", "expansion": "Generate ten social-first UGC concepts.", "tags": []}, {"name": "/ideas-no-generic", "category": "Ideas", "description": "Reject obvious concepts and actively search for unusual approaches.", "expansion": "Reject obvious concepts and actively search for unusual approaches.", "tags": []}, {"name": "/best-3", "category": "Ideas", "description": "Identify the three strongest ideas from a larger set.", "expansion": "Identify the three strongest ideas from a larger set.", "tags": []}, {"name": "/pick-one", "category": "Ideas", "description": "Choose the strongest direction yourself instead of asking the user.", "expansion": "Choose the strongest direction yourself instead of asking the user.", "tags": []}, {"name": "/3-ideas", "category": "Ideas", "description": "Generate three strong distinct approaches.", "expansion": "Generate three strong distinct approaches.", "tags": []}, {"name": "/5-ideas", "category": "Ideas", "description": "Generate five strong distinct approaches.", "expansion": "Generate five strong distinct approaches.", "tags": []}, {"name": "/10-ideas", "category": "Ideas", "description": "Generate ten high-quality concepts.", "expansion": "Generate ten high-quality concepts.", "tags": []}, {"name": "/20-ideas", "category": "Ideas", "description": "Generate twenty diverse concepts.", "expansion": "Generate twenty diverse concepts.", "tags": []}, {"name": "/wildcard", "category": "Ideas", "description": "Introduce one unexpected creative direction.", "expansion": "Introduce one unexpected creative direction.", "tags": []}, {"name": "/unique", "category": "Ideas", "description": "Actively avoid obvious and frequently used concepts.", "expansion": "Actively avoid obvious and frequently used concepts.", "tags": []}, {"name": "/viral-angle", "category": "Ideas", "description": "Prioritize curiosity, emotion, attention and shareability.", "expansion": "Prioritize curiosity, emotion, attention and shareability.", "tags": []}, {"name": "/premium-angle", "category": "Ideas", "description": "Push the concept toward luxury and high perceived production value.", "expansion": "Push the concept toward luxury and high perceived production value.", "tags": []}, {"name": "/rank", "category": "Ideas", "description": "Rank generated ideas from strongest to weakest.", "expansion": "Rank generated ideas from strongest to weakest.", "tags": []}, {"name": "/best-option", "category": "Ideas", "description": "Select and develop the strongest option.", "expansion": "Select and develop the strongest option.", "tags": []}, {"name": "/combine-best", "category": "Ideas", "description": "Merge the best aspects of several concepts.", "expansion": "Merge the best aspects of several concepts.", "tags": []}, {"name": "/variation", "category": "Ideas", "description": "Create controlled variants while preserving the core idea.", "expansion": "Create controlled variants while preserving the core idea.", "tags": []}, {"name": "/v2", "category": "Ideas", "description": "Create a meaningfully improved second version.", "expansion": "Create a meaningfully improved second version.", "tags": []}, {"name": "/awwwards", "category": "Website", "description": "Push web direction toward award-level interactive digital experiences.", "expansion": "Push web direction toward award-level interactive digital experiences.", "tags": []}, {"name": "/website-redesign", "category": "Website", "description": "Rethink structure, UX, hierarchy and visual language—not just colours.", "expansion": "Rethink structure, UX, hierarchy and visual language—not just colours.", "tags": []}, {"name": "/website-premium", "category": "Website", "description": "Upgrade site into a polished international-brand experience.", "expansion": "Upgrade site into a polished international-brand experience.", "tags": []}, {"name": "/hero-wow", "category": "Website", "description": "Create a high-impact homepage hero.", "expansion": "Create a high-impact homepage hero.", "tags": []}, {"name": "/site-motion", "category": "Website", "description": "Design meaningful scroll interactions, transitions and microinteractions.", "expansion": "Design meaningful scroll interactions, transitions and microinteractions.", "tags": []}, {"name": "/site-copy", "category": "Website", "description": "Create premium website messaging.", "expansion": "Create premium website messaging.", "tags": []}, {"name": "/site-mobile-first", "category": "Website", "description": "Consider mobile experience from the beginning.", "expansion": "Consider mobile experience from the beginning.", "tags": []}, {"name": "/site-conversion", "category": "Website", "description": "Optimize hierarchy and CTAs for business outcomes.", "expansion": "Optimize hierarchy and CTAs for business outcomes.", "tags": []}, {"name": "/website", "category": "Website", "description": "Create website structure, concept or copy.", "expansion": "Create website structure, concept or copy.", "tags": []}, {"name": "/landing-page", "category": "Website", "description": "Create a landing-page concept.", "expansion": "Create a landing-page concept.", "tags": []}, {"name": "/hero-section", "category": "Website", "description": "Create a hero-section concept.", "expansion": "Create a hero-section concept.", "tags": []}, {"name": "/awwwards-mode", "category": "Website", "description": "Push toward premium award-level digital design thinking.", "expansion": "Push toward premium award-level digital design thinking.", "tags": []}, {"name": "/brand-copy", "category": "Website", "description": "Generate premium website or brand copy.", "expansion": "Generate premium website or brand copy.", "tags": []}, {"name": "/ar-916", "category": "Parameters", "description": "Set aspect ratio to vertical 9:16.", "expansion": "Set aspect ratio to vertical 9:16.", "tags": []}, {"name": "/ar-45", "category": "Parameters", "description": "Set aspect ratio to vertical 4:5.", "expansion": "Set aspect ratio to vertical 4:5.", "tags": []}, {"name": "/ar-11", "category": "Parameters", "description": "Set aspect ratio to square 1:1.", "expansion": "Set aspect ratio to square 1:1.", "tags": []}, {"name": "/ar-169", "category": "Parameters", "description": "Set aspect ratio to horizontal 16:9.", "expansion": "Set aspect ratio to horizontal 16:9.", "tags": []}, {"name": "/ar-219", "category": "Parameters", "description": "Set aspect ratio to cinematic 21:9.", "expansion": "Set aspect ratio to cinematic 21:9.", "tags": []}, {"name": "/duration-10", "category": "Parameters", "description": "Set video duration to 10 seconds.", "expansion": "Set video duration to 10 seconds.", "tags": []}, {"name": "/duration-15", "category": "Parameters", "description": "Set video duration to 15 seconds.", "expansion": "Set video duration to 15 seconds.", "tags": []}, {"name": "/duration-20", "category": "Parameters", "description": "Set video duration to 20 seconds.", "expansion": "Set video duration to 20 seconds.", "tags": []}, {"name": "/duration-30", "category": "Parameters", "description": "Set video duration to 30 seconds.", "expansion": "Set video duration to 30 seconds.", "tags": []}, {"name": "/shots-3", "category": "Parameters", "description": "Use 3 shots.", "expansion": "Use 3 shots.", "tags": []}, {"name": "/shots-5", "category": "Parameters", "description": "Use 5 shots.", "expansion": "Use 5 shots.", "tags": []}, {"name": "/shots-8", "category": "Parameters", "description": "Use 8 shots.", "expansion": "Use 8 shots.", "tags": []}, {"name": "/shots-10", "category": "Parameters", "description": "Use 10 shots.", "expansion": "Use 10 shots.", "tags": []}, {"name": "/vertical", "category": "Parameters", "description": "Use vertical orientation.", "expansion": "Use vertical orientation.", "tags": []}, {"name": "/horizontal", "category": "Parameters", "description": "Use horizontal orientation.", "expansion": "Use horizontal orientation.", "tags": []}, {"name": "/quality-max", "category": "Parameters", "description": "Prioritize maximum output quality.", "expansion": "Prioritize maximum output quality.", "tags": []}];
  const BUNDLES = {"/EDIT-ME": ["/gaurev-lock", "/face-zero-drift", "/body-zero-drift", "/change-everything-except-me", "/photo-real-max", "/no-ai-look"], "/FASHION-ME": ["/gaurev-lock", "/quiet-luxury", "/gq-mode", "/photo-real-max", "/real-skin", "/real-materials"], "/BILLIONAIRE-ME": ["/gaurev-lock", "/billionaire-mode", "/quiet-luxury", "/photo-real-max", "/no-ai-look", "/real-light"], "/MOVIE-ME": ["/gaurev-lock", "/production-still", "/movie-poster", "/real-light", "/real-physics", "/photo-real-max"], "/POSTER-MAX": ["/blockbuster-keyart", "/text-perfect", "/logo-exact", "/instagram-poster", "/photo-real-max", "/no-ai-look"], "/IMAGE-MAX": ["/reference-exact", "/photo-real-max", "/no-ai-look", "/real-skin", "/real-materials", "/real-light", "/real-physics"], "/STORYBOARD-MAX": ["/storyboard-gaurev", "/storyboard-10", "/storyboard-image-prompts", "/storyboard-video-prompts", "/hero-frame", "/end-frame-lock"], "/SEEDANCE-MAX": ["/seedance-director", "/seedance-reference-lock", "/seedance-continuity", "/seedance-real-motion", "/seedance-camera-real", "/audio-real"], "/REEL-MAX": ["/seedance-20", "/seedance-916", "/viral-first-3", "/seedance-fast-cut", "/audio-real"], "/UGC-MAX": ["/raw-phone-video", "/creator-ugc", "/no-ad-acting", "/jumpcut", "/viral-first-3", "/audio-real"], "/PRODUCT-MAX": ["/product-zero-drift", "/reference-exact", "/real-materials", "/product-lux", "/product-hero-frame"], "/JEWELLERY-MAX": ["/jewellery-zero-drift", "/product-macro", "/real-skin", "/real-materials", "/product-lux", "/product-hero-frame"], "/SUPERCAR-MAX": ["/gaurev-lock", "/supercar-editorial", "/car-lock", "/real-materials", "/real-physics", "/photo-real-max", "/cinematic-world"], "/FIGHTERJET-MAX": ["/gaurev-lock", "/fighter-jet", "/machine-scale", "/cinematic-world", "/production-still", "/real-physics", "/photo-real-max"], "/SOCIAL-MAX": ["/social-optimize", "/viral-first-3", "/caption-full", "/brand-clean", "/instagram-poster"], "/CAMPAIGN-MAX": ["/ideas-no-generic", "/pick-one", "/brand-optimize", "/social-optimize", "/storyboard-video-prompts", "/final-pass"], "/WEBSITE-MAX": ["/website-redesign", "/website-premium", "/awwwards", "/hero-wow", "/site-motion", "/site-mobile-first", "/site-conversion"], "/PROMPT-MAX-GK": ["/prompt-deep-analyze", "/prompt-rebuild", "/prompt-locks", "/prompt-reference", "/prompt-negative", "/ideas-no-generic", "/prompt-copy"], "/IDEAS-MAX": ["/ideas-no-generic", "/ideas-10-cinematic", "/best-3", "/pick-one"], "/CHARACTER-SHEET": ["/gaurev-lock", "/multi-ref-lock", "/reference-exact", "/photo-real-max", "/real-skin", "/real-materials"]};
  const DEFAULT_FAVORITES = ["/EDIT-ME", "/IMAGE-MAX", "/FASHION-ME", "/BILLIONAIRE-ME", "/POSTER-MAX", "/STORYBOARD-MAX", "/SEEDANCE-MAX", "/REEL-MAX", "/UGC-MAX", "/PRODUCT-MAX", "/JEWELLERY-MAX", "/PROMPT-MAX-GK"];
  const CATEGORY_ORDER = ["★ Master Bundles", "Character & Identity", "Image Editing", "Realism", "Luxury & Fashion", "Supercars & Machines", "Posters & Key Art", "Storyboards", "Seedance & Video", "UGC & Reels", "Voice & Audio", "Products & Jewellery", "Social Content", "Prompt Engineering", "Ideas", "Website", "Parameters"];
  const CATEGORY_META = {"★ Master Bundles": ["⚡", "Bundles", "Your fastest all-in-one workflow presets"], "Character & Identity": ["👤", "Character", "Identity, face, body and reference locking"], "Image Editing": ["🖼️", "Image", "Wardrobe, background and exact image edits"], "Realism": ["📷", "Realism", "Photorealism, skin, materials, lighting and physics"], "Luxury & Fashion": ["✨", "Luxury", "Fashion, billionaire, villa, beach and private aviation"], "Supercars & Machines": ["🏎️", "Machines", "Supercars, number plates and fighter jets"], "Posters & Key Art": ["🎨", "Posters", "Movie posters, key art, logos and typography"], "Storyboards": ["🎞️", "Storyboard", "Storyboard, shot lists and hero frames"], "Seedance & Video": ["🎬", "Video", "Seedance, camera, motion and continuity"], "UGC & Reels": ["📱", "UGC", "Phone video, creator UGC, reels and viral hooks"], "Voice & Audio": ["🎙️", "Audio", "Voiceover, music, ambience and sound design"], "Products & Jewellery": ["💎", "Product", "Product locks, jewellery and packshots"], "Social Content": ["📣", "Social", "Captions, grids, carousels and campaigns"], "Prompt Engineering": ["🧠", "Prompt", "Prompt analysis, optimization and rebuilding"], "Ideas": ["💡", "Ideas", "Idea generation, ranking and selection"], "Website": ["🌐", "Website", "Website redesign, hero, motion and conversion"], "Parameters": ["⚙️", "Parameters", "Aspect ratio, duration, shots and orientation"]};

  const DEFAULTS = {
    enabled: true,
    favorites: DEFAULT_FAVORITES,
    maxResults: 22,
    showDescriptions: true,
    tabStacks: true,
  };

  let settings = Object.assign({}, DEFAULTS, GM_getValue('gk_settings', {}));
  let paletteOpen = false;
  let selectedIndex = 0;
  let currentEditable = null;
  let currentFragment = null;
  let visibleItems = [];
  let recent = [];
  let mode = 'categories'; // categories | commands | search
  let activeCategory = null;
  let host, shadow, listEl, hintEl, crumbEl, titleEl;

  function save() { GM_setValue('gk_settings', settings); }

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

  function score(c, q) {
    q = (q || '').toLowerCase().trim();
    const name = c.name.toLowerCase();
    const desc = (c.description || '').toLowerCase();
    const cat = (c.category || '').toLowerCase();
    let s = 0;
    if (name === '/' + q) s += 300;
    if (name.startsWith('/' + q)) s += 220;
    if (name.includes(q)) s += 120;
    if (desc.includes(q)) s += 45;
    if (cat.includes(q)) s += 35;
    if ((settings.favorites || []).includes(c.name)) s += 10;
    let qi = 0, hay = name.slice(1);
    for (const ch of hay) {
      if (ch === q[qi]) qi++;
      if (qi === q.length) { s += 30; break; }
    }
    return s;
  }

  function searchCommands(q) {
    return COMMANDS.map(c => ({ c, s: score(c, q) }))
      .filter(x => x.s > 0)
      .sort((a,b) => b.s - a.s || a.c.name.localeCompare(b.c.name))
      .slice(0, Number(settings.maxResults || 22))
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
        :host{all:initial}
        *{box-sizing:border-box}
        .panel{
          width:min(640px,calc(100vw - 24px));
          max-height:min(620px,72vh);
          overflow:hidden;border:1px solid rgba(128,128,128,.24);
          border-radius:18px;background:rgba(255,255,255,.98);color:#171717;
          box-shadow:0 22px 80px rgba(0,0,0,.26);backdrop-filter:blur(20px);
          font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif
        }
        .head{padding:11px 13px 9px;border-bottom:1px solid rgba(128,128,128,.14)}
        .topline{display:flex;justify-content:space-between;align-items:center;gap:10px}
        .title{font-weight:800;font-size:12px;letter-spacing:.02em}
        .hint{font:10px ui-monospace,SFMono-Regular,Menlo,monospace;opacity:.55}
        .crumb{font-size:10px;opacity:.56;margin-top:5px}
        .list{max-height:500px;overflow:auto;padding:8px}
        .category-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
        .category{
          display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;
          padding:11px;border-radius:12px;cursor:pointer;border:1px solid rgba(128,128,128,.13)
        }
        .category:hover,.category.sel{background:rgba(124,58,237,.09);border-color:rgba(124,58,237,.25)}
        .ico{font-size:18px;text-align:center}
        .clabel{font-size:12px;font-weight:750}
        .cdesc{font-size:10.5px;opacity:.62;margin-top:2px;line-height:1.25}
        .count{font-size:9px;opacity:.5;border:1px solid rgba(128,128,128,.2);border-radius:999px;padding:3px 6px}
        .row{
          display:grid;grid-template-columns:minmax(155px,210px) 1fr auto;
          gap:10px;align-items:center;padding:9px 10px;border-radius:10px;cursor:pointer
        }
        .row:hover,.row.sel{background:rgba(128,128,128,.13)}
        .cmd{font:700 12.5px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap}
        .bundle{color:#6d28d9}
        .fav{color:#f59e0b;margin-right:5px}
        .desc{font-size:11.5px;opacity:.7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .cat{font-size:9.5px;opacity:.55;border:1px solid rgba(128,128,128,.18);border-radius:999px;padding:3px 6px;white-space:nowrap}
        .empty{padding:28px;text-align:center;font-size:12px;opacity:.6}
        .foot{display:flex;gap:13px;flex-wrap:wrap;padding:8px 12px;border-top:1px solid rgba(128,128,128,.14);font-size:9.5px;opacity:.55}
        kbd{font:inherit;border:1px solid rgba(128,128,128,.24);border-radius:5px;padding:2px 5px}
        @media(max-width:620px){.category-grid{grid-template-columns:1fr}.panel{width:calc(100vw - 16px)}}
        @media(prefers-color-scheme:dark){
          .panel{background:rgba(29,29,31,.98);color:#f4f4f5}
          .bundle{color:#c4b5fd}
          .category:hover,.category.sel{background:rgba(139,92,246,.16);border-color:rgba(139,92,246,.32)}
        }
      </style>
      <div class="panel">
        <div class="head">
          <div class="topline">
            <span class="title">Gaurev Command Palette</span>
            <span class="hint"></span>
          </div>
          <div class="crumb"></div>
        </div>
        <div class="list"></div>
        <div class="foot">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>Enter</kbd> open/insert</span>
          <span><kbd>Tab</kbd> insert + stack</span>
          <span><kbd>←</kbd> back</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>`;
    listEl = shadow.querySelector('.list');
    hintEl = shadow.querySelector('.hint');
    crumbEl = shadow.querySelector('.crumb');
    titleEl = shadow.querySelector('.title');
  }

  function position(editable) {
    const r = editable.getBoundingClientRect();
    const w = Math.min(640, window.innerWidth - 24);
    const left = Math.max(12, Math.min(r.left, window.innerWidth - w - 12));
    let top = r.top - Math.min(620, window.innerHeight * .72) - 10;
    if (top < 12) top = Math.min(window.innerHeight - 320, r.bottom + 8);
    host.style.left = `${left}px`;
    host.style.top = `${Math.max(12, top)}px`;
  }

  function render() {
    ensurePalette();
    listEl.innerHTML = '';

    if (mode === 'categories') {
      visibleItems = categoryItems();
      hintEl.textContent = 'Choose a section';
      crumbEl.textContent = 'Type after / to search all commands directly';
      const grid = document.createElement('div');
      grid.className = 'category-grid';

      visibleItems.forEach((item,i) => {
        const el = document.createElement('div');
        el.className = 'category' + (i===selectedIndex ? ' sel':'');
        el.innerHTML = `
          <div class="ico">${item.icon}</div>
          <div><div class="clabel">${escapeHtml(item.label)}</div><div class="cdesc">${escapeHtml(item.description)}</div></div>
          <div class="count">${item.count}</div>`;
        el.addEventListener('mouseenter',()=>{selectedIndex=i;updateSelection()});
        el.addEventListener('mousedown',e=>{e.preventDefault();activateItem(i,false)});
        grid.appendChild(el);
      });
      listEl.appendChild(grid);
      return;
    }

    if (mode === 'commands') {
      visibleItems = commandsForCategory(activeCategory);
      const label = activeCategory === '__favorites__'
        ? 'Favorites'
        : (CATEGORY_META[activeCategory]?.[1] || activeCategory);
      hintEl.textContent = `${visibleItems.length} commands`;
      crumbEl.textContent = `All Sections  ›  ${label}`;
    } else {
      const q = currentFragment?.query || '';
      visibleItems = searchCommands(q);
      hintEl.textContent = `/${q}`;
      crumbEl.textContent = 'Search results across all sections';
    }

    selectedIndex = Math.min(selectedIndex, Math.max(0,visibleItems.length-1));

    if (!visibleItems.length) {
      listEl.innerHTML = '<div class="empty">No matching commands</div>';
      return;
    }

    visibleItems.forEach((item,i)=>{
      const c = item.command;
      const row = document.createElement('div');
      const isBundle = c.category === '★ Master Bundles';
      const isFav = (settings.favorites || []).includes(c.name);
      row.className='row'+(i===selectedIndex?' sel':'');
      row.innerHTML=`
        <div class="cmd ${isBundle?'bundle':''}">${isFav?'<span class="fav">★</span>':''}${escapeHtml(c.name)}</div>
        <div class="desc">${settings.showDescriptions?escapeHtml(c.description||''):''}</div>
        <div class="cat">${escapeHtml(c.category||'')}</div>`;
      row.addEventListener('mouseenter',()=>{selectedIndex=i;updateSelection()});
      row.addEventListener('mousedown',e=>{e.preventDefault();activateItem(i,false)});
      listEl.appendChild(row);
    });
  }

  function updateSelection() {
    const nodes = mode === 'categories'
      ? [...listEl.querySelectorAll('.category')]
      : [...listEl.querySelectorAll('.row')];
    nodes.forEach((n,i)=>n.classList.toggle('sel',i===selectedIndex));
    nodes[selectedIndex]?.scrollIntoView({block:'nearest'});
  }

  function openPalette(editable, fragment) {
    if (!settings.enabled) return;
    ensurePalette();
    currentEditable = editable;
    currentFragment = fragment;
    host.style.display='block';
    paletteOpen=true;
    selectedIndex=0;

    if (fragment.query) {
      mode='search';
      activeCategory=null;
    } else {
      mode='categories';
      activeCategory=null;
    }
    render();
    position(editable);
  }

  function closePalette() {
    if (!host) return;
    host.style.display='none';
    paletteOpen=false;
    currentEditable=null;
    currentFragment=null;
    activeCategory=null;
    mode='categories';
  }

  function activateItem(index, stack) {
    const item = visibleItems[index];
    if (!item) return;

    if (item.type === 'category') {
      activeCategory = item.category;
      mode = 'commands';
      selectedIndex = 0;
      render();
      return;
    }

    const c = item.command;
    if (!c || !currentEditable || !currentFragment) return;

    const suffix = stack && settings.tabStacks ? '\n/' : ' ';
    replaceText(currentEditable, currentFragment.start, currentFragment.end, c.name + suffix);
    recent = [c.name,...recent.filter(x=>x!==c.name)].slice(0,8);

    if (stack && settings.tabStacks) {
      setTimeout(()=>{
        const frag = getFragment(currentEditable);
        if (frag) openPalette(currentEditable,frag);
      },0);
    } else closePalette();
  }

  function goBack() {
    if (mode === 'commands' || mode === 'search') {
      mode='categories';
      activeCategory=null;
      selectedIndex=0;
      if (currentFragment) {
        currentFragment.query='';
      }
      render();
    }
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
  GM_registerMenuCommand('Show installed version',()=>{
    const version=GM_info?.script?.version||'unknown';
    alert(`Gaurev Command Palette\nVersion: ${version}\nCommands: ${COMMANDS.length}\nUI: Hierarchical categories`);
  });
})();