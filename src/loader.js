module.exports = function () {
  this.cacheable && this.cacheable();
  return ` 
    import AutoReloadIcon from 'webpack-ant-icon-loader/src/runtime.js';
    import('!!./dist.js').then((allIcons) => { 
        AutoReloadIcon.load(allIcons); 
    }); 
    export default { 
      name:'add', 
      theme:'fill' 
    }`;
};