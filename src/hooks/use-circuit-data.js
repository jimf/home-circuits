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
    circuit: (a, b) => compareInt(a.circuit, b.circuit) || compareAlpha(a.location, b.location),
    amps: (a, b) => compareInt(a.amps, b.amps) || columnSorters.circuit(a, b),
    location: (a, b) => compareAlpha(a.location, b.location) || compareInt(a.circuit, b.circuit),
};

const compare = ({ sortColumn, sortDirection }) => (a, b) => {
    const cmp = columnSorters[sortColumn](a, b);
    return sortDirection === 'asc' ? cmp : -cmp;
};

const useCircuitData = ({
    initialSortColumn = 'circuit',
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
            setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    }, [sortColumn]);

    return {
        data,
        filterText,
        setFilterText,
        sortColumn,
        sortDirection,
        toggleSortColumn,
    };
};

export default useCircuitData;
