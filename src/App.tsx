import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {AppBar, Box, Grid, ListItemText, MenuItem, MenuList, Typography} from '@mui/material';

import {ThemeProvider, createTheme} from '@mui/material/styles';
import Block from './Block';
import yaml from 'js-yaml';

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

const TUTORIALS = [
  "welcome.yml",
  "flex.yml",
  "justify-content.yml",
]

function App() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [data, setData] = useState<IBlock[]>([]);
  const scrollContainer = useRef<HTMLDivElement>();


  useEffect(() => {
    (async () => {
      const all = [];
      for (let i = 0; i < TUTORIALS.length; i++) {
        const res = await fetch(process.env.PUBLIC_URL + `/tutorial/${TUTORIALS[i]}`);
        const y = await (await res.blob()).text();
        const t = yaml.load(y) as IBlock;
        all.push(t);
      }
    setData(all);
    })();

  }, [])

  const navigate = (index: number) => {
    if (!scrollContainer.current) {
      return;
    }

    const headings = document.querySelectorAll("h3");
    scrollContainer.current.scrollTop = headings[index].offsetTop
  }

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
        <Box>
          <Grid container>
            <Grid item xs={3} sx={{ height: '100vh '}}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5">Learn CSS</Typography>
                <Typography>Made by Ron Reiter</Typography>
              </Box>
              <MenuList dense>
                {data.map((item, index) => (
                  <MenuItem key={index} selected={index === currentSection} onClick={() => navigate(index)}>
                    <ListItemText inset={!!item.html}><Typography variant="body2" sx={{ fontWeight: item.html ? 'inherit': 'bold' }}>{item.title}</Typography></ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Grid>
            <Grid item xs={9} sx={{ height: '100vh '}}>
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
