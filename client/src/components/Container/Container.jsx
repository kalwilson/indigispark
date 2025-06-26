import './Container.scss';
import classNames from 'classnames';

const Container = ({ children, variant = 'default' }) => {
  const containerClass = classNames('container', {
    'container--narrow': variant === 'narrow',
    'container--wide': variant === 'wide',
  });

  return <div className={containerClass}>{children}</div>;
};

export default Container;
