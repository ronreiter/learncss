import {Box, Button, Grid, Typography} from '@mui/material';
import React, {useState} from 'react';
import {IBlock} from './App';

export default function Block({block}: { block: IBlock, children?: React.ReactNode }) {
  const [currentOption, setCurrentOption] = useState<number>(0);


  if (!block.html) {
    return (
      <>
          <Typography component="h3" variant="h3" sx={{mt: 1}}>{block.title}</Typography>
          <Typography sx={{ mt: 1, whiteSpace: 'pre' }}>{block.description}</Typography>
      </>
    )
  }

  const compiled = block.html.replace("{{ option }}", block.options[currentOption]);

  return (
    <>
      <Grid container columnSpacing={3} rowSpacing={5} sx={{mb: 10}}>
        <Grid item xs={12} md={6}>
          <Typography component="h3" variant="h3" sx={{mt: 1}}>{block.title}</Typography>
          <Typography sx={{mt: 1, whiteSpace: 'pre' }}>{block.description}</Typography>

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
          <pre className="code">{block.html.split("\n").map((line, index) => (
            <div key={index} className={`codeline ${index === block.highlight ? "highlight" : ""}`}>
              <span>{index + 1}</span>{line.replace("{{ option }}", block.options[currentOption])}</div>
          ))}</pre>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="render" dangerouslySetInnerHTML={{'__html': compiled}}/>

        </Grid>
      </Grid>
    </>
  )
}