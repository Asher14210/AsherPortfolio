const filters=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.art-card')];
filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const target=button.dataset.filter;
  cards.forEach(card=>card.hidden=target!=='all'&&!card.dataset.category.split(' ').includes(target));
}));

const dialog=document.querySelector('.lightbox');
const dialogImage=dialog.querySelector('img');
const dialogTitle=dialog.querySelector('p');
function openArtwork(card){
  dialogImage.src=card.dataset.full;
  dialogImage.alt=card.querySelector('img').alt;
  dialogTitle.textContent='';
  dialog.showModal();
}
cards.forEach(card=>{
  card.addEventListener('click',()=>openArtwork(card));
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openArtwork(card)}});
});
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const briefTemplates={
  illustration:`PROJECT TYPE: 2D Illustration

Required artwork / asset list:
[Your answer]

Purpose of the artwork:
[Game asset / character card / CG / promotional art / other]

Preferred style or media references:
[Links or titles]

Color palette / mood:
[Your answer]

Canvas size / platform:
[Your answer]

Deadline:
[Your answer]

Optional notes:
[Your answer]`,
  ui:`PROJECT TYPE: UI Design

Required UI screens / asset list:
[Your answer]

How will this UI be used?
[Menu / HUD / dialogue / inventory / mobile interface / other]

Preferred style references:
[Games, apps, links, or images]

Color palette / mood:
[Your answer]

Target platform and resolution:
[PC / mobile / web / other]

Do you have a wireframe, mockup, or sketch?
[Yes / No — attach if available]

Required interaction states:
[Default / hover / selected / disabled / other]

Deadline:
[Your answer]

Optional notes:
[Your answer]`,
  animation:`PROJECT TYPE: Spine / Live2D Animation

What work do you need?
[Drawing + layer separation + rigging / layer separation + rigging / rigging only]

Software / required file format:
[Spine version / Live2D / other]

Required motions and expressions:
[Idle / blink / talking / breathing / gesture / other]

Do you have specific video or animation references?
[Links]

Character artwork status:
[Not started / complete but unsplit / separated layers ready]

Where will the animation be used?
[Game portrait / stream model / promotional animation / other]

Deadline:
[Your answer]

Optional notes:
[Your answer]`
};
const briefText=document.querySelector('#brief-text');
const briefTabs=[...document.querySelectorAll('.brief-tab')];
briefTabs.forEach(tab=>tab.addEventListener('click',()=>{
  briefTabs.forEach(item=>{item.classList.remove('active');item.setAttribute('aria-selected','false')});
  tab.classList.add('active');tab.setAttribute('aria-selected','true');
  briefText.value=briefTemplates[tab.dataset.brief];
  document.querySelector('.brief-copy-status').textContent='';
}));
document.querySelector('.copy-brief').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(briefText.value);document.querySelector('.brief-copy-status').textContent='Copied — paste it into Discord and fill in your answers.'}
  catch{briefText.select();document.querySelector('.brief-copy-status').textContent='Selected — press Ctrl/Cmd + C to copy.'}
});

const copyButton=document.querySelector('.copy-discord');
const copyStatus=document.querySelector('.copy-status');
copyButton.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(copyButton.dataset.copy);copyStatus.textContent='Copied! See you in the DMs.'}
  catch{copyStatus.textContent='Discord: asherfatal03'}
});
