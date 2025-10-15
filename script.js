const container = document.getElementById('container');
const params = new URLSearchParams(window.location.search);
const currentPage = parseInt(params.get("page")) || 1;

// =================== Données complètes ===================
const IMAGES = [
  // Pages 1–12, avec hover et goto exact

  { base:"images/livre.png", hover:"images/livre1.png", x:195.59, y:490.3, z:1, pages:[1,2,3,4,5,6,7,8,9,10,11,12], goto:11 },
  { base:"images/point.png", hover:"images/point1.png", x:862.18, y:987.47, z:3, pages:[1,2,3,4,5,6,7,8,9,10,11,12], goto:12 },
  { base:"images/portfolio1.png", hover:"images/portfolio.png", x:931.93, y:68.78, z:5, pages:[1,2,3,4,5,6,7,8,9,10,11,12], goto:1 },

  // Page 1 Labos
  { base:"images/fungilab.png", hover:"images/fungilab1.png", x:793.91, y:623.73, z:4, pages:[1], goto:5 },
  { base:"images/lowtechlab.png", hover:"images/lowtechlab1.png", x:899.74, y:567.73, z:3, pages:[1], goto:3 },
  { base:"images/drid.png", hover:"images/drid1.png", x:1002.68, y:509.33, z:2, pages:[1], goto:2 },
  { base:"images/milvi.png", hover:"images/milvi1.png", x:1103.57, y:456.33, z:1, pages:[1], goto:4 },

  // Pages 2–5 : k72-k75
  { base:"images/k72.png", x:1446.4, y:289.37, z:6, pages:[2], goto:6 },
  { base:"images/tp2.png", x:982.42, y:518.61, z:1, pages:[2] },
  { base:"images/detail.png", x:1451.72, y:443.25, z:4, pages:[2], goto:6 },

  { base:"images/k73.png", x:1446.4, y:289.37, z:2, pages:[3], goto:7 },
  { base:"images/tp3.png", x:982.42, y:518.61, z:1, pages:[3] },
  { base:"images/detail.png", x:1451.72, y:443.25, z:4, pages:[3], goto:7 },

  { base:"images/k74.png", x:1446.4, y:289.37, z:5, pages:[4], goto:8 },
  { base:"images/tp4.png", x:982.42, y:518.61, z:1, pages:[4] },
  { base:"images/detail.png", x:1451.72, y:443.25, z:4, pages:[4], goto:8 },

  { base:"images/k75.png", x:1446.4, y:289.37, z:2, pages:[5], goto:9 },
  { base:"images/tp5.png", x:982.42, y:518.61, z:1, pages:[5] },
  { base:"images/detail.png", x:1451.72, y:443.25, z:4, pages:[5], goto:9 },

  // Pages 6–9 : boîte et nuage
  { base:"images/boite6.png", x:1486.16, y:289.37, z:2, pages:[6], gotoPrev:2 },
  { base:"images/nu6.png", x:1317.92, y:289.37, z:3, pages:[6] },
  { base:"images/dshema.png", x:968.72, y:540.43, z:1, pages:[6] },
  { base:"images/tp6.png", x:1411.24, y:93.69, z:1, pages:[6] },

  { base:"images/boite7.png", x:1486.16, y:289.37, z:2, pages:[7], gotoPrev:3 },
  { base:"images/nu7.png", x:1317.92, y:289.37, z:5, pages:[7] },
  { base:"images/bshema.png", x:1000.52, y:512.92, z:1, pages:[7] },
  { base:"images/b1.png", x:1045.99, y:347.27, z:1, pages:[7] },
  { base:"images/b2.png", x:474.56, y:790.63, z:1, pages:[7] },
  { base:"images/tp7.png", x:1411.24, y:93.69, z:1, pages:[7] },

  { base:"images/boite8.png", x:1486.16, y:289.37, z:2, pages:[8], gotoPrev:4 },
  { base:"images/nu8.png", x:1317.92, y:289.37, z:5, pages:[8] },
  { base:"images/tp8.png", x:1411.24, y:93.69, z:1, pages:[8] },
  { base:"images/am.png", x:768.82, y:319.42, z:1, pages:[8] },
  { base:"images/bm.png", x:1170.14, y:840.88, z:1, pages:[8] },
  { base:"images/cm.png", x:415.61, y:840.45, z:1, pages:[8] },
  { base:"images/dm.png", x:1433.57, y:565.07, z:1, pages:[8] },
  { base:"images/mshema.png", x:946.42, y:527.43, z:1, pages:[8] },

  { base:"images/boite9.png", x:1486.16, y:289.37, z:2, pages:[9], gotoPrev:5 },
  { base:"images/nu9.png", x:1317.92, y:289.37, z:1, pages:[9] },
  { base:"images/fshema.png", x:1398.17, y:729.66, z:2, pages:[9] },
  { base:"images/flab.png", x:694.53, y:399.39, z:2, pages:[9] },
  { base:"images/tp9.png", x:1411.24, y:93.69, z:1, pages:[9] },

  // Page 10 : tsacha
  { base:"images/tsacha.png", x:1411.24, y:93.69, z:1, pages:[10] },

  // Page 11 : t11
  { base:"images/t11.png", x:1411.24, y:93.69, z:1, pages:[11] },

  // Page 12 : p12titre
  { base:"images/p12titre.png", x:1411.24, y:93.69, z:1, pages:[12] },
];

// ====== Fonction création image avec hover ======
function createImage(item){
  const img = document.createElement('img');
  img.src = item.base;
  img.classList.add('img-item');
  img.style.left = item.x + 'px';
  img.style.top = item.y + 'px';
  img.style.zIndex = item.z || 2;
  container.appendChild(img);

  if(item.hover){
    const hover = document.createElement('img');
    hover.src = item.hover;
    hover.classList.add('img-item');
    hover.style.left = item.x + 'px';
    hover.style.top = item.y + 'px';
    hover.style.zIndex = (item.z || 2)+1;
    hover.style.display = 'none';
    container.appendChild(hover);

    img.addEventListener('mouseenter', ()=>{
      img.style.display='none';
      hover.style.display='block';
    });
    hover.addEventListener('mouseleave', ()=>{
      hover.style.display='none';
      img.style.display='block';
    });
  }

  if(item.goto) img.addEventListener('click', ()=> window.location.search='?page='+item.goto);
  if(item.gotoPrev) img.addEventListener('click', ()=> window.location.search='?page='+item.gotoPrev);
}

// ====== Génération des images pour la page ======
IMAGES.forEach(item => { if(item.pages.includes(currentPage)) createImage(item); });

// ====== Slider page 12 ======
if(currentPage===12){
  const sliderImages = ["images/120.png","images/121.png","images/122.png","images/123.png","images/124.png","images/125.png"];
  let index=0;
  const img=document.createElement('img');
  img.src=sliderImages[index];
  img.classList.add('img-item');
  img.style.left='982.42px';
  img.style.top='514.69px';
  img.style.zIndex=2;
  container.appendChild(img);

  const btnG=document.createElement('img');
  btnG.src="images/boutong.png";
  btnG.classList.add('img-item');
  btnG.style.left='664px';
  btnG.style.top='985px';
  btnG.style.cursor='pointer';
  container.appendChild(btnG);

  const btnD=document.createElement('img');
  btnD.src="images/boutond.png";
  btnD.classList.add('img-item');
  btnD.style.left='1055px';
  btnD.style.top='985px';
  btnD.style.cursor='pointer';
  container.appendChild(btnD);

  function updateSlider(){
    img.src=sliderImages[index];
    btnG.style.display=index===0?'none':'block';
    btnD.style.display=index===sliderImages.length-1?'none':'block';
  }
  btnD.addEventListener('click',()=>{ if(index<sliderImages.length-1){ index++; updateSlider(); } });
  btnG.addEventListener('click',()=>{ if(index>0){ index--; updateSlider(); } });
  updateSlider();
}

// ====== Bouton inversion ======
const invertToggle = document.createElement('img');
invertToggle.src="images/inverser.png";
invertToggle.classList.add('img-item','no-invert');
invertToggle.style.left='406px';
invertToggle.style.top='59px';
invertToggle.style.cursor='pointer';
invertToggle.style.zIndex=5;
container.appendChild(invertToggle);

let inverted=localStorage.getItem('inverted')==='1';
if(inverted) document.body.classList.add('inverted');
invertToggle.addEventListener('click',()=>{
  inverted=!inverted;
  document.body.classList.toggle('inverted');
  localStorage.setItem('inverted',inverted?'1':'0');
});

// ====== Responsive ======
function resizeContainer(){
  const scale=Math.min(window.innerWidth/1920,window.innerHeight/1080);
  container.style.transform=`translate(-50%,-50%) scale(${scale})`;
}
window.addEventListener('resize',resizeContainer);
resizeContainer();
