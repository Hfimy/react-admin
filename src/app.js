import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import './style.scss';
import image from './public/image/timg.jpg';

ReactDOM.render(
  <div>
    <h1>Hello, fdsarld!</h1>
    <i class="fa fa-camera-retro" />
    <img src={image} />
  </div>,
  document.getElementById('root')
);
