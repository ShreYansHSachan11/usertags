import React from 'react';
import TagsInput from './Components/homepage/home';

const App = () => {
  const selectedTags = (tags) => {
    console.log(tags);
  };

  return (
    <div className="App">
      <TagsInput selectedTags={selectedTags} tags={[]} />
    </div>
  );
};

export default App;
