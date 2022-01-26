function GlobalStyle() {
    return (
        <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
    );
  }

function ParanormalLetter(props){ // props: delay      
  const letter = props.children
  return (
    <>
      <span>{letter}</span>
      <style jsx>{`
        /*@font-face{
          font-family: 'sigils';
          font-style: normal;
          font-weight: 400;
          src: url('/sigilos.ttf');
        }*/

        span{
          --i: ${props.delay};
          /*font-family: 'sigils';*/
          animation-name: shine;
          animation-duration: 5s;
          animation-timing-function: ease;
          animation-iteration-count: infinite;
          animation-delay: calc(var(--i) * 300ms);
        }
        
        @keyframes shine {
          0%{
            color: rgba(255, 255, 255, 0.1);
            text-shadow: 0px 0px 0px transparent;
          }
          50%{
            color: rgba(255, 255, 255, 1);
            text-shadow: 0px 0px 10px yellow,
              0px 0px 20px yellow,
              0px 0px 30px yellow;
          }
          100%{
            color: rgba(255, 255, 255, 0.1);
            text-shadow: 0px 0px 0px transparent;
          }
        }
      `}</style>
    </>
  )
}

function ParanormalWord(props){ // props: x, y
  const x = props.x
  const y = props.y
  const children = props.children

  children.split
  children.replace(' ', '&nbsp;')
  let word = []
  for(let i = 0; i < children.length; i++){
    word.push(<ParanormalLetter delay={i + 1}>{children[i]}</ParanormalLetter>) 
  }
  

  // for(let i = 0; i < children.length; i++){
  //   word += <ParanormalLetter delay={i}>{children[i]}</ParanormalLetter>;console.log(<ParanormalLetter delay={i}>{children[i]}</ParanormalLetter>)
  // }
  

  return (
    <>
      <div>

        {word}
        
      </div>
      
      <style jsx>{`
        div{
          position: absolute;
          top: ${y + '%'};
          left: ${x + '%'};
        }

      `}</style>
    </>
  )

}

function ParanormalBackground(){
  return(
    <>
      <div>
        <ParanormalWord x="90" y="87">e voce sabe</ParanormalWord>
        <ParanormalWord x="17" y="34">Transcender</ParanormalWord>
        <ParanormalWord x="34" y="40">Calamidade</ParanormalWord>
        <ParanormalWord x="56" y="80">Desconjuração</ParanormalWord>
        <ParanormalWord x="14" y="90">O outro lado</ParanormalWord>
        <ParanormalWord x="60" y="46">Anfitriao</ParanormalWord>
        <ParanormalWord x="76" y="78">Magistrada</ParanormalWord>
        <ParanormalWord x="40" y="65">O realizador da calamidade</ParanormalWord>
        <ParanormalWord x="6" y="10">saber tudo e perder tudo</ParanormalWord>
        <ParanormalWord x="90" y="10">espiral</ParanormalWord>
        <ParanormalWord x="50" y="20">conhecimento</ParanormalWord>
      </div>
      <style jsx>{`
        div{
          background-color: black;
          color: rgba(255, 255, 255, 0.1);
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </>
  )
  
}
  
  export default function CustomApp({ Component, pageProps }) {
    console.log('Roda em todas as páginas!');
    return (
        <>
            <GlobalStyle />
            {/* <ParanormalBackground/> */}
            <Component {...pageProps} />
        </>
    );
  }