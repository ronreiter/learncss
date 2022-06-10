import {Box} from '@mui/material';
import GitHubButton from 'react-github-btn';
import React from 'react';

export default function GitHubButtons({mode}: { mode?: string }) {
  return (
    <>
      <Box sx={{mt: 2, display: 'flex'}}>
        <Box sx={{mr: 1}}>
          <GitHubButton
            href="https://github.com/ronreiter/learncss/fork"
            data-icon="octicon-repo-forked"
            data-size="large"
            data-color-scheme={mode}
            aria-label="Fork ronreiter/learncss on GitHub"
          >
            Fork
          </GitHubButton>
        </Box>
        <Box sx={{mr: 1}}>
          <GitHubButton
            href="https://github.com/ronreiter/learncss"
            data-color-scheme={mode}
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star ronreiter/learncss on GitHub"
          >
            Star
          </GitHubButton>
        </Box>
      </Box>
    </>
  )
}