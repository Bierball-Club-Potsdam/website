(()=>{function n(n,e){const o=document.createElement("a");o.href=`mailto:${n}@${e}`,o.click()}window.mail={show:function(e,o,t){const c=document.getElementById(t);c.innerHTML=e+"[at]"+o,c.onmouseover=void 0,setTimeout((()=>{c.onclick=()=>n(e,o)}),100)},showPhone:function(n,e){const o=document.getElementById(e);o.innerHTML=n,o.onmouseover=void 0},send:n}})();