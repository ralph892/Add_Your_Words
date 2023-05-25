import React from 'react'

export interface Props {
    children?: React.ReactNode,

    primary?: boolean,
    secondary?: boolean,
    tertiary?: boolean,

    icon?: boolean,
    small? : boolean,
    xsmall?: boolean,
    medium?: boolean,
    large?: boolean,

    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({children,...props}: Props) => {
    const {onClick, ...classesProps} = props;
    let classes = {
        ...classesProps
    };

    const classNames = Object.keys(classes as { [key: string]: boolean })
    .filter(className => (classes as { [key: string]: boolean })[className])
    .join(' ');

  return (
    <button className={classNames} onClick={onClick}>{children}</button>
  )
};

export default Button;