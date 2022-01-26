import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router'
import React from 'react';

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
          src: url(./sigilos.ttf);
        }

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

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
      </>
    );
  }
  
  // Componente React
  // function HomePage() {
  //     // JSX
  //     return (
  //         <div>
  //             <GlobalStyle />
  //             <Titulo tag="h2">Boas vindas de volta!</Titulo>
  //             <h2>Discord - Alura Matrix</h2>
  //         </div>
  //     )
  // }
  // export default HomePage
  
  export default function PaginaInicial() {
    const [username, setUsername] = React.useState("joaopedrov0")
    const router = useRouter()
  
    return (
      <>
        <ParanormalBackground/>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute',
            backgroundColor: 'transparent', width: '100vw', height: '100vh',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              onSubmit={(event) => {
                event.preventDefault()
                router.push('/chat')
              }}
              as="form"
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Bem vindo devolta ao Outro Lado</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                value={username}
                onChange={(event) => {
                  let valor = event.target.value
                  setUsername(valor)
                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }

// function Title(props) {

//     const Tag = props.tag
//     return (
//         <>
//             <Tag>{props.children}</Tag>
//             <style jsx>{`${Tag}{color: ${appConfig.theme.colors.neutrals["999"]}}`}</style>
//         </>
        
//     )
// }

// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Title tag="h1">Seja bem vindo(a)</Title>
//             <h2>Discord - Alura Paranormal</h2>
        

//             <style jsx>{`
//             Title{
//                 color: red;
//             }
//             `}</style>
//         </div>
//     )
// }

// export default HomePage