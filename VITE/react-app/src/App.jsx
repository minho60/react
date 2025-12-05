
import './App.css'
import { useState } from 'react';



function Header(props){
  console.log(props, props.title)
  return(
       <header>
        <h1><a href="/" onClick={e=>{
          e.preventDefault(); /* 기본 이벤트 방지 */
          props.onChangeMode();

        }}>{props.title}</a></h1>
      </header>
      )
  }
function Nav(props){
  // const lis =[
  //   <li><a href="/read/1">html</a></li>,
  //   <li><a href="/read/2">css</a></li>,
  //   <li><a href="/read/3">js</a></li>
  // ]

const lis =[]
for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a id={t.id} href={"/read/"+t.id} onClick={(e)=>{
      e.preventDefault();
      props.onChangeMode(Number(e.target.id));
    }}>{t.title}</a></li>);
}
  return(
       <nav>
         <ol>
           {lis}
          </ol>
       </nav>
      )
  }

function Article(props){
  return(
        <article>
        <h2>{props.title}</h2>
        {props.body}
      </article>
      )
  }

function Create(props) {
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={e=>{
        e.preventDefault();
        // e.target.title -> 폼의 name="title"
        // e.target.body -> 폼의 name="body"
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onCreate(title,body);
      }} >
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create" /></p>
      </form>
    </article>
  )
}

function Update(props){
  const[title, setTitle]= useState(props.title)
  const[body, setBody]= useState(props.body)
  return(
    <article>
      <h2>Update</h2>
      <form onSubmit={e=>{
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onUpdate(title,body);
      }} >
        <p><input type="text" name="title" placeholder="title" value={title} onChange={e=>{
          console.log(e.target.value);
          setTitle(e.target.value);
          }}/></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={e=>{
          console.log(e.target.value);
          setBody(e.target.value);
          }} ></textarea></p>
        <p><input type="submit" value="Update" /></p>
      </form>
    </article>
  )
};



function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setmode = _mode[1];
  // console.log('_mode',_mode);
  // const [변수,set변수] = useState(변수의 초기값);
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(null);
  const[topics, setTopics] = useState( [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
    // {id:4, title:'jQuery', body:'jQuery is ...'}
  ])
  let content = null;
  let contentControl =  null;

  if(mode ==='WELCOME'){
    content =  <Article title="Welcome" body="hello,Web"></Article>

  } else if(mode ==='READ'){
    let title, body =null;
    for (let i = 0; i < topics.length; i++) {
      if(topics[i].id === id){
      title= topics[i].title;
      body= topics[i].body;
      }
    } 
    content =  <Article title={title} body={body}></Article>
    contentControl = (
      <>
     <li><a href={"/update/"+id} onClick={e=>{
      e.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li>
      <input type="button" value= "Delete" onClick={()=>{
        const newTopics = [];
        for (let i = 0; i < topics.length; i++) {
          if(topics[i].id !==id){
            // 선택한 id와 같지 ㅇ낳은 항목만 배열에 추가
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME')
      }} />
    </li>
    </>
  )

  } else if(mode ==='CREATE'){
    content = <Create onCreate={(title, body)=>{
      const newTopic = {id:nextId, title:title, body:body};

      /* 
        const newValue = [...value]
        newValue 변경
        setValue(newValue)
      
      */
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ')
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>

  } else if (mode === 'UPDATE'){
      let title, body =null;
    for (let i = 0; i < topics.length; i++) {
      if(topics[i].id === id){
      title= topics[i].title;
      body= topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics = [...topics];
      const updateTopic = {id:id, title:title, body:body};

      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id ){
          newTopics[i] = updateTopic;
          break;
        }
      }
    setTopics(newTopics);
    setMode("READ");
    

    }}></Update>
  }

  return (
    <div>
      {/* 헤더 */}
      <Header title="Web" onChangeMode={()=>{ setMode('WELCOME');}}></Header>
      {/* 내비게이션 */}
      <Nav topics={topics} onChangeMode={(_id)=>{ 
        setMode('READ');
        setId(_id);
        ;}}></Nav>
      {/* 아티클 */}
     {content}

    <ul>
      {/* 생성(create) = 추가(Insert) 버튼 */}
      <li>
        <a href="/create" onClick={e=>{
          e.preventDefault();
          setMode('CREATE')
        }}>Create</a>
      </li>
        {/* 갱신(update) 버튼 */}
     {contentControl}
    </ul>
    </div>
  )
}

export default App
