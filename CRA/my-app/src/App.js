


// App 컴포넌트


/* 

모듈화 (Module)
  - 컴포넌트를 기능별로 분이하여 만든 후 
  - 연결: import(가져오기), export(내보내기) 

  1. public/index.html
    <div id="root"></div>

  2. src/index.js
     ReactDOM.createRoot().render();

  3. src/App.js
      컴포넌트


  함수형 컴포넌트(Component)
  - 컴포넌트 이름은 첫글자 대문자로
  - 컴포넌트 이름과 파일명을 같은 이름으로 지정한다.
  - 파일명은 *.js 또는 *.jsx
  
  function 컴포넌트명(){
    return(
      JSX문장;
      - class는 className으로 표기
      
      );
    }
*/

function App() {
  return <h1>hello</h1>
}

// export default 컴포넌트 명
export default App;
