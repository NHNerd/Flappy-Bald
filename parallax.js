import {
  gameBox,
  treesBG1DOM,
  BG1Tree1DOM,
  BG1Tree2DOM,
  BG1Tree3DOM,
  BG1Tree4DOM,
  BG2Cloud1DOM,
  BG2Cloud2DOM,
  BG2Cloud3DOM,
  BG2Cloud4DOM,
  BG2Cloud5DOM,
  BG2Cloud6DOM,
  mountainDOM,
} from './DOM.js';

export default {
  gameBoxWidth: gameBox.offsetWidth,
  xBG1pose: 0,
  speedBG1: 190,
  speedBG2: 100,
  speedBG3: 50,
  i: 0,
  treeRandom: 0,
  tree1: 'none',
  tree2: 'none',
  tree3: 'none',
  tree4: 'none',

  cloud1RandSpeed: 1,
  cloud2RandSpeed: 1,
  cloud3RandSpeed: 1,
  cloud4RandSpeed: 1,
  cloud5RandSpeed: 1,
  cloud6RandSpeed: 1,

  xCloud1Pose: 600,
  xCloud2Pose: 600,
  xCloud3Pose: 600,
  xCloud4Pose: 600,
  xCloud5Pose: 600,
  xCloud6Pose: 600,

  yCloud1Pose: 0,
  yCloud2Pose: 0,
  yCloud3Pose: 0,
  yCloud4Pose: 0,
  yCloud5Pose: 0,
  yCloud6Pose: 0,

  yMountainPose: 0,

  updatePosition(secondsPassed) {
    this.secondsPassed = secondsPassed;

    // waite before change animation
    if (this.i < 20) {
      this.i += 90 * secondsPassed;
      return;
    }

    //BG1
    if (this.xBG1pose > this.gameBoxWidth) {
      this.xBG1pose = -1 * Math.random(2) * 800 - this.gameBoxWidth;
      this.treeRandom = Math.floor(Math.random(3) * 3.9);
      this.tree1 = this.treeRandom === 0 ? 'block' : 'none';
      this.tree2 = this.treeRandom === 1 ? 'block' : 'none';
      this.tree3 = this.treeRandom === 2 ? 'block' : 'none';
      this.tree4 = this.treeRandom === 3 ? 'block' : 'none';
    }

    //BG2
    if (this.xCloud1Pose > this.gameBoxWidth) {
      this.xCloud1Pose = -1 * (Math.random(1) * 700 + this.gameBoxWidth * 1.25);
      this.cloud1RandSpeed = Math.random(this.xCloud1Pose);
      this.yCloud1Pose = this.cloud1RandSpeed * 250 - 125;
    }
    if (this.xCloud2Pose > this.gameBoxWidth) {
      this.xCloud2Pose = -1 * (Math.random(2) * 700 + this.gameBoxWidth * 1.3);
      this.cloud2RandSpeed = Math.random(this.xCloud2Pose);
      this.yCloud2Pose = this.cloud2RandSpeed * 250 - 125;
    }
    if (this.xCloud3Pose > this.gameBoxWidth) {
      this.xCloud3Pose = -1 * (Math.random(3) * 700 + this.gameBoxWidth * 1.35);
      this.cloud3RandSpeed = Math.random(this.xCloud3Pose);
      this.yCloud3Pose = this.cloud3RandSpeed * 250 - 125;
    }
    if (this.xCloud4Pose > this.gameBoxWidth) {
      this.xCloud4Pose = -1 * (Math.random(4) * 700 + this.gameBoxWidth * 1.4);
      this.cloud4RandSpeed = Math.random(this.xCloud4Pose);
      this.yCloud4Pose = this.cloud4RandSpeed * 250 - 125;
    }
    if (this.xCloud5Pose > this.gameBoxWidth) {
      this.xCloud5Pose = -1 * (Math.random(5) * 700 + this.gameBoxWidth * 1.45);
      this.cloud5RandSpeed = Math.random(this.xCloud5Pose);
      this.yCloud5Pose = this.cloud5RandSpeed * 250 - 125;
    }
    if (this.xCloud6Pose > this.gameBoxWidth) {
      this.xCloud6Pose = -1 * (Math.random(6) * 700 + this.gameBoxWidth * 1.5);
      this.cloud6RandSpeed = Math.random(this.xCloud6Pose);
      this.yCloud6Pose = this.cloud6RandSpeed * 250 - 125;
    }

    //BG3
    if (this.yMountainPose > 559) {
      this.yMountainPose = 0;
    }

    this.xBG1pose += this.speedBG1 * secondsPassed;
    this.xCloud1Pose += this.speedBG2 * secondsPassed * (this.cloud1RandSpeed / 4 + 0.75);
    this.xCloud2Pose += this.speedBG2 * secondsPassed * (this.cloud2RandSpeed / 4 + 0.75);
    this.xCloud3Pose += this.speedBG2 * secondsPassed * (this.cloud3RandSpeed / 4 + 0.75);
    this.xCloud4Pose += this.speedBG2 * secondsPassed * (this.cloud4RandSpeed / 4 + 0.75);
    this.xCloud5Pose += this.speedBG2 * secondsPassed * (this.cloud5RandSpeed / 4 + 0.75);
    this.xCloud6Pose += this.speedBG2 * secondsPassed * (this.cloud6RandSpeed / 4 + 0.75);
    this.yMountainPose += this.speedBG3 * secondsPassed;

    this.setPipePosition();
  },

  setPipePosition() {
    treesBG1DOM.style.transform = `translateX(${-this.xBG1pose}px)`;
    BG1Tree1DOM.style.display = this.tree1;
    BG1Tree2DOM.style.display = this.tree2;
    BG1Tree3DOM.style.display = this.tree3;
    BG1Tree4DOM.style.display = this.tree4;

    BG2Cloud1DOM.style.transform = `translate(${-this.xCloud1Pose}px, ${this.yCloud1Pose}px)`;
    BG2Cloud2DOM.style.transform = `translate(${-this.xCloud2Pose}px, ${this.yCloud2Pose}px)`;
    BG2Cloud3DOM.style.transform = `translate(${-this.xCloud3Pose}px, ${this.yCloud3Pose}px)`;
    BG2Cloud4DOM.style.transform = `translate(${-this.xCloud4Pose}px, ${this.yCloud4Pose}px)`;
    BG2Cloud5DOM.style.transform = `translate(${-this.xCloud5Pose}px, ${this.yCloud5Pose}px)`;
    BG2Cloud6DOM.style.transform = `translate(${-this.xCloud6Pose}px, ${this.yCloud6Pose}px)`;

    mountainDOM.style.transform = `translateX(${-this.yMountainPose}px`;
  },

  resetState() {
    this.gameBoxWidth = gameBox.offsetWidth;
    this.i = 0;
    this.xBG1pose = 0;
    this.tree1 = 'none';
    this.tree2 = 'none';
    this.tree3 = 'none';
    this.tree4 = 'none';
    this.xCloud1Pose = 600;
    this.xCloud2Pose = 600;
    this.xCloud3Pose = 600;
    this.xCloud4Pose = 600;
    this.xCloud5Pose = 600;
    this.xCloud6Pose = 600;
    this.setPipePosition();
  },
};
