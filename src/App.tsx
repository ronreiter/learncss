import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {AppBar, Box, Grid, ListItemText, MenuItem, MenuList} from '@mui/material';

import {ThemeProvider, createTheme} from '@mui/material/styles';
import Block from './Block';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export interface IBlock {
  title: string,
  description: string,
  highlight: number,
  html: string,
  options: string[]
}

const d: IBlock[] = [
  {
    title: "Flex Display",
    description: "Flex display is cool",
    highlight: 1,
    html: `<div style="
  display: {{ option }}
">
  <div>Hello</div>
  <div>World!</div>
</div>`,
    options: ['block', 'flex']
  }
]

const data = [d[0], d[0], d[0], d[0], d[0]]

function App() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const scrollContainer = useRef<HTMLDivElement>();

  const setCurrentSelection = () => {
    if (!scrollContainer.current) {
      return
    }
    const headings = document.querySelectorAll("h3");
    const current = scrollContainer.current?.scrollTop;

    for (let i = 0; i < headings.length; i++) {
      if (current < headings[i].offsetTop) {
        setCurrentSection(i);
        break;
      }
    }
  }
  useEffect(() => {
    if (!scrollContainer.current) {
      return
    }
    console.log("setup")
    // clean up code
    scrollContainer.current.removeEventListener('wheel', setCurrentSelection);
    scrollContainer.current.addEventListener('wheel', setCurrentSelection, {passive: true});
    return () => scrollContainer.current?.removeEventListener('wheel', setCurrentSelection);
  }, [scrollContainer]);


  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <AppBar/>
        <Box>
          <Grid container>
            <Grid item xs={3}>
              <MenuList dense>
                {data.map((item, index) => (
                  <MenuItem key={index} selected={index === currentSection} onClick={() => setCurrentSection(index)}>
                    <ListItemText>{item.title}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Grid>
            <Grid item xs={9} >
              <div ref={scrollContainer as any} style={{ padding: 20, overflow: 'scroll', height: '100vh'}}>
              {data.map((block, index) => (
                <Block key={index} block={block}/>
              ))}
                </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
