import{a as u,S as m,i as l}from"./assets/vendor-ee72e1a4.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();async function f(t,a){const s="https://pixabay.com/api/",i=new URLSearchParams({key:"44038258-5ed49f7c308af682a7282867b",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:a});try{return(await u.get(s,{params:i})).data}catch(e){throw new Error(e.message)}}const p=document.querySelector(".js-images-container");function y(t){return`<li class='image-gallery'>
    <a href="${t.largeImageURL}" class="gallery-list">
      <img src="${t.webformatURL}" 
           alt="${t.tags}" loading="lazy"
           class="gallery-link"/>
           </a>
      <div class="info-list">
        <p class="info-item"><b class info-title>Likes:</b> ${t.likes}</p>
        <p class="info-item"><b class info-title>Views:</b> ${t.views}</p>
        <p class="info-item"><b class info-title>Comments:</b> ${t.comments}</p>
        <p class="info-item"><b class info-title>Downloads:</b> ${t.downloads}</p>
      </div>
      </li>
      `}function g(t){return t.map(y).join("")}function h(t){const a=g(t);p.insertAdjacentHTML("beforeend",a),new m(".gallery, a",{captionsData:"alt",captionDelay:250}).refresh()}const c=document.querySelector(".images-form"),o=document.querySelector(".loader"),L=document.querySelector(".js-images-container"),d=document.querySelector(".load-more");let b=1;d.addEventListener("click",handleUpdate);c.addEventListener("submit",async t=>{if(t.preventDefault(),L.innerHTML="",!t.target.elements.query.value.trim()){l.error({title:"Error",message:"Please enter a search query"});return}o.classList.remove("hidden"),o.classList.add("hidden"),w();try{const s=await f(guery,b);s.hits.length>0?(h(s.hits),d.style.display="block"):(l.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"},2e3),q())}catch(s){l.error({title:"Error",message:s.message})}finally{o.classList.add("hidden")}c.reset()});function w(){o.style.display="block"}function q(){o.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
