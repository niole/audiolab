import * as React from 'react';
import { getProject } from '../../api';
import withDataGetter from '../../containers/withDataGetter';
import { AudioLabelingProject } from '../../types';

const ParsedAudio = (props: InnerProps) => (
    <div>
        {JSON.stringify(props)}
    </div>
);

type OuterProps = {};
type InnerProps = AudioLabelingProject;
export default withDataGetter<OuterProps, InnerProps>(
    id => getProject('o')
)(ParsedAudio);
