class SearchSettings{constructor(){this.page=1,this.maxPage=1,this.adultContent=!1,this.region="GB",this.movieOrTv=0}}const searchSettings=new SearchSettings,tabTriggerList={buy:null,rent:null,stream:null,freeStream:null},fetchSettings={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzk4MTAxNjk0OTQ2MmE4NmJlNTA2NTc2Yjg1ZjZlNCIsInN1YiI6IjY2MjFkMDY1Y2NkZTA0MDE4ODA2NDA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xUExDZr1UbIizmXNPNqotICIYYKTQfRltq2uIgq9qjI"}};function search(e){document.querySelector("#search-results").innerHTML="",document.querySelector("#pagination-btns").classList.add("d-none"),document.querySelector("#no-result-error").classList.add("d-none"),e&&(document.querySelector("#loading-spinner").classList.remove("d-none"),fetch(0==searchSettings.movieOrTv?`https://api.themoviedb.org/3/search/movie?query=${e}&include_adult=${searchSettings.adultContent}&page=${searchSettings.page}`:`https://api.themoviedb.org/3/search/tv?query=${e}&include_adult=${searchSettings.adultContent}&page=${searchSettings.page}`,fetchSettings).then((e=>{if(e.ok)return e.json();throw new Error("Network response was not ok")})).then((e=>{const t=document.querySelector("#search-results");searchSettings.maxPage=e.total_pages,searchSettings.maxPage>1&&(document.querySelector("#current-page-number").textContent=searchSettings.page,document.querySelector("#total-pages-number").textContent=searchSettings.maxPage,document.querySelector("#pagination-btns").classList.remove("d-none")),e.results.forEach((e=>{const n=document.createElement("div");n.classList.add("col");const r=document.createElement("div");if(r.classList.add("card","bg-body-tertiary","justify-content-center","h-100","shadow-lg","border-0","clickable"),n.appendChild(r),e.poster_path){const t=document.createElement("img");t.classList.add("card-img"),t.src=`https://image.tmdb.org/t/p/w500${e.poster_path}`,t.alt=e.title||e.name||e.original_title||e.original_name,r.appendChild(t)}else{const t=document.createElement("div");t.classList.add("placeholder-card-img");const n=document.createElement("img");n.classList.add("card-img"),n.src="assets/images/FillerImage.webp",n.alt=e.title||e.name||e.original_title||e.original_name,t.appendChild(n);const a=document.createElement("div");a.classList.add("placeholder-card-img-text");const s=document.createElement("div");s.classList.add("fw-bold","fs-5","pb-1"),s.textContent=e.title||e.name||e.original_title||e.original_name,a.appendChild(s);const o=document.createElement("div");o.classList.add("fs-6","text-muted","pb-1"),o.textContent=convertDate(e.release_date||e.first_air_date),a.appendChild(o);const i=document.createElement("div");i.classList.add("fs-6","text-muted"),e.overview?i.textContent=`${e.overview.substring(0,150)} ...`:i.textContent="No overview available",a.appendChild(i);const c=document.createElement("div");c.classList.add("fs-6","text-muted","fw-bold","pt-1"),c.textContent="Click to see more",a.appendChild(c),t.appendChild(a),r.appendChild(t)}r.addEventListener("click",(()=>{fetch(0==searchSettings.movieOrTv?`https://api.themoviedb.org/3/movie/${e.id}/watch/providers`:`https://api.themoviedb.org/3/tv/${e.id}/watch/providers`,fetchSettings).then((e=>{if(e.ok)return e.json();throw new Error("Network response was not ok")})).then((t=>{fetch(0==searchSettings.movieOrTv?"https://api.themoviedb.org/3/genre/movie/list?language=en":"https://api.themoviedb.org/3/genre/tv/list?language=en",fetchSettings).then((e=>{if(e.ok)return e.json();throw new Error("Network response was not ok")})).then((n=>{const r=[];e.genre_ids.forEach((e=>{const t=n.genres.find((t=>t.id===e));t&&r.push(t.name)})),document.querySelector("#show-title").textContent=e.title||e.name||e.original_title||e.original_name,document.querySelector("#show-release-date").textContent=convertDate(e.release_date||e.first_air_date),document.querySelector("#show-description").textContent=e.overview||"No overview available",document.querySelector("#show-genres").textContent=r.join(", ")||"No genres available",document.querySelector("#show-rating").textContent=parseFloat(e.vote_average).toFixed(1)||"No rating available";const a=document.querySelector("#where-to-watch");a.classList.add("d-none");const s=document.querySelector("#buy-tab");s.classList.add("d-none");const o=document.querySelector("#buy-output");o.innerHTML="";const i=document.querySelector("#rent-tab");i.classList.add("d-none");const c=document.querySelector("#rent-output");c.innerHTML="";const d=document.querySelector("#stream-tab");d.classList.add("d-none");const l=document.querySelector("#stream-output");l.innerHTML="";const u=document.querySelector("#free-stream-tab");u.classList.add("d-none");const g=document.querySelector("#free-stream-output");g.innerHTML="";const m=t.results[searchSettings.region];if(m){document.querySelector("#region-display").textContent=searchSettings.region;const e={buy:!1,rent:!1,stream:!1,freeStream:!1};if(m.buy){for(const e of m.buy){const t=document.createElement("div");t.classList.add("bg-dark-subtle","p-2","rounded-3","mt-2","text-center");const n=document.createElement("p");n.classList.add("m-0","fw-bold"),n.textContent=e.provider_name,t.appendChild(n),o.appendChild(t)}s.classList.remove("d-none"),e.buy=!0}if(m.rent){for(const e of m.rent){const t=document.createElement("div");t.classList.add("bg-dark-subtle","p-2","rounded-3","mt-2","text-center");const n=document.createElement("p");n.classList.add("m-0","fw-bold"),n.textContent=e.provider_name,t.appendChild(n),c.appendChild(t)}i.classList.remove("d-none"),e.rent=!0}if(m.flatrate){for(const e of m.flatrate){const t=document.createElement("div");t.classList.add("bg-dark-subtle","p-2","rounded-3","mt-2","text-center");const n=document.createElement("p");n.classList.add("m-0","fw-bold"),n.textContent=e.provider_name,t.appendChild(n),l.appendChild(t)}d.classList.remove("d-none"),e.stream=!0}if(m.free){for(const e of m.free){const t=document.createElement("div");t.classList.add("bg-dark-subtle","p-2","rounded-3","mt-2","text-center");const n=document.createElement("p");n.classList.add("m-0","fw-bold"),n.textContent=e.provider_name,t.appendChild(n),g.appendChild(t)}u.classList.remove("d-none"),e.freeStream=!0}if(e.buy)tabTriggerList.buy.show();else if(e.rent)tabTriggerList.rent.show();else if(e.stream)tabTriggerList.stream.show();else{if(!e.freeStream)return;tabTriggerList.freeStream.show()}a.classList.remove("d-none")}$("#showData").modal("show")})).catch((e=>{}))})).catch((e=>{}))})),t.appendChild(n)})),0==e.results.length&&document.querySelector("#no-result-error").classList.contains("d-none")&&document.querySelector("#no-result-error").classList.remove("d-none"),document.querySelector("#loading-spinner").classList.add("d-none")})).catch((e=>{})))}function resetSettings(){searchSettings.adultContent=!1,document.querySelector("#adult-items-settings").value=!1,searchSettings.region=getRegion(),document.querySelector("#region-settings").value=searchSettings.region}function getRegion(){const e=/^(?:(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))$|^((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[\da-z]{5,8}|\d[\da-z]{3}))*)?((?:-[\da-wy-z](?:-[\da-z]{2,8})+)*)?(-x(?:-[\da-z]{1,8})+)?$|^(x(?:-[\da-z]{1,8})+)$/i,t=navigator.language;return e.test(t)?e.exec(t)[5]:"GB"}function convertDate(e){const t=new Date(e);return"Invalid Date"==t?"No release date available":t.toLocaleDateString(new Intl.DateTimeFormat(navigator.language).resolvedOptions().locale)}window.addEventListener("load",(function(){const e=document.querySelector("#search-input");let t;e.value=null,resetSettings(),document.querySelector("#adult-items-settings").addEventListener("change",(()=>{searchSettings.adultContent=document.querySelector("#adult-items-settings").value,search(e.value.trim())})),searchSettings.region=getRegion(),document.querySelector("#region-settings").value=searchSettings.region,document.querySelector("#region-settings").addEventListener("change",(()=>{searchSettings.region=document.querySelector("#region-settings").value})),document.querySelector("#reset-settings").addEventListener("click",(()=>{resetSettings(),search(e.value.trim())})),e.addEventListener("keyup",(()=>{clearTimeout(t),searchSettings.page=1,t=setTimeout((()=>search(e.value.trim())),200)})),document.querySelector("#select-movies").addEventListener("click",(()=>{searchSettings.movieOrTv=0,searchSettings.page=1,search(e.value)})),document.querySelector("#select-tv-shows").addEventListener("click",(()=>{searchSettings.movieOrTv=1,searchSettings.page=1,search(e.value)})),document.querySelector("#pagination-back-btn").addEventListener("click",(()=>{1!=searchSettings.maxPage&&(searchSettings.page-1<1?searchSettings.page=searchSettings.maxPage:searchSettings.page--,search(e.value.trim()))})),document.querySelector("#pagination-next-btn").addEventListener("click",(()=>{1!=searchSettings.maxPage&&(searchSettings.page+1>searchSettings.maxPage?searchSettings.page=1:searchSettings.page++,search(e.value.trim()))}));const n=document.querySelector("#buy-tab");tabTriggerList.buy=new bootstrap.Tab(n),n.addEventListener("click",(e=>{e.preventDefault(),tabTriggerList.buy.show()}));const r=document.querySelector("#rent-tab");tabTriggerList.rent=new bootstrap.Tab(r),r.addEventListener("click",(e=>{e.preventDefault(),tabTriggerList.rent.show()}));const a=document.querySelector("#stream-tab");tabTriggerList.stream=new bootstrap.Tab(a),a.addEventListener("click",(e=>{e.preventDefault(),tabTriggerList.stream.show()}));const s=document.querySelector("#free-stream-tab");tabTriggerList.freeStream=new bootstrap.Tab(s),s.addEventListener("click",(e=>{e.preventDefault(),tabTriggerList.freeStream.show()}))}));