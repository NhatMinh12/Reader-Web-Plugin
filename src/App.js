/*global chrome*/

// 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
import React, {useState} from "react"
import './App.css';
import {Box, Button, Paper, Container, Grid, TextField} from "@mui/material"
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

  async function handleSubmit() {
    setIsLoading(true)
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 20
    })
    setResponse(completion.data.choices[0].text)
    setIsLoading(false)
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
          <Paper sx={{p: 3}}>{response}</Paper>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
