import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './FunctionPopup.module.scss';
import SVG from 'modules/SVG';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

const FunctionPopup = ({
  isActive,
  children,
  onClose
}: typeFunctionPopup): JSX.Element => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [currentX, setCurrentX] = useState<number | undefined>();
  const [currentY, setCurrentY] = useState<number | undefined>();
  const [initialX, setInitialX] = useState<number | undefined>();
  const [initialY, setInitialY] = useState<number | undefined>();
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(0);

  const handleSetTranslate = (
    xPos: number,
    yPos: number,
    el: HTMLElement | null
  ) => {
    if (el) {
      el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
    }
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setInitialX(e.clientX - xOffset);
    setInitialY(e.clientY - yOffset);

    if (e.target === document.getElementById('dnd')) {
      setIsDragging(true);
    }
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setInitialX(currentX);
    setInitialX(currentY);
    setIsDragging(false);
  };

  const handleDrag = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (isDragging) {
      initialX && setCurrentX(e.clientX - initialX);
      initialY && setCurrentY(e.clientY - initialY);

      currentX && setXOffset(currentX);
      currentY && setYOffset(currentY);

      currentX &&
        currentY &&
        handleSetTranslate(currentX, currentY, document.getElementById('item'));
    }
  };

  return (
    <>
      {isActive ? (
        <div className={styles.background} id={'container'}>
          <div className={styles.modal_body} id={'item'}>
            <span
              className={styles.dnd}
              id={'dnd'}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
            >
              <SVG type="dnd" width="20px" height="20px" />
            </span>
            <span className={styles.close} onClick={() => onClose()}>
              <SVG type="close" width="20px" height="20px" />
            </span>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

interface typeFunctionPopup {
  isActive: boolean;
  children: JSX.Element | null;
  onClose: (idx?: number) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionPopup);
