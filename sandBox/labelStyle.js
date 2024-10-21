        const newEdge = {
          id: `edge-${currentNode.id}-${newNode.id}`,
          source: currentNode.id,
          sourceHandle: index % 2 === 0 ? 'switch-source-right' : 'switch-source-left',
          target: newNode.id,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#3383ff" },
          label: data.cases[index].operand,
          labelStyle: { fill: 'black', fontWeight: 700, fontSize: 14 },
          labelBgStyle: { fill: 'white' },
          labelBgPadding: [8, 4],
          labelBgBorderRadius: 4,
        };