import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_URL

const supabaseClient = createClient(process.env.NEXT_PUBLIC_URL, SUPABASE_ANON_KEY)


function RealtimeMessageListener(addMessage) {
    supabaseClient
        .from("Messages")
        .on('INSERT', (listenerResponse) => {
            // console.log('Houve uma nova mensagem!')
            addMessage(listenerResponse.new)
        })
        .subscribe()
}

export default function ChatPage() {
    // Sua lógica vai aqui

    const router = useRouter()
    const username = router.query.username
    const [message, setMessage] = React.useState("")
    const [chatList, setChatList] = React.useState([])

    React.useEffect(() => {
        supabaseClient.from('Messages').select('*').order('created_at', {ascending: false}).then(({ data }) => {
            console.log(data)
            setChatList(data)
        })

        RealtimeMessageListener((newMessage) => {
            // handleNewMessage(newMessage)
            setChatList((chatList) => {
                console.log('O setChatList passa para a função, esse parametro ', chatList)
                return [
                    newMessage,
                    ...chatList,
                ]}
            )
            console.log('Quando o listener carrega, o chat list ta assim -> ', chatList)
            console.log('Houve uma nova mensagem! ', newMessage)
        })
    }, [])

    function handleNewMessage(newMessage) {
        const newMessageObj = {
            text: newMessage,
            from: username,
            // id: chatList.length,
        }
        supabaseClient.from('Messages').insert([newMessageObj]).then(data => {console.log('Criando nova mensagem: ', data)})
        
        setMessage('')
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'transparent', position: 'absolute', width:'100vw', height:'100vh',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList messages={chatList} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) => {
                                setMessage(event.target.value)
                                console.log(message)
                            }}
                            onKeyPress={(event) => {
                                if(event.key === 'Enter'){
                                    event.preventDefault()

                                    handleNewMessage(message)
                                }
                                
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                                handleNewMessage(':sticker: ' + sticker);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props.messages);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.messages.map(message => {
                return (
                    <Text
                key={message.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${message.from}.png`}
                    />
                    <Text tag="strong">
                        {message.from}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {message.text.startsWith(":sticker:")
                    ? (
                        <Image src={message.text.replace(':sticker:', '')} maxWidth='100px' maxHeight='100px'/>
                    )
                    : (
                        message.text
                    )
                }
                {/* {message.text} */}
            </Text>
                )
            })}
        </Box>
    )
}