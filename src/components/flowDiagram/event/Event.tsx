import React, { useState } from 'react';
import styles from './Event.module.scss';

const Event = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const textareaRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const handleToggleEdit = (isEditing: boolean) => {
    if (isEditing && textareaRef) {
      setTimeout(() => textareaRef.current.focus());
    }

    setIsEditing(isEditing);
  };

  const handleRefreshName = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setName(e.currentTarget.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    switch (e.key) {
      case 'Enter':
        handleToggleEdit(false);
        break;
      case 'Escape':
        handleToggleEdit(false);
        break;
    }
  };

  return (
    <div
      className={
        isEditing ? [styles.wrap, styles.editing].join(' ') : styles.wrap
      }
    >
      <textarea />
      <span></span>
    </div>
  );
};

export default Event;
