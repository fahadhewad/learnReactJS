const ConditionalRenderTernary = () => {

    const renderMe = false;
    const dontRenderMe = true;
    // The code below is VERY VERY BAD!!!!
    return (
        <>
            {
                renderMe ?
                    <p>I will be displayed if renderMe is true</p>
                    :
                    !dontRenderMe ?
                        <p>I will be displayed if dontRenderMe is false (and renderMe is false)</p>
                        :
                        <p>I will be displayed if renderMe is false and dontRender me is true</p>
            }
        </>
    );
};

export default ConditionalRenderTernary;
