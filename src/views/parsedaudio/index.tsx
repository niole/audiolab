import * as React from 'react';
import withDataGetter from '../../containers/withDataGetter';

const ParsedAudio = (props: InnerProps) => (
    <div>
        {props.randomData.map((x: string) => (
            <div>
                {x}
            </div>
        ))}
    </div>
);

type OuterProps = {};
type InnerProps = {
    randomData: string[];
};
export default withDataGetter<OuterProps, InnerProps>(
    async () => ({ randomData: ['x', 'y']}) // TODO GET DATA HERE
)(ParsedAudio);
