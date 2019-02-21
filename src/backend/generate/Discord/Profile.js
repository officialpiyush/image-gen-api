/**
 * @author Piyush Bhangale <bhangalepiyush@gmail.com>
 * @license GPLv3
 */


const { Canvas } = require('canvas-constructor');
const { get } = require('node-superfetch');

 /**
  * Creates New Discord Class
  * @class 
  */

  class Discord {

      /**
       * 
       * @param {Object} options - The Options For The Canvas Class 
       */
      constructor(options = {}) {
        this.options = options;
        this.canvas = Canvas;
      }
      async Profile(avatar, xp, totalxp) {
        const { body } = await get(avatar);
        const resImage = new this.canvas();
        console.log(body, xp, totalxp);
        
        return resImage;
      }
  }

  /**
   * A Class That Helps Manupulating Discord Images.
   * @module Discord
   */
  module.exports = Discord;