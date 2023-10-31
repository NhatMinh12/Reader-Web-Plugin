/*global chrome*/

import React, {useEffect, useState} from "react"
import './App.css';
import {Box, Button, Paper, Container, Grid, TextField, useScrollTrigger} from "@mui/material"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import {Configuration, OpenAIApi} from 'openai'

function App() {
  const [prompt, setPrompt] = useState("")
  const [key, setKey] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const configuration = new Configuration({
    apiKey: key,
  })
  const openai = new OpenAIApi(configuration)

  async function sendDataToGPT(data) {
    const apiKey = process.env.OPENAI_API_KEY_2
    const newConfiguration = new Configuration({
      apiKey: apiKey,
    })

    const newOpenAI = new OpenAIApi(newConfiguration)

    const newCompletion = await newOpenAI.createCompletion({
      model: 'text-davinci-003',
      // prompt: `${data.pageTitle}. ${data.metaDescription}. ${data.bodyContent.substring(0,10000)}`,
      prompt: 'Given the following webpage content:"' + `${data.pageTitle}` + ' ' + `${data.metaDescription}` + '" answer the following questions',
      max_tokens: 400
    })

    console.log(newCompletion.data.choices[0].text)
  }

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        console.log(tabs[0].url)
      }
    })
  }, [])

  useEffect(() => {
    chrome.runtime.sendMessage({action: 'extractPageInfo'})
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.data) {
        console.log(message.data.result)
        console.log('Given the following webpage content:"' + `${message.data.result.pageTitle}` + ' ' + `${message.data.result.metaDescription}` + '" answer the following questions')
        sendDataToGPT(message.data.result)
      }
    })
  }, [])

  async function handleSubmit() {
    setIsLoading(true)
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 400
    })
    console.log(prompt)
    setResponse(completion.data.choices[0].text)
    setIsLoading(false)
    setPrompt("")
  } 

  return (
    <Container>
      <Box sx={{width: '100%', mt: 4}}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoFocus
              label="Enter your OpenAI API key"
              variant="outlined"
              margin='normal'
              value={key}
              onChange={(e) => {
                setKey(e.target.value)
              }}
            />
            <TextField
              fullWidth
              autoFocus
              label="Type your question"
              variant="outlined"
              multiline
              rows={4}
              margin='normal'
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value)
              }}
            />
            <Button 
              fullWidth
              disableElevation
              disabled={isLoading}
              variant='contained'
              onClick={() => handleSubmit()}
              startIcon={
                isLoading && (
                  <AutorenewIcon
                    sx={{
                      animation: 'spin 2s linear infinite',
                      "@keyframes spin": {
                        "0%": {
                          transform: 'rotate(360deg)',
                        },
                        '100%': {
                          transform: 'rotate(0deg)',
                        },
                      },
                    }}
                  />
                )
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{mt: 3}}>
          <div>{response}</div>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
