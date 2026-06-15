/**
 * Adds a new filter for applications on Screen status
 * to the candidate's Microsoft careers applications page
 * 
 * Script can be used with Chrome extension:
 * User JavaScript and CSS V 3.1.2 or above.
 *
 * URL patterns: 
 * https://apply.careers.microsoft.com/careers/applications*,https://microsoft.eightfold.ai/careers/applications*
 * 
 * Author: Carlos E. Torres <cetorres@cetorres.com>
 * GitHub: https://github.com/cetorres
 * Date: 06-13-2026
 */

let tabListElem;
let newButton;
let screenAppsTotal = 0;
let spinnerElem;
let spinnerElemParent;
let badgeLoaderElement;

const loadElements = () => {
	spinnerElem = document.querySelector('span[class*="spinner-module_spinner"]');
	spinnerElemParent = spinnerElem.parentNode;
	tabListElem = document.querySelector('div[role="tablist"]');
	const originalBadgeLoaderElement = document.querySelector('div[class*="loader-module_loader-container"]');
	badgeLoaderElement = originalBadgeLoaderElement.cloneNode(true);
	badgeLoaderElement.id = "screenAppsBadgeLoader";
	// Add observer for spinner
	const observer = new MutationObserver(() => {
	  if (!document.contains(spinnerElem)) {
	    observer.disconnect();
	    runAfterSpinner();
	  }
	});
	observer.observe(spinnerElemParent, { childList: true });
}

const runAfterSpinner = () => {
	screenAppsTotal = [...document.querySelectorAll('div[class*="status-"]')].filter(el => el.textContent.trim() === 'Screen').length;
	badgeLoaderElement.remove();
	addBadge();
}

const addNewButton = () => {
	newButton = document.createElement('button');
	newButton.setAttribute('aria-selected', 'false');
	newButton.setAttribute('aria-label', `Inactive Tab, ${screenAppsTotal} applications in screen,`);
	newButton.setAttribute('class', 'tabs-module_tab__1K4R3 tab-2MAW1');
	newButton.setAttribute('role', 'tab');
	newButton.setAttribute('tabindex', '-1');
	newButton.setAttribute('data-index', '4');
	newButton.setAttribute('data-value', 'inactive');
	newButton.innerHTML = `<span class="tabs-module_label__kptmQ">Screen</span>`;
	newButton.append(badgeLoaderElement);
	tabListElem.append(newButton);
}

const addBadge = () => {
	newButton.innerHTML += `<span class="badge-module_badge__P84rY badge-module_badge-medium__OkfNt tabs-module_badge__Q-14t">${screenAppsTotal}</span>`;
}

window.addEventListener('load', (event) => {
	loadElements();
	addNewButton();
});
