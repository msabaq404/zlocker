import { Button } from '@mui/material';
import * as React from 'react';

interface MakeContributionProps{
    wantToContribute: () => void;
}

const MakeContribution = (props: MakeContributionProps) => {
    return ( <Button onClick={props.wantToContribute}>Hello</Button> );
}
 
export default MakeContribution;