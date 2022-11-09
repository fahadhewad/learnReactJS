import ConditionalRenderWithIf from "./ConditionalRenderWithIf";
import ConditionalRenderLogical from "./ConditionalRenderLogical";
import ConditionalRenderTernary from './ConditionalRenderTernary'

const ConditionalRendering = () => {
    return (
        <>
            <ConditionalRenderWithIf />
            <ConditionalRenderTernary />
            <ConditionalRenderLogical />
        </>
    );
};

export default ConditionalRendering;
