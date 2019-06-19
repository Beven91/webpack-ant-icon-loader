module.exports = function () {
  this.cacheable && this.cacheable();
  return ` 
    import AutoReloadIcon from 'webpack-ant-icon-loader/src/runtime.js';
    // 加载script标签会阻塞js执行，antd部分组件（如表格）无法在一轮循环内完成完整的渲染，故延时
    setTimeout(function(){
      import('!!./dist.js').then(function(allIcons) { 
        AutoReloadIcon.load(allIcons); 
      }); 
    });
    export default { 
      name:'add', 
      theme:'fill' 
    }`;
};
