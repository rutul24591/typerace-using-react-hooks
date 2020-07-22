import React, { useState, useEffect } from 'react'; // import useState hook

const App = () => {
  // Set useText state functionality by applying useState hook.
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  const [ snippet, setSnippet ] = useState('');
  const [ userText, setUserText ] = useState(' ');
  const [ gameState, setGameState ] = useState(INITIAL_GAME_STATE);

// There are three aspects to the useState hook above:

//  1. The argument to useState is its initial value. Therefore, with useState(''), we are setting the initial value of userText to a blank string.
//  2. The useState function returns an array of two values. The first one is the current value of the variable that is being tracked in the component state. Therefore, in const [userText, setUserText] = useState(''); , userText represents that current value. It becomes a constant that can be used in the component code.
//  3. The second value returned from the useState function is a function itself. This function updates the paired state variable. So setUserText updates the userText value.
  

  // A useEffect hook could be used to set the document.title in the victory case
  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
  });

  const updateUserText = event => {
    setUserText(event.target.value)
    console.log("current user text:", userText)

    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  }

  // Note the double arrow syntax. This sets up chooseSnippet to return a callback function itself. 
  // For example, chooseSnippet(0) returns a function itself, that will end up calling setSnippet(SNIPPETS[0]);. 
  // This is crucial for the JSX, which will update to display the snippet

  const chooseSnippet = snippetIndex => () => {
    console.log('setSnippet', snippetIndex);

    // When the user selects a snippet, this should add a startTime. Therefore, we’ll use setGameState to set the value of gameState.startGame. 
    // Note that when you use the setter method returned from the useState hook, you must provide an entirely new object or value. 
    // Therefore, we’ll create an object that consists of all the current data in the gameState object, using the spread operator. 
    // Then we’ll override the startTime field to new Date().getTime()

    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, startTime: new Date().getTime() })
  }
  return (
      <div>
        <h2>Type Race</h2>

        {/* The onChange handler takes a callback function, which fires whenever the user interacts with the input. 
        This callback has an event parameter (that contains the event.target.value), which will now be passed to updateUserText.
        Also apply the userText constant as the value for the input element  */}

        {/* think of the useState function as a way to hook into the React state functionality.
        The functional App component, is attaching (hooking), the React concept of state into itself. */}
        {snippet}
        <h4>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null}</h4>
        <input value={ userText } onChange={updateUserText} />
        <hr />
        {/* The onClick handler must reference a function, and not call the function itself. 
          It’s one of the biggest gotchas with React: calling a function within the JSX can trigger state changes that end up re-triggering another render  */}

        {/* Using the index in a map function as the key is an anti-pattern. 
        The proper approach is to refactor and use id’s within entire SNIPPET objects for each item in the SNIPPETS array. 
        But it’s a bit overkill in this learning scenario. */}
        
        {
          SNIPPETS.map((SNIPPET, index) => (
            <button onClick={ chooseSnippet(index) } key={ index }>
              { SNIPPET.substring(0, 10)}...
            </button>
          ))
        }
      </div>
    )
}

export default App;

