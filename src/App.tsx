import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Box, Container, CssBaseline, Grid, ListItemText, MenuItem, MenuList, Typography} from '@mui/material';

// import {createTheme} from '@mui/material/styles';
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';

import Block from './Block';
import yaml from 'js-yaml';
import ModeSwitcher from './ModeSwitcher';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

export interface IBlock {
  title: string,
  description: string,
  highlight: number,
  html: string,
  options: string[]
}

const TUTORIALS = [
  "welcome.yml",
  "flex-box.yml",
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
    const current = scrollContainer.current;
    console.log("setup")
    // clean up code
    current.removeEventListener('wheel', setCurrentSelection);
    current.addEventListener('wheel', setCurrentSelection, {passive: true});
    return () => current.removeEventListener('wheel', setCurrentSelection);
  }, [scrollContainer]);

  const menu = (
    <MenuList dense>
      {data.map((item, index) => (
        <MenuItem
          key={index}
          selected={index === currentSection}
          onClick={() => navigate(index)}
        >
          <ListItemText inset={!!item.html}>
            <Typography
              variant="body2"
              sx={{fontWeight: item.html ? 'inherit' : 'bold'}}
            >
              {item.title}
            </Typography>
          </ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  )

  return (
    <CssVarsProvider>
      <CssBaseline/>
      <div className="App">
        <Box>
          <Grid container>
            <Grid item xs={12} md={3} sx={(theme) => ({
              height: '100vh',
              [theme.breakpoints.down('md')]: {
                height: 'inherit',
              },
              display: 'flex',
              flexDirection: 'column',
            })}>
              <Box sx={{p: 2}}>
                <Typography variant="h5">Learn CSS</Typography>
                <Typography>Made by Ron Reiter</Typography>
                <ModeSwitcher sx={{mt: 2}}/>
              </Box>
              <Box sx={(theme) => ({
                flex: 1,
                overflow: 'scroll',
                [theme.breakpoints.down('md')]: {
                  display: 'none',
                }
              })}>
                {menu}
              </Box>
            </Grid>
            <Grid item xs={12} md={9} sx={(theme) => ({
              height: '100vh',
              [theme.breakpoints.down('md')]: {
                height: 'inherit',
              },
              display: 'flex',
            })}>
              <div ref={scrollContainer as any} style={{overflow: 'scroll', flex: 1}}>
                <Container maxWidth="md">
                  {data.map((block, index) => (
                    <Block key={index} block={block}/>
                  ))}
                </Container>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </CssVarsProvider>
  );
}

export default App;
