/**
 * Loads the HHM library.
 * 
 * Module is executed in the browser. Inject the config options as `config`
 * object.
 */
HHM = typeof HHM === `undefined` ? {} : HHM;
HHM.config = HHM.config || {};
config = config || { version: 'git', hhm: {} };

// set the HHM log level to debug if haxroomie desires so
HHM.config.logLevel = config.logLevel;

let s = document.createElement(`script`);
// Load the HHM from ´hhm´ property if given. Otherwise from the default URL.
if (config.hhm.content) {
  s.innerHTML = config.hhm.content;
} else {
  if (config.version === 'git') {
    s.src = `https://hhm.surge.sh/releases/hhm-${config.version}.js?_=${Date.now()}`;
  } else {
    s.src = `https://hhm.surge.sh/releases/hhm-${config.version}.js`;
  }
}
document.head.appendChild(s);