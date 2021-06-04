import React, {useRef,forwardRef} from 'react';
import './LootDividerPage.less';

interface IProps {
  className?: string
}

const componentName = "LootDividerPage";

/**
 * @name LootDividerPage
 */
const LootDividerPage = forwardRef((props: IProps)=> {

  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

  return <div ref={rootRef} className={componentName}>
      {componentName}
  </div>
});

export default LootDividerPage
