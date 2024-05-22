import React, { useState } from 'react';

function JustAPage() {
  const [inputValue, setInputValue] = useState({
    v1:"",
    v2:[""],
    v3:[{i:"",o:""}]
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea className="border bg-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JustAPage;