import {Box, Button, Grid, Typography} from '@mui/material';
import React, {useState} from 'react';
import {IBlock} from './App';
import ReactMarkdown from 'react-markdown'

export default function Block({block}: { block: IBlock, children?: React.ReactNode }) {
  const [currentOption, setCurrentOption] = useState<number>(0);


  if (!block.html) {
    return (
      <>
        <Typography component="h3" variant="h3" sx={{mt: 2}}>{block.title}</Typography>
        <ReactMarkdown children={block.description}/>
      </>
    )
  }

  const compiled = block.html.replace("{{ option }}", block.options[currentOption]);
  const lines = block.html.trim().split("\n");

  const toggleOption = () => {
    setCurrentOption((currentOption + 1) % block.options.length);
  }

  return (
    <>
      <Grid container columnSpacing={3} rowSpacing={5} sx={{mb: 10}}>
        <Grid item xs={12} md={6}>
          <Typography component="h3" variant="h4" sx={{mt: 2}}>{block.title}</Typography>
          <ReactMarkdown children={block.description}/>

          <Box sx={{my: 2}}>
            {block.options.map((option, index) => (
              <Button
                key={index}
                sx={{mr: 1}}
                variant={currentOption === index ? "contained" : "outlined"}
                color="primary"
                onClick={() => setCurrentOption(index)}
              >{option}</Button>
            ))}
          </Box>
          <pre className="code" style={{display: 'flex', alignItems: 'stretch'}}>

            <div style={{ width: 20 }}>
            {lines.map((line, index) => (
              <div key={index} className={`codeline`}>
                <span>{index + 1}</span>
              </div>
            ))}
            </div>

            <div style={{ flex: 1 }}>
            {lines.map((line, index) => (
              <div key={index} className={`codeline ${index === block.highlight ? "highlight" : ""}`}>
                {line.includes("{{ option }}") ? (
                  <>
                    {line.split("{{ option }}")[0]}
                    <span onClick={toggleOption} style={{ cursor: 'pointer' }}>{block.options[currentOption]}</span>
                    {line.split("{{ option }}")[1]}
                  </>
                ) : line}
              </div>
            ))}
            </div>
          </pre>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="render" dangerouslySetInnerHTML={{'__html': compiled}}/>

        </Grid>
      </Grid>
    </>
  )
}