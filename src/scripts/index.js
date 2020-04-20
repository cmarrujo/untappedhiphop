// import { qs, qsa, $on, $delegate } from './utils';
// import TweenMax from "gsap/TweenMax";
// import ScrollMagic from "scrollmagic";
// import addIndicators from "scrollmagic";
// import '../stylesheets/style.scss';

// class NavigationMenu {
//   constructor() {
//     let docWindow = qs('html');
//     let navButton = qs('.osg-menu');
//     let navMenu = qs('.osg-navigation');
//     let navMenuExit = qs('.osg-navigation--exit');

//     let controller = new ScrollMagic.Controller();
//     let myScene = new ScrollMagic.Scene({
//       triggerElement: '.osg-works--gallery_item',
//       triggerHook: .75,
//       reverse: false
//     })
//     .setClassToggle('.osg-works--gallery_item', 'fade-in')
//     .addTo(controller);
    
//     let myScene2 = new ScrollMagic.Scene({
//       triggerElement: '.osg-services--panel',
//       reverse: false,
//       triggerHook: .9,
//     })
//     .setClassToggle('.osg-services--panel', 'fade-in')
//     .addIndicators()
//     .addTo(controller);

//     navButton.addEventListener('click', (e) => {
//       docWindow.style.overflow = 'hidden';
//       navMenu.setAttribute('data-expanded', 'true');
//       TweenMax.to('.osg-navigation', .15, {opacity: 1, ease: Power1.easeIn});
//       TweenMax.to('.osg-navigation--external', .5, {right:0, opacity: 1, delay: .25, ease: Power1.easeOut});
//     });
    
//     navMenuExit.addEventListener('click', (e) => {
//       TweenMax.to('.osg-navigation', .15, {opacity: 0, ease: Power1.easeIn});
//       TweenMax.to('.osg-navigation--external', .5, {right:'-10%', opacity: 0, ease: Power1.easeIn, onComplete: () => {
//         docWindow.style.overflow = 'auto';
//         navMenu.setAttribute('data-expanded', 'false');
//       }});
//     });
//   }
// }

// new NavigationMenu();

import { qs, qsa, $on, $delegate } from './utils';
import '../stylesheets/style.scss';
import { setInterval } from 'timers';

class UntappedHipHop {
  constructor() {
    this.animateBanner();
    this.expandNavigation();
  }

  expandNavigation = () => {
    const toggleMenu = qs('.zin-navigation--trigger') && qs('.zin-navigation--trigger');
    const navigation = qs('.zin-navigation--menu') && qs('.zin-navigation--menu');

    toggleMenu.addEventListener('click', (e) => {
      toggleMenu.hasAttribute('data-active') ? toggleMenu.removeAttribute('data-active') : toggleMenu.setAttribute('data-active', '');
      navigation.hasAttribute('data-active') ? navigation.removeAttribute('data-active') : navigation.setAttribute('data-active', '');
    });
  }

  animateBanner = () => {
    const artists = qsa('.zin-banner--animated_image');
    const stage = qs('.zin-banner--animated_main');
    const overlay = qs('.zin-banner--overlay');
    const mission = qs('.zin-banner--header_mission');
    const statement = qs('.zin-banner--header_statement');
    let counter = 0;

    gsap.to(overlay, {
      duration: .40, 
      ease: "circ.out", 
      height: '0',
      delay: 1,
      onComplete: () => {
        overlay.setAttribute('data-active', '');
      }
    });

    setTimeout(() => {
      const int = setInterval(() => {
        if (counter >= artists.length) {
          clearInterval(int);
  
          gsap.to(overlay, {
            duration: .30, 
            ease: "circ.out", 
            height: '100vh',
            opacity: 1
          });
  
          // gsap.to(mission, {
          //   duration: 1, 
          //   ease: "circ.out", 
          //   css:{color:'var(--secondary)'}
          // });
  
          // gsap.to(statement, {
          //   duration: 1, 
          //   ease: "circ.out", 
          //   css:{color:'var(--secondary)'}
          // });
        } else {
          stage.style.backgroundImage = `url(${artists[counter].src})`;
          counter++;
        }
      }, 111);
    }, 750);
  }
}

new UntappedHipHop();