const ConditionalRenderLogical = () => {
    const renderMe = false;
    const dontRenderMe = false;
    return (
        <>
            {/* Only display when renderMe and dontRenderMe are both true */}
            {renderMe && <p>I will be displayed if renderMe is true</p>}

            {/* Only display when renderMe and dontRenderMe are both false */}
            {(!renderMe && !dontRenderMe) && <p>I will be displayed if dontRenderMe is false (and renderMe is false)</p>}

            {/* Only display when renderMe is false and dontRenderMe is true */}
            {(!renderMe && dontRenderMe) && <p>I will be displayed if renderMe is false and dontRenderMe is true</p>}
        </>
    );
};

export default ConditionalRenderLogical;
