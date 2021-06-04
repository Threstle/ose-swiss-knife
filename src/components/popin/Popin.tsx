import React, {useRef} from 'react';
import './Popin.less';

interface IProps {
  className?: string;
  onClick?: ()=>void;
  text:string;
}

const componentName = "Popin";

/**
 * @name Popin
 */
function Popin (props: IProps) {

  // get root ref
  const rootRef = useRef<HTMLDivElement>(null);

  return <div ref={rootRef} className={componentName}>
      <span className={`${componentName}_veil`}/>
      <div className={`${componentName}_content`}>
        {props.text}
        <button onClick={props.onClick}>Ok</button>
      </div>
  </div>
}

export default Popin
