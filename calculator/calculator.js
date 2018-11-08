const spanHeight= document.getElementsByClassName('btn')[0].offsetHeight/5;
const span = document.getElementsByTagName('span');
for(let i=0;i<span.length;i++){
    span[i].style.lineHeight = spanHeight+'px';
    span[i].style.height = spanHeight+'px';
}