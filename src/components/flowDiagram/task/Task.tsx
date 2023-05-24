import React, { useState } from 'react';
import styles from './Task.module.scss';

const Task = (props: any) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(props.model.name);

  const textareaRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const handleToggleEdit = (isEditing: boolean) => {
    if (isEditing && textareaRef) {
      setTimeout(() => textareaRef.current.focus(), 64);
    }

    setIsEditing(isEditing);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    switch (e.key) {
      case 'Enter':
        handleToggleEdit(false);
        props.setName({ id: props.model.id, name });
        break;
      case 'Escape':
        handleToggleEdit(false);
        setName(props.model.name);
        break;
    }
  };

  return (
    <div
      className={
        isEditing ? [styles.wrap, styles.editing].join(' ') : styles.wrap
      }
    >
      <textarea
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyPress}
        ref={textareaRef}
      />
      <span onDoubleClick={() => handleToggleEdit(true)}>
        {props.model.name}
      </span>
    </div>
  );
};

export default Task;
