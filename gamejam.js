const gamejamCards=[...document.querySelectorAll('.gj-file-card')];
const lightbox=document.querySelector('.gj-lightbox');
const lightboxImage=lightbox.querySelector('img');
const lightboxTitle=lightbox.querySelector('p');

function openGamejamCard(card){
  lightboxImage.src=card.dataset.full;
  lightboxImage.alt=card.querySelector('img').alt;
  lightboxTitle.textContent=card.dataset.title;
  lightbox.showModal();
}

gamejamCards.forEach(card=>{
  card.addEventListener('click',event=>{
    if(event.target.closest('.gj-image-button')) openGamejamCard(card);
  });
});

lightbox.querySelector('.gj-lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox) lightbox.close()});

const discordButton=document.querySelector('.gj-copy-discord');
const copyStatus=document.querySelector('.gj-copy-status');
discordButton.addEventListener('click',async()=>{
  try{
    await navigator.clipboard.writeText(discordButton.dataset.copy);
    copyStatus.textContent='COPIED — SEE YOU IN THE JAM LOBBY.';
  }catch{
    copyStatus.textContent=`DISCORD: ${discordButton.dataset.copy}`;
  }
});
