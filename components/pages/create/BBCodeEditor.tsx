import React, { useRef, useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs';


interface Props {
  name: string;
}

const CodeInput: React.FC<Props> = ({ name }) => {
  const [code, setCode] = useState('');



  return (
    <Editor
      value={code}
      defaultValue={code}
      onValueChange={setCode}
      highlight={code => highlight(code, languages.bbcode, 'bbcode')}
      padding={15}
    />
  );
};

export default CodeInput;