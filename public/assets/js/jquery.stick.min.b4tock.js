!function(t){var e={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:"",responsiveWidth:!1},i=t(window),n=t(document),s=[],r=i.height(),o=function(){for(var e=i.scrollTop(),o=n.height(),a=o-r,c=e>a?a-e:0,p=0;p<s.length;p++){var l=s[p],d=l.stickyWrapper.offset().top,h=d-l.topSpacing-c;if(h>=e)null!==l.currentTop&&(l.stickyElement.css("position","").css("top",""),l.stickyElement.trigger("sticky-end",[l]).parent().removeClass(l.className),l.currentTop=null);else{var u=o-l.stickyElement.outerHeight()-l.topSpacing-l.bottomSpacing-e-c;0>u?u+=l.topSpacing:u=l.topSpacing,l.currentTop!=u&&(l.stickyElement.css("position","fixed").css("top",u),"undefined"!=typeof l.getWidthFrom&&l.stickyElement.css("width",t(l.getWidthFrom).width()),l.stickyElement.trigger("sticky-start",[l]).parent().addClass(l.className),l.currentTop=u)}}},a=function(){r=i.height();for(var e=0;e<s.length;e++){var n=s[e];"undefined"!=typeof n.getWidthFrom&&n.responsiveWidth===!0&&n.stickyElement.css("width",t(n.getWidthFrom).width())}},c={init:function(i){var n=t.extend({},e,i);return this.each(function(){var i=t(this),r=i.attr("id"),o=(r?r+"-"+e.wrapperClassName:e.wrapperClassName,t("<div></div>").attr("id",r+"-sticky-wrapper").addClass(n.wrapperClassName));i.wrapAll(o),n.center&&i.parent().css({width:i.outerWidth(),marginLeft:"auto",marginRight:"auto"}),"right"==i.css("float")&&i.css({"float":"none"}).parent().css({"float":"right"});var a=i.parent();a.css("height",i.outerHeight()),s.push({topSpacing:n.topSpacing,bottomSpacing:n.bottomSpacing,stickyElement:i,currentTop:null,stickyWrapper:a,className:n.className,getWidthFrom:n.getWidthFrom,responsiveWidth:n.responsiveWidth})})},update:o,unstick:function(e){return this.each(function(){for(var e=t(this),i=-1,n=0;n<s.length;n++)s[n].stickyElement.get(0)==e.get(0)&&(i=n);-1!=i&&(s.splice(i,1),e.unwrap(),e.removeAttr("style"))})}};window.addEventListener?(window.addEventListener("scroll",o,!1),window.addEventListener("resize",a,!1)):window.attachEvent&&(window.attachEvent("onscroll",o),window.attachEvent("onresize",a)),t.fn.sticky=function(e){return c[e]?c[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void t.error("Method "+e+" does not exist on jQuery.sticky"):c.init.apply(this,arguments)},t.fn.unstick=function(e){return c[e]?c[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void t.error("Method "+e+" does not exist on jQuery.sticky"):c.unstick.apply(this,arguments)},t(function(){setTimeout(o,0)})}(jQuery);

console.log(134);

(function(){
  "use strict"
  console.log('%c Ready. Scroll Now!', 'color:darkred')

  // Get the navigation element
  var navBar = document.querySelector('#giftcardlink')
  var offset = navBar.offsetTop
  var rect   = navBar.getBoundingClientRect()


  // Create a virtual element
  var virtualElement = document.createElement('div')
  // Style it by giving it the height of the header
  virtualElement.style.height = parseInt(rect.height) + 'px'


  // Create the function to be called on scroll
  var stick = function () {

      // Get the scroll
      var scroll = window.scrollY

      // check if the body element alreadyhas the stick class
      var isSticked = document.body.classList.contains('stick')

      // We do the operation if only the body element doesn't have the stick class
      // otherwise the scroll event consumes a lot of resourses
      if ( scroll >= offset && !isSticked) {

          document.body.classList.add('stick')
          navBar.style.top = '60px'
          // We add a padding-top to compensiate the header's space
          // document.body.style.paddingTop = parseInt(rect.height) + 'px'

          // Using virtual element to replace of floating object
          navBar.parentNode.insertBefore(virtualElement, navBar)
      } else if(scroll <= offset && isSticked){
          document.body.classList.remove('stick')
          navBar.style.top = '20px'


          // reset the padding if we added it
          // document.body.style.paddingTop = '0px'

          // Removing the virtual element
          var formerFirstChild = document.body.removeChild(virtualElement);
      }
  }

  // listen to the scroll
  window.addEventListener('scroll', stick)
})()