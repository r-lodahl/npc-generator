import {GeneratorValues} from "../generator-selection/generator";

interface GeneratorResultProps {
    data?: GeneratorValues;
}

export const GeneratorResult = (props: GeneratorResultProps) => {
    if (!props.data) {
        return (<div/>);
    }

    return (
        <div>
            {props.data.toString()}
        </div>
    );
}