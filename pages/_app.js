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
        overflow: hidden;
        width: 100vw;
        height: 100vh;
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
        @font-face{
          font-family: 'sigils';
          font-style: normal;
          font-weight: 400;
          src: url('./fonts/sigilos.ttf');
        }

        span{
          --i: ${props.delay};
          color: rgba(100, 100, 100, 0.1);
          font-family: 'sigils';
          font-size: 32px;
          animation-name: shine;
          animation-duration: 10s;
          animation-timing-function: ease;
          animation-iteration-count: infinite;
          animation-delay: calc(var(--i) * 100ms);
        }
        
        @keyframes shine {
          0%{
            color: rgba(100, 100, 100, 0.1);
            text-shadow: 0px 0px 0px transparent;
          }
          50%{
            color: rgba(255, 255, 255, 1);
            text-shadow: 0px 0px 10px yellow,
              0px 0px 20px yellow,
              0px 0px 30px yellow;
          }
          100%{
            color: rgba(100, 100, 100, 0.1);
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
  const flexdirection = props.direction || 'row'

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
          display: flex;
          flex-direction: ${flexdirection};
          position: relative;
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
        {/* <ParanormalWord x="90" y="87">e voce sabe</ParanormalWord>
        <ParanormalWord x="17" y="34">Transcender</ParanormalWord>
        <ParanormalWord x="34" y="40">Calamidade</ParanormalWord>
        <ParanormalWord x="56" y="80">Desconjuração</ParanormalWord>
        <ParanormalWord x="14" y="90">O outro lado</ParanormalWord>
        <ParanormalWord x="60" y="46">Anfitriao</ParanormalWord>
        <ParanormalWord x="76" y="78">Magistrada</ParanormalWord>
        <ParanormalWord x="20" y="75">O realizador da calamidade</ParanormalWord>
        <ParanormalWord x="6" y="10">saber tudo e perder tudo</ParanormalWord>
        <ParanormalWord x="90" y="10">espiral</ParanormalWord>
        <ParanormalWord x="50" y="20">conhecimento</ParanormalWord>
        <ParanormalWord x="2" y="56">aquela pergunta</ParanormalWord>
        <ParanormalWord x="80" y="44">voce entende tudo</ParanormalWord>
        <ParanormalWord x="50" y="20">mas voce vai esquecer</ParanormalWord> */}
        <ParanormalWord x="0" y="0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lorem tristique, bibendum. ur</ParanormalWord>
        <ParanormalWord x="0" y="92" direction="row-reverse">ed pretium, enim ut tempus sodales, lectus enim aliquam felis, nec egestas turpis risus inmaur</ParanormalWord>
        {/* <ParanormalWord x="2" y="0" direction="column-reverse">ed pretium, enim ut tempus soi</ParanormalWord>
        <ParanormalWord x="20" y="0" direction="column">ed pretium, enim ut tempus sodales, lectus</ParanormalWord> */}
      </div>
      <style jsx>{`
        div{
          background-color: black;
          color: rgba(255, 255, 255, 0.1);
          width: 100vw;
          height: 100vh;
          max-width: 100vw;
          overflow: hidden;
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
            <ParanormalBackground/>
            <Component {...pageProps} />
        </>
    );
  }