import React, { useEffect, useRef, useState } from 'react';

function App() {

  /** @const {React.RefObject<HTMLDivElement>} refContainer Reference of the container of the texts */
  const refContainer = useRef<HTMLDivElement>(null);

  /** @const {React.RefObject<HTMLTextAreaElement>} refInput Reference of the input field */
  const refInput = useRef<HTMLTextAreaElement>(null);

  /** @const {string} inputText That typed text */
  const [inputText, setInputText] = useState<string>('');

  /** @const {string[]} texts The already wrote texts */
  const [texts, setTexts] = useState<string[]>([]);

  /** Prevents textarea to loose focus */
  useEffect(() => {
    if (refInput && refInput.current) {
      refInput.current.focus();

      refInput.current.onblur = () => {
        refInput.current?.focus();
      }
    }
  }, []);

  /**
   * Saves the typed text
   * @param e 
   */
  const handleType = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(e.target.value);
  }

  /**
   * After pressing a key runs an action or actions
   * @param e
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    // Scroll down in the container of texts
    if (refContainer && refContainer.current) {
      refContainer.current.scrollTo(0, refContainer.current.scrollHeight);
    }

    // Saves new line
    if (e.code.toLowerCase() === 'enter') {
      const newTexts = texts.slice();
      newTexts.push(inputText);
      setTexts(newTexts);

      setInputText('');
    }
  }

  // -----------------------------------------

  return (
    <main>
      <div className="background"></div>

      <div ref={refContainer}>
        <div>
          <pre>{texts.join('')}</pre>
          <span>{inputText}</span>
        </div>
        <div className="text-shine">
          <pre>{texts.join('')}</pre>
          <span>{inputText}</span>
        </div>

        <textarea 
          ref={refInput} 
          value={inputText}
          onChange={handleType}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
    </main>
  );
}

export default App;
