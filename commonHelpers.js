import{S as u,i as l}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();function f(t){const s="https://pixabay.com/api/",o=new URLSearchParams({key:"44038258-5ed49f7c308af682a7282867b",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true"}),n=`${s}?${o}`;return fetch(n).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}const d=document.querySelector(".js-images-container");function m(t){return`<li class='image-gallery'>
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
      `}function p(t){return t.map(m).join("")}function g(t){const s=p(t);d.insertAdjacentHTML("beforeend",s),new u(".gallery, a",{captionsData:"alt",captionDelay:250}).refresh()}const c=document.querySelector(".images-form"),i=document.querySelector(".loader"),y=document.querySelector(".js-images-container");c.addEventListener("submit",t=>{t.preventDefault();const s=t.target.elements.query.value.trim();if(!s){l.error({title:"Error",message:"Please enter a search query"});return}i.classList.remove("hidden"),i.classList.add("hidden"),h(),y.innerHTML="",f(s).then(o=>{o.hits.length>0?g(o.hits):(l.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!"},2e3),L())}).catch(o=>{l.error({title:"Error",message:o.message})}).finally(()=>{i.classList.add("hidden")}),c.reset()});function h(){i.style.display="block"}function L(){i.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
