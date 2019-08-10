import "isomorphic-fetch";

import React from 'react';
import { render } from 'react-dom';
import { setTrackingParams } from "./utils/trackingUtils";
import Rfi from './components/App';
import './index.css';

(function() {
  // Grab UTM parameters if they exist.
  setTrackingParams();
})();
(function () {
  if ( typeof window.CustomEvent === "function" ) return false; //If not IE

  // IE Custom Event workaround
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: true, detail: undefined };
    let evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

/**
 * @description Custom mount function to display the RFI where needed
 *
 * @param {*} id The id of the parent element
 * @param {*} type The type of form structure. i.e twostep, basic. see formTypes.js
 */
window.mount = function (id, type) {
  let parent = document.getElementById(id);
  let filter = false;
  // Allow filters to be defined by the parent element.
  if (typeof parent.dataset.filter !== 'undefined') {
    filter = parent.dataset.filter;
  }
  render(
    <Rfi type={type} filter={filter} />,
    parent
  );
};