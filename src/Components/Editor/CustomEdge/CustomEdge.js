import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
} from 'reactflow';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, label }) {
    console.log('label' , label)
    console.log('id' , id)
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'none', // Prevent pointer events on the label
                    }}
                    className="edge-label" // Optional: Add a class for styling
                >
                    {label} {/* Render the label text here */}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
