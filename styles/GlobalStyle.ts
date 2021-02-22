import { createGlobalStyle } from "styled-components";
import PropsTheme from "./theme/PropsTheme";

const GlobalStyle = createGlobalStyle`


    body {
        transition: 250ms all;
        overflow-x: hidden;
        color: ${(props: PropsTheme) => props.theme.color};
        background: ${(props: PropsTheme) => props.theme.backgroundPrimary};
        padding: 0;
        margin: 0;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    * {
        box-sizing: border-box;
        margin: 0;
    }

    a {
        color: ${(props: PropsTheme) => props.theme.color};
        text-decoration: none;
    }

    p {
        font-size: 15px;
        line-height: 29px;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    h1 {
        font-size: 30px;
    }

    h2 {
        font-size: 24px;
        font-weight: 600;
    }

    h3 {
        font-size: 20px;
        font-weight: 600;
    }


    input, textarea {
        padding: 10px 15px;
        outline: none;
        border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
        border-bottom: 4px solid ${(props: PropsTheme) =>
          props.theme.accentColor};
        border-radius: 4px;    
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
         background-color: ${(props: PropsTheme) =>
           props.theme.backgroundPrimary};  
           color: ${(props: PropsTheme) => props.theme.color}; 
    }

    table {
      text-align: left;
  border-collapse: collapse;
  border-radius: 4px;
  overflow: hidden;
}
td, th {
  border: 2px solid  ${(props: PropsTheme) => props.theme.borderColor};
  padding: 0.3em;
}




    /* Base for label styling */
  [type="checkbox"]:not(:checked),
  [type="checkbox"]:checked {
    position: absolute;
    left: 0;
    opacity: 0.01;
  }
  [type="checkbox"]:not(:checked) + label,
  [type="checkbox"]:checked + label {
    position: relative;
    padding-left: 2.3em;
    font-size: 1.05em;
    line-height: 1.7;
    cursor: pointer;
  }

  /* checkbox aspect */
  [type="checkbox"]:not(:checked) + label:before,
  [type="checkbox"]:checked + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1.4em;
    height: 1.4em;
    border: 1px solid #aaa;
    background: #FFF;
    border-radius: .2em;
    box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 rgba(203, 34, 237, .2);
    -webkit-transition: all .275s;
        transition: all .275s;
  }

  /* checked mark aspect */
  [type="checkbox"]:not(:checked) + label:after,
  [type="checkbox"]:checked + label:after {
    content: '✓';
    position: absolute;
    top: .525em;
    left: .18em;
    font-size: 1.375em;
    color: ${(props) => props.theme.accentColor};
    line-height: 0;
    -webkit-transition: all .2s;
        transition: all .2s;
  }

  /* checked mark aspect changes */
  [type="checkbox"]:not(:checked) + label:after {
    opacity: 0;
    /* -webkit-transform: scale(0) rotate(45deg);
        transform: scale(0) rotate(45deg); */
  }

  [type="checkbox"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1) rotate(0);
        transform: scale(1) rotate(0);
  }

  /* Disabled checkbox */
  [type="checkbox"]:disabled:not(:checked) + label:before,
  [type="checkbox"]:disabled:checked + label:before {
    box-shadow: none;
    border-color: #bbb;
    background-color: #e9e9e9;
  }

  [type="checkbox"]:disabled:checked + label:after {
    color: #777;
  }

  [type="checkbox"]:disabled + label {
    color: #aaa;
  }

  /* Accessibility */
  /* [type="checkbox"]:checked:focus + label:before,
  [type="checkbox"]:not(:checked):focus + label:before {
    box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 6px rgba(203, 34, 237, .2);
  } */

  /* .Toastify__toast-container {}
  .Toastify__toast {}
  .Toastify__toast--error {}
  .Toastify__toast--warning {}
  .Toastify__toast--success {}
  .Toastify__toast-body {} */
  .Toastify__progress-bar {
    background-color: ${(props) => props.theme.accentColor};
  }

`;

export default GlobalStyle;
