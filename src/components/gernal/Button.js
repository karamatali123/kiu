import { Button } from '@material-ui/core';
import * as React from 'react';


export default function MyButton({variant,text,style,size,onClick}) {
  return (
    <Button variant={variant} style={style} size={size} onClick={onClick}>
      {text}
    </Button>
  );
}