import { qs, qsa, $on, $delegate } from './utils';
import ScrollMagic from "scrollmagic";
import '../stylesheets/style.scss';
import { setInterval } from 'timers';

class UntappedHipHop {
  constructor() {
    this.animateBanner();
    this.expandNavigation();
    this.lockNavigation();
    this.swapTopics();
  }
  
  lockNavigation = () => {
    let controller = new ScrollMagic.Controller();
    let myScene = new ScrollMagic.Scene({
      triggerElement: '.zin-topics',
      triggerHook: .90,
      reverse: true
    })
    .setClassToggle('.zin-navigation, .zin-navigation--logo, .zin-navigation--menu_overflow', 'data-lock')
    .addTo(controller);
  }

  expandNavigation = () => {
    const toggleMenu = qs('.zin-navigation--trigger') && qs('.zin-navigation--trigger');
    const navigation = qs('.zin-navigation--menu') && qs('.zin-navigation--menu');
    const navigationItems = qsa('.zin-navigation--menu_item') && qsa('.zin-navigation--menu_item');

    toggleMenu.addEventListener('click', (e) => {
      if (toggleMenu.hasAttribute('data-active')) {
        setTimeout(() => {
          toggleMenu.removeAttribute('data-active');
        }, 1000);
      } else {
        setTimeout(() => {
          toggleMenu.setAttribute('data-active', '');
        }, 500);
      }
      
      if (navigation.hasAttribute('data-active')) {
        navigation.removeAttribute('data-active');
        setTimeout(() => {
          navigation.style.display = "none";
        }, 1000);
      } else {
        navigation.style.display = "block";
        setTimeout(() => {
          navigation.setAttribute('data-active', '');
        }, 500);
      }
      
      navigationItems.forEach((item) => {
        if (item.hasAttribute('data-active')) {
          item.removeAttribute('data-active');
        } else {
          setTimeout(() => {
            item.setAttribute('data-active', '');
          }, 500);
        }
      });
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

  swapTopics = () => {
    const topics = qsa('.zin-topics--list_item.-link');
    const topicsPhotography = qsa('.zin-topics--photography_background');

    if(topics.length) {
      topics.forEach((topic) => {
        topic.addEventListener('mouseenter', (evt) => {
          if(topicsPhotography.length) {
            topicsPhotography.forEach((photo) => {
              photo.setAttribute('data-active', 'false');
              if(photo.getAttribute('data-topic') === topic.getAttribute('data-topic')) {
                photo.setAttribute('data-active', 'true');
              }
            });
          }
        });
      });
    }
  }
}

new UntappedHipHop();