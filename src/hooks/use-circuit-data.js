import React from 'react';
import circuitData from '../../data.json';

const DEFAULT_LOCATIONS = [
    {
        location: 'Unknown',
        description: '',
    },
];

const initialData = () => {
    let id = 1;
    const result = [];

    for (const circuit of Object.values(circuitData)) {
        const locations = circuit.locations.length > 0
            ? circuit.locations
            : DEFAULT_LOCATIONS;

        for (const location of locations) {
            result.push({
                id,
                circuit: circuit.circuit,
                amps: circuit.amps,
                location: location.location,
                description: location.description,
            });

            id += 1;
        }
    }

    return result;
};

const compareInt = (a, b) => parseInt(a, 10) - parseInt(b, 10);
const compareAlpha = (a, b) => a.localeCompare(b);

const columnSorters = {
    circuit: compareInt,
    amps: compareInt,
    location: compareAlpha,
    description: compareAlpha,
};

const compare = ({ sortColumn, sortDirection }) => (a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];
    const cmp = columnSorters[sortColumn](columnA, columnB);
    return sortDirection === 'asc' ? cmp : -cmp;
};

const useCircuitData = ({
    initialSortColumn = null,
    initialSortDirection = 'asc',
    initialFilterText = '',
} = {}) => {
    const [sortColumn, setSortColumn] = React.useState(initialSortColumn);
    const [sortDirection, setSortDirection] = React.useState(initialSortDirection);
    const [filterText, setFilterText] = React.useState(initialFilterText);
    const [data, setData] = React.useState(initialData());

    React.useEffect(() => {
        const filterTextLower = filterText.toLowerCase();
        const newData = initialData()
            .filter(row => !filterText || `${row.location}${row.description}`.toLowerCase().includes(filterTextLower));

        if (sortColumn) {
            newData.sort(compare({ sortColumn, sortDirection }));
        }

        setData(newData);
    }, [sortColumn, sortDirection, filterText]);

    const toggleSortColumn = React.useCallback(column => {
        if (column === sortColumn) {
            if (sortDirection === 'asc') {
                setSortDirection('desc');
            } else {
                setSortColumn(null);
            }
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    }, [sortColumn, sortDirection]);

    return {
        data,
        filterText,
        setFilterText,
        sortColumn,
        sortDirection: sortColumn ? sortDirection : null,
        toggleSortColumn,
    };
};

export default useCircuitData;
