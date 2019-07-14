import * as React from 'react';
import withDataGetter from '../../containers/withDataGetter';

const ParsedAudio = (props: {}) => (
    <div>
        slf
    </div>
);

type OuterProps = {};
type InnerProps = {};
export default withDataGetter<OuterProps, InnerProps>(
    async () => ({}) // TODO GET DATA HERE
)(ParsedAudio);
