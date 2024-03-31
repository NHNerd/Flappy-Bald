import {
  donationsPageDOM,
  tgWaletValueDOM,
  buttonCopyTgCopiedDOM,
  donationsTelegramPageDOM,
} from './DOM.js';

function animationTextCopied() {
  buttonCopyTgCopiedDOM.classList.remove('button-copy-tg-copied-off');
  setTimeout(function () {
    buttonCopyTgCopiedDOM.classList.add('button-copy-tg-copied-off');
  }, 2000);
}

export default {
  openDonations() {
    donationsPageDOM.classList.remove('close-donations-page');
  },
  closeDonations() {
    donationsPageDOM.classList.add('close-donations-page');
  },

  openDonationsTelegram() {
    donationsTelegramPageDOM.classList.remove('donations-telegram-page-close');
  },

  copyTgTonAdress() {
    tgWaletValueDOM.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'success' : 'unsuccess';
      console.log(`Text is copied ${msg}`);

      animationTextCopied();
    } catch (err) {
      console.error('Error try copy by execCommand', err);

      try {
        const successful = navigator.clipboard.writeText(tgWaletValueDOM.value);
        const msg = successful ? 'success' : 'unsuccess';
        console.log(`Text is copied ${msg}`);

        animationTextCopied();
      } catch (err) {
        console.error('Error try copy by navigator', err);
      }
    }
  },
};
