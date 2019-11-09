export function setCookie(name,value) { 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

export function getCookie(sName) {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
      var aCrumb = aCookie[i].split("=");
      if (sName == aCrumb[0]) return unescape(aCrumb[1]);
    }
    return null;
  }

