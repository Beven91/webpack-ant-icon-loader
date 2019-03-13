module.exports = function (content, sourceMaps) {
  return ` 
    import AutoReloadIcon from '${__dirname}/runtime.js';
    import('./index.js').then((allIcons) => { 
        AutoReloadIcon.load(allIcons); 
    }); 
    export default { 
      name:'add', 
      theme:'fill' 
    }`;
};