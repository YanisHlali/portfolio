import React, { useCallback } from 'react';
import { Link, AppBar, Container, IconButton, makeStyles, Toolbar, Typography, useScrollTrigger, useTheme } from '@material-ui/core';
import Landing from '../src/pharmacie/Landing';
import About from '../src/pharmacie/About';
import About2 from '../src/pharmacie/About_2';
import About3 from '../src/pharmacie/About_3';
import About4 from '../src/pharmacie/About_4';
import About5 from '../src/pharmacie/About_5';
import About6 from '../src/pharmacie/About_6';
import About7 from '../src/pharmacie/About_7';
import About8 from '../src/pharmacie/About_8';
import About9 from '../src/pharmacie/About_9';
import About10 from '../src/pharmacie/About_10';
import About11 from '../src/pharmacie/About_11';
import About12 from '../src/pharmacie/About_12';
import About13 from '../src/pharmacie/About_13';
import Skills from '../src/Skills';
import Projects from '../src/Projects';
import Experience from '../src/Experience';
import data from '../experience.json';
import { darkTheme, lightTheme } from '../src/theme';
import { Brightness4, Brightness7 } from '@material-ui/icons';
const { name, projects } = data

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    boxShadow: "none",
  },
  lien: {
    color: "white"
  }
}))

export async function getStaticProps() {
  const baseURI = projects.baseURI
  const repos = projects.repositories
  const reqInit = {
    headers: { 
      'Authorization': `token ${process.env.PAT}`
    }
  }
  const fullRepoData = await Promise.allSettled(
    repos.map(
      async name => {
        const repo = await fetch(baseURI + name, reqInit).then(res => res.json());
        const langs = await fetch(baseURI + name + "/languages", reqInit).then(res => res.json())
        return {
          ...repo,
          languages: Object.getOwnPropertyNames(langs)
        };
      }
    )
  );

  return {
    props: {
      projects: fullRepoData
    },
    revalidate: 60
  }
}

export default function Index({ projects, setTheme }) {

  const classes = useStyles()

  const trigger = useScrollTrigger({ disableHysteresis: true })

  const theme = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(theme => theme.palette.type === 'dark' ? lightTheme : darkTheme)
  }, [setTheme])

  return (
    <div className={classes.root}>
      <AppBar color={!trigger ? "transparent" : "inherit"} className={classes.appBar} position="fixed">
      <Toolbar>
          <Typography variant="h6" className={classes.root}>
            <Link className={classes.lien} href="https://portfolio-puce-nu.vercel.app/mfr">Stage n??1</Link>
          </Typography>
          <Typography variant="h6" className={classes.root}>
            <Link className={classes.lien} href="https://portfolio-puce-nu.vercel.app/pharmacie">Pharmacie SAUTHEUZ</Link>
          </Typography>
          <Typography variant="h6" className={classes.root}>
            <Link className={classes.lien} href="https://portfolio-puce-nu.vercel.app/inria">Alternance</Link>
          </Typography>
          <IconButton edge="end" color="inherit" onClick={toggleTheme}>
            {theme.palette.type === "dark" ? <Brightness7/> : <Brightness4/>}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.toolbar} />
      <Container>
        <Landing />
        <About />
        <About2 />
        <About3 />
        <About4 />
        <About5 />
        <About6 />
        <About7 />
        <About8 />
        <About9 />
        <About10 />
        <About11 />
        <About12 />
        <About13 />
      </Container>
    </div>
  );
}
