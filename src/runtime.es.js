import React from 'react'; import PropTypes from 'prop-types';
import ReactIcon from '@ant-design/icons-react';
import { generate } from '@ant-design/icons-react/es/utils';

// 原始获取图标函数 
const originalGetIcon = ReactIcon.get.bind(ReactIcon);
// 覆盖get函数，在图标未加载前，返回一个渲染AutoReloadIcon来控制自动刷新 
ReactIcon.get = function (key) {
  const target = originalGetIcon(key);
  if (target) {
    return target;
  }
  return {
    icon: (primaryColor, secondaryColor) => {
      return {
        tag: function AutoReloadIconWrapper(props) {
          return (
            <AutoReloadIcon
              originalType={key}
              rootProps={props}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          );
        },
      };
    },
  };
};

export default class AutoReloadIcon extends React.Component {
  // 属性定义   
  static propTypes = {
    // 原始图标名称     
    originalType: PropTypes.string,
    // 图标原始root属性     
    rootProps: PropTypes.object,
  }
  // 默认属性   
  static defaultProps = { originalType: '', rootProps: {}, }
  // 所有延迟加载的图标实例   
  static instances = []
  // 新增实例   
  static addInstance(instance) {
    this.instances.push(instance);
  }
  // 删除实例  
  static removeInstance(instance) {
    const index = this.instances.indexOf(instance);
    this.instances.splice(index, 1);
  }

  // 刷新所有实例   
  static load(allIcons) {
    // 注册所有图标     
    ReactIcon.add(...Object.keys(allIcons).map((key) => allIcons[key]));
    // 还原get函数    
    ReactIcon.get = originalGetIcon;
    // 通过强制刷新来，显示异步加载的图标    
    this.instances.forEach((instance) => instance.forceUpdate());
    // 移除所有队列     
    this.instances.length = 0;
  }
  constructor(props) {
    super(props);
    AutoReloadIcon.addInstance(this);
  }
  // 组件销毁时，从监听的延迟实例中移除   
  componentWillUnmount() {
    AutoReloadIcon.removeInstance(this);
  }


  // 获取字体组件   
  getIcon() {
    const { originalType, primaryColor, secondaryColor } = this.props;
    const target = originalGetIcon(originalType);
    if (typeof target === 'function') {
      return target(primaryColor, secondaryColor);
    } else {
      return target;
    }
  }
  // 渲染图标   
  render() {
    const { originalType, rootProps } = this.props;
    const target = this.getIcon(originalType);
    if (target) {
      return React.Children.only(generate(target.icon, 'svg-' + target.name, rootProps));
    }
    else {
      return <svg {...rootProps}></svg>;
    }
  }
}