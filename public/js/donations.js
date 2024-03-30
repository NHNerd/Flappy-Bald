import { donationsPageDOM } from './DOM.js';

export default {
  openDonations() {
    donationsPageDOM.classList.remove('close-donations-page');
  },

  closeDonations() {
    donationsPageDOM.classList.add('close-donations-page');
  },
};
