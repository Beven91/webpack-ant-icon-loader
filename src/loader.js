module.exports = function () {
  this.cacheable && this.cacheable();
  return ` 
    import AutoReloadIcon from '${__dirname.replace(/\\/g,'/')}/runtime.js';
    import('!!./dist.js').then((allIcons) => { 
        AutoReloadIcon.load(allIcons); 
    }); 
    export default { 
      name:'add', 
      theme:'fill' 
    }`;
};