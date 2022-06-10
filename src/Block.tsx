import {Box, Button, Grid, Tooltip, Typography} from '@mui/material';
import React, {useState} from 'react';
import {IBlock} from './App';
import ReactMarkdown from 'react-markdown'
import {useColorScheme} from '@mui/material/styles';

export default function Block({block}: { block: IBlock, children?: React.ReactNode }) {
  const [currentOption, setCurrentOption] = useState<number>(0);

  const {mode} = useColorScheme();

  if (!block.html) {
    return (
      <Box className="section-text">
        <Typography component="h3" variant="h3" sx={{mt: 2}}>{block.title}</Typography>
        <ReactMarkdown children={
          block.description.replace("{{ theme }}", mode ? mode : 'light')
        }/>
      </Box>
    )
  }

  const compiled = block.html.replace("{{ option }}", block.options[currentOption].name);
  const lines = block.html.trim().split("\n");

  const toggleOption = () => {
    setCurrentOption((currentOption + 1) % block.options.length);
  }

  return (
    <>
      <Typography component="h3" variant="h4" sx={{mt: 2}}>{block.title}</Typography>
      <Grid container columnSpacing={3} rowSpacing={1} sx={{mb: 10, display: 'flex'}}>
        <Grid item xs={12} md={7}>
          <ReactMarkdown children={block.description}/>

          <Box sx={{my: 2}}>
            {block.options.map((option, index) => (
              <Tooltip title={option.tooltip ?? ''}>
                <Button
                  key={index}
                  sx={{mr: 1, mb: 1}}
                  variant={currentOption === index ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setCurrentOption(index)}
                >
                  {option.name}
                </Button>
              </Tooltip>
            ))}
          </Box>
          <pre className="code" style={{display: 'flex', alignItems: 'stretch'}}>

            <div style={{width: 20}}>
            {lines.map((line, index) => (
              <div key={index} className="codeline linenumber">
                <span>{index + 1}</span>
              </div>
            ))}
            </div>

            <div style={{flex: 1}}>
            {lines.map((line, index) => (
              <div key={index} className={`codeline ${index === block.highlight ? "highlight" : ""}`}>
                {line.includes("{{ option }}") ? (
                  <>
                    {line.split("{{ option }}")[0]}
                    <span onClick={toggleOption} style={{cursor: 'pointer'}}>{block.options[currentOption].name}</span>
                    {line.split("{{ option }}")[1]}
                  </>
                ) : line}
              </div>
            ))}
            </div>
          </pre>
        </Grid>
        <Grid item xs={12} md={5} sx={{alignItems: 'stretch'}}>
          <div style={{height: '100%'}} className="render" dangerouslySetInnerHTML={{'__html': compiled}}/>

        </Grid>
      </Grid>
    </>
  )
}