import{a as w,S,i}from"./assets/vendor-ee72e1a4.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function c(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=c(t);fetch(t.href,s)}})();async function g(e,r){const c="https://pixabay.com/api/",a=new URLSearchParams({key:"44038258-5ed49f7c308af682a7282867b",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:r});try{return(await w.get(c,{params:a})).data}catch(t){throw new Error(t.message)}}const q=document.querySelector(".js-images-container");let E=new S(".gallery, a",{captionsData:"alt",captionDelay:250});function v(e){return`<li class='image-gallery'>
    <a href="${e.largeImageURL}" class="gallery-list">
      <img src="${e.webformatURL}" 
           alt="${e.tags}" loading="lazy"
           class="gallery-link"/>
           </a>
      <div class="info-list">
        <p class="info-item"><b class info-title>Likes:</b> ${e.likes}</p>
        <p class="info-item"><b class info-title>Views:</b> ${e.views}</p>
        <p class="info-item"><b class info-title>Comments:</b> ${e.comments}</p>
        <p class="info-item"><b class info-title>Downloads:</b> ${e.downloads}</p>
      </div>
      </li>
      `}function M(e){return e.map(v).join("")}function p(e){const r=M(e);q.insertAdjacentHTML("beforeend",r),E.refresh()}const m=document.querySelector(".images-form"),h=document.querySelector(".loader"),P=document.querySelector(".js-images-container"),u=document.querySelector(".load-more");let o=1,n="",l=0;m.addEventListener("submit",async e=>{if(e.preventDefault(),f(),o=1,P.innerHTML="",n=e.target.elements.query.value.trim(),!n){i.error({title:"Error",message:"Please enter a search query",position:"topRight"});return}L();try{const r=await g(n,o);r.hits.length>0?(l=Math.ceil(r.totalHits/15),p(r.hits),y()):i.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(r){i.error({title:"Error",message:r.message})}finally{b()}m.reset()});u.addEventListener("click",async()=>{L(),f();try{o+=1;const e=await g(n,o);if(e.hits.length>0){p(e.hits),y();const{height:r}=document.querySelector(".js-images-container").firstElementChild.getBoundingClientRect()}else throw new Error("We're sorry, there are no more posts to load")}catch(e){i.error({title:"Error",message:e.message})}finally{b()}});function y(){o>=l?(f(),l>0&&o===l&&i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):R()}function L(){h.style.display="inline-block"}function b(){h.style.display="none"}function R(){u.classList.remove("hidden")}function f(){u.classList.add("hidden")}
//# sourceMappingURL=commonHelpers.js.map