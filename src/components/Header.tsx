import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const [test, setTest] = useState<string>('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/hello')
      .then((res) => setTest(res.data))
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1 id="header">Wenda</h1>
      {test}
    </div>
  );
};

export default Header;
