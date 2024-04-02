const accesskey="9nWM0r4e8tMhy3aTgV5LXBb0fy2CBLwo0ALk1ZCYxLg";
const forml=document.querySelector('form');
const inputl=document.getElementById('search-input');
const searchresults=document.querySelector('.search-results');
const showmore=document.getElementById('show-more-button');


let inputdata=" ";
let page=1;


async function searchImage()
{
    inputdata=inputl.value;

    const url=`https://api.unsplash.com/search/photos?client_id=${accesskey}&query=${inputdata}&page=${page}`;
   const response=await fetch(url);
   const data=await response.json();

   const results=data.results;

   if(page===1)
   {
       searchresults.innerHTML='';
   }

   results.map((result)=>{
            const imageWrapper=document.createElement('div');
            imageWrapper.classList.add('search-result');
            const image=document.createElement('img');
            image.src=result.urls.small;   
            const imagelink=document.createElement('a');
            imagelink.href=result.links.html;
            imagelink.target='_blank';
            imagelink.textContent=result.alt_description;
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imagelink);
            searchresults.appendChild(imageWrapper);

    });
    page++;
    if(page>1)
    {
        showmore.style.display='block';
    }

}

forml.addEventListener('submit',(e)=>{
    e.preventDefault();
    page=1;
    searchImage();
});

showmore.addEventListener('click',()=>{
    searchImage();
});
