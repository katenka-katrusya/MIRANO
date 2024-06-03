import { warningCookies } from './cookies.jsx';
import Cookies from "js-cookie";

const setCookie = (name, value, days) => {
  Cookies.set(name, value, { expires: days });
}

export const checkCookies = () => {
  if (!document.cookie) {
    const warningElement = warningCookies();
    document.body.appendChild(warningElement);

    const applyButton = warningElement.querySelector('.warning__apply');
    applyButton.addEventListener('click', () => {
      setCookie("cookieConsent", "true", 365);
      warningElement.remove();
    });
  }
};
